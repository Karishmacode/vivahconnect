import { Inbox } from "lucide-react";

const EmptyState = ({
  title = "No data found",
  desc = "There is nothing to show right now.",
}) => {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-[#D4AF37]/20
        bg-[#132238]/85
        p-12
        text-center
        backdrop-blur-xl
        shadow-xl
        shadow-black/25
      "
    >
      {/* Gold Glow */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.10),transparent_65%)]
          pointer-events-none
        "
      />

      <div className="relative z-10">
        <div
          className="
            mx-auto
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            bg-[#D4AF37]/10
            text-[#D4AF37]
          "
        >
          <Inbox size={36} />
        </div>

        <h3 className="mt-5 text-xl font-bold text-white">
          {title}
        </h3>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/65">
          {desc}
        </p>

        <div className="mt-6 text-xs uppercase tracking-widest text-[#F4D06F]/80">
          VivahConnect Admin
        </div>
      </div>
    </div>
  );
};

export default EmptyState;