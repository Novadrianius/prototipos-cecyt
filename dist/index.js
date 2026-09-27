"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const node_http_1 = require("node:http");
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(server);
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado!');
    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado!');
    });
});
const PORT = 3000;
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.sendFile(process.cwd() + '/client/index.html');
});
server.listen(PORT, () => {
    console.log(`Escuchando en http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map