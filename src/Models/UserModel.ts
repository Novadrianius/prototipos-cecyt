import { Schema, model } from 'mongoose';
import { IUsuario } from '../Types/Usuario';

const userSchema = new Schema<IUsuario>(
    {
        nombre: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true, // Crea un índice único en la base de datos MongoDB (bloquea el registro si se repite el correo)
            lowercase: true,
            trim: true,
        },
        password: { type: String, required: true, select: false },
    },
    { timestamps: true }, // Agrega la fecha en la que se hizo el registro y la fecha en que se actualizó el registro
);

const userModel = model<IUsuario>('User', userSchema);

export default userModel;
