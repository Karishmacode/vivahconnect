import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  Heart,
  MessageCircle,
  MapPin,
  Briefcase,
  GraduationCap,
  IndianRupee,
  Users,
  ShieldCheck,
  Sparkles,
  Crown,
  ArrowLeft,
  Home,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

import PageLayout from "../components/layout/PageLayout";
import Button from "../components/ui/Button";

const fallbackImage =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop";

const API_URL = "http://localhost:5000/api";

const whatsappAccessDays = {
  Free: 7,
  Silver: 30,
  Gold: 90,
  Platinum: 180,
};

const getWhatsAppAccess = (plan, acceptedAt) => {
  if (!acceptedAt) {
    return {
      allowed: false,
      message: "WhatsApp unlocks after interest is accepted.",
    };
  }

  const days = whatsappAccessDays[plan] || 7;
  const acceptedDate = new Date(acceptedAt);
  const expiryDate = new Date(acceptedDate);
  expiryDate.setDate(expiryDate.getDate() + days);

  const today = new Date();
  const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

  if (daysLeft <= 0) {
    return {
      allowed: false,
      message:
        "Your WhatsApp access has expired. Upgrade your plan to continue contact access.",
    };
  }

  return {
    allowed: true,
    message:
      daysLeft === 1
        ? "WhatsApp access active. Expires tomorrow."
        : `WhatsApp access active. ${daysLeft} days left.`,
  };
};

const cleanPhone = (phone) => {
  if (!phone) return "";
  return String(phone).replace(/\D/g, "");
};

const InfoCard = ({ label, value, icon: Icon }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
    <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[1px] text-[#f4d06f]">
      {Icon && <Icon size={14} />}
      {label}
    </p>
    <p className="mt-2 font-bold text-white/80">{value || "Not added"}</p>
  </div>
);

const ProfileDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [interestStatus, setInterestStatus] = useState("none");
  const [interestId, setInterestId] = useState("");
  const [interestDirection, setInterestDirection] = useState("none");
  const [interestAcceptedAt, setInterestAcceptedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem("user") || "null");

  const currentPlan =
    loggedInUser?.membershipPlan ||
    loggedInUser?.membership ||
    loggedInUser?.plan ||
    "Free";

  const isOwnProfile =
    member?.userId === loggedInUser?.id || member?.userId === loggedInUser?._id;

  const whatsAppAccess = getWhatsAppAccess(currentPlan, interestAcceptedAt);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_URL}/profiles/${id}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        const data = await res.json();

        if (!res.ok || !data.profile) {
          setNotFound(true);
          return;
        }

        const profile = data.profile;

        setMember({
          id: profile._id,
          userId: profile.user?._id,
          phone: profile.user?.phone || "",
          name: profile.fullName || profile.user?.name || "VivahConnect User",
          age: profile.age || "N/A",
          height: profile.height || "Not added",
          religion: profile.religion || "Not added",
          caste: profile.community || "Community",
          city: profile.city || "Not added",
          state: profile.state || "India",
          job: profile.profession || "Not added",
          education: profile.education || "Not added",
          company: profile.company || "Not added",
          income: profile.income || "Not added",
          bio: profile.bio || "",
          image: profile.photos?.[0]?.url || fallbackImage,
          familyDetails: profile.familyDetails || {},
          lifestyle: profile.lifestyle || {},
          partnerPreference: profile.partnerPreference || {},
          views: profile.views || 0,
          interestsCount: profile.interestsCount || 0,
          isVerified: profile.isVerified || false,
          profileStrength: profile.profileStrength || 92,
        });
      } catch (error) {
        console.log("Profile details error:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const fetchInterestStatus = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !member?.id || isOwnProfile) return;

      const res = await fetch(`${API_URL}/interests/status/${member.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setInterestStatus(data.status || "none");
        setInterestDirection(data.direction || "none");
        setInterestId(data.interest?._id || "");
        setInterestAcceptedAt(data.interest?.acceptedAt || null);
      }
    } catch (error) {
      console.log("Interest status error:", error);
    }
  };

  useEffect(() => {
    if (member?.id) {
      fetchInterestStatus();
    }
  }, [member?.id, isOwnProfile]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your profile?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/profiles/me`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Profile delete failed.");
        return;
      }

      alert("Profile deleted successfully.");
      navigate("/");
    } catch (error) {
      console.log("Delete error:", error);
      alert("Server error. Please try again.");
    }
  };

  const sendInterest = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const res = await fetch(`${API_URL}/interests/send/${member.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to send interest");
        return;
      }

      setInterestStatus("Pending");
      setInterestDirection("sent");
      setInterestId(data.interest?._id || "");

      setMember((prev) => ({
        ...prev,
        interestsCount: data.interestsCount || prev.interestsCount + 1,
      }));

      alert("Interest sent successfully ❤️");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const updateInterestStatus = async (status) => {
    try {
      const token = localStorage.getItem("token");

      if (!interestId) {
        alert("Interest ID not found.");
        return;
      }

      const res = await fetch(`${API_URL}/interests/${interestId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update interest");
        return;
      }

      setInterestStatus(status);
      setInterestAcceptedAt(data.interest?.acceptedAt || null);
      alert(`Interest ${status}`);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const openWhatsApp = () => {
    const phone = cleanPhone(member.phone);

    if (!phone) {
      alert("Phone number is not available for this profile.");
      return;
    }

    const finalPhone = phone.startsWith("91") ? phone : `91${phone}`;
    const text = encodeURIComponent(
      `Hi ${member.name}, I saw your profile on VivahConnect.`
    );

    window.open(`https://wa.me/${finalPhone}?text=${text}`, "_blank");
  };

  if (loading) {
    return (
      <PageLayout>
        <main className="mx-auto grid min-h-[70vh] place-items-center px-6 py-16 text-center">
          <p className="text-lg font-black text-[#f4d06f]">
            Loading profile...
          </p>
        </main>
      </PageLayout>
    );
  }

  if (notFound || !member) {
    return (
      <PageLayout>
        <main className="mx-auto grid min-h-[70vh] max-w-[900px] place-items-center px-6 py-16 text-center">
          <div className="rounded-[34px] border border-[#d4af37]/20 bg-[#0b1425] p-10">
            <h1 className="font-serif text-4xl font-black text-[#f4d06f]">
              Profile not found
            </h1>

            <Link to="/matches">
              <Button className="mt-6">
                <ArrowLeft size={18} />
                Back to Matches
              </Button>
            </Link>
          </div>
        </main>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <main className="mx-auto max-w-[1450px] px-6 py-12">
        <Link
          to="/matches"
          className="inline-flex items-center gap-2 text-sm font-black text-[#f4d06f]"
        >
          <ArrowLeft size={16} />
          Back to Matches
        </Link>

        <section className="mt-6 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="overflow-hidden rounded-[34px] border border-[#d4af37]/25 bg-[#0b1425] shadow-2xl shadow-black/30">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="h-full w-full object-cover object-top"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-transparent to-transparent" />

              <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f4d06f] px-3 py-1 text-xs font-black text-[#050914]">
                  <Crown size={13} />
                  Premium
                </span>

                <span className="flex items-center gap-1 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-black text-white">
                  <BadgeCheck size={13} />
                  {member.isVerified ? "Verified" : "New"}
                </span>
              </div>

              <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-black/45 px-3 py-1 text-xs font-black text-emerald-300 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Online Now
              </div>

              <div className="absolute bottom-5 left-5 right-5 rounded-[26px] border border-[#d4af37]/20 bg-[#050914]/75 p-5 backdrop-blur-xl">
                <h1 className="font-serif text-4xl font-black text-white">
                  {member.name}
                </h1>

                <p className="mt-2 text-sm font-bold text-white/70">
                  {member.age} Years • {member.height} • {member.religion} •{" "}
                  {member.caste}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {["Family Verified", "Serious Profile", "Privacy Safe"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#d4af37]/20 bg-[#d4af37]/10 px-3 py-1 text-xs font-black text-[#f4d06f]"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 p-5">
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-center">
                <Eye className="mx-auto text-[#f4d06f]" size={20} />
                <p className="mt-2 text-xl font-black text-white">
                  {member.views || 0}
                </p>
                <p className="text-xs font-bold text-white/45">Views</p>
              </div>

              <div className="rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/10 p-4 text-center">
                <Heart className="mx-auto text-[#f4d06f]" size={20} />
                <p className="mt-2 text-xl font-black text-white">
                  {interestStatus === "none"
                    ? member.interestsCount || 0
                    : interestStatus}
                </p>
                <p className="text-xs font-bold text-white/45">Interest</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-center">
                <ShieldCheck className="mx-auto text-[#f4d06f]" size={20} />
                <p className="mt-2 text-xl font-black text-white">
                  {member.isVerified ? "Safe" : "New"}
                </p>
                <p className="text-xs font-bold text-white/45">
                  {member.isVerified ? "Verified" : "Profile"}
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[34px] border border-[#d4af37]/20 bg-gradient-to-br from-[#111c33] via-[#0b1425] to-[#07101f] p-8 shadow-2xl shadow-black/25">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#d4af37]/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#7a1128]/20 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-start">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-4 py-2 text-xs font-black uppercase tracking-[2px] text-[#f4d06f]">
                  <Sparkles size={14} />
                  Profile ID: VC{member.id?.slice(-6).toUpperCase()}
                </p>

                <h2 className="mt-5 font-serif text-5xl font-black text-white">
                  {member.name}
                </h2>

                <p className="mt-3 flex items-center gap-2 text-white/65">
                  <Briefcase size={18} className="text-[#f4d06f]" />
                  {member.job} at {member.company}
                </p>

                <p className="mt-2 flex items-center gap-2 text-white/65">
                  <MapPin size={18} className="text-[#f4d06f]" />
                  {member.city}, {member.state}
                </p>
              </div>

              <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-center">
                <p className="text-3xl font-black text-emerald-300">
                  {member.profileStrength}%
                </p>

                <p className="text-xs font-black uppercase tracking-[1px] text-emerald-200">
                  Profile Strength
                </p>
              </div>
            </div>

            <div className="relative mt-7 grid gap-4 md:grid-cols-2">
              <InfoCard
                label="Education"
                value={member.education}
                icon={GraduationCap}
              />
              <InfoCard label="Profession" value={member.job} icon={Briefcase} />
              <InfoCard label="Company" value={member.company} icon={Home} />
              <InfoCard
                label="Income"
                value={member.income}
                icon={IndianRupee}
              />
              <InfoCard
                label="Religion"
                value={member.religion}
                icon={ShieldCheck}
              />
              <InfoCard label="Community" value={member.caste} icon={Users} />
            </div>

            <div className="relative mt-7 flex flex-wrap gap-3">
              {isOwnProfile ? (
                <>
                  <Link to="/profile">
                    <Button>
                      <Edit size={17} />
                      Edit Profile
                    </Button>
                  </Link>

                  <button
                    type="button"
                    onClick={handleDelete}
                    className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-red-400/25 bg-red-500/10 px-6 text-sm font-black text-red-300 transition hover:bg-red-500/20"
                  >
                    <Trash2 size={17} />
                    Delete Profile
                  </button>
                </>
              ) : (
                <>
                  {interestDirection === "none" && interestStatus === "none" && (
                    <button
                      type="button"
                      onClick={sendInterest}
                      className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-6 text-sm font-black text-[#050914] transition hover:bg-[#f4d06f]"
                    >
                      <Heart size={17} />
                      Send Interest
                    </button>
                  )}

                  {interestDirection === "sent" && interestStatus === "Pending" && (
                    <button
                      type="button"
                      disabled
                      className="flex h-12 cursor-not-allowed items-center justify-center gap-2 rounded-2xl border border-[#d4af37]/25 bg-[#d4af37]/10 px-6 text-sm font-black text-[#f4d06f]"
                    >
                      <Heart size={17} />
                      Waiting for Response
                    </button>
                  )}

                  {interestDirection === "received" &&
                    interestStatus === "Pending" && (
                      <>
                        <button
                          type="button"
                          onClick={() => updateInterestStatus("Accepted")}
                          className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 text-sm font-black text-white transition hover:bg-emerald-400"
                        >
                          Accept Interest
                        </button>

                        <button
                          type="button"
                          onClick={() => updateInterestStatus("Rejected")}
                          className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-red-400/25 bg-red-500/10 px-6 text-sm font-black text-red-300 transition hover:bg-red-500/20"
                        >
                          Reject Interest
                        </button>
                      </>
                    )}

                  {interestStatus === "Accepted" && (
                    <div className="w-full">
                      {whatsAppAccess.allowed ? (
                        <button
                          type="button"
                          onClick={openWhatsApp}
                          className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 text-sm font-black text-white transition hover:bg-emerald-400"
                        >
                          <MessageCircle size={17} />
                          WhatsApp / Chat
                        </button>
                      ) : (
                        <Link to="/membership">
                          <button
                            type="button"
                            className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-6 text-sm font-black text-[#050914] transition hover:bg-[#f4d06f]"
                          >
                            <Crown size={17} />
                            Upgrade Plan
                          </button>
                        </Link>
                      )}

                      <p
                        className={`mt-3 rounded-2xl border px-4 py-3 text-sm font-bold ${
                          whatsAppAccess.allowed
                            ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
                            : "border-red-400/20 bg-red-500/10 text-red-300"
                        }`}
                      >
                        {whatsAppAccess.message}
                      </p>
                    </div>
                  )}

                  {interestStatus === "Rejected" && (
                    <button
                      type="button"
                      disabled
                      className="flex h-12 cursor-not-allowed items-center justify-center gap-2 rounded-2xl border border-red-400/25 bg-red-500/10 px-6 text-sm font-black text-red-300"
                    >
                      <MessageCircle size={17} />
                      Interest Rejected
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  );
};

export default ProfileDetails;