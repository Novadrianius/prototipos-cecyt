"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_path_1 = __importDefault(require("node:path"));
const dotenv_1 = __importDefault(require("dotenv"));
const tareas_1 = __importDefault(require("./Routes/tareas"));
const db_1 = require("./db");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3000;
app.use(express_1.default.json());
app.use(express_1.default.static(node_path_1.default.join(__dirname, 'client')));
const tareas = [];
let siguienteId = 1;
app.use('/tareas', tareas_1.default);
app.get('/', (_req, res) => {
    res.send('SSTIE API/Welcome!');
});
app.get('/api/tareas', (_req, res) => {
    res.json(tareas);
});
app.post('/api/tareas', (req, res) => {
    const { titulo } = req.body;
    if (typeof titulo !== 'string' || titulo.trim() === '') {
        return res.status(400).json({ error: 'El título es obligatorio' });
    }
    const nuevaTarea = {
        id: siguienteId++,
        titulo: titulo,
        completada: false,
    };
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});
const startServer = async () => {
    await (0, db_1.connectDB)();
    app.listen(PORT, () => {
        console.log(`Escuchando en http://localhost:${PORT}`);
    });
};
startServer();
//# sourceMappingURL=index.js.map