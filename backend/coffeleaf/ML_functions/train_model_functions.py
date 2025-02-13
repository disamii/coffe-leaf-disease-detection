import os
import zipfile
import io
import base64
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator

def extract_zip(zip_file_path, extract_to_dir):
    with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
        zip_ref.extractall(extract_to_dir)
    extracted_folders = os.listdir(extract_to_dir)
    if extracted_folders:
        return os.path.join(extract_to_dir, extracted_folders[0])
    else:
        raise FileNotFoundError("No extracted folder found in the ZIP file")

def setup_data_generator(train_data_dir, IMG_SIZE=(256, 256), batch_size=32):
    train_datagen = ImageDataGenerator(
        rescale=1/255.0,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True,
    )
    train_gen = train_datagen.flow_from_directory(
        train_data_dir,
        target_size=IMG_SIZE,
        batch_size=batch_size,
        class_mode='categorical',
        subset='training'
    )
    return train_gen

def load_and_compile_model(model_path, learning_rate=0.001):
    model = load_model(model_path)
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=learning_rate),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    return model

def train_model(model, train_gen, epochs=5):
    history = model.fit(
        train_gen,
        epochs=epochs,
        steps_per_epoch=len(train_gen),
    )
    return history

def save_model(model, updated_model_path):
    model.save(updated_model_path)

def generate_plot(history):
    fig, ax = plt.subplots(1, 2, figsize=(12, 5))

    ax[0].plot(history.history['loss'], label='Training Loss')
    ax[0].set_xlabel("Epoch")
    ax[0].set_ylabel("Loss")
    ax[0].set_title("Loss")
    ax[0].legend()

    ax[1].plot(history.history['accuracy'], label='Training Accuracy')
    ax[1].set_xlabel("Epoch")
    ax[1].set_ylabel("Accuracy")
    ax[1].set_title("Accuracy")
    ax[1].legend()

    plt.tight_layout()

    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    image_png = buf.getvalue()
    buf.close()
    plot_url = base64.b64encode(image_png).decode('utf8')

    return plot_url
