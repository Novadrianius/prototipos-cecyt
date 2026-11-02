import express from 'express';
import path from 'node:path';
import dotenv from 'dotenv';
import taskRoutes from './Routes/tareas';
import rutaReportes from './Routes/reportes';
import rutaPresentacion from './Routes/presentacion';
import rutaRegistro from './Routes/registro';
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
app.use('/registro', rutaRegistro);
app.use('/presentacion', rutaPresentacion);

app.use('/client', express.static(path.join(__dirname, '../client')));
app.use(
    '/public-assets',
    express.static(path.join(__dirname, '../public-assets')),
);

app.use((_req, res) => {
    res.status(404).sendFile(
        path.join(__dirname, '../client/not-found/index.html'),
    );
});

// Llamar función que conecta base de datos
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Escuchando en http://localhost:${PORT}`);
    });
};

startServer();
