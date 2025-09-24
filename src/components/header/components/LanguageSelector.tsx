import type { ReactElement } from "react";

interface LanguageSelectorProps {
  selectedLanguage: "es" | "en";
  onLanguageChange: (language: "es" | "en") => void;
}

export function LanguageSelector({
  selectedLanguage,
  onLanguageChange,
}: LanguageSelectorProps): ReactElement {
  return (
    <>
      <button
        className={`flags__item ${selectedLanguage === "es" ? "active" : ""}`}
        onClick={() => onLanguageChange("es")}
      >
        <img src="../../../public/icon-spain.png" alt="Español" />
        <span className="tooltip">Español</span>
      </button>
      <button
        className={`flags__item ${selectedLanguage === "en" ? "active" : ""}`}
        onClick={() => onLanguageChange("en")}
      >
        <img src="../../../public/icon-en.png" alt="Inglés" />
        <span className="tooltip">English</span>
      </button>
    </>
  );
}
