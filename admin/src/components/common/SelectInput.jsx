import { Search, X } from "lucide-react";

const SearchInput = ({
  value = "",
  onChange,
  onSearch,
  placeholder = "Search...",
  className = "",
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearch) {
      e.preventDefault();
      onSearch(value.trim());
    }
  };

  const clearSearch = () => {
    if (onChange) {
      onChange("");
    }

    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div className={`group relative ${className}`}>
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/70 transition-all duration-300 group-focus-within:text-[#D4AF37]"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="h-14 w-full rounded-2xl border border-[#D4AF37]/20 bg-[#132238]/80 pl-12 pr-12 text-white backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-white/45 hover:border-[#D4AF37]/35 focus:border-[#D4AF37] focus:bg-[#162B45] focus:shadow-[0_0_25px_rgba(212,175,55,0.15)]"
      />

      {value && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl text-white/45 transition-all duration-300 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;