import { useState } from "react";
import {
  BadgeCheck,
  Crown,
  MapPin,
  Briefcase,
  Heart,
  GraduationCap,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";

const MemberCard = ({
  member,
  interestStatus = "none",
  sending = false,
  onSendInterest,
}) => {
  const navigate = useNavigate();

  const [localStatus, setLocalStatus] = useState(interestStatus);
  const [localSending, setLocalSending] = useState(false);

  const currentStatus = localStatus || interestStatus;

  const isPending = currentStatus === "Pending";
  const isAccepted = currentStatus === "Accepted";
  const isRejected = currentStatus === "Rejected";

  const sendInterestDirect = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLocalSending(true);

      const res = await fetch(
        `http://localhost:5000/api/interests/${member.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to send interest");
        return;
      }

      setLocalStatus("Pending");
      alert("Interest sent successfully ❤️");
    } catch (error) {
      console.log("Send interest error:", error);
      alert("Something went wrong");
    } finally {
      setLocalSending(false);
    }
  };

  const handleHeartClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (currentStatus !== "none" || localSending || sending) return;

    if (onSendInterest) {
      onSendInterest(member.id);
      setLocalStatus("Pending");
      return;
    }

    await sendInterestDirect();
  };

  const getStatusText = () => {
    if (isPending) return "Request Sent";
    if (isAccepted) return "Accepted";
    if (isRejected) return "Rejected";
    return "Send Interest";
  };

  const getStatusIcon = () => {
    if (isPending) return <Clock size={17} />;
    if (isAccepted) return <CheckCircle size={17} />;
    if (isRejected) return <XCircle size={17} />;
    return <Heart size={17} />;
  };

  return (
    <div className="group overflow-hidden rounded-[30px] border border-[#d4af37]/15 bg-[#0b1425] shadow-2xl shadow-black/30 transition-all duration-500 hover:-translate-y-2 hover:border-[#d4af37]/45 hover:shadow-[#d4af37]/10">
      <div className="relative h-[360px] overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-[#050914]/30 to-transparent" />

        <div className="absolute left-4 top-4 flex gap-2">
          {member.membership && member.membership !== "Free" && (
            <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f4d06f] px-3 py-1 text-[10px] font-black text-[#050914] shadow-lg shadow-black/20">
              <Crown size={12} />
              {member.membership}
            </span>
          )}

          <span className="flex items-center gap-1 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10px] font-black text-white backdrop-blur-md">
            <BadgeCheck size={12} className="text-[#f4d06f]" />
            Verified
          </span>
        </div>

        <button
          type="button"
          onClick={handleHeartClick}
          disabled={localSending || sending || currentStatus !== "none"}
          title={
            isPending
              ? "Interest already sent"
              : isAccepted
              ? "Interest accepted"
              : isRejected
              ? "Interest rejected"
              : "Send Interest"
          }
          className={`absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border backdrop-blur-md transition ${
            isPending
              ? "border-[#d4af37]/30 bg-[#d4af37]/20 text-[#f4d06f]"
              : isAccepted
              ? "border-emerald-400/30 bg-emerald-500/20 text-emerald-300"
              : isRejected
              ? "border-red-400/30 bg-red-500/20 text-red-300"
              : "border-white/15 bg-black/40 text-white hover:bg-[#d4af37] hover:text-[#050914]"
          }`}
        >
          <Heart
            size={18}
            fill={currentStatus !== "none" ? "currentColor" : "none"}
          />
        </button>

        <div className="absolute bottom-5 left-5 right-5">
          <h3 className="font-serif text-3xl font-black leading-tight text-white drop-shadow-lg">
            {member.name}
          </h3>

          <p className="mt-2 text-sm font-bold text-white/80">
            {member.age} Years • {member.height} • {member.religion} •{" "}
            {member.caste}
          </p>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3 text-center">
            <Eye className="mx-auto text-[#f4d06f]" size={16} />
            <p className="mt-1 text-sm font-black text-white">
              {member.views || 0}
            </p>
            <p className="text-[10px] font-bold text-white/45">Views</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3 text-center">
            <Heart className="mx-auto text-[#f4d06f]" size={16} />
            <p className="mt-1 text-sm font-black text-white">
              {member.interestsCount || 0}
            </p>
            <p className="text-[10px] font-bold text-white/45">Interests</p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="flex items-center gap-3 text-sm font-semibold text-white/68">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#d4af37]/10 text-[#f4d06f]">
              <Briefcase size={16} />
            </span>
            {member.job || "Profession not added"}
          </p>

          <p className="flex items-center gap-3 text-sm font-semibold text-white/68">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#d4af37]/10 text-[#f4d06f]">
              <GraduationCap size={16} />
            </span>
            {member.education || "Education not added"}
          </p>

          <p className="flex items-center gap-3 text-sm font-semibold text-white/68">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#d4af37]/10 text-[#f4d06f]">
              <MapPin size={16} />
            </span>
            {member.city || "City not added"}, {member.state || "India"}
          </p>
        </div>

        <div className="mt-5">
          {currentStatus === "none" && (
            <button
              type="button"
              onClick={handleHeartClick}
              disabled={localSending || sending}
              className="mb-3 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] text-sm font-black text-[#050914] transition hover:bg-[#f4d06f]"
            >
              <Heart size={17} />
              {localSending || sending ? "Sending..." : "Send Interest"}
            </button>
          )}

          {currentStatus !== "none" && (
            <div
              className={`mb-3 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border px-4 text-center text-sm font-black ${
                isPending
                  ? "border-[#d4af37]/25 bg-[#d4af37]/10 text-[#f4d06f]"
                  : isAccepted
                  ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-300"
                  : "border-red-400/25 bg-red-500/10 text-red-300"
              }`}
            >
              {getStatusIcon()}
              {getStatusText()}
            </div>
          )}

          <Link to={`/profile/${member.id}`} className="block">
            <Button variant="outline" className="w-full">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;