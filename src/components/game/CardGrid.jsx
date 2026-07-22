import React, { useContext, useEffect, useMemo, useState } from "react";
import GameCard from "./GameCard";
import { getPokemon } from "../../services/pokeApi";
import { getRandomIds } from "../../utils/getRandomIds";
import { SettingContext } from "../../context/SettingContext";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function CardGrid({
  deck,
  setDeck,
  pairs,
  layout,
  setMoves,
  matchedPairs,
  setMatchedPairs,
  setTime,
  timeLimit,
  paused,
  started,
  setStarted,
  foundPairs,
  setFoundPairs,
  hintCount,
  setMissingPairs,
  difficulty,
}) {
  const [flippedCards, setFlippedCards] = useState([]);
  const [locked, setLocked] = useState(false);
  const [pausePokemon, setPausePokemon] = useState([]);
  const [hintCards, setHintCards] = useState([]);

  const [matchedCards, setMatchedCards] = useLocalStorage(
    `matchedCards-${difficulty}`,
    [],
  );

  const totalCards = pairs * 2;

  useEffect(() => {
    if (deck.length === totalCards) return;

    let isMounted = true;

    async function loadDeck() {
      const ids = getRandomIds(pairs);
      const pokemonList = await Promise.all(ids.map((id) => getPokemon(id)));

      if (!isMounted) return;

      const shuffledDeck = [...pokemonList, ...pokemonList]
        .map((pokemon, id) => ({
          id,
          value: pokemon.id,
          name: pokemon.name,
          image: pokemon.image,
        }))
        .sort(() => Math.random() - 0.5);

      setDeck(shuffledDeck);
    }

    loadDeck();

    return () => {
      isMounted = false;
    };
  }, [deck.length, pairs, setDeck, totalCards]);

  useEffect(() => {
    if (!started || paused || timeLimit === null || matchedPairs === pairs) {
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [started, paused, timeLimit, matchedPairs, pairs, setTime]);

  useEffect(() => {
    async function loadPausePokemon() {
      const psyDuck = await getPokemon(54);
      const slowPoke = await getPokemon(79);

      setPausePokemon([psyDuck, slowPoke]);
    }

    loadPausePokemon();
  }, []);

  function handleFlip(id) {
    if (
      paused ||
      locked ||
      matchedCards.includes(id) ||
      flippedCards.includes(id)
    ) {
      return;
    }

    if (!started) {
      setStarted(true);

      if (timeLimit !== null) {
        setTime(timeLimit);
      }
    }

    const nextFlipped = [...flippedCards, id];

    setFlippedCards(nextFlipped);

    if (nextFlipped.length !== 2) return;

    setLocked(true);

    setMoves((prev) => prev + 1);

    const first = deck.find((card) => card.id === nextFlipped[0]);

    const second = deck.find((card) => card.id === nextFlipped[1]);

    if (first.value === second.value) {
      const nextMatched = [...matchedCards, first.id, second.id];

      setMatchedCards(nextMatched);

      setMatchedPairs(nextMatched.length / 2);

      setFoundPairs((prev) => [...prev, first.value]);

      setFlippedCards([]);
      setLocked(false);

      return;
    }

    setTimeout(() => {
      setFlippedCards([]);
      setLocked(false);
    }, 800);
  }

  const availableHints = useMemo(() => {
    const groups = [];

    deck.forEach((card) => {
      const existing = groups.find((group) => group[0].value === card.value);

      existing ? existing.push(card) : groups.push([card]);
    });

    return groups.filter(
      ([first, second]) =>
        !matchedCards.includes(first.id) && !matchedCards.includes(second.id),
    );
  }, [deck, matchedCards]);

  useEffect(() => {
    if (!hintCount) return;

    const hintPair = availableHints[0];

    if (!hintPair) return;

    setHintCards(hintPair.map((card) => card.id));

    const timer = setTimeout(() => {
      setHintCards([]);
    }, 1200);

    return () => clearTimeout(timer);
  }, [hintCount]);

  useEffect(() => {
    const missingPairs = [
      ...new Set(
        deck
          .filter((card) => !foundPairs.includes(card.value))
          .map((card) => card.value),
      ),
    ];

    setMissingPairs(missingPairs);
  }, [deck, foundPairs, setMissingPairs]);

  if (deck.length !== totalCards) {
    return (
      <div className="mb-4 flex flex-col items-center gap-2">
        {layout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((_, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className="h-24 w-18" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  let cardIndex = 0;

  return (
    <div className="relative mb-4 flex flex-col items-center gap-2">
      {layout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {row.map((cell, colIndex) => {
            if (!cell) {
              return (
                <div key={`${rowIndex}-${colIndex}`} className="h-24 w-18" />
              );
            }

            const card = deck[cardIndex++];

            return (
              <GameCard
                key={card.id}
                id={card.id}
                value={card.value}
                image={card.image}
                name={card.name}
                isHint={hintCards.includes(card.id)}
                isFlipped={
                  flippedCards.includes(card.id) ||
                  matchedCards.includes(card.id)
                }
                onFlip={() => handleFlip(card.id)}
              />
            );
          })}
        </div>
      ))}

     {paused && (
  <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl border border-white/20 bg-(--bg-secondary)/30 shadow-2xl backdrop-blur-2xl backdrop-saturate-150">
    <div className="flex items-center gap-6">
      {pausePokemon[0] && (
        <img
          src={pausePokemon[0].image}
          alt={pausePokemon[0].name}
          className="h-20 w-20 scale-150 object-contain drop-shadow-lg"
          draggable={false}
        />
      )}

      <p className="text-sm tracking-[0.3em] text-(--text-secondary)">
        PAUSED
      </p>

      {pausePokemon[1] && (
        <img
          src={pausePokemon[1].image}
          alt={pausePokemon[1].name}
          className="h-20 w-20 scale-150 object-contain drop-shadow-lg"
          draggable={false}
        />
      )}
    </div>
  </div>
)}
    </div>
  );
}
