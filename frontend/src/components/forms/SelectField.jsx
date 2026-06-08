import { Sparkles, ChevronDown } from "lucide-react";

const SelectField = ({
  label,
  value,
  onChange,
  name,
  options = [],
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
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="
            h-16
            w-full
            appearance-none
            rounded-2xl
            border
            border-[#d4af37]/15
            bg-gradient-to-br
            from-[#111c33]
            via-[#0b1425]
            to-[#07101f]
            px-5
            pr-12
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-black/20
            outline-none
            transition-all
            duration-300
            focus:border-[#f4d06f]
            focus:shadow-[#d4af37]/15
            focus:ring-2
            focus:ring-[#d4af37]/20
          "
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
              className="bg-[#0b1425]"
            >
              {option}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#f4d06f]">
          <ChevronDown size={18} />
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/[0.03]" />
      </div>
    </label>
  );
};

export default SelectField;