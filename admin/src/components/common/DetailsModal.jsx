import { X } from "lucide-react";
import StatusBadge from "../tables/StatusBadge";

const DetailsModal = ({
  open,
  title = "Details",
  item,
  fields = [],
  onClose,
}) => {
  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-sm">
      <div className="relative flex max-h-[86vh] w-full max-w-3xl flex-col overflow-hidden rounded-[28px] border border-[#D4AF37]/25 bg-[#0B1220] shadow-2xl shadow-black/60">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#D4AF37]/15 bg-[#0B1220]/95 px-5 py-4 backdrop-blur-xl">
          <div>
            <p className="text-xs font-black uppercase tracking-[3px] text-[#D4AF37]">
              VivahConnect Admin
            </p>
            <h2 className="mt-1 text-2xl font-black text-white">{title}</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-red-400/25 bg-red-500/10 text-red-300 transition hover:bg-red-500 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-5">
          {item.image && (
            <div className="mb-5 flex items-center gap-4 rounded-3xl border border-[#D4AF37]/20 bg-[#132238]/80 p-4">
              <img
                src={item.image}
                alt={item.name || "Details"}
                className="h-16 w-16 rounded-2xl object-cover ring-2 ring-[#D4AF37]/50"
              />

              <div className="min-w-0">
                <h3 className="truncate text-2xl font-black text-white">
                  {item.name || "Details"}
                </h3>

                <p className="truncate text-sm font-semibold text-[#F4D06F]/70">
                  {item.email || item.profession || item.city || "Admin record"}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.key}
                className="rounded-2xl border border-[#D4AF37]/15 bg-[#111C33] p-3.5 transition hover:border-[#D4AF37]/35"
              >
                <p className="text-[11px] font-black uppercase tracking-[2px] text-[#F4D06F]/70">
                  {field.label}
                </p>

                <div className="mt-2 text-sm font-bold leading-6 text-white">
                  {field.badge ? (
                    <StatusBadge status={item[field.key]} />
                  ) : (
                    item[field.key] || "Not added"
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-[#D4AF37]/30 px-5 py-3 text-sm font-black text-[#F4D06F] transition hover:bg-[#D4AF37]/10"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;