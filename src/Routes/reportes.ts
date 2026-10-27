import express, { Router } from 'express';

const router = Router();

router.use(express.json());

router.get('/', (_req, res) => {
    res.send('SSTIE reportes');
});

export default router;
