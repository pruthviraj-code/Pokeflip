import { FaQuestion } from "react-icons/fa";
import MainLayout from "../layouts/MainLayout";
import Card from "../components/common/Card";

const pikachu = {
  id: 25,
  name: "Pikachu",
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
};

const charmander = {
  id: 4,
  name: "Charmander",
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
};

export default function HowToPlay() {
  return (
    <MainLayout>
      <div className="flex min-h-screen w-full justify-center px-6 py-8">
        <div className="w-full max-w-175 rounded-3xl border border-(--border-color)/30 bg-(--bg-secondary) p-6 shadow-xl">

          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-(--text-primary)">
              How To Play
            </h1>
            <p className="mt-2 text-sm text-(--text-muted)">
              Match all pairs to win the game.
            </p>
          </div>

          <div className="mb-5 rounded-2xl border border-(--border-color)/20 bg-(--bg-option) p-4">
            <h2 className="mb-2 text-lg font-semibold text-(--text-primary)">
              1. Flip a Card
            </h2>

            <p className="mb-4 text-sm text-(--text-muted)">
              Tap any face-down card to reveal the Pokémon hiding underneath.
            </p>

            <div className="flex items-center justify-center gap-4">
              <div className="flex h-28 w-24 items-center justify-center rounded-xl border border-(--border-color)/40 bg-(--bg-main)">
                <FaQuestion className="text-3xl text-(--text-muted)" />
              </div>

              <span className="text-xl text-(--text-muted)">→</span>

              <div className="h-28 w-24">
                <Card pokemon={pikachu} />
              </div>
            </div>
          </div>

          <div className="mb-5 rounded-2xl border border-(--border-color)/20 bg-(--bg-option) p-4">
            <h2 className="mb-2 text-lg font-semibold text-(--text-primary)">
              2. Find a Match
            </h2>

            <p className="mb-4 text-sm text-(--text-muted)">
              Flip another card. If both cards show the same Pokémon, they become a matched pair.
            </p>

            <div className="flex items-center justify-center gap-3">
              <div className="h-28 w-24">
                <Card pokemon={pikachu} />
              </div>

              <div className="h-28 w-24">
                <Card pokemon={pikachu} />
              </div>
            </div>
          </div>

          <div className="mb-5 rounded-2xl border border-(--border-color)/20 bg-(--bg-option) p-4">
            <h2 className="mb-2 text-lg font-semibold text-(--text-primary)">
              3. Remember Card Positions
            </h2>

            <p className="mb-4 text-sm text-(--text-muted)">
              If the cards don't match, they flip back over. Remember where you saw each Pokémon and try again.
            </p>

            <div className="flex items-center justify-center gap-3">
              <div className="h-28 w-24">
                <Card pokemon={pikachu} />
              </div>

              <div className="h-28 w-24">
                <Card pokemon={charmander} />
              </div>
            </div>
          </div>

          <div className="mb-6 rounded-2xl border border-(--border-color)/20 bg-(--bg-option) p-4">
            <h2 className="mb-2 text-lg font-semibold text-(--text-primary)">
              4. Match Every Pair
            </h2>

            <p className="text-sm text-(--text-muted)">
              Match all Pokémon pairs to complete the board and achieve the best score possible.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

            <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-center">
              <div className="mb-2 text-2xl">🍄</div>
              <h3 className="text-sm font-bold text-green-400">EASY</h3>
              <p className="mt-2 text-xs text-(--text-muted)">
                10 cards <br /> No timer <br /> 5 pairs
              </p>
            </div>

            <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-center">
              <div className="mb-2 text-2xl">🦋</div>
              <h3 className="text-sm font-bold text-yellow-400">MEDIUM</h3>
              <p className="mt-2 text-xs text-(--text-muted)">
                20 cards <br /> 3 min timer <br /> 10 pairs
              </p>
            </div>

            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-center">
              <div className="mb-2 text-2xl">🦀</div>
              <h3 className="text-sm font-bold text-red-400">HARD</h3>
              <p className="mt-2 text-xs text-(--text-muted)">
                44 cards <br /> 5 min timer <br /> 22 pairs
              </p>
            </div>

          </div>

        </div>
      </div>
    </MainLayout>
  );
}