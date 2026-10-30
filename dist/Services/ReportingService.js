"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveReport = exports.getReports = void 0;
const ReportModel_1 = __importDefault(require("../Models/ReportModel"));
const VerifyString_1 = require("../Modules/VerifyString");
// Obtener los reportes existentes dentro de la base de datos
const getReports = async (_req, res) => {
    try {
        const reportes = await ReportModel_1.default.find(); // Obtiene reportes guardados
        res.status(201).json(reportes); // Manda los reportes actuales en formato JSON al cliente
    }
    catch (err) {
        console.warn(`An error has ocurred: ${err}`);
    }
};
exports.getReports = getReports;
// Guardar un nuevo reporte dentro de la base de datos
const saveReport = async (req, res) => {
    const nuevoReporte = req.body; // Obtiene los datos ingresados por el cliente
    if (nuevoReporte) {
        const { titulo, alumno, grupo } = nuevoReporte;
        // Verificar que todos los campos estén completos
        if ((0, VerifyString_1.isEmpty)(titulo) || (0, VerifyString_1.isEmpty)(alumno) || (0, VerifyString_1.isEmpty)(grupo)) {
            console.warn('All fields must be completed!');
            return res.status(400).json({
                error: 'All fields must be completed!',
            });
        }
        try {
            // Insertar datos del reporte nuevo
            const report = new ReportModel_1.default({
                titulo,
                alumno,
                grupo,
            });
            const savedReport = await report.save(); // Se guarda reporte en la base de datos
            res.status(201).json(savedReport);
            console.log(`${titulo} (${alumno} - ${grupo})`);
        }
        catch (err) {
            console.warn(`An error has ocurred: ${err}`);
        }
    }
    else {
        console.warn('¡No se ha encontrado el reporte!');
    }
};
exports.saveReport = saveReport;
//# sourceMappingURL=ReportingService.js.map