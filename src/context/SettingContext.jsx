import { createContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

export const SettingContext = createContext();

export default function SettingProvider({ children }) {
  const [animationsEnabled, setAnimationsEnabled] = useLocalStorage(
    "Animation",
    false,
  );
  const [timerEnabled, setTimerEnabled] = useLocalStorage("timer", false);
  const [hintLimit, setHintLimit] = useLocalStorage("hintLimit", null);
  const [showNames, setShowNames] = useLocalStorage("showNames", false);

  return (
    <SettingContext.Provider
      value={{
        animationsEnabled,
        setAnimationsEnabled,
        timerEnabled,
        setTimerEnabled,
        hintLimit,
        setHintLimit,
        showNames,
        setShowNames,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
}