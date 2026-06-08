import { useEffect, useState } from "react";
import { HeartHandshake, Clock3, CheckCircle, MapPin } from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import SearchInput from "../components/common/SearchInput";
import Card from "../components/common/Card";
import Modal from "../components/common/Modal";
import DetailsModal from "../components/common/DetailsModal";
import ConfirmModal from "../components/common/ConfirmModal";
import SimpleTable from "../components/tables/SimpleTable";
import StatusBadge from "../components/tables/StatusBadge";
import ActionButtons from "../components/tables/ActionButtons";
import FormInput from "../components/common/FormInput";
import SelectInput from "../components/common/SelectInput";

const API_URL = "http://localhost:5000/api/stories";

const emptyForm = {
  couple: "",
  title: "",
  city: "",
  weddingDate: "",
  status: "Pending",
  image: "",
  story: "",
};

const storyFields = [
  { label: "Couple", key: "couple" },
  { label: "Title", key: "title" },
  { label: "City", key: "city" },
  { label: "Wedding Date", key: "weddingDate" },
  { label: "Status", key: "status", badge: true },
  { label: "Story", key: "story" },
];

const SuccessStories = () => {
  const [search, setSearch] = useState("");
  const [stories, setStories] = useState([]);
  const [form, setForm] = useState(emptyForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [detailsStory, setDetailsStory] = useState(null);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchStories = async () => {
    try {
      setLoading(true);

      const res = await fetch(API_URL);
      const data = await res.json();

      if (res.ok) {
        setStories(Array.isArray(data) ? data : data.stories || []);
      }
    } catch (error) {
      console.log("Fetch stories error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const filtered = stories.filter((story) =>
    `${story.couple} ${story.title} ${story.city} ${story.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const approved = stories.filter((story) => story.status === "Approved").length;
  const pending = stories.filter((story) => story.status === "Pending").length;

  const featuredCities = new Set(
    stories.map((story) => story.city).filter(Boolean)
  ).size;

  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setModalOpen(true);
  };

  const openEdit = (story) => {
    setForm({
      couple: story.couple || "",
      title: story.title || "",
      city: story.city || "",
      weddingDate: story.weddingDate || "",
      status: story.status || "Pending",
      image: story.image || "",
      story: story.story || "",
    });

    setEditId(story._id);
    setModalOpen(true);
  };

  const saveStory = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const method = editId ? "PUT" : "POST";
      const url = editId ? `${API_URL}/${editId}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        await fetchStories();
        setModalOpen(false);
        setEditId(null);
        setForm(emptyForm);
      }
    } catch (error) {
      console.log("Save story error:", error);
    } finally {
      setSaving(false);
    }
  };

  const deleteStory = async () => {
    if (!deleteId) return;

    try {
      const res = await fetch(`${API_URL}/${deleteId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await fetchStories();
        setDeleteId(null);
      }
    } catch (error) {
      console.log("Delete story error:", error);
    }
  };

  const updateStoryStatus = async (story, status) => {
    try {
      const res = await fetch(`${API_URL}/${story._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...story,
          status,
        }),
      });

      if (res.ok) {
        fetchStories();
      }
    } catch (error) {
      console.log("Update story status error:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Success Stories"
        desc="Manage success stories shared by members."
        buttonText="+ Add Story"
        onClick={openAdd}
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Total Stories</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {stories.length}
              </h3>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6b545]/10 text-[#f6b545]">
              <HeartHandshake size={22} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Approved</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {approved}
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
              <p className="text-sm text-white/60">Pending Review</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {pending}
              </h3>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-300">
              <Clock3 size={22} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Featured Cities</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {featuredCities}
              </h3>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
              <MapPin size={22} />
            </div>
          </div>
        </Card>
      </div>

      <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#132238] p-5 backdrop-blur-xl">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search success stories..."
        />
      </div>

      {loading ? (
        <Card className="p-8 text-center text-white/60">
          Loading success stories...
        </Card>
      ) : (
        <SimpleTable
          title="Success Stories"
          desc={`${filtered.length} customer marriage stories`}
          columns={["Couple", "City", "Wedding Date", "Status", "Actions"]}
          data={filtered}
          renderRow={(story) => (
            <tr
              key={story._id}
              className="group border-b border-white/5 transition-all duration-300 hover:bg-[#f6b545]/10"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      story.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        story.couple || "Success Story"
                      )}&background=132238&color=f4d06f`
                    }
                    alt={story.couple}
                    className="h-12 w-12 rounded-2xl object-cover ring-2 ring-white/10 transition group-hover:ring-[#f6b545]/60"
                  />

                  <div>
                    <h4 className="font-bold text-white">{story.couple}</h4>
                    <p className="max-w-[260px] truncate text-xs text-white/50">
                      {story.title || story.story}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 text-white/80">{story.city}</td>

              <td className="px-6 py-4 text-white/80">
                {story.weddingDate}
              </td>

              <td className="px-6 py-4">
                <StatusBadge status={story.status} />
              </td>

              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  <ActionButtons
                    onView={() => setDetailsStory(story)}
                    onEdit={() => openEdit(story)}
                    onDelete={() => setDeleteId(story._id)}
                  />

                  {story.status !== "Approved" && (
                    <button
                      onClick={() => updateStoryStatus(story, "Approved")}
                      className="rounded-xl border border-green-400/25 bg-green-500/10 px-3 py-2 text-xs font-black text-green-300 hover:bg-green-500 hover:text-white"
                    >
                      Approve
                    </button>
                  )}

                  {story.status !== "Pending" && (
                    <button
                      onClick={() => updateStoryStatus(story, "Pending")}
                      className="rounded-xl border border-orange-400/25 bg-orange-500/10 px-3 py-2 text-xs font-black text-orange-300 hover:bg-orange-500 hover:text-white"
                    >
                      Pending
                    </button>
                  )}

                  {story.status !== "Rejected" && (
                    <button
                      onClick={() => updateStoryStatus(story, "Rejected")}
                      className="rounded-xl border border-red-400/25 bg-red-500/10 px-3 py-2 text-xs font-black text-red-300 hover:bg-red-500 hover:text-white"
                    >
                      Reject
                    </button>
                  )}
                </div>
              </td>
            </tr>
          )}
        />
      )}

      <Modal
        open={modalOpen}
        title={editId ? "Edit Story" : "Add Story"}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={saveStory} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormInput
              label="Couple Name"
              name="couple"
              value={form.couple}
              onChange={handleChange}
              placeholder="Aarohi & Rohan"
            />

            <FormInput
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="A beautiful VivahConnect journey"
            />

            <FormInput
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Delhi"
            />

            <FormInput
              label="Wedding Date"
              name="weddingDate"
              value={form.weddingDate}
              onChange={handleChange}
              placeholder="Dec 12, 2024"
            />

            <SelectInput
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              options={["Approved", "Pending", "Rejected"]}
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
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Story
            </label>

            <textarea
              name="story"
              value={form.story}
              onChange={handleChange}
              rows={4}
              placeholder="Write success story..."
              className="w-full rounded-2xl border border-[#D4AF37]/20 bg-[#111C33] px-4 py-3 text-white outline-none placeholder:text-white/35 transition-all duration-300 hover:border-[#f6b545]/50 focus:border-[#f6b545] focus:shadow-[0_0_20px_rgba(246,181,69,0.15)]"
            />
          </div>

          <div className="flex justify-end">
            <button
              disabled={saving}
              className="rounded-2xl bg-[#f6b545] px-8 py-3.5 font-bold text-[#050914] transition-all duration-300 hover:scale-105 hover:bg-[#ffca68] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Story"}
            </button>
          </div>
        </form>
      </Modal>

      <DetailsModal
        open={!!detailsStory}
        title="Success Story Details"
        item={detailsStory}
        fields={storyFields}
        onClose={() => setDetailsStory(null)}
      />

      <ConfirmModal
        open={!!deleteId}
        title="Delete Story?"
        desc="This success story will be removed permanently."
        onClose={() => setDeleteId(null)}
        onConfirm={deleteStory}
      />
    </div>
  );
};

export default SuccessStories;