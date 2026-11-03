import bcrypt from 'bcrypt';
import { z } from 'zod';
import { Request, Response } from 'express';
import { userModel } from '../Models/UserModel';

// Añadimos los filtros de seguridad correspondientes de cada dato
const registroSchema = z.object({
    nombre: z.string().trim().min(2).max(100),
    email: z.email().trim().toLowerCase(),
    password: z.string().min(8).max(20),
});

export const obtenerUsuarios = async (res: Response) => {
    try {
        const usuarios = await userModel.find();
        res.status(201).json(usuarios);
    } catch (err) {
        console.warn(`Ha ocurrido un error: ${err}`);
        res.status(500).json({
            error: 'Error interno del servidor al obtener los usuarios',
        });
    }
};

export const registrarUsuario = async (req: Request, res: Response) => {
    // Verificar que los campos (datos) coincidan con lo que debería llegar
    const resultado = registroSchema.safeParse(req.body);
    if (!resultado.success) {
        return res.status(400).json({
            errores: resultado.error.cause,
        });
    }

    const { nombre, email, password } = resultado.data; // Obtener datos verificados

    try {
        const hash = await bcrypt.hash(password, 12);

        // Creamos un nuevo usuario para guardar en la base de datos
        const usuario = await userModel.create({
            nombre,
            email,
            password: hash,
        });

        return res.status(201).json({
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
        });
    } catch (err: any) {
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
