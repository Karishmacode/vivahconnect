import { useEffect, useState } from "react";
import {
  Crown,
  IndianRupee,
  Users,
  CalendarDays,
  BadgeCheck,
  RefreshCcw,
} from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import SearchInput from "../components/common/SearchInput";
import Card from "../components/common/Card";
import Modal from "../components/common/Modal";
import DetailsModal from "../components/common/DetailsModal";
import ConfirmModal from "../components/common/ConfirmModal";
import SimpleTable from "../components/tables/SimpleTable";
import StatusBadge from "../components/tables/StatusBadge";
import ActionButtons from "../components/tables/ActionButtons";
import PlanForm from "../components/forms/PlanForm";

const API_URL = "http://localhost:5000/api/admin/membership-plans";

const emptyForm = {
  name: "",
  price: "",
  duration: "",
  users: "",
  status: "Active",
  features: "",
};

const planFields = [
  { label: "Plan Name", key: "name" },
  { label: "Price", key: "price" },
  { label: "Duration", key: "duration" },
  { label: "Members", key: "users" },
  { label: "Status", key: "status", badge: true },
  { label: "Features", key: "features" },
];

const MembershipPlans = () => {
  const [plans, setPlans] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [detailsPlan, setDetailsPlan] = useState(null);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const token = localStorage.getItem("adminToken") || localStorage.getItem("token");

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch membership plans");
      }

      setPlans(data.plans || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const filtered = plans.filter((plan) =>
    `${plan.name} ${plan.price} ${plan.duration} ${plan.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalMembers = plans.reduce(
    (total, plan) => total + Number(plan.users || 0),
    0
  );

  const startingPrice =
    plans.length > 0
      ? `₹${Math.min(...plans.map((p) => Number(p.price) || 0)).toLocaleString(
          "en-IN"
        )}`
      : "₹0";

  const maxDuration =
    plans.length > 0
      ? `${Math.max(...plans.map((p) => Number(p.duration) || 0))} Days`
      : "0 Days";

  const formatPrice = (price) => {
    if (!price) return "₹0";
    return String(price).includes("₹")
      ? price
      : `₹${Number(price).toLocaleString("en-IN")}`;
  };

  const formatDuration = (duration) => {
    if (!duration) return "0 Days";
    return String(duration).toLowerCase().includes("day")
      ? duration
      : `${duration} Days`;
  };

  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setModalOpen(true);
  };

  const openEdit = (plan) => {
    setForm({
      name: plan.name || "",
      price: plan.price || "",
      duration: plan.duration || "",
      users: plan.users || "",
      status: plan.status || "Active",
      features: plan.features || "",
    });

    setEditId(plan._id || plan.id);
    setModalOpen(true);
  };

  const savePlan = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const method = editId ? "PUT" : "POST";
      const url = editId ? `${API_URL}/${editId}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to save plan");
      }

      await fetchPlans();
      setModalOpen(false);
      setForm(emptyForm);
      setEditId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const deletePlan = async () => {
    try {
      setError("");

      const res = await fetch(`${API_URL}/${deleteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete plan");
      }

      setPlans(plans.filter((plan) => (plan._id || plan.id) !== deleteId));
      setDeleteId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Membership Plans"
        desc="Create and manage premium membership plans and pricing."
        buttonText="+ Add Plan"
        onClick={openAdd}
      />

      {error && (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-5 py-4 text-sm font-semibold text-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Total Plans</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {plans.length}
              </h3>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6b545]/10 text-[#f6b545]">
              <Crown size={22} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Premium Members</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {totalMembers.toLocaleString("en-IN")}
              </h3>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#F4D06F]">
              <Users size={22} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Starting Price</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {startingPrice}
              </h3>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#F4D06F]">
              <IndianRupee size={22} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Max Duration</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {maxDuration}
              </h3>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#F4D06F]">
              <CalendarDays size={22} />
            </div>
          </div>
        </Card>
      </div>

      <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#132238] p-5 backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search plans by name, price or duration..."
            />
          </div>

          <button
            onClick={fetchPlans}
            className="flex items-center justify-center gap-2 rounded-2xl border border-[#D4AF37]/30 px-5 py-3 text-sm font-bold text-[#F4D06F] transition hover:bg-[#D4AF37]/10"
          >
            <RefreshCcw size={17} />
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#132238] p-10 text-center text-white/70">
          Loading membership plans...
        </div>
      ) : (
        <SimpleTable
          title="Membership Plans"
          desc={`${plans.length} premium subscription plans`}
          columns={["Plan", "Price", "Duration", "Members", "Status", "Actions"]}
          data={filtered}
          renderRow={(plan) => (
            <tr
              key={plan._id || plan.id}
              className="group border-b border-white/5 transition-all duration-300 hover:bg-[#f6b545]/10"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6b545]/10 text-[#f6b545] ring-1 ring-[#f6b545]/20">
                    <BadgeCheck size={20} />
                  </div>

                  <div>
                    <h4 className="font-bold text-white">{plan.name}</h4>
                    <p className="line-clamp-1 text-xs text-white/50">
                      {plan.features || "Membership benefits"}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 font-semibold text-white/85">
                {formatPrice(plan.price)}
              </td>

              <td className="px-6 py-4 text-white/80">
                {formatDuration(plan.duration)}
              </td>

              <td className="px-6 py-4 text-white/80">
                {Number(plan.users || 0).toLocaleString("en-IN")}
              </td>

              <td className="px-6 py-4">
                <StatusBadge status={plan.status} />
              </td>

              <td className="px-6 py-4">
                <ActionButtons
                  onView={() => setDetailsPlan(plan)}
                  onEdit={() => openEdit(plan)}
                  onDelete={() => setDeleteId(plan._id || plan.id)}
                />
              </td>
            </tr>
          )}
        />
      )}

      <Modal
        open={modalOpen}
        title={editId ? "Edit Plan" : "Add Plan"}
        onClose={() => setModalOpen(false)}
      >
        <PlanForm
          form={form}
          setForm={setForm}
          onSubmit={savePlan}
          saving={saving}
        />
      </Modal>

      <DetailsModal
        open={!!detailsPlan}
        title="Plan Details"
        item={
          detailsPlan
            ? {
                ...detailsPlan,
                price: formatPrice(detailsPlan.price),
                duration: formatDuration(detailsPlan.duration),
              }
            : null
        }
        fields={planFields}
        onClose={() => setDetailsPlan(null)}
      />

      <ConfirmModal
        open={!!deleteId}
        title="Delete Plan?"
        desc="This membership plan will be removed from the admin panel."
        onClose={() => setDeleteId(null)}
        onConfirm={deletePlan}
      />
    </div>
  );
};

export default MembershipPlans;