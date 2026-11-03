import express, { Router } from 'express';
import path from 'node:path';
import { registrarUsuario, obtenerUsuarios } from '../Services/RegisterService';

const router = Router();

router.use(express.json());

router.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../client/registro/index.html'));
});

router.get('/api', (_req, res) => {
    obtenerUsuarios(res);
});

router.post('/api', registrarUsuario);

export default router;
