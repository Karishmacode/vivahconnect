import {
  CheckCircle2,
  Clock3,
  XCircle,
  Crown,
  User,
  ShieldCheck,
  Send,
  CalendarClock,
  FileText,
} from "lucide-react";

const StatusBadge = ({ status }) => {
  const config = {
    Active: {
      icon: CheckCircle2,
      className:
        "bg-[#D4AF37]/10 text-[#F4D06F] border border-[#D4AF37]/25",
    },

    Approved: {
      icon: CheckCircle2,
      className:
        "bg-[#D4AF37]/10 text-[#F4D06F] border border-[#D4AF37]/25",
    },

    Verified: {
      icon: ShieldCheck,
      className:
        "bg-[#8FA3BF]/10 text-[#8FA3BF] border border-[#8FA3BF]/25",
    },

    Pending: {
      icon: Clock3,
      className:
        "bg-orange-500/10 text-orange-300 border border-orange-500/25",
    },

    Rejected: {
      icon: XCircle,
      className:
        "bg-red-500/10 text-red-300 border border-red-500/25",
    },

    Blocked: {
      icon: XCircle,
      className:
        "bg-red-500/10 text-red-300 border border-red-500/25",
    },

    Premium: {
      icon: Crown,
      className:
        "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30",
    },

    Free: {
      icon: User,
      className:
        "bg-[#132238] text-[#8FA3BF] border border-[#8FA3BF]/25",
    },

    Sent: {
      icon: Send,
      className:
        "bg-[#D4AF37]/10 text-[#F4D06F] border border-[#D4AF37]/25",
    },

    Scheduled: {
      icon: CalendarClock,
      className:
        "bg-orange-500/10 text-orange-300 border border-orange-500/25",
    },

    Draft: {
      icon: FileText,
      className:
        "bg-[#132238] text-[#8FA3BF] border border-[#8FA3BF]/25",
    },
  };

  const badge = config[status] || {
    icon: User,
    className:
      "bg-[#132238] text-white/70 border border-white/10",
  };

  const Icon = badge.icon;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        px-3.5
        py-1.5
        text-xs
        font-bold
        tracking-wide
        transition-all
        duration-300
        ${badge.className}
      `}
    >
      <Icon size={13} />
      {status}
    </span>
  );
};

export default StatusBadge;