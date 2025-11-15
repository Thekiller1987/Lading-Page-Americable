document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializa la librería de animaciones
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
    });
    
    // --- URL DEL SCRIPT DE GOOGLE ---
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyr1ke7O6kdS10eZR9nIutgH45Jj875o0u5bObxRwzQb3Y8AuGycUw6ZU6onv8rkPu6/exec"; 

    // --- Expresiones Regulares para Validación ---
    const soloLetras = /^[a-zA-Z\s]+$/; // Solo letras y espacios
    const soloOchoNumeros = /^\d{8}$/; // Exactamente 8 dígitos numéricos

    
    // --- MANEJADOR PARA EL FORMULARIO DE CONTACTO ---
    const contactForm = document.getElementById("contact-form");
    
    if (contactForm) {
        const formMessage = document.getElementById("form-message");
        const submitButton = document.getElementById("submit-button");
        const nombreInput = document.getElementById("nombre");
        const telefonoInput = document.getElementById("telefono");

        contactForm.addEventListener("submit", function(e) {
            e.preventDefault(); // Siempre prevenimos el envío primero

            // --- VALIDACIÓN DE CAMPOS ---
            const nombre = nombreInput.value.trim();
            const telefono = telefonoInput.value.trim();
            
            formMessage.textContent = "";
            formMessage.className = "";

            if (!soloLetras.test(nombre)) {
                formMessage.textContent = "Error: El nombre solo debe contener letras y espacios.";
                formMessage.classList.add("error");
                return; // Detiene la ejecución si el nombre es inválido
            }

            if (!soloOchoNumeros.test(telefono)) {
                formMessage.textContent = "Error: El teléfono debe tener 8 dígitos (solo números).";
                formMessage.classList.add("error");
                return; // Detiene la ejecución si el teléfono es inválido
            }
            // --- FIN DE VALIDACIÓN ---


            // Si la validación pasa, continuamos con el envío
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
            
            const formData = new FormData(contactForm);

            fetch(SCRIPT_URL, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.result === "success") {
                    formMessage.textContent = "¡Mensaje enviado con éxito! Te contactaremos pronto.";
                    formMessage.classList.add("success");
                    contactForm.reset();
                } else {
                    throw new Error(data.message || "Ocurrió un error.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                formMessage.textContent = "Error al enviar el mensaje. Inténtalo de nuevo.";
                formMessage.classList.add("error");
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Enviar Mensaje';
            });
        });
    }

    
    // --- MANEJADOR PARA EL FORMULARIO DE REPORTE ---
    const reportForm = document.getElementById("report-form");

    if (reportForm) {
        const formMessageReport = document.getElementById("form-message-report");
        const submitButtonReport = document.getElementById("submit-button-report");
        const nombreReportInput = document.getElementById("nombre"); 
        const telefonoReportInput = document.getElementById("telefono");

        reportForm.addEventListener("submit", function(e) {
            e.preventDefault(); // Siempre prevenimos el envío primero

            // --- VALIDACIÓN DE CAMPOS ---
            const nombre = nombreReportInput.value.trim();
            const telefono = telefonoReportInput.value.trim();

            formMessageReport.textContent = "";
            formMessageReport.className = "";

            if (!soloLetras.test(nombre)) {
                formMessageReport.textContent = "Error: El nombre solo debe contener letras y espacios.";
                formMessageReport.classList.add("error");
                return; // Detiene la ejecución si el nombre es inválido
            }

            if (!soloOchoNumeros.test(telefono)) {
                formMessageReport.textContent = "Error: El teléfono debe tener 8 dígitos (solo números).";
                formMessageReport.classList.add("error");
                return; // Detiene la ejecución si el teléfono es inválido
            }
            // --- FIN DE VALIDACIÓN ---

            // Si la validación pasa, continuamos con el envío
            submitButtonReport.disabled = true;
            submitButtonReport.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';

            const formData = new FormData(reportForm);

            fetch(SCRIPT_URL, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.result === "success") {
                    formMessageReport.textContent = "¡Reporte enviado con éxito! Nuestro equipo técnico lo revisará.";
                    formMessageReport.classList.add("success");
                    reportForm.reset();
                } else {
                    throw new Error(data.message || "Ocurrió un error.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                formMessageReport.textContent = "Error al enviar el reporte. Inténtalo de nuevo.";
                formMessageReport.classList.add("error");
            })
            .finally(() => {
                submitButtonReport.disabled = false;
                submitButtonReport.innerHTML = 'Enviar Reporte';
            });
        });
    }
});