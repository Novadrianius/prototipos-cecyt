import express, { Router } from 'express';
import path from 'node:path';

const router = Router();

router.use(express.json());
router.use(express.static(path.join(__dirname, 'client')));

router.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'tareas', 'index.html'));
});

export default router;
