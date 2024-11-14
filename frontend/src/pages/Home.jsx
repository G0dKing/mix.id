// /frontend/src/pages/Home.jsx

import React from 'react';
import Analyze from '@c/Analyze';
import Upload from '@c/Upload';
import '@s/Home.css';

const Home = () => (
    <div>
        <h1>MIX.ID - DJ Mix Analyzer</h1>
        <div>
            <h2>Upload a DJ Mix</h2>
            <Upload />
        </div>
        <div>
            <Analyze />
        </div>
    </div>
);

export default Home;
