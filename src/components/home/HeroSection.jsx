import { useState } from "react";
import MainMenu from "./MainMenu";
import SpritePreview from "./SpritePreview";

export default function HeroSection() {
  const [selectedPoke, setSelectedPoke] = useState(null);

  return (
    <div className="flex h-140 w-220 rounded-3xl border border-(--border-color)/40 bg-(--bg-secondary) text-white">
      <div className="flex-[1.2]">
        <MainMenu selectedPoke={selectedPoke} />
      </div>

      <div className="flex-1">
        <SpritePreview onSelect={setSelectedPoke} />
      </div>
    </div>
  );
}