import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState(null);
    const [status, setStatus] = useState('');
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setResponse(null); 
        setStatus('');
        setError(null);
    };

    const handleUpload = async () => {
        if (!file) return setError('Please select a file.');

        const formData = new FormData();
        formData.append('audioFile', file);
        setStatus('Uploading...');

        try {
            const res = await axios.post('/api/audio/analyze', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // Assuming the response contains the analysis result
            setResponse(res.data);  // Update response with the analysis data

            setStatus('File uploaded and analyzed successfully!');

        } catch (err) {
            setError(err.response?.data?.error || 'Error uploading file');
            setStatus('');
        }
    };

    return (
        <div>
            <input type="file" accept="audio/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload and Analyze</button>
            {status && <div>{status}</div>}
            {response && (
                <div>
                    <h3>Analysis Result</h3>
                    <TrackList tracks={response.tracks} />
                </div>
            )}
            {error && <div>{error}</div>}
        </div>
    );
}

function TrackList({ tracks }) {
    if (!tracks || tracks.length === 0) return <p>No tracks found.</p>;

    return (
        <ul>
            {tracks.map((track, index) => (
                <li key={index}>
                    <strong>{track.title}</strong> by {track.artist} - {track.timestamp}
                </li>
            ))}
        </ul>
    );
}

export default Upload;
