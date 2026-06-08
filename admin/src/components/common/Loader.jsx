import { Loader2 } from "lucide-react";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div
          className="
            absolute
            inset-0
            animate-pulse
            rounded-full
            bg-[#D4AF37]/20
            blur-xl
          "
        />

        <Loader2
          size={42}
          className="
            relative
            animate-spin
            text-[#D4AF37]
          "
        />
      </div>

      <p className="mt-5 text-sm font-medium tracking-wide text-[#F4D06F]/80">
        {text}
      </p>
    </div>
  );
};

export default Loader;