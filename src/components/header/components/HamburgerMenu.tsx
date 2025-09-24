import type { ReactElement } from "react";
import type { NavLink } from "../types/header.types";

interface HamburgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  navLinks: NavLink[];
  onNavClick: (href: string) => void;
}

export function HamburgerMenu({
  isOpen,
  onToggle,
  onClose,
  navLinks,
  onNavClick,
}: HamburgerMenuProps): ReactElement {
  return (
    <div className="hamburger-menu">
      <button className="hamburguer-menu-button" onClick={onToggle}>
        <i className="ri-menu-line"></i>
      </button>

      <div
        className={`hamburger-menu-content ${
          isOpen ? "active u--slideDown" : "u--slideUp"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={`mobile-${link.href}`}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              onNavClick(link.href);
              document
                .querySelector(link.href)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {link.label}
          </a>
        ))}

        <div className="close-menu" onClick={onClose}>
          <i className="ri-close-line"></i>
        </div>
      </div>
    </div>
  );
}
