import { useEffect, useState } from "react";
import { CheckCircle2, Image, XCircle, Eye } from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import SearchInput from "../components/common/SearchInput";
import Card from "../components/common/Card";
import SimpleTable from "../components/tables/SimpleTable";
import StatusBadge from "../components/tables/StatusBadge";
import DetailsModal from "../components/common/DetailsModal";

const API_URL = "http://localhost:5000/api/profiles";

const fields = [
  { label: "Name", key: "name" },
  { label: "Age", key: "age" },
  { label: "Gender", key: "gender" },
  { label: "City", key: "city" },
  { label: "Religion", key: "religion" },
  { label: "Profession", key: "profession" },
  { label: "Uploaded On", key: "uploaded" },
  { label: "Status", key: "status", badge: true },
];

const formatDate = (date) => {
  if (!date) return "Not added";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusLabel = (status) => {
  if (status === "approved") return "Verified";
  if (status === "rejected") return "Rejected";
  return "Pending";
};

const PhotoVerification = () => {
  const [photos, setPhotos] = useState([]);
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
        const uploadedPhotos = (data.profiles || []).filter(
          (profile) => profile.photos?.[0]?.url
        );

        setPhotos(uploadedPhotos);
      }
    } catch (error) {
      console.log("Fetch photo verification error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formattedPhotos = photos.map((profile) => ({
    id: profile._id,
    name: profile.fullName || profile.user?.name || "Unknown Profile",
    age: profile.age || "N/A",
    gender: profile.gender || "Not added",
    city: profile.city || "Not added",
    religion: profile.religion || "Not added",
    profession: profile.profession || "Not added",
    status: getStatusLabel(profile.status),
    rawStatus: profile.status || "pending",
    uploaded: formatDate(profile.updatedAt || profile.createdAt),
    image: profile.photos?.[0]?.url,
  }));

  const filtered = formattedPhotos.filter((photo) =>
    `${photo.name} ${photo.city} ${photo.religion} ${photo.profession} ${photo.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const pendingCount = formattedPhotos.filter(
    (photo) => photo.rawStatus === "pending"
  ).length;

  const approvedCount = formattedPhotos.filter(
    (photo) => photo.rawStatus === "approved"
  ).length;

  const rejectedCount = formattedPhotos.filter(
    (photo) => photo.rawStatus === "rejected"
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
      console.log("Photo status update error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Photo Verification"
        desc="Review uploaded profile photos from computer or mobile."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Card className="p-5">
          <Image className="mb-3 text-[#f6b545]" />
          <p className="text-sm text-white/60">Uploaded Photos</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {formattedPhotos.length}
          </h3>
        </Card>

        <Card className="p-5">
          <CheckCircle2 className="mb-3 text-green-300" />
          <p className="text-sm text-white/60">Verified Photos</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {approvedCount}
          </h3>
        </Card>

        <Card className="p-5">
          <XCircle className="mb-3 text-red-300" />
          <p className="text-sm text-white/60">Rejected Photos</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {rejectedCount}
          </h3>
        </Card>
      </div>

      <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#132238] p-5 backdrop-blur-xl">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search uploaded profile photos..."
        />
      </div>

      {loading ? (
        <Card className="p-8 text-center text-white/60">
          Loading uploaded photos...
        </Card>
      ) : (
        <SimpleTable
          title="Photo Verification"
          desc={`${filtered.length} uploaded photos • ${pendingCount} pending review`}
          columns={[
            "Photo",
            "User",
            "City",
            "Uploaded On",
            "Status",
            "Actions",
          ]}
          data={filtered}
          renderRow={(photo) => (
            <tr
              key={photo.id}
              className="border-b border-white/5 transition hover:bg-[#f6b545]/10"
            >
              <td className="px-6 py-4">
                <img
                  src={photo.image}
                  alt={photo.name}
                  className="h-20 w-20 rounded-2xl object-cover ring-2 ring-white/10"
                />
              </td>

              <td className="px-6 py-4">
                <p className="font-bold text-white">{photo.name}</p>
                <p className="text-xs text-white/50">
                  {photo.gender} • {photo.religion}
                </p>
              </td>

              <td className="px-6 py-4 text-white/80">{photo.city}</td>

              <td className="px-6 py-4 text-white/80">{photo.uploaded}</td>

              <td className="px-6 py-4">
                <StatusBadge status={photo.status} />
              </td>

              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setDetailsProfile(photo)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#f6b545]/30 bg-[#f6b545]/5 text-[#f6b545]"
                    title="View"
                  >
                    <Eye size={17} />
                  </button>

                  {photo.rawStatus !== "approved" && (
                    <button
                      onClick={() => updateStatus(photo.id, "approved")}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-green-500/30 bg-green-500/10 text-green-300 hover:bg-green-500 hover:text-white"
                      title="Approve"
                    >
                      <CheckCircle2 size={17} />
                    </button>
                  )}

                  {photo.rawStatus !== "rejected" && (
                    <button
                      onClick={() => updateStatus(photo.id, "rejected")}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500 hover:text-white"
                      title="Reject"
                    >
                      <XCircle size={17} />
                    </button>
                  )}

                  {photo.rawStatus !== "pending" && (
                    <button
                      onClick={() => updateStatus(photo.id, "pending")}
                      className="rounded-xl border border-orange-400/25 bg-orange-500/10 px-3 py-2 text-xs font-black text-orange-300 hover:bg-orange-500 hover:text-white"
                      title="Move to Pending"
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
        title="Photo Details"
        item={detailsProfile}
        fields={fields}
        onClose={() => setDetailsProfile(null)}
      />
    </div>
  );
};

export default PhotoVerification;


