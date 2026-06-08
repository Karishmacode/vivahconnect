import { Heart, Calendar, Sparkles } from "lucide-react";

const StoryCard = ({ story }) => {
  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-[#d4af37]/15 bg-gradient-to-br from-[#111c33] via-[#0b1425] to-[#07101f] shadow-xl shadow-black/25 transition-all duration-500 hover:-translate-y-2 hover:border-[#d4af37]/50 hover:shadow-[#d4af37]/10">
      
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#d4af37]/10 blur-3xl" />

      <div className="relative h-52 overflow-hidden">
        <img
          src={story.image}
          alt={story.names}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-[#050914]/20 to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f4d06f] px-3 py-1 text-xs font-black text-[#050914]">
          <Heart size={12} />
          Success Story
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-serif text-2xl font-black text-white drop-shadow-lg">
            {story.names}
          </h3>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-white/60">
          <Calendar size={15} className="text-[#f4d06f]" />
          {story.date}
        </div>

        <p className="mt-3 text-sm leading-6 text-white/55">
          Found their perfect life partner through VivahConnect and began a
          beautiful journey together.
        </p>

        <div className="mt-4 flex items-center justify-between rounded-2xl border border-[#d4af37]/15 bg-[#d4af37]/5 px-4 py-3">
          <p className="flex items-center gap-2 text-xs font-black text-[#f4d06f]">
            <Sparkles size={14} />
            Verified Marriage
          </p>

          <p className="text-xs font-bold text-white/40">
            Trusted Match
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#d4af37] to-[#f4d06f] transition-all duration-500 group-hover:w-full" />
    </div>
  );
};

export default StoryCard;