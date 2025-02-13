import os
import django
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import os
from django.conf import settings

# Set the Django settings module environment variable
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "your_project.settings")
django.setup()

#Load the trained model globally (only once)

MODEL_PATH = os.path.join(settings.BASE_DIR, 'coffeleaf', 'ML_functions', 'final_code_updated.keras')
try:
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
    model = tf.keras.models.load_model(MODEL_PATH)
    print(f"Model loaded successfully from {MODEL_PATH}")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# Define disease classes (no need for hardcoded recommendations now)
CLASS_NAMES = ['Cercospora', 'Healthy', 'Leaf Rust', 'Phoma']

def predict_for_researcher(image_path):

    if model is None:
        print("Model is not loaded. Exiting predict_disease function.")
        return "Error", "Model is not loaded. Please check the model path and try again.", 0, "", ""
    
    # Load and preprocess the image
    img = image.load_img(image_path, target_size=(256, 256))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0
    
    try:
        # Make prediction
        predictions = model.predict(img_array)
        class_index = np.argmax(predictions)
        confidence = predictions[0][class_index] * 100
        
        # Get the disease name
        disease_name = CLASS_NAMES[class_index]

        # # Retrieve the recommendation from the database
        # recommendation = DiseaseRecommendation.objects.filter(disease_name=disease_name).first()
        
        return disease_name,  confidence, 

    except Exception as e:
        # Handle exceptions and ensure a safe return value
        print(f"Error in prediction: {e}")
        return "Error", "Unable to process the image. Please try again.", 0, "", ""
