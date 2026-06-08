import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#132238_0%,#0B1220_45%,#050816_100%)] lg:pl-[300px]">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute left-[20%] top-0 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-[120px]" />
          <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-[#F4D06F]/5 blur-[130px]" />
        </div>

        <div className="relative z-10">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />

          <div className="px-4 pt-5 pb-10 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;