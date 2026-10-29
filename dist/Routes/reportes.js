"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const node_path_1 = __importDefault(require("node:path"));
const VerifyString_1 = require("../Modules/VerifyString");
const ReportModel_1 = __importDefault(require("../Models/ReportModel"));
const router = (0, express_1.Router)();
router.use(express_1.default.json());
router.get('/', async (_req, res) => {
    const reportes = await ReportModel_1.default.find();
    res.status(201).json(reportes);
});
router.get('/view', (_req, res) => {
    res.sendFile(node_path_1.default.join(__dirname, '..', 'client', 'reportes', 'index.html'));
});
router.post('/', async (req, res) => {
    // Lógica de integración de API a MongoDB
    const nuevoReporte = req.body;
    const { titulo, alumno, grupo } = nuevoReporte;
    if (nuevoReporte) {
        if ((0, VerifyString_1.isEmpty)(nuevoReporte.alumno) ||
            (0, VerifyString_1.isEmpty)(nuevoReporte.grupo) ||
            (0, VerifyString_1.isEmpty)(nuevoReporte.titulo)) {
            return res.status(400).json({
                error: '¡Todos los campos son obligatorios!',
            });
        }
        const report = new ReportModel_1.default({
            titulo,
            alumno,
            grupo,
        });
        const savedReport = await report.save();
        res.status(201).json(savedReport);
        console.log(`${nuevoReporte.titulo} (de ${nuevoReporte.alumno} - ${nuevoReporte.grupo})`);
    }
    else {
        console.log('¡No se ha encontrado el nuevo reporte!');
    }
});
exports.default = router;
//# sourceMappingURL=reportes.js.map