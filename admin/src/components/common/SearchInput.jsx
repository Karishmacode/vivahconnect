import { Search } from "lucide-react";

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  label,
  name,
}) => {
  return (
    <div className="group relative">
      {label && (
        <label className="mb-2 block text-sm font-semibold text-white/70">
          {label}
        </label>
      )}

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]"
      />

      <input
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#D4AF37]/20 bg-[#132238] py-3 pl-12 pr-4 font-semibold text-white outline-none transition focus:border-[#D4AF37]"
      />
    </div>
  );
};

export default SearchInput;