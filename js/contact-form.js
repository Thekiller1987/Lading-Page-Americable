document.addEventListener('DOMContentLoaded', () => {

    // Función genérica para manejar envíos a tu Droplet
    const handleFormSubmit = async (formId, apiEndpoint, submitBtnId, successMsg) => {
        const form = document.getElementById(formId);
        // Busca el div de mensaje dependiendo del formulario
        const msgDiv = document.getElementById(formId === 'contact-form' ? 'form-message' : 'form-message-report');

        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = document.getElementById(submitBtnId);
            const originalBtnText = btn.textContent;

            // UI: Deshabilitar botón
            btn.disabled = true;
            btn.textContent = 'Enviando...';
            msgDiv.innerHTML = '';

            try {
                // Capturar datos automáticamente del formulario usando los "name" del HTML
                const formData = new FormData(form);
                const payload = Object.fromEntries(formData.entries());

                // ENVIAR A TU DROPLET (Puerto 5002)
                const response = await fetch(`http://142.93.85.240:5002${apiEndpoint}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) throw new Error("Error en la respuesta del servidor");

                // Éxito: Mostrar alerta
                msgDiv.innerHTML = `
                    <div class="alert alert-success shadow-sm rounded-3" style="color: #155724; background-color: #d4edda; border-color: #c3e6cb; padding: 15px; margin-top: 10px;">
                        <i class="bi bi-check-circle-fill me-2"></i>
                        ${successMsg}
                    </div>
                `;
                form.reset();

                // Ocultar mensaje después de 5 seg
                setTimeout(() => {
                    msgDiv.innerHTML = '';
                }, 5000);

            } catch (error) {
                console.error("Error:", error);
                msgDiv.innerHTML = `
                    <div class="alert alert-danger shadow-sm rounded-3" style="color: #721c24; background-color: #f8d7da; border-color: #f5c6cb; padding: 15px; margin-top: 10px;">
                        <i class="bi bi-exclamation-triangle-fill me-2"></i>
                        No se pudo conectar con el servidor. Por favor, intenta por WhatsApp.
                    </div>
                `;
            } finally {
                btn.disabled = false;
                btn.textContent = originalBtnText;
            }
        });
    };

    // --- INICIALIZACIÓN ---

    // 1. Formulario de Contacto
    handleFormSubmit(
        'contact-form',          // ID del <form> en HTML
        '/api/contacto',         // Ruta del backend
        'submit-button',         // ID del <button>
        '¡Mensaje enviado! Te contactaremos pronto.'
    );

    // 2. Formulario de Averías
    handleFormSubmit(
        'report-form',           // ID del <form> en HTML
        '/api/averias',          // Ruta del backend
        'submit-button-report',  // ID del <button>
        'Reporte registrado. Nuestro equipo técnico lo revisará.'
    );
});