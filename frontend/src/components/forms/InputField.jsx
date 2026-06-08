import { Sparkles } from "lucide-react";

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  required = false,
}) => {
  return (
    <label className="block">
      {label && (
        <div className="mb-3 flex items-center gap-2">
          <Sparkles size={14} className="text-[#f4d06f]" />

          <span className="text-sm font-black uppercase tracking-[1px] text-white/75">
            {label}
          </span>

          {required && (
            <span className="text-[#d4af37]">*</span>
          )}
        </div>
      )}

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-[#d4af37]/5 to-transparent opacity-0 transition duration-300 group-focus-within:opacity-100" />

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="
            h-16
            w-full
            rounded-2xl
            border
            border-[#d4af37]/15
            bg-gradient-to-br
            from-[#111c33]
            via-[#0b1425]
            to-[#07101f]
            px-5
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-black/20
            outline-none
            transition-all
            duration-300
            placeholder:text-white/30
            focus:border-[#f4d06f]
            focus:shadow-[#d4af37]/15
            focus:ring-2
            focus:ring-[#d4af37]/20
          "
        />
      </div>
    </label>
  );
};

export default InputField;