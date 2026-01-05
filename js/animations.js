document.addEventListener('DOMContentLoaded', function () {

    // Inicializa la librería de animaciones
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
    });

    // Validar si estamos en una página con Scroll Suave específico (opcional)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});