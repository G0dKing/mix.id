// /backend/src/routes/audioRoutes.js

import express from 'express';
import upload from '../middleware/upload.js';
import { analyzeAudio } from '../controllers/audioController.js';

const router = express.Router();

router.post('/upload', upload.single('audioFile'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.json({ message: 'File uploaded successfully', filePath: req.file.path });
});

router.post('/audio/analyze', (req, res) => {
    // Handle the audio analysis here
    res.send({ message: 'The API route /audio/analuze is working as intended.' });
});

router.post('/analyze', upload.single('audioFile'), analyzeAudio);

export default router;
