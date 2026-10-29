import { Schema, model } from 'mongoose';
import { IReport } from '../Types/Report';

const reportSchema = new Schema<IReport>({
    titulo: { type: String, required: true, trim: true },
    alumno: { type: String, required: true },
    grupo: { type: String, required: true },
});

const Report = model<IReport>('Reporte', reportSchema);

export default Report;
