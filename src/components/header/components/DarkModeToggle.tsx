import type { ReactElement } from "react";

interface DarkModeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export function DarkModeToggle({
  isDarkMode,
  onToggle,
}: DarkModeToggleProps): ReactElement {
  return (
    <button className="flags__item" onClick={onToggle}>
      <div
        className={`dark-mode-toggle-container ${isDarkMode ? "active" : ""}`}
      >
        <div className="toggle-thumb">
          <i className={isDarkMode ? "ri-moon-line" : "ri-sun-line"}></i>
        </div>
      </div>
    </button>
  );
}
