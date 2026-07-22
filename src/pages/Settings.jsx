import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import MainLayout from "../layouts/MainLayout";
import ToggleBar from "../components/common/ToggleBar";
import SettingProvider, { SettingContext } from "../context/SettingContext";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Settings() {
  const { isLight, setIsLight } = useContext(ThemeContext);
  const { animationsEnabled, setAnimationsEnabled } =
    useContext(SettingContext);
  const { timerEnabled, setTimerEnabled } = useContext(SettingContext);
  const { hintLimit, setHintLimit } = useContext(SettingContext);
  const { showNames, setShowNames } = useContext(SettingContext);

  function handleHintLimit(limit) {
    if (limit === 1) {
      setHintLimit(1);
    } else if (limit === 3) {
      setHintLimit(3);
    } else {
      setHintLimit(null);
    }
  }

  return (
    <MainLayout>
      <div className="flex min-h-screen w-full flex-col items-center px-6 py-8">
        <div className="w-full max-w-150 rounded-2xl border border-(--border-color)/30 bg-(--bg-secondary) p-4 shadow-xl">
          <Link
            to="/"
            className="mb-2 flex max-w-24 items-center gap-2 rounded-lg border border-(--border-color)/30 bg-(--bg-main) px-4 py-2 text-(--text-muted)"
          >
            <FaLongArrowAltLeft className="text-sm" />
            <span className="text-sm">Back</span>
          </Link>
          <div className="px-6 py-2">
            <p className="mb-6 text-xl font-semibold text-(--text-secondary)">
              Appearance
            </p>

            <div className="mb-4 flex items-center justify-between rounded-xl border border-(--border-color)/30 bg-(--bg-option) p-4">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-(--text-muted)">
                  Light or dark background
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  className={`rounded-lg ${isLight ? "bg-(--text-primary)" : ""} px-4 py-2 text-white`}
                  onClick={() => setIsLight(true)}
                  disabled={isLight}
                >
                  Light
                </button>
                <button
                  className={`rounded-lg ${!isLight ? "bg-(--bg-main)" : " "} px-4 py-2`}
                  onClick={() => setIsLight(false)}
                  disabled={!isLight}
                >
                  Dark
                </button>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between rounded-xl border border-(--border-color)/30 bg-(--bg-option) p-4">
              <div>
                <p className="font-medium">OFF Card Animation</p>
                <p className="text-sm text-(--text-muted)">Flip effects</p>
              </div>

              <ToggleBar
                checked={animationsEnabled}
                onChange={() => setAnimationsEnabled((prev) => !prev)}
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-(--border-color)/30 bg-(--bg-option) p-4">
              <div>
                <p className="font-medium">Enable Pokémon Names</p>
                <p className="text-sm text-(--text-muted)">
                  Enable names on matched cards
                </p>
              </div>

              <ToggleBar
                checked={showNames}
                onChange={() => setShowNames((prev) => !prev)}
              />
            </div>
          </div>

          <div className="px-6 pb-2">
            <p className="mb-6 text-xl font-semibold text-(--text-secondary)">
              Gameplay
            </p>

            <div className="mb-4 flex items-center justify-between rounded-xl border border-(--border-color)/30 bg-(--bg-option) p-4">
              <div>
                <p className="font-medium">Hint Limits</p>
                <p className="text-sm text-(--text-muted)">
                  Choose how many hints can be used per game
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  className={`rounded-lg ${hintLimit === 1 ? "bg-(--bg-main)" : " "} px-4 py-2`}
                  onClick={() => {
                    handleHintLimit(1);
                  }}
                >
                  1
                </button>

                <button
                  className={`rounded-lg ${hintLimit === 3 ? "bg-(--bg-main)" : " "} px-4 py-2`}
                  onClick={() => handleHintLimit(3)}
                >
                  {" "}
                  3
                </button>

                <button
                  className={`rounded-lg ${hintLimit === null ? "bg-(--bg-main)" : " "} px-4 py-2`}
                  onClick={() => handleHintLimit(null)}
                >
                  ∞
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-(--border-color)/30 bg-(--bg-option) p-4">
              <div>
                <p className="font-medium">Game Timer</p>
                <p className="text-sm text-(--text-muted)">
                  Enable or disable the in-game timer
                </p>
              </div>

              <ToggleBar
                checked={timerEnabled}
                onChange={() => {
                  setTimerEnabled((prev) => !prev);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
