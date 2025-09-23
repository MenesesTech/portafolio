import { useState, useEffect } from "react";

// Definimos la interfaz para los enlaces de navegación.
// Cada enlace tiene un href (selector CSS, ej: "#home") y una etiqueta visible.
interface NavLink {
  href: string;
  label: string;
}

// Custom hook que gestiona qué sección de la página está activa
const useActiveSection = (navLinks: NavLink[]) => {
  // Estado que guarda el ID de la sección actualmente activa
  // "home" es el valor inicial por defecto
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    // Obtenemos los elementos del DOM correspondientes a cada navLink.href
    // (ejemplo: document.querySelector("#about"))
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean) as Element[]; // eliminamos posibles null

    // Si no hay secciones en la página, salimos
    if (sections.length === 0) return;

    // Creamos un IntersectionObserver que detecta qué sección está visible en el viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Si la sección está entrando en la vista
          if (entry.isIntersecting) {
            const id = entry.target.id; // obtenemos su id
            setActiveLink(id); // y lo guardamos como sección activa
          }
        });
      },
      {
        root: null, // null = viewport del navegador
        rootMargin: "-20% 0px -50% 0px", // margenes para ajustar cuándo se considera "activa"
        threshold: 0, // con que un píxel entre en vista, ya dispara
      }
    );

    // Observamos cada sección detectada
    sections.forEach((section) => observer.observe(section));

    // Verificamos manualmente si alguna sección está inicialmente en el viewport
    const initialSection = sections.find((section) => {
      const rect = section.getBoundingClientRect();
      return (
        rect.top <= window.innerHeight * 0.5 && // parte superior visible
        rect.bottom >= window.innerHeight * 0.5 // parte inferior visible
      );
    });

    // Si encontramos una sección inicial visible, la marcamos como activa
    if (initialSection) {
      setActiveLink(initialSection.id);
    }

    // Cleanup: desconectamos el observer al desmontar el componente
    return () => observer.disconnect();
  }, [navLinks]); // Se ejecuta cada vez que cambien los enlaces de navegación

  // Retornamos el estado y su setter para que el componente que use este hook pueda accederlo
  return { activeLink, setActiveLink };
};
