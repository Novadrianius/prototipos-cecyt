import express from 'express';
import path from 'node:path';
import dotenv from 'dotenv';

import taskRoutes from './Routes/tareas';

import { connectDB } from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'client')));

interface Tarea {
    id: number;
    titulo: string;
    completada: boolean;
}

const tareas: Tarea[] = [];
let siguienteId = 1;

app.use('/tareas', taskRoutes);

app.get('/', (_req, res) => {
    res.send('SSTIE API/Welcome!');
});

app.get('/api/tareas', (_req, res) => {
    res.json(tareas);
});

app.post('/api/tareas', (req, res) => {
    const { titulo } = req.body as { titulo: string };

    if (typeof titulo !== 'string' || titulo.trim() === '') {
        return res.status(400).json({ error: 'El título es obligatorio' });
    }

    const nuevaTarea: Tarea = {
        id: siguienteId++,
        titulo: titulo,
        completada: false,
    };
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Escuchando en http://localhost:${PORT}`);
    });
};

startServer();
