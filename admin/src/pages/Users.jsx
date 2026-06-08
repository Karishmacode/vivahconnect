import { useEffect, useState } from "react";
import {
  ShieldCheck,
  UserCheck,
  Crown,
  Users as UsersIcon,
  RefreshCcw,
} from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import SearchInput from "../components/common/SearchInput";
import Card from "../components/common/Card";
import DetailsModal from "../components/common/DetailsModal";
import ConfirmModal from "../components/common/ConfirmModal";
import SimpleTable from "../components/tables/SimpleTable";
import StatusBadge from "../components/tables/StatusBadge";
import ActionButtons from "../components/tables/ActionButtons";

const API_URL = "http://localhost:5000/api/users";

const fallbackImage =
  "https://ui-avatars.com/api/?name=User&background=132238&color=F4D06F";

const userFields = [
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Phone", key: "phone" },
  { label: "Plan", key: "membershipPlan", badge: true },
  { label: "Membership Status", key: "membershipStatus", badge: true },
  { label: "Account Status", key: "status", badge: true },
  { label: "Interest Limit", key: "interestLimit" },
  { label: "Interests Used", key: "interestsSentThisMonth" },
];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [detailsUser, setDetailsUser] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("adminToken") || localStorage.getItem("token");

  const fetchUsers = async () => {
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
        throw new Error(data.message || "Failed to fetch users");
      }

      setUsers(data.users || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = users.filter((user) =>
    `${user.name} ${user.email} ${user.phone || ""} ${
      user.membershipPlan || user.plan || ""
    } ${user.status || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const premiumUsers = users.filter(
    (user) => (user.membershipPlan || user.plan) !== "Free"
  ).length;

  const activeUsers = users.filter((user) => user.status === "active").length;
  const verifiedUsers = users.filter((user) => user.isVerified).length;

  const deleteUser = async () => {
    try {
      const res = await fetch(`${API_URL}/${deleteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      setUsers(users.filter((user) => user._id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleStatus = async (user) => {
    try {
      const nextStatus = user.status === "active" ? "blocked" : "active";

      const res = await fetch(`${API_URL}/${user._id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: nextStatus }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update user status");
      }

      setUsers(
        users.map((item) =>
          item._id === user._id ? { ...item, status: nextStatus } : item
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        desc="Manage registered members, memberships and account status."
        buttonText="Refresh"
        onClick={fetchUsers}
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
              <p className="text-sm text-white/60">Total Users</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {users.length}
              </h3>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6b545]/10 text-[#f6b545]">
              <UsersIcon size={22} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Premium Users</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {premiumUsers}
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
              <p className="text-sm text-white/60">Active Users</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {activeUsers}
              </h3>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <UserCheck size={22} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Verified Users</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {verifiedUsers}
              </h3>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6b545]/10 text-[#f6b545]">
              <ShieldCheck size={22} />
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
              placeholder="Search users by name, email, phone or plan..."
            />
          </div>

          <button
            onClick={fetchUsers}
            className="flex items-center justify-center gap-2 rounded-2xl border border-[#D4AF37]/30 px-5 py-3 text-sm font-bold text-[#F4D06F] transition hover:bg-[#D4AF37]/10"
          >
            <RefreshCcw size={17} />
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#132238] p-10 text-center text-white/70">
          Loading users...
        </div>
      ) : (
        <SimpleTable
          title="User List"
          desc={`${users.length} registered users`}
          columns={[
            "User",
            "Email",
            "Plan",
            "Interests",
            "Status",
            "Actions",
          ]}
          data={filtered}
          renderRow={(user) => (
            <tr
              key={user._id}
              className="group border-b border-white/5 transition-all duration-300 hover:bg-[#f6b545]/10"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      user.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.name || "User"
                      )}&background=132238&color=F4D06F`
                    }
                    alt={user.name}
                    className="h-12 w-12 rounded-2xl object-cover ring-2 ring-white/10 transition group-hover:ring-[#f6b545]/60"
                  />
                  <div>
                    <h4 className="font-bold text-white">{user.name}</h4>
                    <p className="text-xs text-white/50">
                      {user.phone || "No phone"}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 text-white/80">{user.email}</td>

              <td className="px-6 py-4">
                <StatusBadge status={user.membershipPlan || user.plan || "Free"} />
              </td>

              <td className="px-6 py-4 text-white/80">
                {user.interestsSentThisMonth || 0} /{" "}
                {user.interestLimit >= 999999
                  ? "Unlimited"
                  : user.interestLimit || 3}
              </td>

              <td className="px-6 py-4">
                <StatusBadge
                  status={user.status === "active" ? "Active" : "Blocked"}
                />
              </td>

              <td className="px-6 py-4">
                <ActionButtons
                  onView={() => setDetailsUser(user)}
                  onEdit={() => toggleStatus(user)}
                  onDelete={() => setDeleteId(user._id)}
                />
              </td>
            </tr>
          )}
        />
      )}

      <DetailsModal
        open={!!detailsUser}
        title="User Details"
        item={detailsUser}
        fields={userFields}
        onClose={() => setDetailsUser(null)}
      />

      <ConfirmModal
        open={!!deleteId}
        title="Delete User?"
        desc="This user account will be removed permanently."
        onClose={() => setDeleteId(null)}
        onConfirm={deleteUser}
      />
    </div>
  );
};

export default Users;