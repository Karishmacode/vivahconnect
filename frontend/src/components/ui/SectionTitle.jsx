import { Sparkles } from "lucide-react";

const SectionTitle = ({ title, highlight, desc, right }) => {
  return (
    <div className="mb-10 flex flex-col gap-6 border-b border-white/5 pb-6 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/10 px-4 py-2 text-xs font-black uppercase tracking-[3px] text-[#f4d06f]">
          <Sparkles size={14} />
          Premium Matrimony
        </div>

        <h2 className="font-serif text-4xl font-black leading-tight text-white md:text-5xl">
          {title}{" "}
          <span className="bg-gradient-to-r from-[#f4d06f] via-[#d4af37] to-[#fff1a8] bg-clip-text text-transparent">
            {highlight}
          </span>
        </h2>

        {desc && (
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">
            {desc}
          </p>
        )}
      </div>

      {right && (
        <div className="shrink-0">
          {right}
        </div>
      )}
    </div>
  );
};

export default SectionTitle;