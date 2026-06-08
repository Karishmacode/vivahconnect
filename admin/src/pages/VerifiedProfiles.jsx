import { useEffect, useState } from "react";
import { ShieldCheck, BadgeCheck, Users } from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import SearchInput from "../components/common/SearchInput";
import Card from "../components/common/Card";
import DetailsModal from "../components/common/DetailsModal";
import ConfirmModal from "../components/common/ConfirmModal";
import SimpleTable from "../components/tables/SimpleTable";
import StatusBadge from "../components/tables/StatusBadge";
import ActionButtons from "../components/tables/ActionButtons";

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

const VerifiedProfiles = () => {
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
        const approvedOnly = (data.profiles || []).filter(
          (profile) => profile.status === "approved"
        );

        setProfiles(approvedOnly);
      }
    } catch (error) {
      console.log("Fetch verified profiles error:", error);
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
    status: "Verified",
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

  const premiumCount = formattedProfiles.filter(
    (profile) => profile.plan !== "Free"
  ).length;

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
        title="Verified Profiles"
        desc="View approved profiles that have successfully passed verification."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Card className="p-5">
          <Users className="mb-3 text-[#f6b545]" />
          <p className="text-sm text-white/60">Verified Profiles</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {formattedProfiles.length}
          </h3>
        </Card>

        <Card className="p-5">
          <ShieldCheck className="mb-3 text-green-300" />
          <p className="text-sm text-white/60">Trusted Members</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {formattedProfiles.length}
          </h3>
        </Card>

        <Card className="p-5">
          <BadgeCheck className="mb-3 text-[#f6b545]" />
          <p className="text-sm text-white/60">Premium Verified</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {premiumCount}
          </h3>
        </Card>
      </div>

      <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#132238] p-5 backdrop-blur-xl">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search verified profiles..."
        />
      </div>

      {loading ? (
        <Card className="p-8 text-center text-white/60">
          Loading verified profiles...
        </Card>
      ) : (
        <SimpleTable
          title="Verified Profiles"
          desc={`${filtered.length} approved and trusted matrimonial profiles.`}
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
                <ActionButtons
                  onView={() => setDetailsProfile(profile)}
                  onDelete={() => setDeleteId(profile.id)}
                />

                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => updateStatus(profile.id, "pending")}
                    className="rounded-xl border border-orange-400/25 bg-orange-500/10 px-3 py-2 text-xs font-black text-orange-300 hover:bg-orange-500 hover:text-white"
                  >
                    Pending
                  </button>

                  <button
                    onClick={() => updateStatus(profile.id, "rejected")}
                    className="rounded-xl border border-red-400/25 bg-red-500/10 px-3 py-2 text-xs font-black text-red-300 hover:bg-red-500 hover:text-white"
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          )}
        />
      )}

      <DetailsModal
        open={!!detailsProfile}
        title="Verified Profile Details"
        item={detailsProfile}
        fields={fields}
        onClose={() => setDetailsProfile(null)}
      />

      <ConfirmModal
        open={!!deleteId}
        title="Delete Profile?"
        desc="This verified profile will be permanently deleted from database."
        onClose={() => setDeleteId(null)}
        onConfirm={deleteProfile}
      />
    </div>
  );
};

export default VerifiedProfiles;