import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import io
import base64
import numpy as np
import zipfile
import os
import seaborn as sns
import shutil


def test_model_function(zip_file_path, extract_to_dir, model_path):
    try:
        # Ensure the extraction directory is empty
        if os.path.exists(extract_to_dir):
            shutil.rmtree(extract_to_dir)
        os.makedirs(extract_to_dir)

        # Extract the contents of the zip file
        with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
            zip_ref.extractall(extract_to_dir)
        print("Zip file extracted successfully.")

        # Move class folders from 'test' to 'extracted_test_data'
        test_dir = os.path.join(extract_to_dir, 'train')
        if os.path.exists(test_dir):
            for item in os.listdir(test_dir):
                src = os.path.join(test_dir, item)
                dest = os.path.join(extract_to_dir, item)
                os.rename(src, dest)
            os.rmdir(test_dir)
        print("Class folders moved successfully.")

        # Load the updated model
        model = load_model(model_path)
        print("Model loaded successfully.")

        # Set up image generators
        IMG_SIZE = (256, 256)
        test_datagen = ImageDataGenerator(rescale=1./255)

        # Create the test data generator
        test_gen = test_datagen.flow_from_directory(
            extract_to_dir,
            target_size=IMG_SIZE,
            batch_size=32,
            class_mode='categorical',
            shuffle=False
        )

        # Check class indices and number of classes
        print("Class indices:", test_gen.class_indices)
        num_classes = len(test_gen.class_indices)
        print("Number of classes detected:", num_classes)

        # Validate class count against model output
        if model.output_shape[-1] != num_classes:
            raise ValueError(f"Model expects {model.output_shape[-1]} classes, but dataset contains {num_classes}.")

        # Evaluate the model
        test_loss, test_acc = model.evaluate(test_gen, steps=len(test_gen), verbose=1)

        # Get predictions
        y_true = test_gen.classes
        y_pred = model.predict(test_gen, steps=len(test_gen), verbose=1)
        y_pred_classes = np.argmax(y_pred, axis=1)

        # Confusion Matrix and Classification Report
        cm = confusion_matrix(y_true, y_pred_classes)
        class_report = classification_report(y_true, y_pred_classes, target_names=test_gen.class_indices.keys(), output_dict=True)

        # Plot Confusion Matrix
        plt.figure(figsize=(8, 6))
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=test_gen.class_indices.keys(), yticklabels=test_gen.class_indices.keys())
        plt.title('Confusion Matrix')
        plt.xlabel('Predicted')
        plt.ylabel('True')

        # Save confusion matrix plot
        cm_buf = io.BytesIO()
        plt.savefig(cm_buf, format='png')
        cm_buf.seek(0)
        cm_image = cm_buf.getvalue()
        cm_buf.close()
        cm_plot_url = base64.b64encode(cm_image).decode('utf8')

        return {
            'test_loss': test_loss,
            'test_acc': test_acc,
            'class_report': class_report,
            'cm': cm,
            'cm_plot_url': cm_plot_url,
            'class_indices': test_gen.class_indices
        }

    except Exception as e:
        print(f"Error while processing: {e}")
        raise e
