import React, { useState } from "react";
import "../../Apps.css";

// Utility to convert base64 to an image URL (dummy example)
const base64ToImage = (base64String) => {
  return `data:image/png;base64,${base64String}`;
};

// Dummy Data for testing purposes
const dummyData = {
  accuracy: 0.85,
  loss: 0.35,
  cm_plot_url: "iVBORw0KGgoAAAANSUhEUgAAADIA...QmCcHt2ZA==",  // Dummy base64 string
  confusion_matrices: [
    { true_positive: 24, false_positive: 5, false_negative: 3, true_negative: 20 },
    { true_positive: 15, false_positive: 10, false_negative: 5, true_negative: 50 },
    { true_positive: 30, false_positive: 2, false_negative: 10, true_negative: 40 },
    { true_positive: 12, false_positive: 6, false_negative: 8, true_negative: 25 },
  ],
  classification_reports: [
    { class: "Cercospora", precision: 0.8, recall: 0.9, f1_score: 0.85, support: 50 },
    { class: "Healthy", precision: 0.9, recall: 0.85, f1_score: 0.87, support: 50 },
    { class: "Leaf Rust", precision: 0.7, recall: 0.8, f1_score: 0.75, support: 50 },
    { class: "Phoma", precision: 0.6, recall: 0.75, f1_score: 0.68, support: 50 },
  ]
};

const ConfusionMatrixTable = ({ confusionMatrix }) => {
  const labels = ["Cercospora", "Healthy", "Leaf Rust", "Phoma"];

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Confusion Matrix</h2>
      <table style={{ borderCollapse: "collapse", margin: "auto", width: "60%", fontSize: "18px" }}>
        <thead>
          <tr style={{ backgroundColor: "#6F4E37", color: "white" }}>
            <th>Actual / Predicted</th>
            {labels.map((label, index) => (
              <th key={index}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {confusionMatrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{labels[rowIndex]}</td>
              {row.map((value, colIndex) => (
                <td key={colIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ClassificationReport = ({ classificationReport }) => {
  return (
    <div className="classification-report">
      <h2 style={{ color: "#6F4E37", textAlign: "center" }}>Classification Report</h2>
      <table border="1" style={{ margin: "auto", width: "60%", fontSize: "18px" }}>
        <thead>
          <tr style={{ backgroundColor: "#6F4E37", color: "white" }}>
            <th>Class</th>
            <th>Precision</th>
            <th>Recall</th>
            <th>F1-Score</th>
            <th>Support</th>
          </tr>
        </thead>
        <tbody>
          {classificationReport.map((report, index) => (
            <tr key={index}>
              <td>{report.class}</td>
              <td>{report.precision}</td>
              <td>{report.recall}</td>
              <td>{report.f1_score}</td>
              <td>{report.support}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function Test() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [testStatus, setTestStatus] = useState("");
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleTestClick = () => {
    setIsTesting(true);
    setTestStatus("Testing in progress...");

    // Simulate testing with dummy data
    setTimeout(() => {
      setTestResults({
        accuracy: dummyData.accuracy,
        loss: dummyData.loss,
        confusion_matrix: dummyData.confusion_matrices.map(matrix => [
          matrix.true_positive, matrix.false_positive, matrix.false_negative, matrix.true_negative
        ]),
        cm_plot_url: base64ToImage(dummyData.cm_plot_url),  // Convert base64 to image URL
        classification_report: dummyData.classification_reports,
      });

      setTestStatus("Testing completed successfully!");
      setIsTesting(false);
    }, 2000); // Simulate a 2-second delay for testing
  };

  return (
    <div className="Apps" style={{ textAlign: "center", padding: "20px" }}>
      <h1 style={{ color: "#6F4E37" }}>Upload Model</h1>
      <input type="file" onChange={handleFileChange} />
      <div className="buttonSpace" style={{ margin: "20px" }}>
        <button onClick={handleTestClick} disabled={isTesting}>
          Test Model
        </button>
      </div>

      {selectedFile && (
        <div>
          <p>Selected File: {selectedFile.name}</p>
          <p>File Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
        </div>
      )}

      {testStatus && <p>{testStatus}</p>}

      {testResults && (
        <div className="testResults">
          <h2 style={{ color: "#6F4E37" }}>Test Results</h2>
          <div className="testResults">
            <span>Accuracy: {(testResults.accuracy * 100).toFixed(2)}%</span>
            <span>Loss: {testResults.loss}</span>
          </div>
          <img src={testResults.cm_plot_url} alt="Confusion Matrix" style={{ maxWidth: "100%" }} />
          <ConfusionMatrixTable confusionMatrix={testResults.confusion_matrix} />
          <ClassificationReport classificationReport={testResults.classification_report} />
        </div>
      )}
    </div>
  );
}

export default Test;
