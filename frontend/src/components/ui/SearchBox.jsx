import { Search, Sparkles } from "lucide-react";

const SearchBox = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative mt-7">
      <Search
        size={19}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-[#f4d06f]"
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-16 w-full rounded-2xl border border-[#d4af37]/25 bg-[#07101f] pl-14 pr-14 text-sm font-bold text-white shadow-xl shadow-black/25 outline-none transition placeholder:text-white/35 focus:border-[#f4d06f] focus:ring-2 focus:ring-[#d4af37]/25"
      />

      <Sparkles
        size={16}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-[#d4af37]/70"
      />
    </div>
  );
};

export default SearchBox;