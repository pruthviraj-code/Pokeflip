import { Link, useNavigate } from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";
import { FaPlay, FaQuestion } from "react-icons/fa";

import { getAnimatedPikachu } from "../../services/pokeApi";

import ThemeSwitcher from "./ThemeSwitcher";
import StartButton from "../common/PlayButton";

export default function MainMenu({ selectedPoke }) {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col items-start p-8">
      <div className="flex w-full items-center justify-between pt-4">
        <h1 className="text-6xl leading-none font-bold tracking-[0.4rem]">
          <span className="text-(--text-primary)">POKÉ</span>
          <br />
          <span className="text-(--text-primary)">FLIP</span>
        </h1>

        <div className="relative top-3 right-6 flex flex-col items-center gap-1">
          <div
            className={`scale-110 rounded-2xl border p-3 transition-all duration-300 ${
              selectedPoke
                ? "scale-160 border-(--gold-hover) shadow-(--gold-hover)/20 shadow-lg"
                : "border-(--border-color)/40 "
            }`}
          >
            {selectedPoke ? (
              <img
                src={selectedPoke.image}
                alt={selectedPoke.name}
                className="h-28 w-28 object-contain transition-all duration-300"
              />
            ) : (
              <img
                src={getAnimatedPikachu()}
                alt="pikachu"
                className="h-28 w-28 scale-100 object-contain"
              />
            )}
          </div>
          <p
            className={`relative top-2 text-[11px] tracking-widest capitalize transition-all duration-300 ${
              selectedPoke ? "text-(--text-primary)" : "text-(--text-muted)"
            } `}
          >
            {selectedPoke ? selectedPoke.name : "pikachu"}
          </p>
        </div>
      </div>

      <span className="pt-4 text-[16px] font-light tracking-[0.4em] text-(--text-secondary)">
        MEMORY GAME
      </span>

      <div className="w-full pt-8">
        <Link
          to={"/select-level"}
          className="flex w-full animate-[glow_4s_ease-in-out_infinite] cursor-pointer items-center justify-center gap-8 rounded-xl bg-(image:--gold-gradient) py-4 font-bold text-black shadow-lg shadow-yellow-400/50"
        >
          <FaPlay />
          <span className="tracking-[0.4em]">START GAME</span>
        </Link>
      </div>

      <div className="flex w-full gap-2 pt-8">
        <Link
          to="/settings"
          className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-(--border-color) bg-(--bg-secondary) py-4 text-(--text-primary) transition-all duration-200 hover:border-(--gold-hover) hover:text-(--gold-hover)"
        >
          <IoSettingsSharp />
          SETTINGS
        </Link>
        <Link
          to="/how-to-play"
          className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-(--border-color) bg-(--bg-secondary) py-4 text-(--text-primary) transition-all duration-200 hover:border-(--gold-hover) hover:text-(--gold-hover)"
        >
          <FaQuestion />
          HOW TO PLAY
        </Link>
      </div>

      <Link
        to={"/scoreboard"}
        className="mt-2 flex w-full flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-(--border-color) bg-(--bg-secondary) py-4 tracking-[0.4rem] text-(--text-primary) transition-all duration-200 hover:border-(--gold-hover) hover:text-(--gold-hover)"
      >
        ▨ Scoreboard
      </Link>
      <div className="pt-8">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
