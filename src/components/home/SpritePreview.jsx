import { useCallback, useEffect, useRef, useState } from "react";
import { getPokemon } from "../../services/pokeApi";
import { getRandomIds } from "../../utils/getRandomIds";
import Card from "../common/Card";
import GamePills from "../common/GamePills";
import SpritePreviewShimmer from "../shimmer/SpritePreviewShimmer";

export default function SpritePreview({ onSelect }) {
  const [pokemon, setPokemon] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  const isHoveredRef = useRef(false);
  const intervalRef = useRef(null);
  const isMountedRef = useRef(true);

  const loadPokemon = useCallback(async () => {
    const ids = getRandomIds(12);
    const data = await Promise.all(ids.map((id) => getPokemon(id)));
    if (isMountedRef.current) setPokemon(data);
  }, []);

  const runCycle = useCallback(async () => {
    if (isHoveredRef.current) return;

    setIsVisible(false);
    onSelect(null);

    setTimeout(async () => {
      if (!isMountedRef.current) return;
      await loadPokemon();
      if (isMountedRef.current) setIsVisible(true);
    }, 800);
  }, [loadPokemon, onSelect]);

  const startCycle = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(runCycle, 6000);
  }, [runCycle]);

  const stopCycle = useCallback(() => {
    clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    const initialLoad = async () => {
      await loadPokemon();
    };

    initialLoad();
    startCycle();

    return () => {
      isMountedRef.current = false;
      stopCycle();
    };
  }, [loadPokemon, startCycle, stopCycle]);

  useEffect(() => {
    const handleClickOutside = () => onSelect(null);
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onSelect]);

  if (pokemon.length === 0) {
    return <SpritePreviewShimmer />;
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden border-l border-(--border-color)/40 p-4">
      <div
        className={`grid flex-1 grid-cols-4 grid-rows-3 place-items-center gap-2.5 p-4 transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onMouseEnter={() => {
          isHoveredRef.current = true;
          stopCycle();
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          startCycle();
        }}
      >
        {pokemon.map((poke) => (
          <div
            key={poke.id}
            className="h-full w-full cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(poke);
            }}
          >
            <Card pokemon={poke} />
          </div>
        ))}
      </div>

      <div className="flex w-full flex-[0.3] items-center justify-center">
        <div className="mb-10 w-full">
          <GamePills easy medium hard />
        </div>
      </div>
      <div className="absolute right-0 bottom-8 left-0 flex items-center justify-center">
        <p className="text-[10px] tracking-widest text-(--text-muted)/50 uppercase">
          click card to preview
        </p>
      </div>
    </div>
  );
}
