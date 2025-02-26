import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styling/Researcher.css"
import Coffeeimage from "../../images/Coffeeimage.png"; // Ensure this image exists

const UnsignedResearcher = () => {
  const navigate = useNavigate();

  return (
    <section className="researcher-container">
      <div className="researcher-content">
        {/* Header Section */}
        <div className="researcher-content_header">
          <div>
            <h2>AI-Enhanced Coffee Disease Detection for Researchers</h2>
            <p>
              The AI-powered disease detection system assists researchers in
              analyzing and identifying coffee plant diseases with high
              accuracy. This system leverages machine learning models trained
              on an extensive dataset of images from both healthy and diseased
              coffee plants.
            </p>
          </div>
          <div>
            <img src={Coffeeimage} alt="Researcher analyzing coffee plants" />
          </div>
        </div>

        {/* Body Content */}
        <div className="researcher-content_body">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
            <h2>How It Works</h2>
            <p>The system follows a structured approach to ensure precise disease detection:</p>
          </div>

          <h4>Step 1: Image Upload and Preprocessing</h4>
          <p>
            Researchers upload high-quality images of coffee plant leaves.
            The system preprocesses the images by enhancing clarity, removing
            noise, and focusing on relevant features for accurate analysis.
          </p>

          <h4>Step 2: Feature Extraction</h4>
          <p>
            The AI scans each image for key features such as <em>shape, texture,
            color patterns, and leaf size</em>. It identifies common disease
            symptoms like discoloration, lesions, and abnormal growth patterns.
          </p>

          <h4>Step 3: Machine Learning Model Comparison</h4>
          <p>
            The AI compares the uploaded image with a database of labeled
            images. The model was trained using thousands of images of diseased
            and healthy coffee plants to provide an accurate diagnosis.
          </p>

          <h4>Step 4: Disease Identification</h4>
          <p>
            The AI identifies potential diseases such as <strong>Coffee Leaf
            Rust, Coffee Berry Disease, and Coffee Wilt Disease</strong> based
            on detected symptoms.
          </p>

          <h4>Step 5: Confidence Scoring and Diagnosis</h4>
          <p>
            The system generates a confidence score indicating the reliability
            of the diagnosis. If the score is low, it suggests re-uploading a
            clearer image for better accuracy.
          </p>

          <h4>Step 6: Treatment and Research Suggestions</h4>
          <p>
            After diagnosis, the system offers detailed treatment suggestions,
            including prevention methods, chemical treatments, and natural
            remedies. Researchers can also access historical data and case
            studies for further study.
          </p>

          <h4>Step 7: Continuous Learning</h4>
          <p>
            The AI improves continuously by learning from new images and
            researcher feedback. This allows it to detect emerging diseases and
            enhance accuracy over time.
          </p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="button-container">
        <button onClick={() => navigate("/login")} className="login-btn">Login</button>
        <button onClick={() => navigate("/SignUp")} className="register-btn">Sign Up</button>
      </div>
    </section>
  );
};

export default UnsignedResearcher;
