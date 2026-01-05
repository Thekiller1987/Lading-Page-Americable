document.addEventListener('DOMContentLoaded', () => {

    // Función genérica para manejar envíos
    const handleFormSubmit = async (formId, apiEndpoint, submitBtnId, successMsg) => {
        const form = document.getElementById(formId);
        const msgDiv = document.getElementById(formId === 'contact-form' ? 'form-message' : 'form-message-report');

        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = document.getElementById(submitBtnId);
            const originalBtnText = btn.textContent;
            btn.disabled = true;
            btn.textContent = 'Enviando...';
            msgDiv.innerHTML = '';

            try {
                // Capturar datos automáticamente del formulario
                const formData = new FormData(form);
                const payload = Object.fromEntries(formData.entries());

                // Enviar al Backend
                const response = await fetch(apiEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) throw new Error("Error en la respuesta del servidor");

                // Éxito
                msgDiv.innerHTML = `
                    <div class="alert alert-success shadow-sm rounded-3">
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
                    <div class="alert alert-danger shadow-sm rounded-3">
                        <i class="bi bi-exclamation-triangle-fill me-2"></i>
                        Hubo un problema al conectar con el servidor. Intenta de nuevo.
                    </div>
                `;
            } finally {
                btn.disabled = false;
                btn.textContent = originalBtnText;
            }
        });
    };

    // Inicializar manejadores para ambos formularios
    handleFormSubmit(
        'contact-form',
        '/api/contacto',
        'submit-button',
        '¡Mensaje enviado! Te contactaremos pronto.'
    );

    handleFormSubmit(
        'report-form',
        '/api/averias',
        'submit-button-report',
        'Reporte registrado. Nuestro equipo técnico lo revisará.'
    );
});
