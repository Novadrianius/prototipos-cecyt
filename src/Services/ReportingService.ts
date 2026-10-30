import { Request, Response } from 'express';
import reportModel from '../Models/ReportModel';
import { Report } from '../Types/Report';
import { isEmpty } from '../Modules/VerifyString';

// Obtener los reportes existentes dentro de la base de datos
export const getReports = async (_req: Request, res: Response) => {
    try {
        const reportes = await reportModel.find(); // Obtiene reportes guardados
        res.status(201).json(reportes); // Manda los reportes actuales en formato JSON al cliente
    } catch (err) {
        console.warn(`An error has ocurred: ${err}`);
    }
};

// Guardar un nuevo reporte dentro de la base de datos
export const saveReport = async (req: Request, res: Response) => {
    const nuevoReporte = req.body as Report; // Obtiene los datos ingresados por el cliente

    if (nuevoReporte) {
        const { titulo, alumno, grupo } = nuevoReporte;

        // Verificar que todos los campos estén completos
        if (isEmpty(titulo) || isEmpty(alumno) || isEmpty(grupo)) {
            console.warn('All fields must be completed!');
            return res.status(400).json({
                error: 'All fields must be completed!',
            });
        }

        try {
            // Insertar datos del reporte nuevo
            const report = new reportModel({
                titulo,
                alumno,
                grupo,
            });

            const savedReport = await report.save(); // Se guarda reporte en la base de datos

            res.status(201).json(savedReport);
            console.log(`${titulo} (${alumno} - ${grupo})`);
        } catch (err) {
            console.warn(`An error has ocurred: ${err}`);
        }
    } else {
        console.warn('¡No se ha encontrado el reporte!');
    }
};
