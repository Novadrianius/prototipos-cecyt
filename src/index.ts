import express from 'express';
import path from 'node:path';
import dotenv from 'dotenv';
import taskRoutes from './Routes/tareas';
import rutaReportes from './Routes/reportes';
import { connectDB } from './db';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('SSTIE API/Welcome!');
});

// Conectar rutas
app.use('/tareas', taskRoutes);
app.use('/reportes', rutaReportes);
app.use('/tareas', taskRoutes);

app.use(express.static(path.join(__dirname, 'client')));

// Llamar función que conecta base de datos
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Escuchando en http://localhost:${PORT}`);
    });
};

startServer();
