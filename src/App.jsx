import { Routes, Route } from "react-router-dom";

import GameFullscreen from "./components/common/GameFullScreen";

import Home from "./pages/Home";
import Settings from "./pages/Settings";
import HowToPlay from "./pages/HowToPlay";
import SelectLevel from "./pages/SelectLevel";
import Game from "./pages/Game";
import GameWin from "./pages/GameWin";
import GameOver from "./pages/GameOver";
import Scoreboard from "./pages/Scoreboard";

export default function App() {
  return (
    <GameFullscreen>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
        <Route path="/select-level" element={<SelectLevel />} />
        <Route path="/game/:difficulty" element={<Game />} />
        <Route path="/game-win" element={<GameWin />} />
        <Route path="/game-over" element={<GameOver />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
      </Routes>
    </GameFullscreen>
  );
}
