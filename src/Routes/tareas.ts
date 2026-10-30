import express, { Router } from 'express';
import path from 'node:path';
import { getTask, addTask } from '../Services/TaskService';

const router = Router();

router.use(express.json());

router.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'tareas', 'index.html'));
});

router.get('/api', (_req, res) => {
    getTask(res);
});

router.post('/api', addTask);

router.use(express.static(path.join(__dirname, 'client')));

export default router;
