import { useState, useEffect } from "react";

// Custom hook para manejar el estado de un menú móvil
const useMobileMenu = () => {
  // Estado que indica si el menú está abierto (true) o cerrado (false)
  // useState<boolean>(false) → valor inicial: cerrado
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Efecto que se ejecuta cada vez que cambia `isMobileMenuOpen`
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Si el menú está abierto, bloqueamos el scroll del body
      document.body.style.overflow = "hidden";
    } else {
      // Si el menú está cerrado, permitimos el scroll normal
      document.body.style.overflow = "";
    }

    // Cleanup: al desmontar el componente, restauramos el scroll
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]); // Dependencia: se ejecuta cuando cambia isMobileMenuOpen

  // Función para abrir el menú
  const openMobileMenu = () => setIsMobileMenuOpen(true);

  // Función para cerrar el menú
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Función para alternar el estado (si está abierto lo cierra, si está cerrado lo abre)
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Retornamos el estado y las funciones para que puedan usarse en un componente
  return {
    isMobileMenuOpen,
    openMobileMenu,
    closeMobileMenu,
    toggleMobileMenu,
  };
};
