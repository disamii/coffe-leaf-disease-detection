import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styling/researcherpage.css"
import ModelOverview from "./ModelTrainandTestOverView";
export default function Researcher() {
  const navigate = useNavigate();

  return (
    <>
    <div className="researcher-containerr">
      {/* Left Section: Image + Explanation */}
      <div className="info-section">
        <img
          src="https://source.unsplash.com/400x300/?technology,ai" 
          alt="AI Research"
          className="research-image"
        />
        <p className="description">
          AI and Machine Learning are transforming agricultural research. Use this system to train models for coffee disease detection or test existing models.
        </p>
      </div>

      {/* Right Section: Buttons for Actions */}
      <div className="action-section">
        <h2>Choose an Action</h2>
        <button className="train-btn" onClick={() => navigate("/researcher/train-model")}>
          Train Model
        </button>
        <button className="test-btn" onClick={() => navigate("/researcher/test-model")}>
          Test Model
        </button>
        <button className="predict-btn" onClick={() => navigate("/researcher/predict_coffe_leaf")}>
          Predict Disease
        </button>
      </div>
    </div>
    <ModelOverview/>
    </>
  );
}
