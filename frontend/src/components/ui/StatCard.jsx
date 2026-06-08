const StatCard = ({ icon: Icon, title, value, desc }) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-[#d4af37]/15 bg-gradient-to-br from-[#101b31] to-[#07101f] p-6 shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:border-[#d4af37]/50">
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#d4af37]/10 blur-2xl" />

      <div className="relative flex items-center justify-between">
        <div className="grid h-13 w-13 place-items-center rounded-2xl border border-[#d4af37]/25 bg-[#d4af37]/10 text-[#f4d06f]">
          {Icon && <Icon size={25} />}
        </div>

        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-black text-emerald-300">
          Trusted
        </span>
      </div>

      <h3 className="relative mt-6 text-4xl font-black tracking-tight text-white">
        {value}
      </h3>

      <p className="relative mt-1 font-black text-[#f4d06f]">{title}</p>

      {desc && (
        <p className="relative mt-2 text-sm leading-6 text-white/50">{desc}</p>
      )}
    </div>
  );
};

export default StatCard;