import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function ThemeToggle(props) {
  const { checked, onChange } = props;
  const { isLight } = useContext(ThemeContext);

  return (  
    <label className="relative inline-flex cursor-pointer">
      <input
        type="checkbox"
        className="peer hidden"
        checked={checked}
        onChange={onChange}
      />

      <div
        className={`h-6 w-12 rounded-full border transition-all ${
          isLight
            ? "peer-checked:bg-(--text-primary)"
            : "peer-checked:bg-(--gold-deep)"
        } border-(--text-muted) bg-(--bg-card) peer-checked:border-(--border-color)`}
      ></div>
      <div
        className={`${isLight ? "peer-checked:bg-(--text-secondary)" : ""} absolute top-1 left-1 h-4 w-4 rounded-full bg-(--text-secondary) transition-all peer-checked:translate-x-6`}
      ></div>
    </label>
  );
}
