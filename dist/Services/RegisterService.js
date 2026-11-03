"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarUsuario = exports.obtenerUsuarios = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const UserModel_1 = require("../Models/UserModel");
// Añadimos los filtros de seguridad correspondientes de cada dato
const registroSchema = zod_1.z.object({
    nombre: zod_1.z.string().trim().min(2).max(100),
    email: zod_1.z.email().trim().toLowerCase(),
    password: zod_1.z.string().min(8).max(20),
});
const obtenerUsuarios = async (res) => {
    try {
        const usuarios = await UserModel_1.userModel.find();
        res.status(201).json(usuarios);
    }
    catch (err) {
        console.warn(`Ha ocurrido un error: ${err}`);
        res.status(500).json({
            error: 'Error interno del servidor al obtener los usuarios',
        });
    }
};
exports.obtenerUsuarios = obtenerUsuarios;
const registrarUsuario = async (req, res) => {
    // Verificar que los campos (datos) coincidan con lo que debería llegar
    const resultado = registroSchema.safeParse(req.body);
    if (!resultado.success) {
        return res.status(400).json({
            errores: resultado.error.cause,
        });
    }
    const { nombre, email, password } = resultado.data; // Obtener datos verificados
    try {
        const hash = await bcrypt_1.default.hash(password, 12);
        // Creamos un nuevo usuario para guardar en la base de datos
        const usuario = await UserModel_1.userModel.create({
            nombre,
            email,
            password: hash,
        });
        return res.status(201).json({
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
        });
    }
    catch (err) {
        // Código 11000: MongoDB rechazó el registro porque un dato se repetía
        if (err.code === 11000) {
            return res
                .status(409)
                .json({ error: 'Este correo ya está registrado' });
        }
        console.warn(err);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.registrarUsuario = registrarUsuario;
//# sourceMappingURL=RegisterService.js.map