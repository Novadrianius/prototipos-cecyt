import express from 'express';

import { Server } from 'socket.io';
import { createServer } from 'node:http';

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado!');

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado!');
    });
});

const PORT = 3000;

app.use(express.json());

app.get('/', (_req, res) => {
    res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(PORT, () => {
    console.log(`Escuchando en http://localhost:${PORT}`);
});
