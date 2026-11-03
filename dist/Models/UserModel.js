"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true, // Crea un índice único en la base de datos MongoDB (bloquea el registro si se repite el correo)
        lowercase: true,
        trim: true,
    },
    password: { type: String, required: true, select: false },
}, { timestamps: true });
exports.userModel = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=UserModel.js.map