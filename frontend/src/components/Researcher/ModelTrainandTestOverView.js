import React from "react";
import "../../styling/ModelOverview.css";
import { useNavigate } from "react-router-dom";

export default function ModelOverview() {
  const navigate=useNavigate()
  return (
    <div className="model-overview-container">
      {/* Header Section */}
      <header className="header-section">
        <h1>AI Model Training & Testing</h1>
        <p>Understand how machine learning models are trained and evaluated.</p>
      </header>

      {/* Training & Testing Section */}
      <section className="process-section">
        <div className="process-card">
          <h2>Model Training</h2>
          <p>
            Training is the process where the AI model learns from labeled data.
            It adjusts its internal parameters to minimize errors and improve accuracy.
          </p>
          <ul>
            <li><strong>Loss:</strong> Measures how well the model is learning.</li>
            <li><strong>Accuracy:</strong> Shows how correct the predictions are.</li>
          </ul>
          <button className="action-button" onClick={() => navigate("/researcher/train-model")}>Train a Model</button>
        </div>

        <div className="process-card">
          <h2>Model Testing</h2>
          <p>
            After training, the model is tested on unseen data to evaluate its performance.
            The results include accuracy, loss, and a confusion matrix.
          </p>
          <ul>
            <li><strong>Confusion Matrix:</strong> Shows correct and incorrect predictions.</li>
            <li><strong>Precision & Recall:</strong> Measures of model performance.</li>
          </ul>
          <button className="action-button" onClick={() => navigate("/researcher/test-model")}>Test a Model</button>
        </div>
      </section>

      {/* Metrics Explanation */}
      <section className="metrics-section">
        <h2>Understanding Model Metrics</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <h3>Loss</h3>
            <p>Indicates how well the model is learning. Lower is better.</p>
          </div>
          <div className="metric-card">
            <h3>Accuracy</h3>
            <p>The percentage of correct predictions. Higher is better.</p>
          </div>
          <div className="metric-card">
            <h3>Confusion Matrix</h3>
            <p>Visual representation of correct vs. incorrect classifications.</p>
          </div>
          <div className="metric-card">
            <h3>Precision & Recall</h3>
            <p>Precision measures false positives, recall measures false negatives.</p>
          </div>
        </div>
      </section>

      {/* Visual Representation */}
      {/* <section className="visuals-section">
        <h2>Example: Confusion Matrix</h2>
        <p>Used to analyze model performance across different categories.</p>
        <div className="image-placeholder">
          <img src="https://via.placeholder.com/400x200" alt="Confusion Matrix Example" />
        </div>
      </section> */}

      {/* Call to Action */}
      <section className="cta-section">
  <h2>Upload an Image & Get Disease Prediction</h2>
  <p>Insert an image of a coffee leaf and let our AI predict the disease.</p>
  <button className="cta-button" onClick={() => navigate("/researcher/predict_coffe_leaf")}>Get Prediction</button>
</section>

    </div>
  );
}
