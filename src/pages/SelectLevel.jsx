import React from "react";
import MainLayout from "../layouts/MainLayout";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import DifficultyCard from "../components/common/DifficultyCard";
import mushroom from "../assets/mushroom.svg";
import butterfly from "../assets/butterfly.svg";
import crab from "../assets/crab.svg";

export default function SelectLevel() {
  return (
    <MainLayout>
      <div className="flex min-h-screen w-full items-center justify-center bg-(--bg-main) px-6 py-6">
        <div className="w-full max-w-220 rounded-3xl border border-(--border-color)/40 bg-(--bg-secondary) p-6">
          <div className="mb-6 flex items-center justify-between border-b border-(--border-color)/30 pb-5">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-lg border border-(--border-color)/30 bg-(--bg-main) px-4 py-2 text-(--text-muted)"
            >
              <FaLongArrowAltLeft className="text-sm" />
              <span className="text-sm">Back</span>
            </Link>

            <h1 className="text-sm font-bold tracking-[0.3rem] text-(--text-secondary)">
              SELECT LEVEL
            </h1>

            <div className="w-20"></div>
          </div>

          <div className="mb-8 text-center">
            <h2 className="mb-2 text-4xl font-bold tracking-[0.3rem] text-(--text-primary)">
              CHOOSE YOUR CHALLENGE
            </h2>

            <p className="text-[11px] tracking-[0.2rem] text-(--text-secondary)">
              EACH LEVEL HAS A UNIQUE CARD SHAPE AND DIFFICULTY
            </p>
          </div>

          <div className="flex items-stretch justify-center gap-6">
            <DifficultyCard
              easy
              icon={mushroom}
              alt="mushroom"
              level="Easy"
              shape="🍄 MUSHROOM SHAPE"
              cards="22"
              pairs="11"
              time="∞"
            />

            <DifficultyCard
              medium
              icon={butterfly}
              alt="butterfly"
              level="Medium"
              shape="🦋 BUTTERFLY SHAPE"
              cards="34"
              pairs="17"
              time="2 min"
            />

            <DifficultyCard
              hard
              icon={crab}
              alt="crab"
              level="Hard"
              shape="🦀 CRAB SHAPE"
              cards="44"
              pairs="22"
              time="3 min"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
