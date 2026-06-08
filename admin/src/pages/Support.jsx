import { useEffect, useState } from "react";
import {
  CheckCircle,
  Clock3,
  Headphones,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Ticket,
  UserCheck,
  XCircle,
} from "lucide-react";

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

const API_URL = "http://localhost:5000/api/support";

const emptyTicket = {
  ticketId: "",
  user: "",
  email: "",
  subject: "",
  category: "Account",
  priority: "Medium",
  status: "Pending",
  channel: "Email",
  message: "",
  reply: "",
};

const ticketFields = [
  { label: "Ticket ID", key: "ticketId" },
  { label: "User", key: "user" },
  { label: "Email", key: "email" },
  { label: "Subject", key: "subject" },
  { label: "Category", key: "category" },
  { label: "Priority", key: "priority" },
  { label: "Channel", key: "channel" },
  { label: "Status", key: "status", badge: true },
  { label: "Message", key: "message" },
  { label: "Admin Reply", key: "reply" },
];

const Support = () => {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyTicket);
  const [replyText, setReplyText] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [detailsTicket, setDetailsTicket] = useState(null);
  const [replyTicket, setReplyTicket] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const getToken = () =>
    localStorage.getItem("adminToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem("authToken");

  const fetchTickets = async () => {
    const token = getToken();

    if (!token) {
      setError("Admin token missing. Please logout and login again.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setTickets(data.tickets || []);
      } else {
        setError(data.message || "Failed to fetch tickets.");
      }
    } catch (error) {
      console.log("Fetch tickets error:", error);
      setError("Server error while fetching tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filtered = tickets.filter((ticket) =>
    `${ticket.ticketId || ""} ${ticket.user || ""} ${ticket.email || ""} ${
      ticket.subject || ""
    } ${ticket.category || ""} ${ticket.priority || ""} ${
      ticket.status || ""
    }`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const pendingCount = tickets.filter((t) => t.status === "Pending").length;
  const resolvedCount = tickets.filter((t) => t.status === "Approved").length;
  const highPriorityCount = tickets.filter((t) => t.priority === "High").length;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const openAdd = () => {
    setError("");
    setForm({
      ...emptyTicket,
      ticketId: `VC-${Date.now().toString().slice(-6)}`,
    });
    setEditId(null);
    setModalOpen(true);
  };

  const openEdit = (ticket) => {
    setError("");

    setForm({
      ticketId: ticket.ticketId || "",
      user: ticket.user || "",
      email: ticket.email || "",
      subject: ticket.subject || "",
      category: ticket.category || "Account",
      priority: ticket.priority || "Medium",
      status: ticket.status || "Pending",
      channel: ticket.channel || "Email",
      message: ticket.message || "",
      reply: ticket.reply || "",
    });

    setEditId(ticket._id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditId(null);
    setForm(emptyTicket);
    setError("");
  };

  const saveTicket = async () => {
    if (!form.user || !form.email || !form.subject || !form.message) {
      setError("User, email, subject and message are required.");
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
        await fetchTickets();
        closeModal();
      } else {
        setError(data.message || "Failed to save ticket.");
      }
    } catch (error) {
      console.log("Save ticket error:", error);
      setError("Server error while saving ticket.");
    } finally {
      setSaving(false);
    }
  };

  const openReply = (ticket) => {
    setReplyTicket(ticket);
    setReplyText(ticket.reply || "");
    setReplyModalOpen(true);
  };

  const sendReply = async () => {
    if (!replyTicket) return;

    const token = getToken();

    if (!token) {
      setError("Admin token missing. Please logout and login again.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const res = await fetch(`${API_URL}/${replyTicket._id}/reply`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reply: replyText }),
      });

      const data = await res.json();

      if (res.ok) {
        await fetchTickets();
        setReplyModalOpen(false);
        setReplyTicket(null);
        setReplyText("");
      } else {
        setError(data.message || "Failed to send reply.");
      }
    } catch (error) {
      console.log("Reply ticket error:", error);
      setError("Server error while sending reply.");
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (id, status) => {
    const token = getToken();

    if (!token) {
      setError("Admin token missing. Please logout and login again.");
      return;
    }

    try {
      setError("");

      const res = await fetch(`${API_URL}/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (res.ok) {
        await fetchTickets();
      } else {
        setError(data.message || "Failed to update ticket status.");
      }
    } catch (error) {
      console.log("Status update error:", error);
      setError("Server error while updating status.");
    }
  };

  const deleteTicket = async () => {
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
        await fetchTickets();
        setDeleteId(null);
      } else {
        setError(data.message || "Failed to delete ticket.");
      }
    } catch (error) {
      console.log("Delete ticket error:", error);
      setError("Server error while deleting ticket.");
    }
  };

  const PriorityBadge = ({ priority }) => {
    const styles = {
      High: "border-red-500/30 bg-red-500/10 text-red-300",
      Medium: "border-orange-500/30 bg-orange-500/10 text-orange-300",
      Low: "border-blue-500/30 bg-blue-500/10 text-blue-300",
    };

    return (
      <span
        className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${
          styles[priority] || styles.Medium
        }`}
      >
        {priority}
      </span>
    );
  };

  const ActionButton = ({ title, icon: Icon, onClick, className = "" }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 hover:scale-110 ${className}`}
    >
      <Icon size={16} />
    </button>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Support & Help"
        desc="Manage support requests and help resources."
      />

      {error && (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Total Tickets</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {tickets.length}
              </h3>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6b545]/10 text-[#f6b545]">
              <Ticket size={22} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Pending</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {pendingCount}
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
              <p className="text-sm text-white/60">Resolved</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {resolvedCount}
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
              <p className="text-sm text-white/60">High Priority</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {highPriorityCount}
              </h3>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-300">
              <Headphones size={22} />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6b545]/10 text-[#f6b545]">
              <Mail size={22} />
            </div>
            <div>
              <h3 className="font-bold text-white">Email Support</h3>
              <p className="text-sm text-white/55">support@vivahconnect.com</p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 text-green-300">
              <Phone size={22} />
            </div>
            <div>
              <h3 className="font-bold text-white">Phone Support</h3>
              <p className="text-sm text-white/55">+91 98765 43210</p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
              <MessageCircle size={22} />
            </div>
            <div>
              <h3 className="font-bold text-white">Live Chat</h3>
              <p className="text-sm text-white/55">Available 10 AM - 7 PM</p>
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
              placeholder="Search tickets by user, subject, category or status..."
            />
          </div>

          <button
            type="button"
            onClick={openAdd}
            className="whitespace-nowrap rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F4D06F] px-6 py-3 font-bold text-[#0B1220] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] active:scale-95"
          >
            + Create Ticket
          </button>
        </div>
      </div>

      {loading ? (
        <Card className="p-8 text-center text-white/60">
          Loading tickets...
        </Card>
      ) : (
        <SimpleTable
          title="Support Tickets"
          desc={`${filtered.length} customer support requests`}
          columns={[
            "Ticket",
            "User",
            "Category",
            "Priority",
            "Channel",
            "Status",
            "Actions",
          ]}
          data={filtered}
          renderRow={(ticket) => (
            <tr
              key={ticket._id}
              className="group border-b border-white/5 transition-all duration-300 hover:bg-[#f6b545]/10"
            >
              <td className="px-6 py-4">
                <div>
                  <h4 className="font-bold text-white">{ticket.ticketId}</h4>
                  <p className="max-w-[280px] truncate text-xs text-white/50">
                    {ticket.subject}
                  </p>
                </div>
              </td>

              <td className="px-6 py-4">
                <h4 className="font-semibold text-white">{ticket.user}</h4>
                <p className="text-xs text-white/50">{ticket.email}</p>
              </td>

              <td className="px-6 py-4 text-white/80">{ticket.category}</td>

              <td className="px-6 py-4">
                <PriorityBadge priority={ticket.priority} />
              </td>

              <td className="px-6 py-4 text-white/80">{ticket.channel}</td>

              <td className="px-6 py-4">
                <StatusBadge status={ticket.status} />
              </td>

              <td className="px-6 py-4">
                <div className="flex flex-wrap items-center gap-2">
                  <ActionButton
                    title="View"
                    icon={Ticket}
                    onClick={() => setDetailsTicket(ticket)}
                    className="border-[#f6b545]/30 bg-[#f6b545]/5 text-[#f6b545] hover:bg-[#f6b545] hover:text-[#03261d]"
                  />

                  <ActionButton
                    title="Edit"
                    icon={UserCheck}
                    onClick={() => openEdit(ticket)}
                    className="border-sky-500/30 bg-sky-500/5 text-sky-300 hover:bg-sky-500 hover:text-white"
                  />

                  <ActionButton
                    title="Reply"
                    icon={Send}
                    onClick={() => openReply(ticket)}
                    className="border-green-500/30 bg-green-500/10 text-green-300 hover:bg-green-500 hover:text-white"
                  />

                  {ticket.status !== "Approved" ? (
                    <ActionButton
                      title="Mark Resolved"
                      icon={CheckCircle}
                      onClick={() => updateStatus(ticket._id, "Approved")}
                      className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500 hover:text-white"
                    />
                  ) : (
                    <ActionButton
                      title="Reopen Ticket"
                      icon={Clock3}
                      onClick={() => updateStatus(ticket._id, "Active")}
                      className="border-orange-500/30 bg-orange-500/10 text-orange-300 hover:bg-orange-500 hover:text-white"
                    />
                  )}

                  <ActionButton
                    title="Delete"
                    icon={XCircle}
                    onClick={() => setDeleteId(ticket._id)}
                    className="border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500 hover:text-white"
                  />
                </div>
              </td>
            </tr>
          )}
        />
      )}

      <Modal
        open={modalOpen}
        title={editId ? "Edit Ticket" : "Create Ticket"}
        onClose={closeModal}
      >
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormInput label="Ticket ID" name="ticketId" value={form.ticketId} onChange={handleChange} placeholder="VC-1027" />
            <FormInput label="User Name" name="user" value={form.user} onChange={handleChange} placeholder="User name" />
            <FormInput label="Email" name="email" value={form.email} onChange={handleChange} placeholder="user@email.com" />
            <FormInput label="Subject" name="subject" value={form.subject} onChange={handleChange} placeholder="Ticket subject" />

            <SelectInput label="Category" name="category" value={form.category} onChange={handleChange} options={["Account", "Payment", "Verification", "Profile", "Membership"]} />
            <SelectInput label="Priority" name="priority" value={form.priority} onChange={handleChange} options={["Low", "Medium", "High"]} />
            <SelectInput label="Channel" name="channel" value={form.channel} onChange={handleChange} options={["Email", "Chat", "Phone", "WhatsApp"]} />
            <SelectInput label="Status" name="status" value={form.status} onChange={handleChange} options={["Pending", "Active", "Approved", "Rejected"]} />
          </div>

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="Write customer issue..."
            className="w-full rounded-2xl border border-[#D4AF37]/20 bg-[#132238]/85 px-4 py-3 text-white outline-none placeholder:text-white/35 transition-all duration-300 hover:border-[#D4AF37]/40 focus:border-[#D4AF37]"
          />

          <textarea
            name="reply"
            value={form.reply}
            onChange={handleChange}
            rows={3}
            placeholder="Admin reply..."
            className="w-full rounded-2xl border border-[#D4AF37]/20 bg-[#132238]/85 px-4 py-3 text-white outline-none placeholder:text-white/35 transition-all duration-300 hover:border-[#D4AF37]/40 focus:border-[#D4AF37]"
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={saveTicket}
              disabled={saving}
              className="rounded-2xl bg-[#f6b545] px-8 py-3 font-bold text-[#03261d] transition-all duration-300 hover:scale-105 hover:bg-[#ffca68] disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Ticket"}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={replyModalOpen}
        title="Reply to Ticket"
        onClose={() => setReplyModalOpen(false)}
      >
        <div className="space-y-5">
          {replyTicket && (
            <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#132238]/60 p-4">
              <h3 className="font-bold text-white">{replyTicket.subject}</h3>
              <p className="mt-1 text-sm text-white/55">
                {replyTicket.user} • {replyTicket.email}
              </p>
              <p className="mt-3 text-sm text-white/70">
                {replyTicket.message}
              </p>
            </div>
          )}

          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            rows={5}
            placeholder="Write admin reply..."
            className="w-full rounded-2xl border border-[#D4AF37]/20 bg-[#132238]/85 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#f6b545]"
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={sendReply}
              disabled={saving}
              className="rounded-2xl bg-[#f6b545] px-8 py-3 font-bold text-[#03261d] transition hover:scale-105 hover:bg-[#ffca68] disabled:opacity-60"
            >
              {saving ? "Sending..." : "Send Reply"}
            </button>
          </div>
        </div>
      </Modal>

      <DetailsModal
        open={!!detailsTicket}
        title="Ticket Details"
        item={detailsTicket}
        fields={ticketFields}
        onClose={() => setDetailsTicket(null)}
      />

      <ConfirmModal
        open={!!deleteId}
        title="Delete Ticket?"
        desc="This support ticket will be removed from database."
        onClose={() => setDeleteId(null)}
        onConfirm={deleteTicket}
      />
    </div>
  );
};

export default Support;