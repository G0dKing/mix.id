// /backend/src/controllers/audioController.js

import { PythonShell } from 'python-shell';
import axios from 'axios';
import path from 'path';

export const analyzeAudio = (req, res) => {
    const filePath = req.file.path;
    const options = { mode: 'text', pythonOptions: ['-u'], args: [filePath] };

    PythonShell.run(path.resolve('python/process_audio.py'), options, async (err, results) => {
        if (err) return res.status(500).json({ error: 'Error processing audio file' });

        const segments = JSON.parse(results[0]);
        const identifiedTracks = [];
        for (const segment of segments) {
            try {
                const response = await axios.get('https://musicbrainz.org/ws/2/recording/', {
                    params: { query: `track:${segment.timestamp}`, fmt: 'json' },
                    headers: { 'Accept': 'application/json', 'User-Agent': 'MIXID/1.0 (contact@example.com)' }
                });
                const track = response.data.recordings[0];
                identifiedTracks.push({
                    title: track.title,
                    artist: track['artist-credit'][0].artist.name,
                    timestamp: segment.timestamp
                });
            } catch (apiErr) {
                console.error('MusicBrainz API error:', apiErr.message);
            }
        }
        res.json({ message: 'Audio analyzed', tracks: identifiedTracks });
    });
};
