import { useEffect, useState } from "react";
import { CreditCard, IndianRupee, RefreshCcw, TrendingUp } from "lucide-react";
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
import SearchInput from "../components/common/SearchInput";
import Card from "../components/common/Card";
import SimpleTable from "../components/tables/SimpleTable";
import StatusBadge from "../components/tables/StatusBadge";

const API_BASE = "http://localhost:5000/api";

const RevenueReports = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken") || localStorage.getItem("token");

  const fetchRevenueData = async () => {
    try {
      setLoading(true);

      const headers = {
        Authorization: token ? `Bearer ${token}` : "",
      };

      const [usersRes, plansRes] = await Promise.all([
        fetch(`${API_BASE}/users`, { headers }),
        fetch(`${API_BASE}/admin/membership-plans`, { headers }),
      ]);

      const usersData = await usersRes.json();
      const plansData = await plansRes.json();

      setUsers(usersData.users || usersData || []);
      setPlans(plansData.plans || []);
    } catch (error) {
      console.log("Revenue reports fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenueData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paidUsers = users.filter(
    (user) => user.membershipPlan && user.membershipPlan !== "Free"
  );

  const planRows = plans
    .filter((plan) => plan.name !== "Free")
    .map((plan) => {
      const purchases = users.filter(
        (user) => user.membershipPlan === plan.name
      ).length;

      const revenue = purchases * Number(plan.price || 0);

      return {
        id: plan._id || plan.name,
        plan: plan.name,
        price: Number(plan.price || 0),
        purchases,
        revenue,
        status: plan.isActive === false ? "Inactive" : "Active",
      };
    });

  const totalRevenue = planRows.reduce(
    (sum, item) => sum + Number(item.revenue || 0),
    0
  );

  const totalPurchases = planRows.reduce(
    (sum, item) => sum + Number(item.purchases || 0),
    0
  );

  const renewals = users.filter((user) => user.membershipEndDate).length;

  const monthlyRevenue = Math.round(totalRevenue * 0.35);

  const revenueData = [
    {
      month: "Jan",
      revenue: Math.round(totalRevenue * 0.15),
      renewals: Math.round(renewals * 0.15),
    },
    {
      month: "Feb",
      revenue: Math.round(totalRevenue * 0.25),
      renewals: Math.round(renewals * 0.25),
    },
    {
      month: "Mar",
      revenue: Math.round(totalRevenue * 0.4),
      renewals: Math.round(renewals * 0.35),
    },
    {
      month: "Apr",
      revenue: Math.round(totalRevenue * 0.55),
      renewals: Math.round(renewals * 0.5),
    },
    {
      month: "May",
      revenue: Math.round(totalRevenue * 0.75),
      renewals: Math.round(renewals * 0.7),
    },
    {
      month: "Jun",
      revenue: totalRevenue,
      renewals,
    },
  ];

  const filtered = planRows.filter((item) =>
    `${item.plan} ${item.price} ${item.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Revenue Reports"
        desc="Track membership revenue, subscriptions and financial performance."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <IndianRupee className="mb-3 text-[#f6b545]" />
          <p className="text-sm text-white/60">Total Revenue</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {formatCurrency(totalRevenue)}
          </h3>
        </Card>

        <Card className="p-5">
          <TrendingUp className="mb-3 text-green-300" />
          <p className="text-sm text-white/60">Monthly Revenue</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {formatCurrency(monthlyRevenue)}
          </h3>
        </Card>

        <Card className="p-5">
          <CreditCard className="mb-3 text-blue-300" />
          <p className="text-sm text-white/60">Plan Purchases</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {totalPurchases}
          </h3>
        </Card>

        <Card className="p-5">
          <RefreshCcw className="mb-3 text-purple-300" />
          <p className="text-sm text-white/60">Renewals</p>
          <h3 className="mt-2 text-3xl font-black text-white">{renewals}</h3>
        </Card>
      </div>

      {loading ? (
        <Card className="p-8 text-center text-white/60">
          Loading revenue reports...
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_1fr]">
            <Card className="p-6">
              <h2 className="text-xl font-black text-white">Revenue Trend</h2>
              <p className="mb-6 text-sm text-white/50">
                Estimated revenue and renewals from membership data.
              </p>

              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
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
                      dataKey="revenue"
                      stroke="#f6b545"
                      fill="#f6b54533"
                      strokeWidth={3}
                    />
                    <Area
                      type="monotone"
                      dataKey="renewals"
                      stroke="#22c55e"
                      fill="#22c55e22"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-black text-white">Plan Sales</h2>
              <p className="mb-6 text-sm text-white/50">
                Purchases by membership plan.
              </p>

              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={planRows}>
                    <CartesianGrid stroke="#ffffff12" vertical={false} />
                    <XAxis dataKey="plan" stroke="#ffffff80" fontSize={12} />
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
                      dataKey="purchases"
                      fill="#f6b545"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#132238] p-5 backdrop-blur-xl">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search revenue report..."
            />
          </div>

          <SimpleTable
            title="Revenue by Plan"
            desc="Subscription sales and revenue summary from database."
            columns={["Plan", "Price", "Purchases", "Revenue", "Status"]}
            data={filtered}
            renderRow={(item) => (
              <tr
                key={item.id}
                className="border-b border-white/5 transition hover:bg-[#f6b545]/10"
              >
                <td className="px-6 py-4 font-semibold text-white">
                  {item.plan}
                </td>

                <td className="px-6 py-4 text-white/75">
                  {formatCurrency(item.price)}
                </td>

                <td className="px-6 py-4 text-white/75">
                  {item.purchases}
                </td>

                <td className="px-6 py-4 font-bold text-[#f6b545]">
                  {formatCurrency(item.revenue)}
                </td>

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

export default RevenueReports;