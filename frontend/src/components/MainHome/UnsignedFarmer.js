import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styling/Farmer.css";
import Coffeeimage from "../../images/Coffeeimage.png"; 

const UnsignedFarmer = () => {
  const navigate = useNavigate();

  return (
    <section className="farmer-container">
      <div className="farmer-content">
        <div className="farmer-content_header">
          <div>
            <h2> AI-Powered Disease Detection for Coffee Farmers</h2>

            <p>
              Coffee farmers often struggle with plant diseases that affect crop
              yield and quality. Our AI-powered system provides a fast and
              accurate way to detect common coffee diseases using machine
              learning. By analyzing images of coffee plant leaves, the AI can
              identify issues such as{" "}
              <strong>
                leaf rust, coffee berry disease, and coffee wilt disease
              </strong>
              and suggest effective treatments.
            </p>
          </div>
          <div>
            <img src={Coffeeimage} alt="Farmer inspecting coffee plants" />
          </div>{" "}
        </div>
        <div className="farmer-content_body">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
            <h2>How It Works</h2>
            <p>
              The system follows a step-by-step approach to ensure precise
              disease detection:
            </p>
          </div>
          <h4>Step 1: Image Upload and Preprocessing</h4>
          <p>
            Farmers upload high-quality images of their coffee plant leaves. The
            system processes these images by enhancing clarity, isolating key
            areas, and removing any visual noise that might interfere with the
            analysis.
          </p>
          <h4>Step 2: Feature Extraction</h4>
          <p>
            The AI scans the uploaded image, extracting key visual features such
            as <em>leaf shape, color patterns, texture, and size</em>. It then
            identifies early signs of disease, including discoloration, lesions,
            and abnormal growth patterns.
          </p>
          <h4> Step 3: Machine Learning Model Comparison</h4>
          <p>
            The system is powered by an advanced AI model trained on thousands
            of labeled coffee plant images. It compares the farmer’s uploaded
            image to its database, looking for the closest match among known
            disease cases.
          </p>
          <h4> Step 4: Disease Identification</h4>
          <p>
            Based on the detected symptoms, the AI identifies the most probable
            disease affecting the coffee plant. The system specializes in
            diagnosing{" "}
            <strong>
              Coffee Leaf Rust, Coffee Berry Disease, and Coffee Wilt Disease
            </strong>
            .
          </p>
          <h4>Step 5: Confidence Scoring and Diagnosis</h4>
          <p>
            The AI generates a confidence score indicating how certain it is
            about the diagnosis. If the confidence score is low, farmers may be
            prompted to upload a clearer image for better accuracy.
          </p>
          <h4> Step 6: Treatment Suggestions</h4>
          <p>
            Once the disease is identified, the system provides{" "}
            <strong>customized treatment recommendations</strong>. These may
            include preventive measures, organic treatments, and chemical
            solutions specifically suited to the disease.
          </p>
          <h4> Step 7: Continuous Learning</h4>
          <p>
            The system continuously improves as it processes more images and
            receives feedback from farmers and researchers. This allows the AI
            to detect new diseases and enhance its accuracy over time.
          </p>
         
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="button-container">
        <button
          onClick={() => navigate("/LoginWithRedirect")}
          className="login-btn"
        >
          Login{" "}
        </button>
        <button onClick={() => navigate("/SignUp")} className="register-btn">
          Sign Up
        </button>
      </div>
    </section>
  );
};

export default UnsignedFarmer;
