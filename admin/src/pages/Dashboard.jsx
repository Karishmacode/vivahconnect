import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Crown,
  Heart,
  UserCheck,
  Clock,
  CheckCircle,
  Wallet,
  BadgeCheck,
  Download,
  Eye,
} from "lucide-react";

import Card from "../components/common/Card";
import StatCard from "../components/common/StatCard";
import DetailsModal from "../components/common/DetailsModal";
import ConfirmModal from "../components/common/ConfirmModal";
import SimpleTable from "../components/tables/SimpleTable";
import StatusBadge from "../components/tables/StatusBadge";
import ActionButtons from "../components/tables/ActionButtons";

const API_URL = "http://localhost:5000/api/dashboard";

const userFields = [
  { label: "Email", key: "email" },
  { label: "Plan", key: "membershipPlan", badge: true },
  { label: "Joined On", key: "date" },
  { label: "Status", key: "status", badge: true },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [detailsUser, setDetailsUser] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [exported, setExported] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getToken = () =>
    localStorage.getItem("adminToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem("authToken");

  const fetchDashboard = async () => {
    const token = getToken();

    if (!token) {
      setError("Admin token missing. Please login again.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setStats(data.stats);
        setRecentUsers(data.recentUsers || []);
      } else {
        setError(data.message || "Failed to load dashboard.");
      }
    } catch (error) {
      console.log(error);
      setError("Server error while loading dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const mainStats = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      growth: "Live",
      icon: Users,
    },
    {
      title: "Premium Members",
      value: stats?.premiumMembers || 0,
      growth: "Live",
      icon: Crown,
    },
    {
      title: "Interests Sent",
      value: stats?.interestsSent || 0,
      growth: "Live",
      icon: Heart,
    },
    {
      title: "Successful Matches",
      value: stats?.successfulMatches || 0,
      growth: "Live",
      icon: UserCheck,
    },
  ];

  const miniStats = [
    {
      title: "Pending Verifications",
      value: stats?.pendingProfiles || 0,
      desc: "Need admin approval",
      icon: Clock,
    },
    {
      title: "New Users Today",
      value: stats?.newUsersToday || 0,
      desc: "Registered in 24 hours",
      icon: CheckCircle,
    },
    {
      title: "Revenue Today",
      value: `₹${stats?.revenueToday || 0}`,
      desc: "Membership purchases",
      icon: Wallet,
    },
    {
      title: "Active Subscriptions",
      value: stats?.activeSubscriptions || 0,
      desc: "Currently premium",
      icon: BadgeCheck,
    },
  ];

  const deleteUser = () => {
    setRecentUsers(recentUsers.filter((user) => user._id !== deleteId));
    setDeleteId(null);
  };

  const exportReport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  if (loading) {
    return <div className="py-20 text-center text-white/60">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-7">
      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-300">
          {error}
        </div>
      )}

      {exported && (
        <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-5 py-4 text-sm font-semibold text-[#F4D06F]">
          Report exported successfully.
        </div>
      )}

      <div className="flex flex-col gap-4 rounded-3xl border border-[#D4AF37]/25 bg-[#132238]/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-black text-white">Dashboard Controls</h2>
          <p className="mt-1 text-sm text-white/55">Updated: {today}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={exportReport}
            className="flex items-center gap-2 rounded-2xl bg-[#D4AF37] px-5 py-3 font-bold text-[#0B1220] transition hover:scale-105 hover:bg-[#F4D06F]"
          >
            <Download size={17} />
            Export Report
          </button>

          <button
            onClick={() => navigate("/reports")}
            className="flex items-center gap-2 rounded-2xl border border-[#D4AF37]/40 bg-white/5 px-5 py-3 font-semibold text-white transition hover:border-[#F4D06F] hover:bg-[#D4AF37]/10"
          >
            <Eye size={17} />
            View Reports
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {mainStats.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {miniStats.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title} className="p-5">
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/60">{item.title}</p>
                  <h3 className="mt-2 text-3xl font-black text-white">
                    {item.value}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-[#F4D06F]">
                    {item.desc}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                  <Icon size={22} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <SimpleTable
        title="Recent Users"
        desc="Latest registered users from database."
        columns={["User", "Plan", "Joined On", "Status", "Actions"]}
        data={recentUsers}
        renderRow={(user) => (
          <tr
            key={user._id}
            className="group border-b border-white/5 transition-all duration-300 hover:bg-[#D4AF37]/10"
          >
            <td className="px-6 py-4">
              <div>
                <h4 className="font-bold text-white">{user.name}</h4>
                <p className="text-xs text-white/55">{user.email}</p>
              </div>
            </td>

            <td className="px-6 py-4">
              <StatusBadge status={user.membershipPlan || "Free"} />
            </td>

            <td className="px-6 py-4 text-white/80">
              {new Date(user.createdAt).toLocaleDateString("en-IN")}
            </td>

            <td className="px-6 py-4">
              <StatusBadge status={user.status || "active"} />
            </td>

            <td className="px-6 py-4">
              <ActionButtons
                onView={() =>
                  setDetailsUser({
                    ...user,
                    date: new Date(user.createdAt).toLocaleDateString("en-IN"),
                  })
                }
                onEdit={() => navigate("/users")}
                onDelete={() => setDeleteId(user._id)}
              />
            </td>
          </tr>
        )}
      />

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
        desc="This user will be removed from recent users."
        onClose={() => setDeleteId(null)}
        onConfirm={deleteUser}
      />
    </div>
  );
};

export default Dashboard;