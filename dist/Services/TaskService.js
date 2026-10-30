"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTask = exports.getTask = void 0;
const tareas = [];
let idTarea = 0;
const getTask = (res) => {
    res.send(tareas);
};
exports.getTask = getTask;
const addTask = (req, res) => {
    const tarea = req.body;
    if (tarea) {
        idTarea++;
        const nuevaTarea = {
            titulo: tarea.titulo,
            idTarea: idTarea,
            completada: false,
        };
        tareas.push(nuevaTarea);
    }
    else {
        console.warn('Tarea no encontrada o con fallas.');
        res.status(401).send({
            error: 'Tarea sin instrucciones.',
        });
    }
};
exports.addTask = addTask;
//# sourceMappingURL=TaskService.js.map