import React from "react";
import GamePills from "./GamePills";
import PlayButton from "./PlayButton";

export default function DifficultyCard({
  easy,
  medium,
  hard,
  icon,
  alt,
  level,
  shape,
  cards,
  pairs,
  time,
}) {
  const modeColor = easy
    ? "var(--easy-mode)"
    : medium
      ? "var(--medium-mode)"
      : "var(--hard-mode)";

  const borderColor = easy
    ? "border-(--easy-mode)"
    : medium
      ? "border-(--medium-mode)"
      : "border-(--hard-mode)";

  const ringColor = easy
    ? "hover:ring-(--easy-mode)"
    : medium
      ? "hover:ring-(--medium-mode)"
      : "hover:ring-(--hard-mode)";

  const glowColor = easy
    ? "rgba(76, 165, 90, 0.45)"
    : medium
      ? "rgba(244, 162, 97, 0.45)"
      : "rgba(224, 82, 82, 0.45)";

  return (
    <div
      style={{ "--glow-color": glowColor }}
      className={`flex min-h-50 w-64 flex-col rounded-3xl border-t-4 ${borderColor} ${ringColor} bg-(--level-card-bg) p-4 transition-all duration-300 hover:-translate-y-1 hover:ring-1 hover:ring-offset-1 hover:ring-offset-transparent hover:shadow-[0_4px_16px_var(--glow-color)]`}
    >
      <div>
        <GamePills easy={easy} medium={medium} hard={hard} />
      </div>

      <div className="mb-2 flex h-28 items-center justify-center">
        <img src={icon} alt={alt} className="h-full w-full object-contain" />
      </div>

      <h2 className="mb-2 text-center text-xl font-bold text-(--heading-color)">
        {level}
      </h2>

      <p className="mb-3 text-center text-[10px] tracking-[0.2rem] text-(--text-muted)">
        {shape}
      </p>

      <div className="mb-6 flex w-full justify-center gap-3">
        <div className="flex flex-1 flex-col items-center rounded-2xl border border-(--card-border) bg-(--bg-secondary) py-1 text-center">
          <span className="text-[12px] font-bold" style={{ color: modeColor }}>
            {cards}
          </span>
          <span className="text-[8px] tracking-[0.2em] text-(--text-muted)">
            CARDS
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center rounded-2xl border border-(--card-border) bg-(--bg-secondary) py-1 text-center">
          <span className="text-[12px] font-bold" style={{ color: modeColor }}>
            {pairs}
          </span>
          <span className="text-[8px] tracking-[0.2em] text-(--text-muted)">
            PAIRS
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center rounded-2xl border border-(--card-border) bg-(--bg-secondary) py-1 text-center">
          <span className="text-[12px] font-bold" style={{ color: modeColor }}>
            {time}
          </span>
          <span className="text-[8px] tracking-[0.2em] text-(--text-muted)">
            TIME
          </span>
        </div>
      </div>

      <div className="mt-auto">
        <PlayButton easy={easy} medium={medium} hard={hard} />
      </div>
    </div>
  );
}