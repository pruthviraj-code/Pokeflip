import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import GameCard from "../components/game/GameCard";
import { clearGameStorage } from "../utils/clearGameStorage";
import { getPokemon } from "../services/pokeApi";

export default function GameOver() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [pokemonMap, setPokemonMap] = useState({});

  useEffect(() => {
    if (!state) return;

    const ids = [
      ...new Set([...(state.foundPairs || []), ...(state.missingPairs || [])]),
    ];

    if (ids.length === 0) return;

    let isMounted = true;

    async function loadPokemon() {
      const results = await Promise.all(ids.map((id) => getPokemon(id)));

      if (!isMounted) return;

      const map = {};
      results.forEach((pokemon) => {
        if (pokemon) map[pokemon.id] = pokemon;
      });

      setPokemonMap(map);
    }

    loadPokemon();

    return () => {
      isMounted = false;
    };
  }, [state]);

  if (!state) {
    return <Navigate to="/" replace />;
  }

  function handlePreviousLevel() {
    clearGameStorage(state.difficulty);

    if (state.difficulty === "medium") {
      navigate("/game/easy");
    } else if (state.difficulty === "hard") {
      navigate("/game/medium");
    } else {
      navigate("/");
    }
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-center p-10">
        <div className="flex w-full max-w-220 flex-col items-center justify-center rounded-2xl border border-t-4 border-(--border-color)/40 border-t-(--hard-mode) bg-(--bg-main) p-8">
          <p className="text-xl font-extrabold tracking-widest text-(--hard-mode)">
            ✦ TIME'S UP ! ✦
          </p>

          <h1 className="flex flex-col items-center pt-2 text-6xl font-bold text-(--hard-mode)">
            <span>GAME</span>
            <span>OVER</span>
          </h1>

          <div className="pt-3 text-2xl tracking-widest text-(--hard-mode)">
            SO CLOSE - TRY AGAIN!
          </div>

          <hr className="mt-6 h-px w-full border-0 bg-(--hard-mode)" />

          <div className="grid w-full grid-cols-5 gap-4 pt-8">
            <div className="rounded-xl border border-(--border-color)/40 bg-(--bg-secondary) p-5 text-center">
              <p className="text-2xl text-(--hard-mode)">{state?.score}</p>
              <p className="pt-1 text-[12px] tracking-widest text-(--text-secondary)">
                SCORE
              </p>
            </div>

            <div className="rounded-xl border border-(--border-color)/40 bg-(--bg-secondary) p-5 text-center">
              <p className="text-2xl text-(--hard-mode)">{state.moves}</p>

              <p className="pt-1 text-[12px] tracking-widest text-(--text-secondary)">
                MOVES
              </p>
            </div>

            <div className="rounded-xl border border-(--border-color)/40 bg-(--bg-secondary) p-5 text-center">
              <p className="text-2xl text-(--hard-mode)">
                {state.time === 0
                  ? "0:00"
                  : `${Math.floor(state.time / 60)}:${String(
                      state.time % 60,
                    ).padStart(2, "0")}`}
              </p>

              <p className="pt-1 text-[12px] tracking-widest text-(--text-secondary)">
                TIME
              </p>
            </div>

            <div className="rounded-xl border border-(--border-color)/40 bg-(--bg-secondary) p-5 text-center">
              <p className="text-2xl text-(--hard-mode)">
                {state.matchedPairs} / {state.pairs}
              </p>

              <p className="pt-1 text-[12px] tracking-widest text-(--text-secondary)">
                PAIRS
              </p>
            </div>

            <div className="rounded-xl border border-(--border-color)/40 bg-(--bg-secondary) p-5 text-center">
              <p className="text-2xl text-(--hard-mode)">{state.hintCount}</p>

              <p className="pt-1 text-[12px] tracking-widest text-(--text-secondary)">
                HINT
              </p>
            </div>
          </div>

          <p className="pt-8 text-xl tracking-wide text-(--text-secondary)">
            CAUGHT POKÉMON
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {state?.foundPairs?.map((id, index) => (
              <GameCard
                key={`found-${index}`}
                value={id}
                image={pokemonMap[id]?.image}
                name={pokemonMap[id]?.name}
                isFlipped
              />
            ))}
          </div>

          <p className="pt-8 text-xl tracking-wide text-(--text-secondary)">
            ESCAPED POKÉMON
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {state?.missingPairs?.map((id, index) => (
              <GameCard
                key={`missing-${index}`}
                value={id}
                image={pokemonMap[id]?.image}
                name={pokemonMap[id]?.name}
                isFlipped
              />
            ))}
          </div>

          <div className="mt-10 flex w-full gap-6">
            <Link
              to="/"
              className="flex flex-1 items-center justify-center rounded-xl border border-(--border-color)/40 bg-(--bg-main) py-4 tracking-widest text-(--text-secondary)"
            >
              ▣ HOME
            </Link>

            <Link
              onClick={() => clearGameStorage(state.difficulty)}
              to={`/game/${state.difficulty}`}
              className="flex flex-1 items-center justify-center rounded-xl border border-(--border-color)/40 bg-(--bg-main) py-4 tracking-widest text-(--text-secondary)"
            >
              ↺ Retry
            </Link>

            {(state.difficulty === "easy" || state.difficulty === "medium") && (
              <button
                onClick={handlePreviousLevel}
                className="flex flex-1 cursor-pointer items-center justify-center rounded-xl border border-(--border-color)/40 bg-(--bg-main) py-4 tracking-widest text-(--text-secondary)"
              >
                ↓ Easier
              </button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
