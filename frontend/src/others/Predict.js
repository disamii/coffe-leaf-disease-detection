import React, { useState } from "react";
import axios from "axios";
import "../../Apps.css"; // Ensure you create a CSS file for styling

const Predict = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle file selection
  const token = localStorage.getItem("token");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // Show preview of uploaded image
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) {
      setError("Please select an image.");
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    const formData = new FormData();
    formData.append("image", image);

    try {
      // Call the prediction API
      const response = await axios.post(
        "http://127.0.0.1:8000/api/predict_for_researcher/", // New API endpoint
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Get the prediction data from the response
      const predictionData = response.data;

      // Set the prediction state with new data structure
      setPrediction({
        image: predictionData.image,
        disease: predictionData.predicted_disease,
        accuracy: predictionData.accuracy,
      });
    } catch (err) {
      setError("Error processing the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle uploading another image
  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setPrediction(null);
    setError(null);
  };

  return (
    <div className="predict-container">
      <h1>Predict Coffee Disease</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Predict"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {preview && (
        <div className="preview-container">
          <h3>Uploaded Image:</h3>
          <img src={preview} alt="Uploaded" className="preview-image" />
        </div>
      )}

      {prediction && (
        <div className="prediction-results">
          <h2>Disease Detected: {prediction.disease}</h2>
          <p><strong>Accuracy:</strong> {prediction.accuracy}%</p>

          <img src={prediction.image} alt="Predicted Disease" className="predicted-image" />

          {/* You can add a button or action to upload another image if needed */}
          {/* <button onClick={handleReset} className="reset-button">Upload Another Image</button> */}
        </div>
      )}
    </div>
  );
};

export default Predict;
