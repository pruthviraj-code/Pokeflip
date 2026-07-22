import React from "react";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { clearGameStorage } from "../../utils/clearGameStorage";

export default function PlayButton({ easy, medium, hard }) {
  const navigate = useNavigate();

  const gradient = easy
    ? "bg-(image:--easy-gradient)"
    : medium
      ? "bg-(image:--medium-gradient)"
      : "bg-(image:--hard-gradient)";

  function handlePlay() {
    const difficulty = easy ? "easy" : medium ? "medium" : "hard";

    clearGameStorage(difficulty);

    navigate(`/game/${difficulty}`);
  }

  return (
    <button
      onClick={handlePlay}
      className={`flex w-full cursor-pointer items-center justify-center gap-8 rounded-xl py-4 font-bold text-(--bg-secondary) shadow-md ${gradient}`}
    >
      <FaPlay />

      <span className="tracking-[0.4em]">PLAY</span>
    </button>
  );
}