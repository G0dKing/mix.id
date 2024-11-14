// /frontend/src/components/Analyze.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Analyze = () => {
    const [file, setFile] = useState(null);
    const [analysisData, setAnalysisData] = useState(null);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleAnalyze = async () => {
        const formData = new FormData();
        formData.append('audioFile', file);
        try {
            const response = await axios.post('/api/audio/analyze', formData);
            setAnalysisData(response.data.data);
        } catch (error) {
            console.error("Error during analysis", error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleAnalyze}>Analyze</button>
            <div>
                {analysisData && analysisData.map((track, idx) => (
                    <div key={idx}>
                        <h3>{track.title}</h3>
                        <p>{track.artist} - {track.timestamp}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Analyze;
