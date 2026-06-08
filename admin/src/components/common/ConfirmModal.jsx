import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";

const ConfirmModal = ({
  open,
  title = "Delete Item",
  desc,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal open={open} title={title} onClose={onClose}>
      <div className="text-center">
        <div
          className="
            mx-auto
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            bg-[#D4AF37]/10
            text-[#D4AF37]
          "
        >
          <AlertTriangle size={38} />
        </div>

        <h3 className="mt-5 text-xl font-bold text-white">
          Are you sure?
        </h3>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/70">
          {desc ||
            "This action cannot be undone. Once deleted, the record will be permanently removed from the system."}
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={onClose}
            className="
              rounded-2xl
              border
              border-[#D4AF37]/20
              bg-[#132238]
              px-6
              py-3
              font-medium
              text-white
              transition-all
              duration-300
              hover:border-[#D4AF37]/40
              hover:bg-[#162B45]
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
              rounded-2xl
              bg-gradient-to-r
              from-red-500
              to-red-600
              px-6
              py-3
              font-bold
              text-white
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-[0_0_25px_rgba(239,68,68,0.35)]
            "
          >
            Delete Permanently
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;