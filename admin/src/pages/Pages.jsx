import { useEffect, useState } from "react";
import { FileText, Globe2, CheckCircle, Clock3 } from "lucide-react";

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

const API_URL = "http://localhost:5000/api/pages";

const emptyForm = {
  title: "",
  slug: "",
  category: "Company",
  status: "Active",
  heroImage: "",
  highlight: "",
  description: "",
  content: "",
};

const pageFields = [
  { label: "Title", key: "title" },
  { label: "Slug", key: "slug" },
  { label: "Category", key: "category" },
  { label: "Updated", key: "updated" },
  { label: "Status", key: "status", badge: true },
  { label: "Highlight", key: "highlight" },
  { label: "Description", key: "description" },
  { label: "Hero Image", key: "heroImage" },
  { label: "Content", key: "content" },
];

const categoryOptions = [
  "Company",
  "Legal",
  "Support",
  "Policy",
  "Terms",
  "Refund",
  "Privacy",
  "Safety",
];

const statusOptions = ["Active", "Pending", "Blocked"];

const formatDate = (date) => {
  if (!date) return "Not added";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const Pages = () => {
  const [pages, setPages] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [detailsPage, setDetailsPage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);

  const getToken = () =>
    localStorage.getItem("adminToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem("authToken");

  const fetchPages = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(API_URL);
      const data = await res.json();

      if (res.ok) {
        setPages(data.pages || []);
      } else {
        setError(data.message || "Failed to fetch pages.");
      }
    } catch (error) {
      console.log("Fetch pages error:", error);
      setError("Server error while fetching pages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const formattedPages = pages.map((page) => ({
    ...page,
    id: page._id,
    updated: formatDate(page.updatedAt),
  }));

  const filtered = formattedPages.filter((page) =>
    `${page.title || ""} ${page.slug || ""} ${page.category || ""} ${
      page.status || ""
    }`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const activeCount = formattedPages.filter((p) => p.status === "Active").length;
  const pendingCount = formattedPages.filter((p) => p.status === "Pending").length;

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

  const openEdit = (page) => {
    setError("");

    setForm({
      title: page.title || "",
      slug: page.slug || "",
      category: page.category || "Company",
      status: page.status || "Active",
      heroImage: page.heroImage || "",
      highlight: page.highlight || "",
      description: page.description || "",
      content: page.content || "",
    });

    setEditId(page._id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditId(null);
    setForm(emptyForm);
    setError("");
  };

  const savePage = async () => {
    if (!form.title || !form.slug) {
      setError("Title and slug are required.");
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
        await fetchPages();
        closeModal();
      } else {
        setError(data.message || "Failed to save page.");
      }
    } catch (error) {
      console.log("Save page error:", error);
      setError("Server error while saving page.");
    } finally {
      setSaving(false);
    }
  };

  const deletePage = async () => {
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
        await fetchPages();
        setDeleteId(null);
      } else {
        setError(data.message || "Failed to delete page.");
      }
    } catch (error) {
      console.log("Delete page error:", error);
      setError("Server error while deleting page.");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pages"
        desc="Manage static pages and website content."
        buttonText="+ Add Page"
        onClick={openAdd}
      />

      {error && (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <FileText className="mb-3 text-[#f6b545]" />
          <p className="text-sm text-white/60">Total Pages</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {formattedPages.length}
          </h3>
        </Card>

        <Card className="p-5">
          <CheckCircle className="mb-3 text-[#f6b545]" />
          <p className="text-sm text-white/60">Active Pages</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {activeCount}
          </h3>
        </Card>

        <Card className="p-5">
          <Clock3 className="mb-3 text-orange-300" />
          <p className="text-sm text-white/60">Pending Review</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {pendingCount}
          </h3>
        </Card>

        <Card className="p-5">
          <Globe2 className="mb-3 text-blue-300" />
          <p className="text-sm text-white/60">Live Website</p>
          <h3 className="mt-2 text-3xl font-black text-white">Online</h3>
        </Card>
      </div>

      <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#132238] p-5 backdrop-blur-xl">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search CMS pages..."
        />
      </div>

      {loading ? (
        <Card className="p-8 text-center text-white/60">
          Loading CMS pages...
        </Card>
      ) : (
        <SimpleTable
          title="CMS Pages"
          desc={`${filtered.length} website content pages`}
          columns={["Page", "Slug", "Category", "Updated", "Status", "Actions"]}
          data={filtered}
          renderRow={(page) => (
            <tr
              key={page._id}
              className="border-b border-white/5 transition hover:bg-[#f6b545]/10"
            >
              <td className="px-6 py-4">
                <p className="font-bold text-white">{page.title}</p>
                <p className="max-w-[320px] truncate text-xs text-white/45">
                  {page.description}
                </p>
              </td>

              <td className="px-6 py-4 text-white/70">/{page.slug}</td>
              <td className="px-6 py-4 text-white/80">{page.category}</td>
              <td className="px-6 py-4 text-white/80">{page.updated}</td>

              <td className="px-6 py-4">
                <StatusBadge status={page.status} />
              </td>

              <td className="px-6 py-4">
                <ActionButtons
                  onView={() => setDetailsPage(page)}
                  onEdit={() => openEdit(page)}
                  onDelete={() => setDeleteId(page._id)}
                />
              </td>
            </tr>
          )}
        />
      )}

      <Modal
        open={modalOpen}
        title={editId ? "Edit Page" : "Add Page"}
        onClose={closeModal}
      >
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormInput
              label="Page Title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />

            <FormInput
              label="Slug"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="about"
            />

            <SelectInput
              label="Category"
              name="category"
              value={form.category}
              onChange={(value) => handleSelectChange("category", value)}
              options={categoryOptions}
            />

            <SelectInput
              label="Status"
              name="status"
              value={form.status}
              onChange={(value) => handleSelectChange("status", value)}
              options={statusOptions}
            />

            <FormInput
              label="Highlight"
              name="highlight"
              value={form.highlight}
              onChange={handleChange}
              placeholder="VivahConnect"
            />

            <FormInput
              label="Hero Image URL"
              name="heroImage"
              value={form.heroImage}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Short page description..."
              className="w-full rounded-2xl border border-[#D4AF37]/20 bg-[#111C33] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#f6b545]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Content
            </label>

            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={5}
              placeholder="Write page content..."
              className="w-full rounded-2xl border border-[#D4AF37]/20 bg-[#111C33] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#f6b545]"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={savePage}
              disabled={saving}
              className="rounded-2xl bg-[#f6b545] px-8 py-3 font-bold text-[#03261d] disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Page"}
            </button>
          </div>
        </div>
      </Modal>

      <DetailsModal
        open={!!detailsPage}
        title="Page Details"
        item={detailsPage}
        fields={pageFields}
        onClose={() => setDetailsPage(null)}
      />

      <ConfirmModal
        open={!!deleteId}
        title="Delete Page?"
        desc="This CMS page will be removed permanently."
        onClose={() => setDeleteId(null)}
        onConfirm={deletePage}
      />
    </div>
  );
};

export default Pages;