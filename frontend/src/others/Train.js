import React, { useState } from 'react';
import '../../Apps.css';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Train() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [trainingStatus, setTrainingStatus] = useState('');
    const [isTraining, setIsTraining] = useState(false);
    const [trainingResults, setTrainingResults] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUploadClick = async () => {
        if (!selectedFile) {
            alert('No file selected, please choose a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://localhost:8000/api/upload/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert(`File uploaded successfully: ${response.data.message}`);
        } catch (error) {
            alert('Error uploading file.');
        }
    };

    const handleTrainClick = async () => {
        if (!selectedFile) {
            alert('No file selected, please upload a file first.');
            return;
        }
        setIsTraining(true);
        setTrainingStatus('Training in progress...');

        try {
            // cnost response = axios.get("", )
            const response = {
                data: [
                    { epoch: 1, accuracy: 0.75, loss: 0.6 },
                    { epoch: 2, accuracy: 0.80, loss: 0.5 },
                    { epoch: 3, accuracy: 0.85, loss: 0.4 },
                    { epoch: 4, accuracy: 0.88, loss: 0.35 },
                    { epoch: 5, accuracy: 0.92, loss: 0.3 },
                ]
            };

            setTrainingResults(response.data);
            setTrainingStatus('Model Training Complete!');
        } catch (error) {
            setTrainingStatus('Training failed. Please try again.');
        }
        setIsTraining(false);
    };

    return (
        <div className="Apps">
            <div>
                <h1>Upload File</h1>
                <input type="file" accept='.zip' onChange={handleFileChange} />
                <div className="buttonSpace">
                    <button onClick={handleUploadClick}>Upload File</button>
                    <button onClick={handleTrainClick} disabled={isTraining}>Train</button>
                </div>
            </div>

            {selectedFile && (
                <div className="inputsOnFileUpload">
                    <p>Selected File: {selectedFile.name}</p>
                    <p>File Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
                </div>
            )}

            {trainingStatus && <p>{trainingStatus}</p>}

            {trainingResults && (
                <div className="trainingResults">
                    <h2>Training Results</h2>
                    
                    {/* Training Chart */}
                    <div>
                    <div className="trainingResultGraph">
                        <h3>Training Accuracy & Loss</h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={trainingResults}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="epoch" label={{ value: "Epoch", position: "insideBottom", offset: -5 }} />
                                <YAxis label={{ value: "Value", angle: -90, position: "insideLeft" }} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="accuracy" stroke="#6F4E37" strokeWidth={3} />
                                <Line type="monotone" dataKey="loss" stroke="#FF0000" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Training Table */}
                    <div className="trainingResultTable">
                        <h3>Epoch Data</h3>
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>Epoch</th>
                                    <th>Accuracy</th>
                                    <th>Loss</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trainingResults.map((value, index) => (
                                    <tr key={index}>
                                        <td>{value.epoch}</td>
                                        <td>{(value.accuracy * 100).toFixed(2)}%</td>
                                        <td>{value.loss.toFixed(3)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    </div>
                    {/* <button onClick={() => setSelectedFile(null)}>Upload another ZIP file</button> */}
                </div>
            )}
        </div>
    );
}

export default Train;
