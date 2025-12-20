document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const msgDiv = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Deshabilitar botón para evitar doble envío
            const btn = document.getElementById('submit-button');
            const originalBtnText = btn.textContent;
            btn.disabled = true;
            btn.textContent = 'Enviando...';
            msgDiv.innerHTML = '';

            try {
                const nombre = document.getElementById('nombre').value.trim();
                const telefono = document.getElementById('telefono').value.trim();
                const direccion = document.getElementById('direccion').value.trim();
                const mensaje = document.getElementById('mensaje').value.trim();

                // Validación básica
                if (!nombre || !telefono || !direccion) {
                    throw new Error("Por favor completa los campos requeridos.");
                }

                // Guardar en Firestore ('leads' collection)
                await window.db.collection('leads').add({
                    name: nombre,
                    phone: telefono,
                    address: direccion,
                    notes: mensaje,
                    status: 'Pendiente', // Estado inicial para el CRM
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    origin: 'Landing Page'
                });

                // Éxito
                msgDiv.innerHTML = `
                    <div class="alert alert-success shadow-sm rounded-3">
                        <i class="bi bi-check-circle-fill me-2"></i>
                        ¡Gracias! Tu mensaje ha sido recibido. Te contactaremos pronto.
                    </div>
                `;
                contactForm.reset();

            } catch (error) {
                console.error("Error al enviar formulario:", error);
                msgDiv.innerHTML = `
                    <div class="alert alert-danger shadow-sm rounded-3">
                        <i class="bi bi-exclamation-triangle-fill me-2"></i>
                        Hubo un error al enviar. Por favor intenta escribiéndonos al WhatsApp.
                    </div>
                `;
            } finally {
                btn.disabled = false;
                btn.textContent = originalBtnText;
            }
        });
    }
});
