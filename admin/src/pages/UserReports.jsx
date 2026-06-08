import { useEffect, useState } from "react";
import { MapPin, UserCheck, Users, VenusAndMars } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import PageHeader from "../components/common/PageHeader";
import SearchInput from "../components/common/SearchInput";
import Card from "../components/common/Card";
import SimpleTable from "../components/tables/SimpleTable";
import StatusBadge from "../components/tables/StatusBadge";

const API_BASE = "http://localhost:5000/api";

const formatDate = (date) => {
  if (!date) return "Not added";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const UserReports = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken") || localStorage.getItem("token");

  const fetchReports = async () => {
    try {
      setLoading(true);

      const headers = {
        Authorization: token ? `Bearer ${token}` : "",
      };

      const [usersRes, profilesRes] = await Promise.all([
        fetch(`${API_BASE}/users`, { headers }),
        fetch(`${API_BASE}/profiles`, { headers }),
      ]);

      const usersData = await usersRes.json();
      const profilesData = await profilesRes.json();

      setUsers(usersData.users || usersData || []);
      setProfiles(profilesData.profiles || []);
    } catch (error) {
      console.log("User reports fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formattedUsers = users.map((user) => {
    const profile = profiles.find(
      (item) => item.user?._id === user._id || item.user === user._id
    );

    return {
      id: user._id,
      name: user.name || profile?.fullName || "Unknown User",
      email: user.email || "Not added",
      city: profile?.city || "Not added",
      gender: profile?.gender || "Not added",
      plan: user.membershipPlan || "Free",
      joined: formatDate(user.createdAt),
      status: user.isBlocked ? "Blocked" : "Active",
    };
  });

  const filtered = formattedUsers.filter((user) =>
    `${user.name} ${user.email} ${user.city} ${user.gender} ${user.plan}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const activeUsers = formattedUsers.filter((user) => user.status === "Active");
  const premiumUsers = formattedUsers.filter((user) => user.plan !== "Free");

  const cityCounts = profiles.reduce((acc, profile) => {
    const city = profile.city || "Not added";
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});

  const cityData = Object.entries(cityCounts)
    .map(([city, count]) => ({
      city,
      users: count,
    }))
    .sort((a, b) => b.users - a.users)
    .slice(0, 5);

  const brideCount = profiles.filter((profile) => profile.gender === "Bride").length;
  const groomCount = profiles.filter((profile) => profile.gender === "Groom").length;

  const genderData = [
    { name: "Bride", value: brideCount },
    { name: "Groom", value: groomCount },
  ];

  const topCity = cityData[0]?.city || "N/A";

  const totalGender = brideCount + groomCount;
  const brideRatio = totalGender
    ? Math.round((brideCount / totalGender) * 100)
    : 0;
  const groomRatio = totalGender
    ? Math.round((groomCount / totalGender) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Reports"
        desc="Analyze real user growth, demographics, engagement and location insights."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <Users className="mb-3 text-[#f6b545]" />
          <p className="text-sm text-white/60">Total Users</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {formattedUsers.length}
          </h3>
        </Card>

        <Card className="p-5">
          <UserCheck className="mb-3 text-green-300" />
          <p className="text-sm text-white/60">Active Users</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {activeUsers.length}
          </h3>
        </Card>

        <Card className="p-5">
          <MapPin className="mb-3 text-blue-300" />
          <p className="text-sm text-white/60">Top City</p>
          <h3 className="mt-2 text-3xl font-black text-white">{topCity}</h3>
        </Card>

        <Card className="p-5">
          <VenusAndMars className="mb-3 text-purple-300" />
          <p className="text-sm text-white/60">Bride/Groom Ratio</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {brideRatio}:{groomRatio}
          </h3>
        </Card>
      </div>

      {loading ? (
        <Card className="p-8 text-center text-white/60">
          Loading user reports...
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_1fr]">
            <Card className="p-6">
              <h2 className="text-xl font-black text-white">Users by City</h2>
              <p className="mb-6 text-sm text-white/50">
                Top cities based on real profile data.
              </p>

              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cityData}>
                    <CartesianGrid stroke="#ffffff12" vertical={false} />
                    <XAxis dataKey="city" stroke="#ffffff80" fontSize={12} />
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
                      dataKey="users"
                      fill="#f6b545"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-black text-white">
                Gender Distribution
              </h2>
              <p className="mb-6 text-sm text-white/50">
                Bride and groom profile split.
              </p>

              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={70}
                      outerRadius={105}
                      paddingAngle={4}
                    >
                      <Cell fill="#f6b545" />
                      <Cell fill="#22c55e" />
                    </Pie>

                    <Tooltip
                      contentStyle={{
                        background: "#132238",
                        border: "1px solid #8f6b34",
                        borderRadius: "14px",
                        color: "#fff",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 flex justify-center gap-4 text-sm font-bold text-white/70">
                <span>Bride: {brideCount}</span>
                <span>Groom: {groomCount}</span>
              </div>
            </Card>
          </div>

          <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#132238] p-5 backdrop-blur-xl">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search user reports..."
            />
          </div>

          <SimpleTable
            title="User Report Table"
            desc={`${filtered.length} registered users with activity and plan status.`}
            columns={["User", "City", "Gender", "Plan", "Joined", "Status"]}
            data={filtered}
            renderRow={(user) => (
              <tr
                key={user.id}
                className="border-b border-white/5 transition hover:bg-[#f6b545]/10"
              >
                <td className="px-6 py-4">
                  <p className="font-semibold text-white">{user.name}</p>
                  <p className="text-xs text-white/45">{user.email}</p>
                </td>

                <td className="px-6 py-4 text-white/75">{user.city}</td>

                <td className="px-6 py-4 text-white/75">{user.gender}</td>

                <td className="px-6 py-4">
                  <StatusBadge status={user.plan} />
                </td>

                <td className="px-6 py-4 text-white/75">{user.joined}</td>

                <td className="px-6 py-4">
                  <StatusBadge status={user.status} />
                </td>
              </tr>
            )}
          />
        </>
      )}
    </div>
  );
};

export default UserReports;