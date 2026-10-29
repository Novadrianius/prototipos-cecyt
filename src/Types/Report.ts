import { Document } from 'mongoose';

export interface Report {
    titulo: string;
    alumno: string;
    grupo: string;
}

export interface IReport extends Report, Document {}
