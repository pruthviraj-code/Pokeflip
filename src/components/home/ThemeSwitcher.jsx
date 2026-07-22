import { FaSun, FaMoon } from "react-icons/fa";
import ThemeToggle from "../common/ThemeToggle";

export default function ThemeSwitcher() {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="flex items-center gap-2 text-(--text-secondary)">
        <FaSun />
        Light
      </span>

      <ThemeToggle />

      <span className="flex items-center gap-2 text-(--text-secondary)">
        Dark
        <FaMoon />
      </span>
    </div>
  );
}
