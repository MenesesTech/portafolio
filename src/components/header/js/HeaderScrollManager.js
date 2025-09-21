class HeaderScrollManager {
    constructor() {
        // Elementos del DOM
        this.header = document.querySelector('.header');
        this.hamburgerButton = document.querySelector('.hamburguer-menu-button');
        this.hamburgerMenuContent = document.querySelector('.hamburger-menu-content');
        this.hamburgerCloseButton = document.querySelector('.close-menu');
    }

    // Nombre del método: highlightActiveLink (todo minúsculas en "light")
    highlightActiveLink() {
        // Obtener todos los enlaces de navegación
        const navLinks = Array.from(document.querySelectorAll('.nav-link'));
        if (navLinks.length === 0) return;
        // Mapa de secciones
        const sectionMap = {};
        navLinks.forEach(link => {
            const id = (link.getAttribute('href') || '').substring(1);
            if (id) sectionMap[id] = link;
        });
        // Intersection Observer que detecta la sección visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Cuando una seccion entra a la seccion activa
                    // - quitar clase 'active-link' a todos los enlaces
                    navLinks.forEach(link => link.classList.remove('active-link'));
                    // - añadir 'active-link' al link correspondiente a la sección visible
                    const id = sectionMap[entry.target.id];
                    if (id) id.classList.add('active-link');
                }
            });
        }, {
            root: null,  // null = viewport (la ventana del navegador)
            rootMargin: '-20% 0px -50% 0px', // zona vertical "ajustada" para la activación
            threshold: 0 // se activa cuando cualquier parte de la sección entra en la zona
        });

        // Observar cada sección
        Object.keys(sectionMap).forEach(id => {
            observer.observe(document.getElementById(id));
        });

        // comprueba si alguna sección ya está centrada al cargar
        const initial = navLinks.find(link => {
            const id = (link.getAttribute('href') || '').substring(1);
            const sec = document.getElementById(id);
            if (!sec) return false;
            const rect = sec.getBoundingClientRect();
            // comprobamos si el centro de la ventana está dentro de la sección
            return rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5;
        });

        if (initial) {
            initial.classList.add('active-link');
        } else if (sectionMap['home']) {
            // fallback: si no hay ninguna centrada, marcar "home"
            sectionMap['home'].classList.add('active-link');
        }

    }

    addClassOnScroll() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) this.header.classList.add('abajo');
            else this.header.classList.remove('abajo');
        });
    }

    addClassActiveToHamburgerMenu() {
        if (!this.hamburgerButton || !this.hamburgerMenuContent) return;
        this.hamburgerButton.addEventListener('click', () => {
            this.hamburgerMenuContent.classList.add('active');
            this.hamburgerMenuContent.classList.remove('u--slideUp');
            this.hamburgerMenuContent.classList.add('u--slideDown');
            this.header.style.background = 'var(--color-background)';
            document.body.style.overflow = 'hidden';
        });
    }

    closeHamburgerMenu() {
        if (!this.hamburgerCloseButton || !this.hamburgerMenuContent) return;
        this.hamburgerCloseButton.addEventListener('click', () => {
            this.hamburgerMenuContent.classList.remove('u--slideDown');
            this.hamburgerMenuContent.classList.add('u--slideUp');

            // Esperar a que termine la animación para quitar la clase
            this.hamburgerMenuContent.addEventListener('animationend', () => {
                this.hamburgerMenuContent.classList.remove('active', 'u--slideUp');
                document.body.style.overflow = ''; // Habilita scroll cuando el menú está cerrado
            }, { once: true });
        });
    }
}

// Instancia y arranque (espera DOM)
document.addEventListener('DOMContentLoaded', () => {
    const HeaderManager = new HeaderScrollManager();
    HeaderManager.addClassOnScroll();
    HeaderManager.addClassActiveToHamburgerMenu();
    HeaderManager.closeHamburgerMenu();
    HeaderManager.highlightActiveLink();
});
