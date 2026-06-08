const PageHeader = ({ title, desc, buttonText, onClick }) => {
  return (
    <div className="mb-8 border-b border-[#D4AF37]/10 pb-5">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
            {title}
          </h1>

          {desc && (
            <p className="mt-2 text-sm text-[#F4D06F]/70 md:text-base">
              {desc}
            </p>
          )}
        </div>

        {buttonText && (
          <button
            type="button"
            onClick={onClick}
            className="rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F4D06F] px-6 py-3.5 font-bold text-[#0B1220] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] active:scale-95"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;