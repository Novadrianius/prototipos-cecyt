import express from 'express';
import path from 'node:path';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'client')));

interface Tarea {
    id: number;
    titulo: string;
    completada: boolean;
}

const tareas: Tarea[] = [];
let siguienteId = 1;

app.get('/tareas', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'tareas', 'index.html'));
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

app.listen(PORT, () => {
    console.log('Escuchando en localhost:' + PORT);
});
