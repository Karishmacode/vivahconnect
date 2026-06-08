const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-white/80">
          {label}
        </label>
      )}

      <div className="relative group">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="
            w-full
            rounded-2xl
            border
            border-[#D4AF37]/20
            bg-[#132238]/85
            px-4
            py-3
            text-white
            backdrop-blur-xl
            outline-none

            placeholder:text-white/35

            transition-all
            duration-300

            hover:border-[#D4AF37]/40

            focus:border-[#D4AF37]
            focus:bg-[#162B45]
            focus:shadow-[0_0_20px_rgba(212,175,55,0.15)]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-2xl
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
            bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.08),transparent_65%)]
          "
        />
      </div>
    </div>
  );
};

export default FormInput;