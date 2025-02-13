import React, { useState } from "react";
import { FaFileArchive } from "react-icons/fa"; // ZIP file icon
import "../../styling/FileUpload.css";
import "../../styling/uploadImage.css"
import { testModel } from "../../service/service";
import { useNavigate } from "react-router-dom";


export default function FileUploadTest() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
    console.log("Uploading file:", selectedFile);
        
    try {
      const formData = new FormData();
      formData.append("model_file", selectedFile); 
      const result=await testModel(formData); 
      console.log(result)
      navigate("/researcher/test-model/result",{state:{result:result}});
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsSubmitting(false);
    }
    // Handle file upload logic here
  };

  return (
    <div className="upload-container">
      <h1>Test Model </h1>
      {isSubmitting && (
          <div className="scanning-overlay active">
            <div className="scan-animation"></div>
          </div>
        )}
      <input type="file" id="file-input" onChange={handleFileChange} accept=".zip" hidden />
      <label htmlFor="file-input" className="upload-box">
        {selectedFile ? (
          <div className="file-info">
            <FaFileArchive className="file-icon" />
            <div>
              <p className="file-name">{selectedFile.name}</p>
              <p className="file-size">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
        ) : (
          <p className="upload-text">Click to select a .zip file</p>
        )}
      </label>
      {selectedFile && <button className="upload-button" onClick={handleUpload}>Test</button>}
    </div>
  );
}
