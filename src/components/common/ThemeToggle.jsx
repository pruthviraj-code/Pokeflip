import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { isLight, toggleTheme } = useContext(ThemeContext);
  return (
    <label className="relative inline-flex cursor-pointer">
      <input
        type="checkbox"
        checked={!isLight}
        onChange={toggleTheme}
        className="peer hidden"
      />

      <div className="bg-(color:(--bg-card)) h-6 w-12 rounded-full border border-(--text-muted) transition-all peer-checked:border-(--gold-primary) peer-checked:bg-(--gold-deep)"></div>
      <div className="absolute top-1 left-1 h-4 w-4 rounded-full bg-(--text-secondary) transition-all peer-checked:translate-x-6"></div>
    </label>
  );
}
