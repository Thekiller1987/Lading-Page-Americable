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
        // Mobile Menu Interaction - App-like feel
        const navbarToggler = document.querySelector('.navbar-toggler');
        const body = document.body;

        if (navbarToggler) {
            navbarToggler.addEventListener('click', function () {
                // Toggle de clase para evitar scroll cuando el menú está abierto
                // Usamos un pequeño timeout para sincronizar con la animación de Bootstrap
                setTimeout(() => {
                    if (!document.querySelector('.navbar-collapse').classList.contains('show')) {
                        body.style.overflow = 'hidden';
                    } else {
                        body.style.overflow = '';
                    }
                }, 100);
            });
        }

        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) { // Solo en móvil
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    // Bootstrap 5 instance
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                        body.style.overflow = '';
                    }
                }
            });
        });

    });
});