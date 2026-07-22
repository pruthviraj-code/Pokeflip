import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GameHeader from "../components/game/GameHeader";
import CardGrid from "../components/game/CardGrid";
import GameFooter from "../components/game/GameFooter";
import { SettingContext } from "../context/SettingContext";
import { clearGameStorage } from "../utils/clearGameStorage";
import { updateScoreboard } from "../utils/scoreboard";
import useLocalStorage from "../hooks/useLocalStorage";

const levels = {
  easy: {
    pairs: 11,
    timeLimit: null,
    layout: [
      [0, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 0, 0],
    ],
  },

  medium: {
    pairs: 17,
    timeLimit: 120,
    layout: [
      [1, 1, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 0, 0, 1, 1],
    ],
  },

  hard: {
    pairs: 22,
    timeLimit: 180,
    layout: [
      [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
    ],
  },
};

export default function Game() {
  const { difficulty } = useParams();
  const navigate = useNavigate();

  const { timerEnabled, hintLimit } = useContext(SettingContext);

  const [deck, setDeck] = useLocalStorage(`deck-${difficulty}`, []);
  const [moves, setMoves] = useLocalStorage(`moves-${difficulty}`, 0);
  const [matchedPairs, setMatchedPairs] = useLocalStorage(
    `matchedPairs-${difficulty}`,
    0,
  );
  const [foundPairs, setFoundPairs] = useLocalStorage(
    `foundPairs-${difficulty}`,
    [],
  );
  const [hintCount, setHintCount] = useLocalStorage(
    `hintCount-${difficulty}`,
    0,
  );
  const [time, setTime] = useLocalStorage(`time-${difficulty}`, 0);
  const [started, setStarted] = useLocalStorage(`started-${difficulty}`, false);

  const [paused, setPaused] = useState(false);
  const [missingPairs, setMissingPairs] = useState([]);

  const config = levels[difficulty] || levels.easy;

  const gameWin = matchedPairs === config.pairs;

  const actualTimeLimit = timerEnabled ? null : config.timeLimit;

  const score = {
    lose: Math.max(
      0,
      matchedPairs * 80 -
        hintCount * 100 -
        Math.max(0, moves - matchedPairs) * 10,
    ),

    win: Math.max(
      100,
      1500 - (moves - config.pairs) * 10 - hintCount * 150 + time * 4,
    ),
  };

  const gameState = useMemo(
    () => ({
      moves,
      time,
      matchedPairs,
      difficulty,
      pairs: config.pairs,
      foundPairs,
      missingPairs,
      hintCount,
      score: gameWin ? score.win : score.lose,
    }),
    [
      moves,
      time,
      matchedPairs,
      difficulty,
      config.pairs,
      foundPairs,
      missingPairs,
      hintCount,
      gameWin,
      score,
    ],
  );

  useEffect(() => {
    if (!started || gameWin || actualTimeLimit === null || time > 0) return;

    clearGameStorage(difficulty);

    navigate("/game-over", {
      state: gameState,
    });
  }, [started, gameWin, time, actualTimeLimit, gameState, navigate, difficulty]);

  useEffect(() => {
    if (!gameWin) return;

    const timer = setTimeout(() => {
      updateScoreboard(difficulty, {
        score: gameState.score,
        moves: gameState.moves,
      });

      clearGameStorage(difficulty);

      navigate("/game-win", {
        state: gameState,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [gameWin, gameState, navigate, difficulty]);

  function handleHint() {
    if (hintLimit !== null && hintCount >= hintLimit) return;

    setHintCount((prev) => prev + 1);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-(--bg-main) p-1">
      <div className="relative w-full max-w-220 overflow-hidden rounded-3xl border border-(--border-color) bg-(--bg-secondary)">
        <div className="p-6">
          <GameHeader
            difficulty={difficulty}
            moves={moves}
            matchedPairs={matchedPairs}
            totalPairs={config.pairs}
            time={time}
          />

          <div className="mb-4 h-px bg-(--border-color)/50" />

          <CardGrid
            deck={deck}
            setDeck={setDeck}
            pairs={config.pairs}
            layout={config.layout}
            setMoves={setMoves}
            matchedPairs={matchedPairs}
            setMatchedPairs={setMatchedPairs}
            setTime={setTime}
            timeLimit={actualTimeLimit}
            paused={paused}
            started={started}
            setStarted={setStarted}
            foundPairs={foundPairs}
            setFoundPairs={setFoundPairs}
            hintCount={hintCount}
            setMissingPairs={setMissingPairs}
            difficulty={difficulty}
          />

          <GameFooter
            matchedPairs={matchedPairs}
            totalPairs={config.pairs}
            difficulty={difficulty}
            paused={paused}
            setPaused={setPaused}
            onHint={handleHint}
            hintDisabled={hintLimit !== null && hintCount >= hintLimit}
          />
        </div>
      </div>
    </div>
  );
}