import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../styling/TrainResult.css';

const TestResult = () => {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return <div>No data available</div>;
  }

  return (
    <div className="container">
      <h2 className="title">Test Result</h2>
<div className='first_cntr'>
      {result.cm_plot_url && (
        <div className="graph-container">
          <h3 className="subtitle">Test Graph</h3>
          <img src={`data:image/jpeg;base64,${result.cm_plot_url}`} alt="Test Graph" className="graph-image" />
        </div>
      )}

      <div>
        <p className="item highlight">Model Type: {result.model_type}</p>
        <p className="item highlight">Loss: {result.loss}</p>
        <p className="item highlight">Accuracy: {result.accuracy}</p>
      </div>
      </div>
<div className='test_result'>
  <div>
      <h3 className="subtitle">Confusion Matrices</h3>
      <table className="confusion-matrix-table">

  <tbody>
    {result.confusion_matrices.map((cm, index) => (
      <tr key={index}>
        <td>{cm.true_positive}</td>
        <td>{cm.false_positive}</td>
        <td>{cm.false_negative}</td>
        <td>{cm.true_negative}</td>
      </tr>
    ))}
  </tbody>
</table>
</div>
<div>
      <h3 className="subtitle">Classification Reports</h3>

        <div  className="classification-report">
          <table className="classification-report-table">
            <thead>
              <tr>
                <th>Precision</th>
                <th>Recall</th>
                <th>F1 Score</th>
                <th>Support</th>
              </tr>
            </thead>
            <tbody>
            {result.classification_reports.map((cr, index) => (
              <tr key={index}>
                <td>{cr.precision}</td>
                <td>{cr.recall}</td>
                <td>{cr.f1_score}</td>
                <td>{cr.support}</td>
              </tr>
                  ))}
            </tbody>
          </table>
        </div>
  
      </div>
</div>
      <p className="complete-message">Testing Model Completed!</p>
    </div>
  );
};

export default TestResult;
