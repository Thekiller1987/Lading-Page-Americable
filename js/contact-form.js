document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const msgDiv = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = document.getElementById('submit-button');
            const originalBtnText = btn.textContent;
            btn.disabled = true;
            btn.textContent = 'Enviando...';
            msgDiv.innerHTML = '';

            try {
                // Captura de datos según tus formularios de las imágenes
                const payload = {
                    nombre: document.getElementById('nombre').value.trim(),
                    telefono: document.getElementById('telefono').value.trim(),
                    direccion: document.getElementById('direccion').value.trim(),
                    mensaje: document.getElementById('mensaje').value.trim()
                };

                // Enviamos a tu Droplet (ajusta la URL si es necesario)
                const response = await fetch('/api/contacto', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) throw new Error("Error en la respuesta del servidor");

                // Éxito
                msgDiv.innerHTML = `
                    <div class="alert alert-success shadow-sm rounded-3">
                        <i class="bi bi-check-circle-fill me-2"></i>
                        ¡Gracias! Info guardada en el sistema CRM.
                    </div>
                `;
                contactForm.reset();

            } catch (error) {
                console.error("Error:", error);
                msgDiv.innerHTML = `
                    <div class="alert alert-danger">
                        Error al conectar con el servidor de Americable.
                    </div>
                `;
            } finally {
                btn.disabled = false;
                btn.textContent = originalBtnText;
            }
        });
    }
});