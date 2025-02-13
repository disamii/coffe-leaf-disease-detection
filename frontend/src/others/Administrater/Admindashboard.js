import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../Dashboard.css';

// Fetch functions
const fetchModelCount = async () => {
    const response = await fetch('http://localhost:8000/api/models/count/');
    if (!response.ok) throw new Error('Failed to fetch model count');
    return response.json();
};

const fetchRecentPredictions = async () => {
    const response = await fetch('http://localhost:8000/api/predictions/recent/');
    if (!response.ok) throw new Error('Failed to fetch recent predictions');
    return response.json();
};

const fetchAccuracyTrend = async () => {
    const response = await fetch('http://localhost:8000/api/models/accuracy-trend/');
    if (!response.ok) throw new Error('Failed to fetch accuracy trend');
    return response.json();
};

export default function Dashboard() {
    const { data: modelCount, isLoading: loadingModels } = useQuery({
        queryKey: ['modelCount'],
        queryFn: fetchModelCount,
    });

    const { data: recentPredictions, isLoading: loadingPredictions } = useQuery({
        queryKey: ['recentPredictions'],
        queryFn: fetchRecentPredictions,
    });

    const { data: accuracyTrend, isLoading: loadingAccuracy } = useQuery({
        queryKey: ['accuracyTrend'],
        queryFn: fetchAccuracyTrend,
    });

    return (
        <div className="dashboard-container">
            {/* Total Models Trained */}
            <div className="card">
                <div className="card-content">
                    <h2 className="card-title">Total Models Trained</h2>
                    <p className="card-number">
                        {loadingModels ? 'Loading...' : modelCount?.total_models || 0}
                    </p>
                </div>
            </div>

            {/* Recent Predictions */}
            <div className="card recent-predictions">
                <div className="card-content">
                    <h2 className="card-title">Recent Predictions</h2>
                    {loadingPredictions ? (
                        <p>Loading...</p>
                    ) : (
                        <ul className="prediction-list">
                            {recentPredictions?.map((prediction) => (
                                <li key={prediction.id} className="prediction-item">
                                    <strong>Disease:</strong> {prediction.disease_detected} <br />
                                    <strong>Confidence:</strong> {prediction.confidence}% <br />
                                    <strong>Timestamp:</strong> {new Date(prediction.timestamp).toLocaleString()}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Accuracy Trend Chart */}
            <div className="card">
                <div className="card-content">
                    <h2 className="card-title">Accuracy Trend Over Time</h2>
                    {loadingAccuracy ? (
                        <p>Loading...</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={accuracyTrend} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="accuracy" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
        </div>
    );
}
