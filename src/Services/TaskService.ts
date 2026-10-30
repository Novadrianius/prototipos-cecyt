import { Tarea } from '../Types/Task';
import { Request, Response } from 'express';

const tareas: Tarea[] = [];
let idTarea = 0;

export const getTask = (res: Response) => {
    res.send(tareas);
};

export const addTask = (req: Request, res: Response) => {
    const tarea = req.body as { titulo: string };

    if (tarea) {
        idTarea++;
        const nuevaTarea: Tarea = {
            titulo: tarea.titulo,
            idTarea: idTarea,
            completada: false,
        };

        tareas.push(nuevaTarea);
    } else {
        console.warn('Tarea no encontrada o con fallas.');
        res.status(401).send({
            error: 'Tarea sin instrucciones.',
        });
    }
};
