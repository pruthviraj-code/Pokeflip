export default function Card({ pokemon }) {
  return (
    <div className="flex h-full w-full flex-col items-center overflow-hidden rounded-xl border border-(--border-color)/40 bg-(--bg-card)/80 p-1.5">
      <img
        src={pokemon?.image}
        alt={pokemon?.name}
        className="h-20 w-20 shrink-0 scale-124 object-contain"
      />
      <p className="w-full text-center text-[10px] text-(--text-muted) leading-tight wrap-break-word">
        {pokemon?.name}
      </p>
    </div>
  );
}