import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const RegistrationChart = ({ data }) => {
  return (
    <div className="h-[290px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.03} />
            </linearGradient>

            <linearGradient id="silverGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8FA3BF" stopOpacity={0.20} />
              <stop offset="95%" stopColor="#8FA3BF" stopOpacity={0} />
            </linearGradient>
          </defs>

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
            cursor={{ stroke: "#D4AF37", strokeDasharray: "4 4" }}
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

          <Area
            type="monotone"
            dataKey="thisMonth"
            stroke="#D4AF37"
            strokeWidth={3}
            fill="url(#goldGradient)"
            activeDot={{
              r: 6,
              fill: "#F4D06F",
              stroke: "#D4AF37",
              strokeWidth: 2,
            }}
          />

          <Area
            type="monotone"
            dataKey="lastMonth"
            stroke="#8FA3BF"
            strokeWidth={2}
            strokeDasharray="6 6"
            fill="url(#silverGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RegistrationChart;