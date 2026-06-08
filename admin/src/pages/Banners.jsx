import { useEffect, useState } from "react";
import { Image, Monitor, Smartphone, CheckCircle } from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import SearchInput from "../components/common/SearchInput";
import Modal from "../components/common/Modal";
import DetailsModal from "../components/common/DetailsModal";
import ConfirmModal from "../components/common/ConfirmModal";
import FormInput from "../components/common/FormInput";
import SelectInput from "../components/common/SelectInput";
import SimpleTable from "../components/tables/SimpleTable";
import StatusBadge from "../components/tables/StatusBadge";
import ActionButtons from "../components/tables/ActionButtons";

const API_URL = "http://localhost:5000/api/banners";

const emptyForm = {
  title: "",
  type: "Homepage",
  device: "Both",
  status: "Active",
  image: "",
  link: "",
};

const bannerFields = [
  { label: "Title", key: "title" },
  { label: "Type", key: "type" },
  { label: "Device", key: "device" },
  { label: "Status", key: "status", badge: true },
  { label: "Image URL", key: "image" },
  { label: "Link", key: "link" },
];

const typeOptions = ["Homepage", "Mobile App", "Promotion", "Festival", "Religious"];
const deviceOptions = ["Desktop", "Mobile", "Both"];
const statusOptions = ["Active", "Pending", "Blocked"];

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [detailsBanner, setDetailsBanner] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const getToken = () =>
    localStorage.getItem("adminToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem("authToken");

  const fetchBanners = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(API_URL);
      const data = await res.json();

      if (res.ok) {
        setBanners(data.banners || []);
      } else {
        setError(data.message || "Failed to fetch banners.");
      }
    } catch (error) {
      console.log("Fetch banners error:", error);
      setError("Server error while fetching banners.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const filtered = banners.filter((banner) =>
    `${banner.title || ""} ${banner.type || ""} ${banner.device || ""} ${
      banner.status || ""
    }`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const desktopCount = banners.filter(
    (b) => b.device === "Desktop" || b.device === "Both"
  ).length;

  const mobileCount = banners.filter(
    (b) => b.device === "Mobile" || b.device === "Both"
  ).length;

  const activeCount = banners.filter((b) => b.status === "Active").length;

  const handleChange = (e) => {
    if (!e?.target) return;

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, valueOrEvent) => {
    const value = valueOrEvent?.target ? valueOrEvent.target.value : valueOrEvent;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openAdd = () => {
    setError("");
    setForm(emptyForm);
    setEditId(null);
    setModalOpen(true);
  };

  const openEdit = (banner) => {
    setError("");

    setForm({
      title: banner.title || "",
      type: banner.type || "Homepage",
      device: banner.device || "Both",
      status: banner.status || "Active",
      image: banner.image || "",
      link: banner.link || "",
    });

    setEditId(banner._id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditId(null);
    setForm(emptyForm);
    setError("");
  };

  const saveBanner = async () => {
    if (!form.title || !form.image) {
      setError("Title and Image URL are required.");
      return;
    }

    const token = getToken();

    if (!token) {
      setError("Admin token missing. Please logout and login again.");
      return;
    }

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

      if (res.ok) {
        await fetchBanners();
        closeModal();
      } else {
        setError(data.message || "Failed to save banner.");
      }
    } catch (error) {
      console.log("Save banner error:", error);
      setError("Server error while saving banner.");
    } finally {
      setSaving(false);
    }
  };

  const deleteBanner = async () => {
    if (!deleteId) return;

    const token = getToken();

    if (!token) {
      setError("Admin token missing. Please logout and login again.");
      return;
    }

    try {
      setError("");

      const res = await fetch(`${API_URL}/${deleteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        await fetchBanners();
        setDeleteId(null);
      } else {
        setError(data.message || "Failed to delete banner.");
      }
    } catch (error) {
      console.log("Delete banner error:", error);
      setError("Server error while deleting banner.");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Banners"
        desc="Manage religious and promotional banners displayed across the platform."
        buttonText="+ Add Banner"
        onClick={openAdd}
      />

      {error && (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Total Banners</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {banners.length}
              </h3>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6b545]/10 text-[#f6b545]">
              <Image size={22} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <Monitor className="mb-3 text-blue-300" />
          <p className="text-sm text-white/60">Desktop</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {desktopCount}
          </h3>
        </Card>

        <Card className="p-5">
          <Smartphone className="mb-3 text-purple-300" />
          <p className="text-sm text-white/60">Mobile</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {mobileCount}
          </h3>
        </Card>

        <Card className="p-5">
          <CheckCircle className="mb-3 text-[#f6b545]" />
          <p className="text-sm text-white/60">Active</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {activeCount}
          </h3>
        </Card>
      </div>

      <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#132238]/70 p-5 backdrop-blur-xl">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search banners..."
        />
      </div>

      {loading ? (
        <Card className="p-8 text-center text-white/60">
          Loading banners...
        </Card>
      ) : (
        <SimpleTable
          title="Banner Management"
          desc={`${filtered.length} website banners`}
          columns={["Banner", "Type", "Device", "Status", "Actions"]}
          data={filtered}
          renderRow={(banner) => (
            <tr
              key={banner._id}
              className="border-b border-white/5 transition hover:bg-[#D4AF37]/10"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="h-14 w-20 rounded-2xl object-cover ring-2 ring-white/10"
                  />

                  <div>
                    <h4 className="font-bold text-white">{banner.title}</h4>
                    <p className="text-xs text-white/50">{banner.link}</p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 text-white/80">{banner.type}</td>
              <td className="px-6 py-4 text-white/80">{banner.device}</td>

              <td className="px-6 py-4">
                <StatusBadge status={banner.status} />
              </td>

              <td className="px-6 py-4">
                <ActionButtons
                  onView={() => setDetailsBanner(banner)}
                  onEdit={() => openEdit(banner)}
                  onDelete={() => setDeleteId(banner._id)}
                />
              </td>
            </tr>
          )}
        />
      )}

      <Modal
        open={modalOpen}
        title={editId ? "Edit Banner" : "Add Banner"}
        onClose={closeModal}
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormInput
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />

          <FormInput
            label="Link"
            name="link"
            value={form.link}
            onChange={handleChange}
          />

          <SelectInput
            label="Type"
            name="type"
            value={form.type}
            onChange={(value) => handleSelectChange("type", value)}
            options={typeOptions}
          />

          <SelectInput
            label="Device"
            name="device"
            value={form.device}
            onChange={(value) => handleSelectChange("device", value)}
            options={deviceOptions}
          />

          <SelectInput
            label="Status"
            name="status"
            value={form.status}
            onChange={(value) => handleSelectChange("status", value)}
            options={statusOptions}
          />

          <div className="md:col-span-2">
            <FormInput
              label="Image URL"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          {form.image && (
            <div className="md:col-span-2">
              <p className="mb-2 text-sm font-semibold text-white/70">
                Preview
              </p>
              <img
                src={form.image}
                alt="Banner preview"
                className="h-44 w-full rounded-2xl border border-[#D4AF37]/20 object-cover"
              />
            </div>
          )}

          <div className="md:col-span-2 flex justify-end">
            <button
              type="button"
              onClick={saveBanner}
              disabled={saving}
              className="rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F4D06F] px-8 py-3 font-bold text-[#0B1220] disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Banner"}
            </button>
          </div>
        </div>
      </Modal>

      <DetailsModal
        open={!!detailsBanner}
        title="Banner Details"
        item={detailsBanner}
        fields={bannerFields}
        onClose={() => setDetailsBanner(null)}
      />

      <ConfirmModal
        open={!!deleteId}
        title="Delete Banner?"
        desc="This banner will be removed from database."
        onClose={() => setDeleteId(null)}
        onConfirm={deleteBanner}
      />
    </div>
  );
};

export default Banners;