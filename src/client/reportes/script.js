const reportingForm = document.getElementById('reporting_form');
const reportingField = document.getElementById('reporting_field');
const studentNameField = document.getElementById('student_name');
const studentGroupField = document.getElementById('student_group');

const crearReporte = async (reporte) => {
    try {
        // Ejecutar consulta POST hacia el servidor Express
        const respuesta = await fetch('/reportes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reporte),
        });

        if (!respuesta.ok) {
            throw new Error('¡No se puede registrar el reporte!');
        }

        const resultado = await respuesta.json();
        console.log(resultado.mensaje);
    } catch (err) {
        console.warn('Ha ocurrido un error: ' + err);
    }
};

reportingForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const report = reportingField.value;
    const studentName = studentNameField.value;
    const studentGroup = studentGroupField.value;

    if (report) {
        // Asegurar que los campos no estén vacíos
        if (
            report.trim() === '' ||
            studentName.trim() === '' ||
            studentGroup.trim() === ''
        ) {
            console.warn('¡Campos incompletos dentro del formulario!');
            return;
        }

        const reportData = {
            titulo: report,
            alumno: studentName,
            grupo: studentGroup,
        };

        // Empezar a registrar reporte de forma asíncrona
        crearReporte(reportData);

        // Reiniciar campos de texto (limpieza de formulario)
        reportingField.value = '';
        studentNameField.value = '';
        studentGroupField.value = '';
    } else {
        console.warn('¡Campos incompletos dentro del formulario!');
    }
});
