import { useEffect, useState } from "react";
import { HelpCircle, CheckCircle, Clock3, Tags } from "lucide-react";

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

const API_URL = "http://localhost:5000/api/faqs";

const emptyForm = {
  question: "",
  category: "Account",
  status: "Active",
  answer: "",
};

const faqFields = [
  { label: "Question", key: "question" },
  { label: "Category", key: "category" },
  { label: "Status", key: "status", badge: true },
  { label: "Answer", key: "answer" },
];

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [detailsFaq, setDetailsFaq] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const getToken = () =>
    localStorage.getItem("adminToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem("authToken");

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(API_URL);
      const data = await res.json();

      if (res.ok) {
        setFaqs(data.faqs || []);
      } else {
        setError(data.message || "Failed to fetch FAQs.");
      }
    } catch (error) {
      console.log("Fetch FAQs error:", error);
      setError("Server error while fetching FAQs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const filtered = faqs.filter((faq) =>
    `${faq.question || ""} ${faq.category || ""} ${faq.status || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const activeCount = faqs.filter((f) => f.status === "Active").length;
  const pendingCount = faqs.filter((f) => f.status === "Pending").length;
  const categories = new Set(faqs.map((f) => f.category)).size;

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

  const openEdit = (faq) => {
    setError("");

    setForm({
      question: faq.question || "",
      category: faq.category || "Account",
      status: faq.status || "Active",
      answer: faq.answer || "",
    });

    setEditId(faq._id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditId(null);
    setForm(emptyForm);
    setError("");
  };

  const saveFaq = async () => {
    if (!form.question || !form.answer) {
      setError("Question and answer are required.");
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
        await fetchFaqs();
        closeModal();
      } else {
        setError(data.message || "Failed to save FAQ.");
      }
    } catch (error) {
      console.log("Save FAQ error:", error);
      setError("Server error while saving FAQ.");
    } finally {
      setSaving(false);
    }
  };

  const deleteFaq = async () => {
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
        await fetchFaqs();
        setDeleteId(null);
      } else {
        setError(data.message || "Failed to delete FAQ.");
      }
    } catch (error) {
      console.log("Delete FAQ error:", error);
      setError("Server error while deleting FAQ.");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="FAQs"
        desc="Manage frequently asked questions and help content."
        buttonText="+ Add FAQ"
        onClick={openAdd}
      />

      {error && (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <HelpCircle className="mb-3 text-[#D4AF37]" />
          <p className="text-sm text-white/60">Total FAQs</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {faqs.length}
          </h3>
        </Card>

        <Card className="p-5">
          <CheckCircle className="mb-3 text-[#F4D06F]" />
          <p className="text-sm text-white/60">Active FAQs</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {activeCount}
          </h3>
        </Card>

        <Card className="p-5">
          <Clock3 className="mb-3 text-[#D4AF37]" />
          <p className="text-sm text-white/60">Pending</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {pendingCount}
          </h3>
        </Card>

        <Card className="p-5">
          <Tags className="mb-3 text-[#8FA3BF]" />
          <p className="text-sm text-white/60">Categories</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {categories}
          </h3>
        </Card>
      </div>

      <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#132238]/70 p-5">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search FAQs..."
        />
      </div>

      {loading ? (
        <Card className="p-8 text-center text-white/60">
          Loading FAQs...
        </Card>
      ) : (
        <SimpleTable
          title="FAQ Management"
          desc={`${filtered.length} frequently asked questions`}
          columns={["Question", "Category", "Status", "Actions"]}
          data={filtered}
          renderRow={(faq) => (
            <tr
              key={faq._id}
              className="border-b border-white/5 transition hover:bg-[#D4AF37]/10"
            >
              <td className="px-6 py-4">
                <h4 className="font-bold text-white">{faq.question}</h4>
                <p className="max-w-[420px] truncate text-xs text-white/50">
                  {faq.answer}
                </p>
              </td>

              <td className="px-6 py-4 text-white/80">{faq.category}</td>

              <td className="px-6 py-4">
                <StatusBadge status={faq.status} />
              </td>

              <td className="px-6 py-4">
                <ActionButtons
                  onView={() => setDetailsFaq(faq)}
                  onEdit={() => openEdit(faq)}
                  onDelete={() => setDeleteId(faq._id)}
                />
              </td>
            </tr>
          )}
        />
      )}

      <Modal
        open={modalOpen}
        title={editId ? "Edit FAQ" : "Add FAQ"}
        onClose={closeModal}
      >
        <div className="space-y-5">
          <FormInput
            label="Question"
            name="question"
            value={form.question}
            onChange={handleChange}
            placeholder="Enter question"
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <SelectInput
              label="Category"
              name="category"
              value={form.category}
              onChange={(value) => handleSelectChange("category", value)}
              options={[
                "Account",
                "Membership",
                "Verification",
                "Privacy",
                "Payments",
              ]}
            />

            <SelectInput
              label="Status"
              name="status"
              value={form.status}
              onChange={(value) => handleSelectChange("status", value)}
              options={["Active", "Pending", "Blocked"]}
            />
          </div>

          <textarea
            name="answer"
            value={form.answer}
            onChange={handleChange}
            rows={5}
            placeholder="Write answer..."
            className="w-full rounded-2xl border border-[#D4AF37]/20 bg-[#132238]/85 px-4 py-3 text-white outline-none placeholder:text-white/35 transition-all duration-300 hover:border-[#D4AF37]/40 focus:border-[#D4AF37] focus:bg-[#162B45] focus:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={saveFaq}
              disabled={saving}
              className="rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F4D06F] px-8 py-3 font-bold text-[#0B1220] disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save FAQ"}
            </button>
          </div>
        </div>
      </Modal>

      <DetailsModal
        open={!!detailsFaq}
        title="FAQ Details"
        item={detailsFaq}
        fields={faqFields}
        onClose={() => setDetailsFaq(null)}
      />

      <ConfirmModal
        open={!!deleteId}
        title="Delete FAQ?"
        desc="This FAQ will be removed from database."
        onClose={() => setDeleteId(null)}
        onConfirm={deleteFaq}
      />
    </div>
  );
};

export default FAQs;