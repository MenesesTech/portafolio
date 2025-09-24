import { useState, useEffect } from "react";

type Language = "es" | "en";

export function useLanguage() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("es");
  // Cargar el idioma almacenado en el localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      "appLanguage"
    ) as Language | null;
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  // Guardar el idioma en el localstorage cuando cambie
  useEffect(() => {
    localStorage.setItem("appLanguage", selectedLanguage);
  }, [selectedLanguage]);

  // Funcion para cambiar el idioma
  const changeLanguage = (lang: Language) => {
    setSelectedLanguage(lang);
  };
  return { selectedLanguage, changeLanguage };
}
