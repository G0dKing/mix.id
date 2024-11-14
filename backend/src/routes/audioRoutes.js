import express from 'express';
import upload from '../middleware/upload.js';
import { analyzeAudio } from '../controllers/audioController.js';

const router = express.Router();

// Upload Endpoint
router.post('/api/audio/upload', upload.single('audioFile'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.json({ message: 'File uploaded successfully', filePath: req.file.path });
});

// Analysis Endpoint
router.post('/api/audio/analyze', upload.single('audioFile'), analyzeAudio);

// Health check
router.get('/test', (req, res) => {
    res.send({ message: 'The API route /api/audio/test is working as intended.' });
});

export default router;
