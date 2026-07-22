import { useState } from "react";
import useRotateOverlay from "../../hooks/useRotateOverlay";

export default function GameFullscreen({ children }) {
  const [started, setStarted] = useState(false);

  const showRotate = useRotateOverlay();

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const enterGame = async () => {
    const el = document.documentElement;
    try {
      if (el.requestFullscreen) {
        await el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        await el.webkitRequestFullscreen();
      }
      setStarted(true);
    } catch (err) {
      console.error(err);
      setStarted(true);
    }
  };

  if (!isMobile) return children;

  if (showRotate) {
    return (
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black text-white">
        <div className="px-6 text-center">
          <div className="mb-3 animate-bounce text-4xl">📱↻</div>
          <p className="text-lg font-medium">Please rotate your device</p>
          <p className="mt-2 text-sm text-gray-400">
            This app works best in landscape mode
          </p>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="mb-6 text-2xl font-bold">🎮 PokéFlip</h1>
          <button
            onClick={enterGame}
            className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition active:scale-95"
          >
            Tap To Start
          </button>
        </div>
      </div>
    );
  }

  return children;
}