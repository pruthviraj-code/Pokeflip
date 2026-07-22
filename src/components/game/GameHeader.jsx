import React from "react";
import { Link } from "react-router-dom";
import GamePills from "../common/GamePills";
import { FaLongArrowAltLeft } from "react-icons/fa";

export default function GameHeader({
  difficulty,
  moves = 0,
  time = "0:00",
  matchedPairs = 0,
  totalPairs = 0,
}) {
  const levelColor = {
    easy: "text-(--easy-mode)",
    medium: "text-(--medium-mode)",
    hard: "text-(--hard-mode)",
  };
  return (
    <div className="mb-2 grid grid-cols-3 items-center">
      <div className="flex w-50 items-center">
        <Link
          to="/select-level"
          className="flex gap-2 rounded-lg border border-(--border-color) px-2 py-2 text-[10px] tracking-[0.2rem] text-(--text-muted)"
        >
          <FaLongArrowAltLeft />
          EXIT
        </Link>

        <GamePills
          easy={difficulty === "easy"}
          medium={difficulty === "medium"}
          hard={difficulty === "hard"}
        />
      </div>

      <p className="text-center text-[12px] tracking-[0.4rem] text-(--text-secondary)">
        POKÉFLIP
      </p>

      <div className="flex justify-end gap-3">
        <div
          className={`flex h-12 w-20 flex-col items-center justify-center rounded-xl border border-(--border-color) bg-(--bg-option) ${levelColor[difficulty]}`}
        >
          {time === 0
            ? "∞"
            : `${Math.floor(time / 60)} :${String(time % 60).padStart(2, "0")}`}
          <p className="text-[10px] text-(--text-muted)">TIME</p>
        </div>

        <div className="flex h-12 w-20 flex-col items-center justify-center rounded-xl border border-(--border-color)">
          <p className="text-[14px] text-(--text-primary)">{moves}</p>
          <p className="text-[10px] text-(--text-muted)">MOVES</p>
        </div>

        <div className="flex h-12 w-20 flex-col items-center justify-center rounded-xl border border-(--border-color)">
          <p className="text-[14px] tracking-widest text-(--text-primary)">
            {matchedPairs}/{totalPairs}
          </p>
          <p className="text-[10px] text-(--text-muted)">PAIRS</p>
        </div>
      </div>
    </div>
  );
}
