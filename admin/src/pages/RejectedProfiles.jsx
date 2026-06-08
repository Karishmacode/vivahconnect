import { useEffect, useState } from "react";
import { RotateCcw, XCircle, Eye, ShieldCheck, Trash2 } from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import SearchInput from "../components/common/SearchInput";
import Card from "../components/common/Card";
import DetailsModal from "../components/common/DetailsModal";
import ConfirmModal from "../components/common/ConfirmModal";
import SimpleTable from "../components/tables/SimpleTable";
import StatusBadge from "../components/tables/StatusBadge";

const API_URL = "http://localhost:5000/api/profiles";

const fields = [
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
  { label: "Plan", key: "plan", badge: true },
  { label: "Status", key: "status", badge: true },
  { label: "About", key: "bio" },
];

const RejectedProfiles = () => {
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
        const rejectedOnly = (data.profiles || []).filter(
          (profile) => profile.status === "rejected"
        );

        setProfiles(rejectedOnly);
      }
    } catch (error) {
      console.log("Fetch rejected profiles error:", error);
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
    status: "Rejected",
    reason: "Rejected during admin verification",
    image:
      profile.photos?.[0]?.url ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        profile.fullName || "Vivah User"
      )}&background=132238&color=f4d06f`,
    bio: profile.bio || "Not added",
  }));

  const filtered = formattedProfiles.filter((profile) =>
    `${profile.name} ${profile.city} ${profile.state} ${profile.religion} ${profile.community} ${profile.profession} ${profile.reason}`
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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Rejected Profiles"
        desc="Manage profiles rejected during the review process."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Card className="p-5">
          <XCircle className="mb-3 text-red-300" />
          <p className="text-sm text-white/60">Rejected Profiles</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {formattedProfiles.length}
          </h3>
        </Card>

        <Card className="p-5">
          <RotateCcw className="mb-3 text-[#f6b545]" />
          <p className="text-sm text-white/60">Can Be Restored</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {formattedProfiles.length}
          </h3>
        </Card>
      </div>

      <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#132238] p-5 backdrop-blur-xl">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search rejected profiles..."
        />
      </div>

      {loading ? (
        <Card className="p-8 text-center text-white/60">
          Loading rejected profiles...
        </Card>
      ) : (
        <SimpleTable
          title="Rejected Profiles"
          desc={`${filtered.length} profiles rejected during verification.`}
          columns={[
            "Profile",
            "City",
            "Profession",
            "Reason",
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
                      {profile.gender} • {profile.age} yrs • {profile.religion}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 text-white/80">
                <p>{profile.city}</p>
                <p className="text-xs text-white/45">{profile.state}</p>
              </td>

              <td className="px-6 py-4 text-white/80">
                <p>{profile.profession}</p>
                <p className="text-xs text-white/45">{profile.company}</p>
              </td>

              <td className="px-6 py-4 text-white/70">{profile.reason}</td>

              <td className="px-6 py-4">
                <StatusBadge status={profile.status} />
              </td>

              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setDetailsProfile(profile)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#f6b545]/30 bg-[#f6b545]/5 text-[#f6b545]"
                    title="View"
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    onClick={() => updateStatus(profile.id, "pending")}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-300 hover:bg-orange-500 hover:text-white"
                    title="Move to Pending"
                  >
                    <RotateCcw size={16} />
                  </button>

                  <button
                    onClick={() => updateStatus(profile.id, "approved")}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-green-500/30 bg-green-500/10 text-green-300 hover:bg-green-500 hover:text-white"
                    title="Approve"
                  >
                    <ShieldCheck size={16} />
                  </button>

                  <button
                    onClick={() => setDeleteId(profile.id)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500 hover:text-white"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          )}
        />
      )}

      <DetailsModal
        open={!!detailsProfile}
        title="Rejected Profile Details"
        item={detailsProfile}
        fields={fields}
        onClose={() => setDetailsProfile(null)}
      />

      <ConfirmModal
        open={!!deleteId}
        title="Delete Profile?"
        desc="This rejected profile will be permanently deleted from database."
        onClose={() => setDeleteId(null)}
        onConfirm={deleteProfile}
      />
    </div>
  );
};

export default RejectedProfiles;