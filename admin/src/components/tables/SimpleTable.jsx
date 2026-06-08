import EmptyState from "../common/EmptyState";

const SimpleTable = ({
  title,
  desc,
  columns = [],
  data = [],
  renderRow,
  rightAction,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-[#D4AF37]/20 bg-[#132238]/85 shadow-xl shadow-black/30 backdrop-blur-xl transition-all duration-300 hover:border-[#D4AF37]/40 hover:shadow-[0_20px_60px_rgba(212,175,55,0.12)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.08),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex items-center justify-between border-b border-[#D4AF37]/15 px-6 py-5">
        <div>
          <h2 className="text-xl font-black tracking-tight text-white">
            {title}
          </h2>

          {desc && <p className="mt-1 text-sm text-[#F4D06F]/65">{desc}</p>}
        </div>

        {rightAction}
      </div>

      <div className="relative z-10 overflow-x-auto">
        {data.length > 0 ? (
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-[#D4AF37]/15 bg-[#0B1220]/35">
                {columns.map((column) => (
                  <th
                    key={column}
                    className="px-6 py-4 text-left text-xs font-black uppercase tracking-[0.16em] text-[#F4D06F]/70"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>{data.map(renderRow)}</tbody>
          </table>
        ) : (
          <div className="p-6">
            <EmptyState
              title="No records found"
              desc="Try changing your search keyword or add a new record."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleTable;