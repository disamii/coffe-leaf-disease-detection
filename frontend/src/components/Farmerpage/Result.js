import React from "react";
import { useLocation } from "react-router-dom";
import "../../styling/result.css";

function Result() {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="result-container">
        <h2>No result available</h2>
      </div>
    );
  }

  return (
    <div className="result-container">
      <div className="result-content">
        <figure>
          <img src={result.image} alt="Coffee Leaf" className="result-image" />
        </figure>
        <div className="result-info">
          {result.predicted_disease && (
            <h1 className="disease-name">predicted disease: {result.predicted_disease}</h1>
          )}



          {result.recommendation?.disease_name && (
            <h1 className="disease-name">predicted disease:{result.recommendation.disease_name}</h1>
          )}
          <p className="accuracy">Accuracy: <strong>{result.accuracy}%</strong></p>
          {result.recommendation?.recommendations && (
            <p className="recommendations">
              <strong>Recommendation:</strong> {result.recommendation.recommendations}
            </p>
          )}
 
          {result.recommendation?.description && (
            <p className="recommendations">
              <strong>description:</strong> {result.recommendation.description}
            </p>
          )}
          {result.recommendation?.link &&  (
            <a href={result.recommendation.link} target="_blank" rel="noopener noreferrer" className="learn-more">
              Learn More
            </a>
          )}


        </div>
      </div>
    </div>
  );
}

export default Result;
