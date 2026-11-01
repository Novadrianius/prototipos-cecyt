// Obtener inputs del formulario
const taskForm = document.getElementById('task_form');
const taskField = document.getElementById('task_field');

const sendTask = async (titulo) => {
    if (typeof titulo !== 'string') {
        console.warn('El campo "titulo" debe ser del tipo string.');
        return;
    }

    if (titulo.trim() === '') {
        console.warn('El título de la tarea no puede estar vacío.');
        return;
    }

    const tarea = {
        titulo: titulo,
    };

    try {
        const response = await fetch('/tareas/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tarea),
        });

        if (!response.ok) {
            throw new Error(
                '¡No se pudo crear y añadir nueva tarea a la lista!',
            );
        }

        const resultado = await response.json();
        console.log(resultado);
    } catch (err) {
        console.warn(`Ha ocurrido un error: ${err}`);
    }
};

taskForm.addEventListener('submit', (evt) => {
    evt.preventDefault(); // Evitar recarga de la página al mandar datos del formulario

    const task = taskField.value;

    // Evaluaciones de seguridad
    if (typeof task !== 'string') {
        console.warn('Task field must be a string!');
        return;
    }

    if (task) {
        if (task.trim() === '') {
            // Rechazamos si el usuario ha ingresado únicamente espacios en blanco
            console.warn('Task can not be empty!');
            return;
        }

        sendTask(task);

        console.log(`${task} sent to server!`);
        taskField.value = ''; // Reiniciar campo de texto
    } else {
        console.warn('Task can not be empty!');
    }
});
