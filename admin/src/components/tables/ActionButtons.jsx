import { Eye, Pencil, Trash2 } from "lucide-react";

const ActionButtons = ({ onView, onEdit, onDelete }) => {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onView}
        title="View"
        className="group flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] transition-all duration-300 hover:scale-110 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B1220]"
      >
        <Eye size={16} />
      </button>

      <button
        type="button"
        onClick={onEdit}
        title="Edit"
        className="group flex h-10 w-10 items-center justify-center rounded-xl border border-[#8FA3BF]/30 bg-[#8FA3BF]/5 text-[#8FA3BF] transition-all duration-300 hover:scale-110 hover:border-[#8FA3BF] hover:bg-[#8FA3BF] hover:text-[#0B1220]"
      >
        <Pencil size={16} />
      </button>

      <button
        type="button"
        onClick={onDelete}
        title="Delete"
        className="group flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/5 text-red-300 transition-all duration-300 hover:scale-110 hover:border-red-500 hover:bg-red-500 hover:text-white"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default ActionButtons;