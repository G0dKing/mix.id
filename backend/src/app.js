// /backend/src/app.js

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import audioRoutes from './routes/audioRoutes.js';
import { Server } from 'socket.io';
import winston from 'winston';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 7000;
const HOST = process.env.HOST || "0.0.0.0";

const logger = winston.createLogger({
    level: 'info',
    transports: [new winston.transports.File({ filename: 'logs/combined.log' })]
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/audio', audioRoutes);

app.get('/', (req, res) => res.send('The Mix.ID backend server is LIVE!'));

const server = app.listen(PORT, HOST, () => logger.info(`Running: http://${HOST}:${PORT}`));
const io = new Server(server);

io.on('connection', (socket) => logger.info('Client connected for progress updates'));

export const emitProgress = (progress) => io.emit('progress', progress);

export default app;
