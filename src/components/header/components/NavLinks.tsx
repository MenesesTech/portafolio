import type { ReactElement } from "react";
import type { NavLink } from "../types/header.types";

interface NavLinksProps {
  navLinks: NavLink[];
  activeLink: string;
  onNavClick: (href: string) => void;
  className?: string;
}

export function NavLinks({
  navLinks,
  activeLink,
  onNavClick,
  className = "nav-menu",
}: NavLinksProps): ReactElement {
  return (
    <nav className={className}>
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={`nav-link ${
            activeLink === link.href.substring(1) ? "active-link" : ""
          }`}
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
    </nav>
  );
}
