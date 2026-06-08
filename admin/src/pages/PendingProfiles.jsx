import { useEffect, useState } from "react";
import { Clock3, ShieldCheck, XCircle, Eye } from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import SearchInput from "../components/common/SearchInput";
import Card from "../components/common/Card";
import DetailsModal from "../components/common/DetailsModal";
import SimpleTable from "../components/tables/SimpleTable";
import StatusBadge from "../components/tables/StatusBadge";

const API_URL = "http://localhost:5000/api/profiles";

const profileFields = [
  { label: "Name", key: "name" },
  { label: "Age", key: "age" },
  { label: "Gender", key: "gender" },
  { label: "Height", key: "height" },
  { label: "Marital Status", key: "maritalStatus" },
  { label: "City", key: "city" },
  { label: "State", key: "state" },
  { label: "Religion", key: "religion" },
  { label: "Community", key: "community" },
  { label: "Education", key: "education" },
  { label: "Profession", key: "profession" },
  { label: "Company", key: "company" },
  { label: "Income", key: "income" },
  { label: "Status", key: "status", badge: true },
  { label: "About", key: "bio" },
];

const PendingProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [detailsProfile, setDetailsProfile] = useState(null);
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
        const pendingOnly = (data.profiles || []).filter(
          (profile) => profile.status === "pending"
        );

        setProfiles(pendingOnly);
      }
    } catch (error) {
      console.log("Fetch pending profiles error:", error);
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
    plan: profile.user?.membershipPlan || "Free",
    status: "Pending",
    image:
      profile.photos?.[0]?.url ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        profile.fullName || "Vivah User"
      )}&background=132238&color=f4d06f`,
    bio: profile.bio || "Not added",
  }));

  const filtered = formattedProfiles.filter((profile) =>
    `${profile.name} ${profile.city} ${profile.state} ${profile.religion} ${profile.community} ${profile.profession}`
      .toLowerCase()
      .includes(search.toLowerCase())
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
      console.log("Update profile status error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pending Approval"
        desc="Review and approve member profiles awaiting verification."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Card className="p-5">
          <p className="text-sm text-white/60">Pending Profiles</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {formattedProfiles.length}
          </h3>
        </Card>

        <Card className="p-5">
          <p className="text-sm text-white/60">Need Review</p>
          <h3 className="mt-2 text-3xl font-black text-orange-300">
            {formattedProfiles.length}
          </h3>
        </Card>

        <Card className="p-5">
          <p className="text-sm text-white/60">Database</p>
          <h3 className="mt-2 text-3xl font-black text-[#f6b545]">Live</h3>
        </Card>
      </div>

      <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#132238] p-5 backdrop-blur-xl">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search pending profiles..."
        />
      </div>

      {loading ? (
        <Card className="p-8 text-center text-white/60">
          Loading pending profiles...
        </Card>
      ) : (
        <SimpleTable
          title="Pending Approval"
          desc={`${filtered.length} profiles waiting for admin verification.`}
          columns={[
            "Profile",
            "Age",
            "City",
            "Profession",
            "Plan",
            "Status",
            "Actions",
          ]}
          data={filtered}
          renderRow={(profile) => (
            <tr
              key={profile.id}
              className="border-b border-white/5 transition hover:bg-[#f6b545]/10"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="h-12 w-12 rounded-2xl object-cover ring-2 ring-white/10"
                  />

                  <div>
                    <h4 className="font-bold text-white">{profile.name}</h4>
                    <p className="text-xs text-white/50">
                      {profile.gender} • {profile.religion} •{" "}
                      {profile.community}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 text-white/80">{profile.age}</td>

              <td className="px-6 py-4 text-white/80">
                <p>{profile.city}</p>
                <p className="text-xs text-white/45">{profile.state}</p>
              </td>

              <td className="px-6 py-4 text-white/80">
                <p>{profile.profession}</p>
                <p className="text-xs text-white/45">{profile.company}</p>
              </td>

              <td className="px-6 py-4">
                <StatusBadge status={profile.plan} />
              </td>

              <td className="px-6 py-4">
                <StatusBadge status={profile.status} />
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDetailsProfile(profile)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#f6b545]/30 bg-[#f6b545]/5 text-[#f6b545]"
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    onClick={() => updateStatus(profile.id, "approved")}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-green-500/30 bg-green-500/10 text-green-300 hover:bg-green-500 hover:text-white"
                  >
                    <ShieldCheck size={16} />
                  </button>

                  <button
                    onClick={() => updateStatus(profile.id, "rejected")}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500 hover:text-white"
                  >
                    <XCircle size={16} />
                  </button>
                </div>
              </td>
            </tr>
          )}
        />
      )}

      <DetailsModal
        open={!!detailsProfile}
        title="Pending Profile Details"
        item={detailsProfile}
        fields={profileFields}
        onClose={() => setDetailsProfile(null)}
      />
    </div>
  );
};

export default PendingProfiles;