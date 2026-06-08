import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Filter,
  MapPin,
  Users,
  Sparkles,
  ShieldCheck,
  Heart,
  RefreshCcw,
} from "lucide-react";

import PageLayout from "../components/layout/PageLayout";
import SearchBox from "../components/ui/SearchBox";
import EmptyState from "../components/ui/EmptyState";
import MemberCard from "../components/cards/MemberCard";
import SelectField from "../components/forms/SelectField";

const API_URL = "http://localhost:5000/api/profiles";
const INTEREST_URL = "http://localhost:5000/api/interests";

const Matches = () => {
  const [searchParams] = useSearchParams();

  const [profiles, setProfiles] = useState([]);
  const [sentMap, setSentMap] = useState({});
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");
  const [religion, setReligion] = useState("All");
  const [lookingFor, setLookingFor] = useState("All");
  const [loading, setLoading] = useState(true);
  const [sendingId, setSendingId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const urlReligion = searchParams.get("religion");
    const urlCity = searchParams.get("city");
    const urlLookingFor = searchParams.get("lookingFor");

    if (urlReligion) setReligion(urlReligion);
    if (urlCity) setCity(urlCity);
    if (urlLookingFor) setLookingFor(urlLookingFor);
  }, [searchParams]);

  useEffect(() => {
    fetchProfiles();
    fetchSentInterests();
  }, []);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const res = await fetch(API_URL, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to fetch profiles.");
        return;
      }

      const formatted = (data.profiles || []).map((profile) => ({
        id: profile._id,
        userId: profile.user?._id,
        name: profile.fullName || profile.user?.name || "Unknown Profile",
        age: profile.age || "N/A",
        height: profile.height || "5'5",
        gender: profile.gender || "Not added",
        religion: profile.religion || "Not added",
        caste: profile.community || "Community",
        city: profile.city || "India",
        state: profile.state || "India",
        job: profile.profession || "Not added",
        education: profile.education || "Not added",
        company: profile.company || "Not added",
        income: profile.income || "Not added",
        status: profile.status || "pending",
        views: profile.views || 0,
        interestsCount: profile.interestsCount || 0,
        isVerified: profile.isVerified || false,
        profileStrength: profile.profileStrength || 92,
        online: profile.isOnline || false,
        image:
          profile.photos?.[0]?.url ||
          profile.photo ||
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
      }));

      setProfiles(formatted);
    } catch (error) {
      console.log("Profile fetch error:", error);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSentInterests = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${INTEREST_URL}/sent`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        const interests = data.interests || [];
        const map = {};

        interests.forEach((item) => {
          const receiverId = item.receiver?._id || item.receiver;
          if (receiverId) {
            map[receiverId] = item.status;
          }
        });

        setSentMap(map);
      }
    } catch (error) {
      console.log("Sent interests fetch error:", error);
    }
  };

  const sendInterestFromCard = async (profileId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first to send interest.");
        return;
      }

      setSendingId(profileId);

      const res = await fetch(`${INTEREST_URL}/send/${profileId}`, {
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

      setSentMap((prev) => ({
        ...prev,
        [profileId]: "Pending",
      }));

      setProfiles((prev) =>
        prev.map((profile) =>
          profile.id === profileId
            ? {
                ...profile,
                interestsCount:
                  data.interestsCount || (profile.interestsCount || 0) + 1,
              }
            : profile
        )
      );

      alert("Interest sent successfully ❤️");
    } catch (error) {
      console.log("Send interest error:", error);
      alert("Something went wrong.");
    } finally {
      setSendingId("");
    }
  };

  const filteredMembers = profiles.filter((member) => {
    const keyword = search.toLowerCase();

    const matchSearch =
      member.name?.toLowerCase().includes(keyword) ||
      member.job?.toLowerCase().includes(keyword) ||
      member.city?.toLowerCase().includes(keyword) ||
      member.religion?.toLowerCase().includes(keyword) ||
      member.caste?.toLowerCase().includes(keyword);

    const matchCity = city === "All" || member.city === city;
    const matchReligion = religion === "All" || member.religion === religion;
    const matchLookingFor =
      lookingFor === "All" || member.gender === lookingFor;

    return matchSearch && matchCity && matchReligion && matchLookingFor;
  });

  const cities = [
    "All",
    ...new Set(profiles.map((profile) => profile.city).filter(Boolean)),
  ];

  const resetFilters = () => {
    setSearch("");
    setCity("All");
    setReligion("All");
    setLookingFor("All");
  };

  return (
    <PageLayout>
      <main className="mx-auto max-w-[1500px] px-6 py-12">
        <section className="relative mb-10 overflow-hidden rounded-[38px] border border-[#d4af37]/20 bg-gradient-to-br from-[#111c33] via-[#0b1425] to-[#07101f] p-8 shadow-2xl shadow-black/25">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#d4af37]/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#7a1128]/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-5 py-2 text-xs font-black uppercase tracking-[3px] text-[#f4d06f]">
                <Sparkles size={14} />
                Verified Indian Profiles
              </div>

              <h1 className="mt-5 font-serif text-5xl font-black leading-tight text-white md:text-6xl">
                Find Your{" "}
                <span className="bg-gradient-to-r from-[#f4d06f] to-[#d4af37] bg-clip-text text-transparent">
                  Perfect Match
                </span>
              </h1>

              <p className="mt-3 max-w-2xl leading-7 text-white/60">
                Search premium profiles by name, city, religion, profession and
                community across Indian families.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                [Users, `${filteredMembers.length}`, "Matches Found"],
                [ShieldCheck, "100%", "Verified"],
                [MapPin, city, "Selected City"],
              ].map(([Icon, value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4"
                >
                  <Icon size={20} className="text-[#f4d06f]" />
                  <p className="mt-2 font-black text-white">{value}</p>
                  <p className="text-xs font-bold text-white/45">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-10 rounded-[32px] border border-[#d4af37]/20 bg-[#0b1425]/90 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[2px] text-[#f4d06f]">
            <Filter size={16} />
            Premium Search Filters
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.4fr_.9fr_.9fr_.9fr_.7fr]">
            <SearchBox
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, city, profession, community..."
            />

            <SelectField
              label="Looking For"
              value={lookingFor}
              onChange={(e) => setLookingFor(e.target.value)}
              options={["All", "Bride", "Groom"]}
            />

            <SelectField
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              options={cities}
            />

            <SelectField
              label="Religion"
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
              options={["All", "Hindu", "Muslim", "Sikh", "Christian", "Jain"]}
            />

            <button
              onClick={resetFilters}
              className="mt-7 flex h-16 items-center justify-center gap-2 rounded-2xl border border-[#d4af37]/30 bg-[#d4af37]/10 text-sm font-black text-[#f4d06f] transition hover:bg-[#d4af37] hover:text-[#050914]"
            >
              <RefreshCcw size={16} />
              Reset
            </button>
          </div>
        </section>

        {loading ? (
          <div className="rounded-[30px] border border-[#d4af37]/20 bg-[#0b1425]/80 p-10 text-center shadow-2xl shadow-black/20">
            <p className="text-lg font-black text-white">Loading profiles...</p>
            <p className="mt-2 text-sm text-white/50">
              Please wait while we fetch premium matches.
            </p>
          </div>
        ) : error ? (
          <div className="rounded-[30px] border border-red-400/20 bg-red-500/10 p-10 text-center shadow-2xl shadow-black/20">
            <p className="text-lg font-black text-red-300">{error}</p>
          </div>
        ) : filteredMembers.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {filteredMembers.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                interestStatus={sentMap[member.id] || "none"}
                sending={sendingId === member.id}
                onSendInterest={() => sendInterestFromCard(member.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No matches found"
            desc="Try changing your search, city or religion filter."
            onReset={resetFilters}
          />
        )}
      </main>
    </PageLayout>
  );
};

export default Matches;