// Obtener inputs del formulario
const taskForm = document.getElementById('task_form');
const taskField = document.getElementById('task_field');

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

        console.log(`${task} sent to server!`);
        taskField.value = ''; // Reiniciar campo de texto
    } else {
        console.warn('Task can not be empty!');
    }
});
