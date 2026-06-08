import { useState } from "react";
import {
  Bell,
  CheckCircle,
  Clock3,
  Send,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import SearchInput from "../components/common/SearchInput";
import Card from "../components/common/Card";
import Modal from "../components/common/Modal";
import DetailsModal from "../components/common/DetailsModal";
import ConfirmModal from "../components/common/ConfirmModal";
import FormInput from "../components/common/FormInput";
import SelectInput from "../components/common/SelectInput";
import SimpleTable from "../components/tables/SimpleTable";
import StatusBadge from "../components/tables/StatusBadge";

const initialNotifications = [
  {
    id: 1,
    title: "Profile Verification Reminder",
    audience: "Pending Users",
    type: "System",
    channel: "Email",
    scheduledDate: "Jun 16, 2024",
    status: "Sent",
    message:
      "Please complete your profile verification to improve your match visibility.",
  },
  {
    id: 2,
    title: "Premium Plan Offer",
    audience: "Free Users",
    type: "Marketing",
    channel: "Push",
    scheduledDate: "Jun 18, 2024",
    status: "Scheduled",
    message:
      "Upgrade to Premium today and get priority profile visibility for better matches.",
  },
  {
    id: 3,
    title: "Incomplete Profile Alert",
    audience: "All Users",
    type: "System",
    channel: "SMS",
    scheduledDate: "Jun 14, 2024",
    status: "Draft",
    message:
      "Your profile is incomplete. Add photos and personal details to receive better interests.",
  },
];

const emptyForm = {
  title: "",
  audience: "All Users",
  type: "System",
  channel: "Email",
  scheduledDate: "",
  status: "Draft",
  message: "",
};

const notificationFields = [
  { label: "Title", key: "title" },
  { label: "Audience", key: "audience" },
  { label: "Type", key: "type" },
  { label: "Channel", key: "channel" },
  { label: "Scheduled Date", key: "scheduledDate" },
  { label: "Status", key: "status", badge: true },
  { label: "Message", key: "message" },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);

  const [modalOpen, setModalOpen] = useState(false);
  const [detailsNotification, setDetailsNotification] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);

  const filtered = notifications.filter((item) =>
    `${item.title} ${item.audience} ${item.type} ${item.channel} ${item.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const sentCount = notifications.filter(
    (item) => item.status === "Sent"
  ).length;
  const scheduledCount = notifications.filter(
    (item) => item.status === "Scheduled"
  ).length;
  const draftCount = notifications.filter(
    (item) => item.status === "Draft"
  ).length;

  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setForm(item);
    setEditId(item.id);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveNotification = (e) => {
    e.preventDefault();

    if (editId) {
      setNotifications(
        notifications.map((item) =>
          item.id === editId ? { ...form, id: editId } : item
        )
      );
    } else {
      setNotifications([...notifications, { ...form, id: Date.now() }]);
    }

    setModalOpen(false);
  };

  const sendNotification = (id) => {
    setNotifications(
      notifications.map((item) =>
        item.id === id ? { ...item, status: "Sent" } : item
      )
    );
  };

  const scheduleNotification = (id) => {
    setNotifications(
      notifications.map((item) =>
        item.id === id ? { ...item, status: "Scheduled" } : item
      )
    );
  };

  const cancelNotification = (id) => {
    setNotifications(
      notifications.map((item) =>
        item.id === id ? { ...item, status: "Draft" } : item
      )
    );
  };

  const deleteNotification = () => {
    setNotifications(notifications.filter((item) => item.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        desc="Create, schedule and manage platform notifications."
        buttonText="+ Create Notification"
        onClick={openAdd}
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Total Notifications</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {notifications.length}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6b545]/10 text-[#f6b545]">
              <Bell size={22} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Sent</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {sentCount}
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
              <p className="text-sm text-white/60">Scheduled</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {scheduledCount}
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
              <p className="text-sm text-white/60">Drafts</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {draftCount}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
              <Users size={22} />
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
              onSearch={(query) => navigate(`/search?q=${query}`)}
              placeholder="Search notifications by title, audience or status..."
            />
          </div>
        </div>
      </div>

      <SimpleTable
        title="Notification Center"
        desc={`${notifications.length} platform notifications`}
        columns={[
          "Title",
          "Audience",
          "Type",
          "Channel",
          "Schedule",
          "Status",
          "Actions",
        ]}
        data={filtered}
        renderRow={(item) => (
          <tr
            key={item.id}
            className="group border-b border-white/5 transition-all duration-300 hover:bg-[#f6b545]/10"
          >
            <td className="px-6 py-4">
              <div>
                <h4 className="font-bold text-white">{item.title}</h4>
                <p className="max-w-[320px] truncate text-xs text-white/50">
                  {item.message}
                </p>
              </div>
            </td>

            <td className="px-6 py-4 text-white/80">{item.audience}</td>
            <td className="px-6 py-4 text-white/80">{item.type}</td>
            <td className="px-6 py-4 text-white/80">{item.channel}</td>
            <td className="px-6 py-4 text-white/80">{item.scheduledDate}</td>

            <td className="px-6 py-4">
              <StatusBadge status={item.status} />
            </td>

            <td className="px-6 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setDetailsNotification(item)}
                  title="View Details"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#f6b545]/30 bg-[#f6b545]/5 text-[#f6b545] transition-all duration-300 hover:scale-110 hover:bg-[#f6b545] hover:text-[#03261d]"
                >
                  <Bell size={16} />
                </button>

                <button
                  onClick={() => openEdit(item)}
                  title="Edit"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-500/30 bg-sky-500/5 text-sky-300 transition-all duration-300 hover:scale-110 hover:bg-sky-500 hover:text-white"
                >
                  ✎
                </button>

                {item.status !== "Sent" && (
                  <button
                    onClick={() => sendNotification(item.id)}
                    title="Send Now"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-green-500/30 bg-green-500/10 text-green-300 transition-all duration-300 hover:scale-110 hover:bg-green-500 hover:text-white"
                  >
                    <Send size={16} />
                  </button>
                )}

                {item.status === "Draft" && (
                  <button
                    onClick={() => scheduleNotification(item.id)}
                    title="Schedule"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-300 transition-all duration-300 hover:scale-110 hover:bg-orange-500 hover:text-white"
                  >
                    <Clock3 size={16} />
                  </button>
                )}

                {item.status === "Scheduled" && (
                  <button
                    onClick={() => cancelNotification(item.id)}
                    title="Cancel Schedule"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 transition-all duration-300 hover:scale-110 hover:bg-red-500 hover:text-white"
                  >
                    <XCircle size={16} />
                  </button>
                )}

                <button
                  onClick={() => setDeleteId(item.id)}
                  title="Delete"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/5 text-red-300 transition-all duration-300 hover:scale-110 hover:bg-red-500 hover:text-white"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        )}
      />

      <Modal
        open={modalOpen}
        title={editId ? "Edit Notification" : "Create Notification"}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={saveNotification} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormInput
              label="Notification Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter notification title"
            />

            <SelectInput
              label="Audience"
              name="audience"
              value={form.audience}
              onChange={handleChange}
              options={[
                "All Users",
                "Free Users",
                "Premium Users",
                "Pending Users",
              ]}
            />

            <SelectInput
              label="Type"
              name="type"
              value={form.type}
              onChange={handleChange}
              options={["System", "Marketing", "Reminder", "Alert"]}
            />

            <SelectInput
              label="Channel"
              name="channel"
              value={form.channel}
              onChange={handleChange}
              options={["Email", "Push", "SMS", "WhatsApp"]}
            />

            <FormInput
              label="Scheduled Date"
              name="scheduledDate"
              value={form.scheduledDate}
              onChange={handleChange}
              placeholder="Jun 18, 2024"
            />

            <SelectInput
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              options={["Draft", "Scheduled", "Sent"]}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="Write notification message..."
              className="w-full rounded-2xl border border-[#8f6b34]/40 bg-[#063527]/80 px-4 py-3 text-white outline-none placeholder:text-white/35 transition-all duration-300 hover:border-[#f6b545]/50 focus:border-[#f6b545] focus:shadow-[0_0_20px_rgba(246,181,69,0.15)]"
            />
          </div>

          <div className="flex justify-end">
            <button className="rounded-2xl bg-[#f6b545] px-8 py-3.5 font-bold text-[#03261d] transition-all duration-300 hover:scale-105 hover:bg-[#ffca68] hover:shadow-[0_0_30px_rgba(246,181,69,0.35)] active:scale-95">
              Save Notification
            </button>
          </div>
        </form>
      </Modal>

      <DetailsModal
        open={!!detailsNotification}
        title="Notification Details"
        item={detailsNotification}
        fields={notificationFields}
        onClose={() => setDetailsNotification(null)}
      />

      <ConfirmModal
        open={!!deleteId}
        title="Delete Notification?"
        desc="This notification will be removed from the admin panel."
        onClose={() => setDeleteId(null)}
        onConfirm={deleteNotification}
      />
    </div>
  );
};

export default Notifications;
