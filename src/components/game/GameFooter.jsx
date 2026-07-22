import React from "react";
import { FaPause, FaPlay } from "react-icons/fa6";

export default function GameFooter({
  matchedPairs,
  totalPairs,
  difficulty,
  paused,
  setPaused,
  onHint,
  hintDisabled,
}) {
  const progress = (matchedPairs / totalPairs) * 100;

  const levelColor = {
    easy: "bg-(--easy-mode)",
    medium: "bg-(--medium-mode)",
    hard: "bg-(--hard-mode)",
  };

  return (
    <div className="flex items-center justify-between border-t border-(--border-color) pt-4">
      <button
        onClick={() => setPaused((prev) => !prev)}
        className="flex items-center justify-center gap-2 rounded-lg border border-(--border-color) px-4 py-2 text-(--text-secondary)"
      >
        {paused ? <FaPlay /> : <FaPause />}
        {paused ? "RESUME" : "PAUSE"}
      </button>

      <div className="flex-1 px-6">
        <p className="mb-2 text-xs text-(--text-secondary)">
          PROGRESS {matchedPairs}/{totalPairs}
        </p>

        <div className="h-2 rounded-full bg-(--border-color)">
          <div
            className={`h-full rounded-full ${levelColor[difficulty]}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <button
        onClick={onHint}
        disabled={hintDisabled}
        className={`rounded-lg border border-(--border-color) px-4 py-2 transition
          ${
            hintDisabled
              ? "cursor-not-allowed opacity-50 line-through  "
              : "cursor-pointer text-(--text-secondary) hover:border-(--gold-primary)"
          }`}
      >
        💡 HINT
      </button>
    </div>
  );
}