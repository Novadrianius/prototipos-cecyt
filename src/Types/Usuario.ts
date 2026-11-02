import { Document } from 'mongoose';

export interface Usuario {
    nombre: string;
    email: string;
    password: string;
}

export interface IUsuario extends Usuario, Document {}
