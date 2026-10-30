import express, { Router } from 'express';
import path from 'node:path';
import { saveReport, getReports } from '../Services/ReportingService';

const router = Router();

router.use(express.json());

router.get('/', getReports);

router.get('/view', (_req, res) => {
    // Mandar página visual al cliente
    res.sendFile(
        path.join(__dirname, '..', 'client', 'reportes', 'index.html'),
    );
});

router.post('/', saveReport);

export default router;
