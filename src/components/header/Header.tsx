import "./css/header.css";
import "../../styles/animation-css/slide.css";

import { DarkModeToggle } from "./components/DarkModeToggle";
import { useDarkMode } from "./hooks/useDarkMode";
import { LanguageSelector } from "./components/LanguageSelector";
import { useLanguage } from "./hooks/useLanguage";
import { HamburgerMenu } from "./components/HamburgerMenu";
import { useMobileMenu } from "./hooks/useMobileMenu";
import { NavLinks } from "./components/NavLinks";
import type { NavLink } from "./types/header.types";
import { useActiveSection } from "./hooks/useActiveSection";

export function Header() {
  const navLinks: NavLink[] = [
    { href: "#home", label: "Inicio" },
    { href: "#sobreMi", label: "Sobre Mí" },
    { href: "#habilidades", label: "Habilidades" },
    { href: "#informacion", label: "Información" },
    { href: "#proyectos", label: "Proyectos" },
    { href: "#contacto", label: "Contacto" },
  ];

  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { selectedLanguage, changeLanguage } = useLanguage();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } =
    useMobileMenu();
  const { activeLink, setActiveLink } = useActiveSection(navLinks);

  const handleNavClick = (href: string) => {
    const id = href.substring(1);
    setActiveLink(id);
    if (isMobileMenuOpen) {
      closeMobileMenu();
    }
  };
  return (
    <header className="header">
      {/* logo */}
      <div className="header-left logo">
        <span className="header-logo-text">meneses</span>
        <span className="header-logo-subtext">.dev</span>
      </div>

      {/* <!-- Navegación --> */}
      <div className="header-medium">
        <NavLinks
          navLinks={navLinks}
          activeLink={activeLink}
          onNavClick={handleNavClick}
        />
      </div>

      <div className="header-right-container">
        {/* <!-- Idiomas + Dark mode --> */}
        <div className="header-right">
          <div className="flags">
            <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={changeLanguage}
            />
          </div>
        </div>

        {/* <!-- Menú hamburguesa --> */}
        <HamburgerMenu
          isOpen={isMobileMenuOpen}
          onToggle={toggleMobileMenu}
          onClose={closeMobileMenu}
          navLinks={navLinks}
          onNavClick={handleNavClick}
        />
      </div>
    </header>
  );
}
