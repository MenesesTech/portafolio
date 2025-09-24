import { useState, useEffect } from "react";
export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  return { isDarkMode, toggleDarkMode };
}
