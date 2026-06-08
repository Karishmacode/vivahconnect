import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const RevenueChart = ({ data }) => {
  return (
    <div className="h-[270px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid
            stroke="rgba(255,255,255,0.08)"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            stroke="#B8C1D1"
            tick={{ fill: "#B8C1D1", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            stroke="#B8C1D1"
            tick={{ fill: "#B8C1D1", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{ fill: "rgba(212,175,55,0.08)" }}
            contentStyle={{
              background: "#132238",
              border: "1px solid rgba(212,175,55,0.3)",
              borderRadius: "16px",
              color: "#fff",
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            }}
            labelStyle={{
              color: "#F4D06F",
              fontWeight: 700,
            }}
          />

          <Bar
            dataKey="value"
            fill="#D4AF37"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;