import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltLeft, FaTrophy } from "react-icons/fa";
import { getScoreboard } from "../utils/scoreboard";
import MainLayout from "../layouts/MainLayout";

const difficulties = [
  {
    key: "easy",
    label: "Easy",
    color: "var(--easy-mode)",
    border: "border-(--easy-mode)",
    ring: "hover:ring-(--easy-mode)",
  },
  {
    key: "medium",
    label: "Medium",
    color: "var(--medium-mode)",
    border: "border-(--medium-mode)",
    ring: "hover:ring-(--medium-mode)",
  },
  {
    key: "hard",
    label: "Hard",
    color: "var(--hard-mode)",
    border: "border-(--hard-mode)",
    ring: "hover:ring-(--hard-mode)",
  },
];

export default function Scoreboard() {
  const [board, setBoard] = useState({});

  useEffect(() => {
    setBoard(getScoreboard());
  }, []);

  return (
    <MainLayout>
      <div className="flex min-h-screen w-full items-center justify-center bg-(--bg-main) px-6 py-6">
        <div className="w-full max-w-220 rounded-3xl border border-(--border-color)/40 bg-(--bg-secondary) p-6">
          <div className="mb-6 flex items-center justify-between border-b border-(--border-color)/30 pb-5">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-lg border border-(--border-color)/30 bg-(--bg-main) px-4 py-2 text-(--text-muted)"
            >
              <FaLongArrowAltLeft className="text-sm" />
              <span className="text-sm">Back</span>
            </Link>

            <h1 className="text-sm font-bold tracking-[0.3rem] text-(--text-secondary)">
              SCOREBOARD
            </h1>

            <div className="w-20"></div>
          </div>

          <div className="mb-8 text-center">
            <h2 className="mb-2 text-4xl font-bold tracking-[0.3rem] text-(--text-primary)">
              BEST RUNS
            </h2>

            <p className="text-[11px] tracking-[0.2rem] text-(--text-secondary)">
              YOUR TOP SCORE AND FEWEST MOVES PER LEVEL
            </p>
          </div>

          <div className="flex items-stretch justify-center gap-6">
            {difficulties.map(({ key, label, color, border, ring }) => {
              const entry = board[key];

              return (
                <div
                  key={key}
                  className={`flex min-h-50 w-64 flex-col rounded-3xl border-t-4 ${border} ${ring} bg-(--level-card-bg) p-6 transition-all duration-300 hover:-translate-y-1 hover:ring-1 hover:ring-offset-1 hover:ring-offset-transparent`}
                >
                  <div className="mb-4 flex items-center justify-center gap-2">
                    <FaTrophy style={{ color }} />
                    <h2 className="text-xl font-bold text-(--heading-color)">
                      {label}
                    </h2>
                  </div>

                  {!entry ? (
                    <p className="mt-4 text-center text-[11px] tracking-[0.2rem] text-(--text-muted)">
                      NO SCORES YET
                    </p>
                  ) : (
                    <div className="flex flex-1 flex-col justify-center gap-3">
                      <div className="rounded-2xl border border-(--card-border) bg-(--bg-secondary) py-3 text-center">
                        <p className="text-2xl font-bold" style={{ color }}>
                          {entry.bestScore}
                        </p>
                        <p className="pt-1 text-[10px] tracking-[0.2em] text-(--text-muted)">
                          BEST SCORE
                        </p>
                      </div>

                      <div className="rounded-2xl border border-(--card-border) bg-(--bg-secondary) py-3 text-center">
                        <p className="text-2xl font-bold" style={{ color }}>
                          {entry.bestMoves}
                        </p>
                        <p className="pt-1 text-[10px] tracking-[0.2em] text-(--text-muted)">
                          FEWEST MOVES
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}