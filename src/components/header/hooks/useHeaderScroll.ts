import { useState, useEffect } from "react";

const useHeaderScroll = () => {
  // Estado: guarda si el usuario hizo scroll o no
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Definimos la función que se ejecuta en cada scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Registramos el listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup: quitamos el listener al desmontar el componente
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // [] = solo se ejecuta una vez al montar

  // Retornamos el estado para que el componente lo use
  return isScrolled;
};
