import express, { Router } from 'express';
import path from 'node:path';

const router = Router();

router.use(express.json());

router.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../client/registro/index.html'));
});

export default router;
