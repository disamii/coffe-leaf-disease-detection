import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../styling/TrainResult.css';

const TrainResult = () => {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return <div>No data available</div>;
  }

  return (
    <div className="container">
      <h2 className="title">Train Result</h2>

      {result.cm_plot_url && (
        <div className="graph-container">
          <h3 className="subtitle">Training Graph</h3>
          <img src={`data:image/jpeg;base64,${result.cm_plot_url}`} alt="Training Graph" className="graph-image"/>        </div>
      )}
     <div>
        <p className="item highlight">Model Type: {result.model_type}</p>
        <p className="item highlight">Loss: {result.loss}</p>
        <p className="item highlight">Accuracy: {result.accuracy}</p>
      </div>
      <p className="complete-message">Training Model Completed!</p>    </div>
  );
};

export default TrainResult;
