import { ArrowUp, TrendingUp } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, growth }) => {
  return (
    <div
      className="
        group relative overflow-hidden cursor-pointer rounded-2xl
        border border-[#D4AF37]/20 bg-[#132238]/85 p-6
        shadow-xl shadow-black/25 backdrop-blur-xl
        transition-all duration-300

        hover:-translate-y-1
        hover:scale-[1.01]
        hover:border-[#D4AF37]/50
        hover:bg-[#162B45]
        hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)]
      "
    >
      {/* Gold Glow */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.12),transparent_65%)]
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      <div className="relative z-10 flex items-center gap-5">
        {Icon && (
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full

              bg-[#D4AF37]/12
              text-[#D4AF37]

              transition-all
              duration-300

              group-hover:rotate-6
              group-hover:scale-110
              group-hover:bg-[#D4AF37]/20
              group-hover:shadow-[0_0_25px_rgba(212,175,55,0.20)]
            "
          >
            <Icon size={30} />
          </div>
        )}

        <div>
          <p className="text-sm font-semibold text-white/75">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-white">
            {value}
          </h2>
        </div>
      </div>

      {growth && (
        <div className="relative z-10 mt-5 flex items-center justify-between">
          <p className="flex items-center gap-1 text-sm text-white/70">
            <span className="flex items-center gap-1 font-bold text-[#F4D06F]">
              <ArrowUp size={14} />
              {growth}
            </span>
            from last month
          </p>

          <div className="rounded-full bg-[#D4AF37]/10 p-2 text-[#D4AF37]">
            <TrendingUp size={15} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StatCard;