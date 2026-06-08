import { useEffect, useState } from "react";
import {
  BadgeCheck,
  Clock3,
  Image,
  ShieldCheck,
  Eye,
  Heart,
} from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import SearchInput from "../components/common/SearchInput";
import Card from "../components/common/Card";
import DetailsModal from "../components/common/DetailsModal";
import ConfirmModal from "../components/common/ConfirmModal";
import SimpleTable from "../components/tables/SimpleTable";
import StatusBadge from "../components/tables/StatusBadge";
import ActionButtons from "../components/tables/ActionButtons";

const API_URL = "http://localhost:5000/api/profiles";

const profileFields = [
  { label: "Name", key: "name" },
  { label: "Age", key: "age" },
  { label: "Gender", key: "gender" },
  { label: "Height", key: "height" },
  { label: "Marital Status", key: "maritalStatus" },
  { label: "Religion", key: "religion" },
  { label: "Community", key: "community" },
  { label: "City", key: "city" },
  { label: "State", key: "state" },
  { label: "Education", key: "education" },
  { label: "Profession", key: "profession" },
  { label: "Company", key: "company" },
  { label: "Income", key: "income" },
  { label: "Views", key: "views" },
  { label: "Interests", key: "interestsCount" },
  { label: "Status", key: "status", badge: true },
  { label: "About", key: "bio" },
];

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [detailsProfile, setDetailsProfile] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchProfiles = async () => {
    try {
      setLoading(true);

      const res = await fetch(API_URL, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await res.json();

      if (res.ok) {
        setProfiles(data.profiles || []);
      }
    } catch (error) {
      console.log("Fetch profiles error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formattedProfiles = profiles.map((profile) => ({
    id: profile._id,
    name: profile.fullName || profile.user?.name || "Unknown Profile",
    age: profile.age || "N/A",
    gender: profile.gender || "Not added",
    height: profile.height || "Not added",
    maritalStatus: profile.maritalStatus || "Never Married",
    city: profile.city || "Not added",
    state: profile.state || "Not added",
    religion: profile.religion || "Not added",
    community: profile.community || "Not added",
    education: profile.education || "Not added",
    profession: profile.profession || "Not added",
    company: profile.company || "Not added",
    income: profile.income || "Not added",
    status: profile.status || "pending",
    views: profile.views || 0,
    interestsCount: profile.interestsCount || 0,
    image:
      profile.photos?.[0]?.url ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        profile.fullName || "Vivah User"
      )}&background=132238&color=f4d06f`,
    bio: profile.bio || "Not added",
  }));

  const filtered = formattedProfiles.filter((profile) =>
    `${profile.name} ${profile.city} ${profile.state} ${profile.religion} ${profile.community} ${profile.profession} ${profile.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const approvedCount = formattedProfiles.filter(
    (p) => p.status === "approved"
  ).length;

  const pendingCount = formattedProfiles.filter(
    (p) => p.status === "pending"
  ).length;

  const rejectedCount = formattedProfiles.filter(
    (p) => p.status === "rejected"
  ).length;

  const totalViews = formattedProfiles.reduce(
    (sum, profile) => sum + Number(profile.views || 0),
    0
  );

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        fetchProfiles();
      }
    } catch (error) {
      console.log("Status update error:", error);
    }
  };

  const deleteProfile = async () => {
    if (!deleteId) return;

    try {
      const res = await fetch(`${API_URL}/${deleteId}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (res.ok) {
        setDeleteId(null);
        fetchProfiles();
      }
    } catch (error) {
      console.log("Delete profile error:", error);
    }
  };

  const getStatusLabel = (status) => {
    if (status === "approved") return "Approved";
    if (status === "rejected") return "Rejected";
    return "Pending";
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profiles"
        desc="Manage member profiles, approvals, verification status and activity."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Total Profiles</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {formattedProfiles.length}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6b545]/10 text-[#f6b545]">
              <Image size={22} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Approved</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {approvedCount}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6b545]/10 text-[#f6b545]">
              <ShieldCheck size={22} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Pending</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {pendingCount}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6b545]/10 text-[#f6b545]">
              <Clock3 size={22} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Total Views</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {totalViews}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6b545]/10 text-[#f6b545]">
              <Eye size={22} />
            </div>
          </div>
        </Card>
      </div>

      <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#132238] p-5 backdrop-blur-xl">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search profiles by name, city, religion, community, profession or status..."
        />
      </div>

      {loading ? (
        <Card className="p-8 text-center text-white/60">
          Loading profiles from database...
        </Card>
      ) : (
        <SimpleTable
          title="All Profiles"
          desc={`${filtered.length} profiles from MongoDB • ${rejectedCount} rejected`}
          columns={[
            "Profile",
            "City",
            "Religion",
            "Profession",
            "Views",
            "Interests",
            "Status",
            "Actions",
          ]}
          data={filtered}
          renderRow={(profile) => (
            <tr
              key={profile.id}
              className="group border-b border-white/5 transition-all duration-300 hover:bg-[#f6b545]/10"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="h-12 w-12 rounded-2xl object-cover ring-2 ring-white/10 transition group-hover:ring-[#f6b545]/60"
                  />

                  <div>
                    <h4 className="font-bold text-white">{profile.name}</h4>
                    <p className="text-xs text-white/50">
                      {profile.gender} • {profile.age} yrs • {profile.height}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 text-white/80">
                <p>{profile.city}</p>
                <p className="text-xs text-white/45">{profile.state}</p>
              </td>

              <td className="px-6 py-4 text-white/80">
                <p>{profile.religion}</p>
                <p className="text-xs text-white/45">{profile.community}</p>
              </td>

              <td className="px-6 py-4 text-white/80">
                <p>{profile.profession}</p>
                <p className="text-xs text-white/45">{profile.company}</p>
              </td>

              <td className="px-6 py-4 text-white/80">
                <div className="flex items-center gap-2">
                  <Eye size={15} className="text-[#f6b545]" />
                  {profile.views}
                </div>
              </td>

              <td className="px-6 py-4 text-white/80">
                <div className="flex items-center gap-2">
                  <Heart size={15} className="text-[#f6b545]" />
                  {profile.interestsCount}
                </div>
              </td>

              <td className="px-6 py-4">
                <StatusBadge status={getStatusLabel(profile.status)} />
              </td>

              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  <ActionButtons
                    onView={() =>
                      setDetailsProfile({
                        ...profile,
                        status: getStatusLabel(profile.status),
                      })
                    }
                    onDelete={() => setDeleteId(profile.id)}
                    onVerify={() => updateStatus(profile.id, "approved")}
                    showVerify={profile.status !== "approved"}
                  />

                  {profile.status !== "rejected" && (
                    <button
                      type="button"
                      onClick={() => updateStatus(profile.id, "rejected")}
                      className="rounded-xl border border-red-400/25 bg-red-500/10 px-3 py-2 text-xs font-black text-red-300 transition hover:bg-red-500/20"
                    >
                      Reject
                    </button>
                  )}

                  {profile.status !== "pending" && (
                    <button
                      type="button"
                      onClick={() => updateStatus(profile.id, "pending")}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-black text-white/70 transition hover:bg-white/10"
                    >
                      Pending
                    </button>
                  )}
                </div>
              </td>
            </tr>
          )}
        />
      )}

      <DetailsModal
        open={!!detailsProfile}
        title="Profile Details"
        item={detailsProfile}
        fields={profileFields}
        onClose={() => setDetailsProfile(null)}
      />

      <ConfirmModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={deleteProfile}
      />
    </div>
  );
};

export default Profiles;