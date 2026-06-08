const Button = ({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) => {
  const styles = {
    primary: `
      relative overflow-hidden
      bg-gradient-to-r from-[#d4af37] via-[#f4d06f] to-[#d4af37]
      text-[#050914]
      shadow-xl shadow-[#d4af37]/20
      hover:shadow-[#d4af37]/40
      hover:scale-[1.02]
    `,

    outline: `
      border border-[#d4af37]/40
      bg-white/[0.03]
      backdrop-blur-xl
      text-[#f4d06f]
      hover:bg-[#d4af37]
      hover:text-[#050914]
      hover:border-[#d4af37]
    `,

    dark: `
      border border-white/10
      bg-[#0b1220]
      text-white
      hover:border-[#d4af37]/50
      hover:bg-[#101b31]
    `,
  };

  return (
    <button
      type={type}
      className={`
        group
        rounded-2xl
        px-6
        py-3
        text-sm
        font-black
        tracking-wide
        transition-all
        duration-300
        active:scale-95
        ${styles[variant]}
        ${className}
      `}
      {...props}
    >
      {variant === "primary" && (
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition duration-700 group-hover:translate-x-full" />
      )}

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default Button;
