"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_path_1 = __importDefault(require("node:path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3000;
app.use(express_1.default.json());
app.use(express_1.default.static(node_path_1.default.join(__dirname, '..', 'client')));
const tareas = [];
let siguienteId = 1;
app.get('/tareas', (_req, res) => {
    res.sendFile(node_path_1.default.join(__dirname, '..', 'client', 'tareas', 'index.html'));
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
app.listen(PORT, () => {
    console.log('Escuchando en localhost:' + PORT);
});
//# sourceMappingURL=index.js.map