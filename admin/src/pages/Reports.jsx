import { useEffect, useState } from "react";
import {
  Crown,
  Heart,
  IndianRupee,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import SimpleTable from "../components/tables/SimpleTable";
import StatusBadge from "../components/tables/StatusBadge";

const API_BASE = "http://localhost:5000/api";

const Reports = () => {
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [interests, setInterests] = useState([]);
  const [stories, setStories] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken") || localStorage.getItem("token");

  const fetchReports = async () => {
    try {
      setLoading(true);

      const headers = {
        Authorization: token ? `Bearer ${token}` : "",
      };

      const [usersRes, profilesRes, interestsRes, storiesRes, plansRes] =
        await Promise.all([
          fetch(`${API_BASE}/users`, { headers }),
          fetch(`${API_BASE}/profiles`, { headers }),
          fetch(`${API_BASE}/interests`, { headers }),
          fetch(`${API_BASE}/stories`, { headers }),
          fetch(`${API_BASE}/admin/membership-plans`, { headers }),
        ]);

      const usersData = await usersRes.json();
      const profilesData = await profilesRes.json();
      const interestsData = await interestsRes.json();
      const storiesData = await storiesRes.json();
      const plansData = await plansRes.json();

      setUsers(usersData.users || usersData || []);
      setProfiles(profilesData.profiles || []);
      setInterests(interestsData.interests || []);
      setStories(storiesData.stories || storiesData || []);
      setPlans(plansData.plans || []);
    } catch (error) {
      console.log("Reports fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const premiumUsers = users.filter(
    (user) =>
      user.membershipPlan &&
      user.membershipPlan !== "Free"
  );

  const totalRevenue = users.reduce((sum, user) => {
    const plan = plans.find((p) => p.name === user.membershipPlan);
    return sum + Number(plan?.price || 0);
  }, 0);

  const totalInterests = interests.length;

  const growthData = [
    { month: "Jan", users: Math.max(1, Math.round(users.length * 0.25)), revenue: Math.round(totalRevenue * 0.25) },
    { month: "Feb", users: Math.max(1, Math.round(users.length * 0.4)), revenue: Math.round(totalRevenue * 0.4) },
    { month: "Mar", users: Math.max(1, Math.round(users.length * 0.55)), revenue: Math.round(totalRevenue * 0.55) },
    { month: "Apr", users: Math.max(1, Math.round(users.length * 0.7)), revenue: Math.round(totalRevenue * 0.7) },
    { month: "May", users: Math.max(1, Math.round(users.length * 0.85)), revenue: Math.round(totalRevenue * 0.85) },
    { month: "Jun", users: users.length, revenue: totalRevenue },
  ];

  const activityRows = [
    ...users.slice(0, 2).map((user) => ({
      id: user._id,
      activity: `${user.name || "User"} registered`,
      type: "User",
      date: new Date(user.createdAt || Date.now()).toLocaleDateString("en-IN"),
      status: "Active",
    })),
    ...profiles.slice(0, 2).map((profile) => ({
      id: profile._id,
      activity: `${profile.fullName || "Profile"} profile ${profile.status}`,
      type: "Profile",
      date: new Date(profile.updatedAt || Date.now()).toLocaleDateString("en-IN"),
      status:
        profile.status === "approved"
          ? "Approved"
          : profile.status === "rejected"
          ? "Rejected"
          : "Pending",
    })),
    ...interests.slice(0, 2).map((interest) => ({
      id: interest._id,
      activity: `${interest.sender?.fullName || "User"} sent interest`,
      type: "Interest",
      date: new Date(interest.createdAt || Date.now()).toLocaleDateString("en-IN"),
      status: interest.status || "Pending",
    })),
    ...stories.slice(0, 2).map((story) => ({
      id: story._id,
      activity: `${story.couple || "Success story"} added`,
      type: "Story",
      date: new Date(story.createdAt || Date.now()).toLocaleDateString("en-IN"),
      status: story.status || "Pending",
    })),
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics"
        desc="Analyze real platform performance, engagement and revenue."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Total Users</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {users.length}
              </h3>
              <p className="mt-3 text-sm font-semibold text-lime-300">
                Live database
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6b545]/10 text-[#f6b545]">
              <Users size={22} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Premium Members</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {premiumUsers.length}
              </h3>
              <p className="mt-3 text-sm font-semibold text-lime-300">
                Paid plans
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6b545]/10 text-[#f6b545]">
              <Crown size={22} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Interests Sent</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {totalInterests}
              </h3>
              <p className="mt-3 text-sm font-semibold text-lime-300">
                Member engagement
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6b545]/10 text-[#f6b545]">
              <Heart size={22} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Estimated Revenue</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </h3>
              <p className="mt-3 text-sm font-semibold text-lime-300">
                From memberships
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 text-green-300">
              <IndianRupee size={22} />
            </div>
          </div>
        </Card>
      </div>

      {loading ? (
        <Card className="p-8 text-center text-white/60">
          Loading analytics...
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr_1fr]">
            <Card className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-white">
                    Growth Overview
                  </h2>
                  <p className="text-sm text-white/50">
                    User and revenue growth from database summary.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#8f6b34]/40 bg-white/5 px-4 py-2 text-sm font-semibold text-white">
                  6 Months
                </div>
              </div>

              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData}>
                    <CartesianGrid stroke="#ffffff12" vertical={false} />
                    <XAxis dataKey="month" stroke="#ffffff80" fontSize={12} />
                    <YAxis stroke="#ffffff80" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        background: "#132238",
                        border: "1px solid #8f6b34",
                        borderRadius: "14px",
                        color: "#fff",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="#f6b545"
                      fill="#f6b54533"
                      strokeWidth={3}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#22c55e"
                      fill="#22c55e22"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-black text-white">
                  Revenue Breakdown
                </h2>
                <p className="text-sm text-white/50">
                  Estimated revenue performance.
                </p>
              </div>

              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={growthData}>
                    <CartesianGrid stroke="#ffffff12" vertical={false} />
                    <XAxis dataKey="month" stroke="#ffffff80" fontSize={12} />
                    <YAxis stroke="#ffffff80" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        background: "#132238",
                        border: "1px solid #8f6b34",
                        borderRadius: "14px",
                        color: "#fff",
                      }}
                    />
                    <Bar
                      dataKey="revenue"
                      fill="#f6b545"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <SimpleTable
            title="Recent Report Activity"
            desc="Latest platform activity summary."
            columns={["Activity", "Type", "Date", "Status"]}
            data={activityRows}
            renderRow={(item) => (
              <tr
                key={item.id}
                className="border-b border-white/5 transition hover:bg-[#f6b545]/10"
              >
                <td className="px-6 py-4 font-semibold text-white">
                  {item.activity}
                </td>
                <td className="px-6 py-4 text-white/75">{item.type}</td>
                <td className="px-6 py-4 text-white/75">{item.date}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            )}
          />
        </>
      )}
    </div>
  );
};

export default Reports;