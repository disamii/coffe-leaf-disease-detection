import React, { useState } from "react";
import "../../styling/uploadImage.css";
import { useNavigate } from "react-router-dom";
import { predictForRsearcher } from "../../service/service"; // Make sure this API supports file uploads

function UploadImage() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [buttonText, setButtonText] = useState("Upload Image");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setButtonText("Change Image");
    }
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }
  
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append("image", selectedFile); 
      const result=await predictForRsearcher(formData); 
      console.log(result)
      navigate("/researcher/predicted_result",{state:{result:result}});
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="upload-container">
      <h1 className="title">Upload Image</h1>

      <div className="image-preview-container">
        {preview ? (
          <img src={preview} alt="Preview" className="preview-image" />
        ) : (
          <div className="placeholder">No image selected</div>
        )}
        {isSubmitting && (
          <div className="scanning-overlay active">
            <div className="scan-animation"></div>
          </div>
        )}
      </div>

      <form onSubmit={handleOnSubmit}>
        <input type="file" id="file-upload" onChange={handleFileChange} accept="image/*" hidden />
        <label htmlFor="file-upload" className="upload-button">{buttonText}</label>
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? "Uploading..." : "Predict"}
        </button>
      </form>
    </div>
  );
}

export default UploadImage;
