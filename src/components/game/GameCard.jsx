import React, { useContext, useState } from "react";
import { SettingContext } from "../../context/SettingContext";

export default function GameCard({
  id,
  isHint,
  onFlip,
  value,
  image,
  name,
  isFlipped,
}) {
  const { animationsEnabled, showNames } = useContext(SettingContext);

  return (
    <div className="h-24 w-18 perspective-distant" onClick={() => onFlip(id)}>
      <div
        className={`relative h-full w-full  transform-3d ${animationsEnabled ? "" : "duration-500"} ${isFlipped ? "transform-[rotateY(180deg)]" : ""} ${isHint ? "animate-pulse rounded-xl ring-2 ring-(--gold-primary)" : ""}`}
      >
        {/* Card Back */}
        <div className="absolute inset-0 backface-hidden">
          <div className="relative flex h-24 w-18 items-center justify-center rounded-xl border border-(--border-color)/40 bg-(--level-card-bg)">
            <div className="absolute h-px w-full border border-(--border-color)/40" />

            <div className="z-4 flex h-8 w-8 items-center justify-center rounded-full border border-(--border-color)/40 bg-(--level-card-bg) text-(--text-primary)/40">
              ?
            </div>
          </div>
        </div>

        {/* Card Front */}
        <div className="absolute inset-0 transform-[rotateY(180deg)] backface-hidden">
          
          <div className="relative flex h-24 w-18 flex-col items-center justify-center gap-1 rounded-xl border border-(--border-color)/40 bg-(--level-card-bg) text-white">
            {image ? (
              <>
                <img
                  src={image}
                  alt={name || "pokemon"}
                  className={`h-14 w-14 object-contain transition-transform duration-300 ${
                    showNames ? "scale-100" : "scale-[1.2]"
                  }`}
                  draggable={false}
                />
                {showNames && name && (
                  <span className="text-[9px] leading-none text-(--text-primary)/70 capitalize">
                    {name}
                  </span>
                )}
              </>
            ) : (
              value
            )}
          </div>
        </div>
      </div>
    </div>
  );
}