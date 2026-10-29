import express, { Router } from 'express';
import path from 'node:path';
import { isEmpty } from '../Modules/VerifyString';
import { Report } from '../Types/Report';
import reportModel from '../Models/ReportModel';

const router = Router();

router.use(express.json());

router.get('/', async (_req, res) => {
    const reportes = await reportModel.find();
    res.status(201).json(reportes);
});

router.get('/view', (_req, res) => {
    res.sendFile(
        path.join(__dirname, '..', 'client', 'reportes', 'index.html'),
    );
});

router.post('/', async (req, res) => {
    // Lógica de integración de API a MongoDB
    const nuevoReporte = req.body as Report;
    const { titulo, alumno, grupo } = nuevoReporte;

    if (nuevoReporte) {
        if (
            isEmpty(nuevoReporte.alumno) ||
            isEmpty(nuevoReporte.grupo) ||
            isEmpty(nuevoReporte.titulo)
        ) {
            return res.status(400).json({
                error: '¡Todos los campos son obligatorios!',
            });
        }

        const report = new reportModel({
            titulo,
            alumno,
            grupo,
        });

        const savedReport = await report.save();

        res.status(201).json(savedReport);

        console.log(
            `${nuevoReporte.titulo} (de ${nuevoReporte.alumno} - ${nuevoReporte.grupo})`,
        );
    } else {
        console.log('¡No se ha encontrado el nuevo reporte!');
    }
});

export default router;
