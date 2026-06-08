import { X } from "lucide-react";

const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 px-4 backdrop-blur-md">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[#D4AF37]/20 bg-[#132238] shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/[0.05] bg-[#132238] px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="mt-1 text-sm text-[#F4D06F]/70">
              Fill the required information below.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#D4AF37]/15 bg-[#0F1B2E] p-2.5 text-white/70 transition-all duration-300 hover:border-[#D4AF37]/50 hover:bg-[#162B45] hover:text-[#D4AF37]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;