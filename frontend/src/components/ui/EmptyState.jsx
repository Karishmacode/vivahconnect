import { SearchX, Sparkles } from "lucide-react";
import Button from "./Button";

const EmptyState = ({
  title = "No data found",
  desc = "Try changing your search filters to discover better matches.",
  onReset,
}) => {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-[#d4af37]/20 bg-gradient-to-br from-[#101b31] to-[#07101f] p-12 text-center shadow-2xl shadow-black/25">
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#d4af37]/15 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#7a1128]/25 blur-3xl" />

      <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-3xl border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#f4d06f] shadow-lg shadow-[#d4af37]/10">
        <SearchX size={38} />
      </div>

      <div className="relative mt-5 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-4 py-2 text-xs font-black uppercase tracking-[2px] text-[#f4d06f]">
        <Sparkles size={14} />
        No Perfect Match Yet
      </div>

      <h3 className="relative mt-5 font-serif text-3xl font-black text-white">
        {title}
      </h3>

      <p className="relative mx-auto mt-3 max-w-md text-sm leading-7 text-white/58">
        {desc}
      </p>

      {onReset && (
        <Button onClick={onReset} className="relative mt-7">
          Reset Search
        </Button>
      )}
    </div>
  );
};

export default EmptyState;