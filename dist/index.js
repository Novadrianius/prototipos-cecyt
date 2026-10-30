"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_path_1 = __importDefault(require("node:path"));
const dotenv_1 = __importDefault(require("dotenv"));
const tareas_1 = __importDefault(require("./Routes/tareas"));
const reportes_1 = __importDefault(require("./Routes/reportes"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.send('SSTIE API/Welcome!');
});
// Conectar rutas
app.use('/tareas', tareas_1.default);
app.use('/reportes', reportes_1.default);
app.use('/tareas', tareas_1.default);
app.use(express_1.default.static(node_path_1.default.join(__dirname, 'client')));
// Llamar función que conecta base de datos
const startServer = async () => {
    await (0, db_1.connectDB)();
    app.listen(PORT, () => {
        console.log(`Escuchando en http://localhost:${PORT}`);
    });
};
startServer();
//# sourceMappingURL=index.js.map