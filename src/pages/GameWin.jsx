import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import GameCard from "../components/game/GameCard";
import { clearGameStorage } from "../utils/clearGameStorage";
import { getPokemon } from "../services/pokeApi";

export default function GameWin() {
  const { state } = useLocation();

  const navigate = useNavigate();

  const [pokemonMap, setPokemonMap] = useState({});

  useEffect(() => {
    if (!state) return;

    const ids = [...new Set(state.foundPairs || [])];

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

  function handleNextLevel() {
    clearGameStorage(state.difficulty);

    if (state.difficulty === "easy") {
      navigate("/game/medium");
    } else if (state.difficulty === "medium") {
      navigate("/game/hard");
    } else {
      navigate("/");
    }
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-center p-10">
        <div className="flex w-full max-w-220 flex-col items-center justify-center rounded-2xl border border-t-4 border-(--border-color)/40 border-t-(--gold-deep) bg-(--bg-main) p-8">
          <p className="animate-text-glow text-xl font-extrabold text-(--gold-primary)">
            ✦ YOU WON ! ✦
          </p>

          <h1 className="animate-text-glow pt-2 text-6xl font-bold text-(--gold-primary)">
            AMAZING!
          </h1>

          <div className="animate-text-glow pt-3 text-5xl text-(--gold-primary)">
            ★ ★ ★
          </div>

          <hr className="mt-6 h-px w-full border-0 bg-(--gold-primary)" />

          <div className="grid w-full grid-cols-5 gap-4 pt-8">
            <div className="rounded-xl border border-(--border-color)/40 bg-(--bg-secondary) p-5 text-center">
              <p className="text-2xl text-(--gold-primary)">{state.score}</p>

              <p className="pt-1 text-[12px] tracking-widest text-(--text-secondary)">
                SCORE
              </p>
            </div>

            <div className="rounded-xl border border-(--border-color)/40 bg-(--bg-secondary) p-5 text-center">
              <p className="text-2xl text-(--gold-primary)">{state.moves}</p>

              <p className="pt-1 text-[12px] tracking-widest text-(--text-secondary)">
                MOVES
              </p>
            </div>

            <div className="rounded-xl border border-(--border-color)/40 bg-(--bg-secondary) p-5 text-center">
              <p className="text-2xl text-(--gold-primary)">
                {state.time === 0
                  ? "∞"
                  : `${Math.floor(state.time / 60)}:${String(
                      state.time % 60,
                    ).padStart(2, "0")}`}
              </p>

              <p className="pt-1 text-[12px] tracking-widest text-(--text-secondary)">
                TIME
              </p>
            </div>

            <div className="rounded-xl border border-(--border-color)/40 bg-(--bg-secondary) p-5 text-center">
              <p className="text-2xl text-(--gold-primary)">
                {state.matchedPairs} / {state.pairs}
              </p>

              <p className="pt-1 text-[12px] tracking-widest text-(--text-secondary)">
                PAIRS
              </p>
            </div>

            <div className="rounded-xl border border-(--border-color)/40 bg-(--bg-secondary) p-5 text-center">
              <p className="text-2xl text-(--gold-primary)">
                {state.hintCount}
              </p>

              <p className="pt-1 text-[12px] tracking-widest text-(--text-secondary)">
                HINTS
              </p>
            </div>
          </div>

        <p className="pt-8 text-xl tracking-wide text-(--text-secondary)">
  CAUGHT POKÉMON
</p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {state.foundPairs.map((id, index) => (
              <GameCard
                key={`found-${index}`}
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
              ▶ PLAY AGAIN
            </Link>

            {(state.difficulty === "easy" || state.difficulty === "medium") && (
              <button
                onClick={handleNextLevel}
                className="flex-1 cursor-pointer rounded-xl bg-(image:--gold-gradient) py-4 font-bold tracking-widest text-black shadow-lg shadow-yellow-400/40"
              >
                ⏭ NEXT LEVEL
              </button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}