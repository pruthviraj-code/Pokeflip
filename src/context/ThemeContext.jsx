import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [isLight, setIsLight] = useLocalStorage("theme", false);

  function toggleTheme() {
    setIsLight((prev) => !prev);
  }

  return (
    <ThemeContext.Provider
      value={{
        isLight,
        setIsLight,
        toggleTheme,
      }}
    >
      <div className={isLight ? "theme-light" : ""}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}