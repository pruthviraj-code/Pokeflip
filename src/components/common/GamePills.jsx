export default function GamePills({ easy, medium, hard }) {
  return (
    <div className="flex w-full  gap-2 p-4">

      {easy && (
        <div className="flex-1 rounded-full border border-(--easy-mode) bg-(--easy-bg) px-2 py-1.5 text-center text-[10px] font-bold tracking-[2px] text-(--easy-mode)">
          🍄 EASY
        </div>
      )}

      {medium && (
        <div className="flex-1 rounded-full border border-(--medium-mode) bg-(--medium-bg) px-2 py-1.5 text-center text-[10px] font-bold tracking-[2px] text-(--medium-mode)">
          🦋 MEDIUM
        </div>
      )}

      {hard && (
        <div className="flex-1 rounded-full border border-(--hard-mode) bg-(--hard-bg) px-2 py-1.5 text-center text-[10px] font-bold tracking-[2px] text-(--hard-mode)">
          🦀 HARD
        </div>
      )}

    </div>
  );
}