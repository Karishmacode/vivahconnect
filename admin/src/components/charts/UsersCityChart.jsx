import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const colors = ["#79c66b", "#f1bd4f", "#7885ff", "#7a3cc7", "#9a5fe0", "#d8d8d8"];

const UsersCityChart = ({ data }) => {
  return (
    <div className="grid items-center gap-3 md:grid-cols-[220px_1fr]">
      <div className="relative h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} innerRadius={60} outerRadius={100} dataKey="value">
              {data.map((_, index) => (
                <Cell key={index} fill={colors[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h3 className="text-2xl font-bold">12,458</h3>
          <p className="text-sm text-white/70">Total</p>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((city, index) => (
          <div key={city.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colors[index] }} />
              {city.name}
            </span>
            <span className="text-white/80">
              {city.percent} ({city.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersCityChart;