const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-[#D4AF37]/20
        bg-[#132238]/85
        backdrop-blur-xl
        shadow-xl
        shadow-black/30
        transition-all
        duration-300

        hover:-translate-y-1
        hover:scale-[1.01]
        hover:border-[#D4AF37]/50
        hover:bg-[#162B45]
        hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)]

        ${className}
      `}
    >
      {/* Gold Glow Effect */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
          bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.10),transparent_65%)]
          pointer-events-none
        "
      />

      {/* Soft Light Border */}
      <div
        className="
          absolute
          inset-0
          rounded-2xl
          border
          border-white/[0.03]
          pointer-events-none
        "
      />

      {children}
    </div>
  );
};

export default Card;