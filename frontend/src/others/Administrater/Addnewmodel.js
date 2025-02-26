import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://127.0.0.1:8000/api/disease_recommendations/";

// Function to fetch existing models
const fetchModels = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch models");
  return response.json();
};

// Function to submit a new model
const submitNewModel = async (data) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to submit model");
  return response.json();
};

const AddNewModel = () => {
  const queryClient = useQueryClient();
  
  // State for form input
  const [formData, setFormData] = useState({
    disease_name: "",
    recommendations: "",
    description: "",
    link: "",
  });

  // Fetch existing models
  const { data: models, isLoading, error } = useQuery({
    queryKey: ["models"],
    queryFn: fetchModels,
  });

  // Mutation for submitting a new model
  const mutation = useMutation({
    mutationFn: submitNewModel,
    onSuccess: () => {
      queryClient.invalidateQueries(["models"]); // Refresh list after submission
      setFormData({ disease_name: "", recommendations: "", description: "", link: "" }); // Reset form
    },
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div>
      <h2>Add New Model</h2>

      {/* Form for submitting a new model */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="disease_name" placeholder="Disease Name" value={formData.disease_name} onChange={handleChange} required />
        <input type="text" name="recommendations" placeholder="Recommendations" value={formData.recommendations} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="url" name="link" placeholder="Reference Link" value={formData.link} onChange={handleChange} required />
        <button type="submit" disabled={mutation.isLoading}>Submit</button>
      </form>

      {/* Display existing models */}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading data</p>
      ) : !models || models.length === 0 ? (
        <p>No models found.</p>
      ) : (
        <ul>
          {models.map((item) => (
            <li key={item.id}>
              <h3>{item.disease_name}</h3>
              <p><strong>Recommendation:</strong> {item.recommendations}</p>
              <p>{item.description}</p>
              {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer">More Info</a>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddNewModel;