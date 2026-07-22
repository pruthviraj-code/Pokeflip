export default function SpritePreviewShimmer() {
  const pokemon = Array(12).fill(null);

  return (
    <div className="flex h-full flex-col items-center justify-center border-l border-(--border-color)/40 p-4">
      <div className="flex h-full w-full animate-pulse flex-col">
        <div className="grid w-full flex-[1.2] grid-cols-4 grid-rows-3 place-items-center gap-2.5 p-4">
          {pokemon.map((_, i) => (
            <div
              key={i}
              className="h-full w-full rounded-xl border border-(--border-color)/40 bg-white/5"
            />
          ))}
        </div>

        <div className="mb-8 flex w-full gap-2 p-4">
          <div className="h-8 flex-1 rounded-full border border-(--border-color)/20 bg-white/5" />
          <div className="h-8 flex-1 rounded-full border border-(--border-color)/20 bg-white/5" />
          <div className="h-8 flex-1 rounded-full border border-(--border-color)/20 bg-white/5" />
        </div>
      </div>
    </div>
  );
}