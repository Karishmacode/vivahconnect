import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Eye,
  MessageCircle,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

import PageLayout from "../components/layout/PageLayout";

const API_URL = "http://localhost:5000/api/interests/sent";

const fallbackImage =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop";

const SentInterests = () => {
  const navigate = useNavigate();

  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSent = async () => {
      try {
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setInterests(data.interests || data || []);
        }
      } catch (error) {
        console.log("Sent interests error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSent();
  }, [token, navigate]);

  const getStatusStyle = (status) => {
    if (status === "Accepted") {
      return "border-emerald-400/25 bg-emerald-500/10 text-emerald-300";
    }

    if (status === "Rejected") {
      return "border-red-400/25 bg-red-500/10 text-red-300";
    }

    return "border-[#d4af37]/25 bg-[#d4af37]/10 text-[#f4d06f]";
  };

  const getStatusIcon = (status) => {
    if (status === "Accepted") return <CheckCircle size={15} />;
    if (status === "Rejected") return <XCircle size={15} />;
    return <Clock size={15} />;
  };

  const openWhatsApp = (phone, name) => {
    if (!phone) {
      alert("Phone number is not available.");
      return;
    }

    window.open(
      `https://wa.me/91${phone}?text=Hi ${name}, I saw your profile on VivahConnect.`,
      "_blank"
    );
  };

  return (
    <PageLayout>
      <main className="min-h-screen bg-[#050914] px-6 py-12 text-white">
        <div className="mx-auto max-w-[1300px]">
          <Link
            to="/matches"
            className="inline-flex items-center gap-2 text-sm font-black text-[#f4d06f]"
          >
            <ArrowLeft size={16} />
            Back to Matches
          </Link>

          <div className="mt-6 rounded-[34px] border border-[#d4af37]/20 bg-gradient-to-br from-[#111c33] via-[#0b1425] to-[#07101f] p-8 shadow-2xl shadow-black/25">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-4 py-2 text-xs font-black uppercase tracking-[2px] text-[#f4d06f]">
                  <Heart size={14} />
                  My Activity
                </p>

                <h1 className="mt-4 font-serif text-5xl font-black text-[#f4d06f]">
                  Sent Interests
                </h1>

                <p className="mt-2 text-white/60">
                  Profiles where you have sent interest.
                </p>
              </div>

              <div className="rounded-3xl border border-[#d4af37]/20 bg-[#d4af37]/10 px-6 py-4 text-center">
                <p className="text-3xl font-black text-white">
                  {interests.length}
                </p>
                <p className="text-xs font-black uppercase tracking-[1px] text-[#f4d06f]">
                  Total Sent
                </p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="mt-10 rounded-[30px] border border-[#d4af37]/20 bg-[#0b1425] p-8 text-center">
              <p className="font-bold text-white/70">Loading...</p>
            </div>
          ) : interests.length === 0 ? (
            <div className="mt-10 rounded-[30px] border border-[#d4af37]/20 bg-[#0b1425] p-10 text-center">
              <Heart className="mx-auto text-[#f4d06f]" size={42} />
              <h2 className="mt-4 font-serif text-3xl font-black text-white">
                No sent interests yet
              </h2>
              <p className="mt-2 text-white/60">
                Start exploring matches and send interest to profiles you like.
              </p>

              <Link
                to="/matches"
                className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-[#D4AF37] px-6 text-sm font-black text-[#050914] transition hover:bg-[#f4d06f]"
              >
                Browse Matches
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {interests.map((item) => {
                const profile = item.receiverProfile || item.receiver || {};
                const user = profile.user || item.receiver || {};

                const profileId = profile._id || item.receiver?._id;
                const name =
                  profile.fullName || user.name || "VivahConnect User";
                const age = profile.age || "N/A";
                const city = profile.city || "Not added";
                const religion = profile.religion || "Not added";
                const profession = profile.profession || "Not added";
                const phone = user.phone || profile.phone || "";
                const image =
                  profile.photos?.[0]?.url ||
                  profile.photo ||
                  user.photo ||
                  fallbackImage;

                return (
                  <div
                    key={item._id}
                    className="overflow-hidden rounded-[30px] border border-[#d4af37]/20 bg-[#0b1425] shadow-2xl shadow-black/25 transition hover:-translate-y-1 hover:border-[#d4af37]/45"
                  >
                    <div className="relative h-72 overflow-hidden">
                      <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover object-top"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-transparent to-transparent" />

                      <span
                        className={`absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${getStatusStyle(
                          item.status
                        )}`}
                      >
                        {getStatusIcon(item.status)}
                        {item.status}
                      </span>

                      <div className="absolute bottom-4 left-4 right-4">
                        <h2 className="font-serif text-3xl font-black text-white">
                          {name}
                        </h2>

                        <p className="mt-1 flex items-center gap-2 text-sm font-bold text-white/70">
                          <MapPin size={15} className="text-[#f4d06f]" />
                          {city}
                        </p>
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-sm font-bold text-white/65">
                        {age} Years • {religion}
                      </p>

                      <p className="mt-1 text-sm font-bold text-white/65">
                        {profession}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <Link
                          to={`/profile/${profileId}`}
                          className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-[#d4af37]/25 bg-[#d4af37]/10 px-5 text-sm font-black text-[#f4d06f] transition hover:bg-[#d4af37]/20"
                        >
                          <Eye size={16} />
                          View Profile
                        </Link>

                        {item.status === "Accepted" && (
                          <button
                            type="button"
                            onClick={() => openWhatsApp(phone, name)}
                            className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 text-sm font-black text-white transition hover:bg-emerald-400"
                          >
                            <MessageCircle size={16} />
                            Chat
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </PageLayout>
  );
};

export default SentInterests;