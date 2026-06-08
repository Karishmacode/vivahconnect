import { useEffect, useState } from "react";
import {
  CheckCircle,
  Clock,
  Heart,
  XCircle,
  Send,
  Trash2,
} from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import SearchInput from "../components/common/SearchInput";
import Card from "../components/common/Card";
import DetailsModal from "../components/common/DetailsModal";
import ConfirmModal from "../components/common/ConfirmModal";
import SimpleTable from "../components/tables/SimpleTable";
import StatusBadge from "../components/tables/StatusBadge";

const API_URL = "http://localhost:5000/api/interests";

const interestFields = [
  { label: "From", key: "from" },
  { label: "To", key: "to" },
  { label: "From City", key: "fromCity" },
  { label: "To City", key: "toCity" },
  { label: "Date", key: "date" },
  { label: "Status", key: "status", badge: true },
  { label: "Message", key: "message" },
];

const formatDate = (date) => {
  if (!date) return "Not added";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const Interests = () => {
  const [search, setSearch] = useState("");
  const [interests, setInterests] = useState([]);
  const [detailsInterest, setDetailsInterest] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchInterests = async () => {
    try {
      setLoading(true);

      const res = await fetch(API_URL, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await res.json();

      if (res.ok) {
        setInterests(data.interests || []);
      }
    } catch (error) {
      console.log("Fetch interests error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formattedInterests = interests.map((item) => ({
    id: item._id,
    from: item.sender?.fullName || "Unknown Sender",
    to: item.receiver?.fullName || "Unknown Receiver",
    fromCity: item.sender?.city || "Not added",
    toCity: item.receiver?.city || "Not added",
    fromReligion: item.sender?.religion || "Not added",
    toReligion: item.receiver?.religion || "Not added",
    date: formatDate(item.createdAt),
    status: item.status || "Pending",
    message:
      item.status === "Accepted"
        ? "Interest accepted by receiver."
        : item.status === "Rejected"
        ? "Interest rejected by receiver."
        : "Interest request is waiting for response.",
  }));

  const filtered = formattedInterests.filter((item) =>
    `${item.from} ${item.to} ${item.status} ${item.fromCity} ${item.toCity}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const total = formattedInterests.length;
  const pending = formattedInterests.filter(
    (item) => item.status === "Pending"
  ).length;
  const accepted = formattedInterests.filter(
    (item) => item.status === "Accepted"
  ).length;
  const rejected = formattedInterests.filter(
    (item) => item.status === "Rejected"
  ).length;

  const updateInterestStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/${id}/admin-status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        fetchInterests();
      }
    } catch (error) {
      console.log("Update interest status error:", error);
    }
  };

  const deleteInterest = async () => {
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
        fetchInterests();
      }
    } catch (error) {
      console.log("Delete interest error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Interests"
        desc="Track and manage real interest requests between members."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Total Interests</p>
              <h3 className="mt-2 text-3xl font-black text-white">{total}</h3>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6b545]/10 text-[#f6b545]">
              <Heart size={22} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Pending</p>
              <h3 className="mt-2 text-3xl font-black text-white">{pending}</h3>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-300">
              <Clock size={22} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Accepted</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {accepted}
              </h3>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 text-green-300">
              <CheckCircle size={22} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Rejected</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {rejected}
              </h3>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-300">
              <XCircle size={22} />
            </div>
          </div>
        </Card>
      </div>

      <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#132238] p-5 backdrop-blur-xl">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search interests by name, city or status..."
        />
      </div>

      {loading ? (
        <Card className="p-8 text-center text-white/60">
          Loading interests from database...
        </Card>
      ) : (
        <SimpleTable
          title="Interest Requests"
          desc={`${filtered.length} real interest requests from MongoDB`}
          columns={["From", "To", "Cities", "Date", "Status", "Actions"]}
          data={filtered}
          renderRow={(item) => (
            <tr
              key={item.id}
              className="group border-b border-white/5 transition-all duration-300 hover:bg-[#f6b545]/10"
            >
              <td className="px-6 py-4">
                <div>
                  <h4 className="font-bold text-white">{item.from}</h4>
                  <p className="text-xs text-white/50">
                    {item.fromReligion} • Sender
                  </p>
                </div>
              </td>

              <td className="px-6 py-4">
                <div>
                  <h4 className="font-semibold text-white">{item.to}</h4>
                  <p className="text-xs text-white/50">
                    {item.toReligion} • Receiver
                  </p>
                </div>
              </td>

              <td className="px-6 py-4 text-white/75">
                {item.fromCity} → {item.toCity}
              </td>

              <td className="px-6 py-4 text-white/75">{item.date}</td>

              <td className="px-6 py-4">
                <StatusBadge status={item.status} />
              </td>

              <td className="px-6 py-4">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setDetailsInterest(item)}
                    title="View"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#f6b545]/30 bg-[#f6b545]/5 text-[#f6b545] transition-all hover:scale-110 hover:bg-[#f6b545] hover:text-[#03261d]"
                  >
                    <Send size={16} />
                  </button>

                  {item.status !== "Accepted" && (
                    <button
                      onClick={() => updateInterestStatus(item.id, "Accepted")}
                      title="Accept"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-green-500/30 bg-green-500/10 text-green-300 transition-all hover:scale-110 hover:bg-green-500 hover:text-white"
                    >
                      <CheckCircle size={16} />
                    </button>
                  )}

                  {item.status !== "Rejected" && (
                    <button
                      onClick={() => updateInterestStatus(item.id, "Rejected")}
                      title="Reject"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 transition-all hover:scale-110 hover:bg-red-500 hover:text-white"
                    >
                      <XCircle size={16} />
                    </button>
                  )}

                  {item.status !== "Pending" && (
                    <button
                      onClick={() => updateInterestStatus(item.id, "Pending")}
                      title="Move to Pending"
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-black text-white/70 transition hover:bg-white/10"
                    >
                      Pending
                    </button>
                  )}

                  <button
                    onClick={() => setDeleteId(item.id)}
                    title="Delete"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 transition-all hover:scale-110 hover:bg-red-500 hover:text-white"
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
        open={!!detailsInterest}
        title="Interest Details"
        item={detailsInterest}
        fields={interestFields}
        onClose={() => setDetailsInterest(null)}
      />

      <ConfirmModal
        open={!!deleteId}
        title="Delete Interest?"
        desc="This interest request will be permanently removed from database."
        onClose={() => setDeleteId(null)}
        onConfirm={deleteInterest}
      />
    </div>
  );
};

export default Interests;