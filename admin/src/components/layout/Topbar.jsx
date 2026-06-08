import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  Search,
  MessageCircle,
  User,
  Settings,
  LogOut,
  Lock,
  X,
  Menu,
} from "lucide-react";

const Topbar = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("This Month");
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const closeMenus = () => {
    setShowMessages(false);
    setShowNotifications(false);
    setShowProfileMenu(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim().toLowerCase();
    if (!query) return;

    closeMenus();

    if (query.includes("user")) navigate("/users");
    else if (query.includes("profile")) navigate("/profiles");
    else if (query.includes("pending")) navigate("/profiles/pending");
    else if (query.includes("photo")) navigate("/profiles/photos");
    else if (query.includes("plan") || query.includes("membership"))
      navigate("/membership-plans");
    else if (query.includes("interest")) navigate("/interests");
    else if (query.includes("success")) navigate("/success-stories");
    else if (query.includes("notification")) navigate("/notifications");
    else if (query.includes("report")) navigate("/reports");
    else if (query.includes("setting")) navigate("/settings");
    else if (query.includes("support")) navigate("/support");
    else navigate("/users");

    setSearch("");
  };

  const logoutAdmin = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#D4AF37]/10 bg-[#0B1220]/90 px-3 py-3 backdrop-blur-xl sm:px-4 lg:px-6 lg:py-5">
      <div className="flex items-center gap-2 sm:gap-3 lg:justify-end lg:gap-4">
        {/* MOBILE SIDEBAR TOGGLE */}
        <button
          onClick={onMenuClick}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#D4AF37]/15 bg-[#132238]/70 text-white transition hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 lg:hidden"
        >
          <Menu size={22} />
        </button>

        {/* SEARCH */}
        <form
          onSubmit={handleSearch}
          className="hidden items-center gap-3 rounded-2xl border border-[#D4AF37]/20 bg-[#132238]/80 px-4 py-3 xl:flex"
        >
          <Search size={18} className="text-[#D4AF37]" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users, profiles..."
            className="w-64 bg-transparent text-sm text-white outline-none placeholder:text-white/45"
          />

          {search && (
            <button type="button" onClick={() => setSearch("")}>
              <X size={16} className="text-white/50 hover:text-[#D4AF37]" />
            </button>
          )}
        </form>

        <div className="ml-auto flex items-center gap-2 sm:gap-3 lg:ml-0 lg:gap-4">
          {/* PERIOD */}
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="hidden rounded-2xl border border-[#D4AF37]/20 bg-[#132238] px-4 py-3 text-sm font-bold text-white outline-none sm:block"
          >
            <option className="bg-[#132238] text-white">Today</option>
            <option className="bg-[#132238] text-white">This Week</option>
            <option className="bg-[#132238] text-white">This Month</option>
            <option className="bg-[#132238] text-white">This Year</option>
          </select>

          {/* MESSAGES */}
          <div className="relative">
            <button
              onClick={() => {
                setShowMessages(!showMessages);
                setShowNotifications(false);
                setShowProfileMenu(false);
              }}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D4AF37]/15 bg-[#132238]/70 text-white transition hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 sm:h-12 sm:w-12"
            >
              <MessageCircle size={20} />
            </button>

            {showMessages && (
              <div className="absolute right-0 top-14 z-50 w-[280px] rounded-2xl border border-[#D4AF37]/20 bg-[#132238] p-4 shadow-2xl shadow-black/40 sm:w-80">
                <h3 className="mb-3 font-bold text-white">Messages</h3>

                {[
                  "New profile message from Priya",
                  "Support reply pending",
                  "Admin note updated",
                ].map((msg) => (
                  <div
                    key={msg}
                    className="mb-2 rounded-xl border border-[#D4AF37]/10 bg-[#0B1220]/45 p-3 text-sm text-white/75"
                  >
                    {msg}
                  </div>
                ))}

                <button
                  onClick={() => {
                    closeMenus();
                    navigate("/support");
                  }}
                  className="mt-2 w-full rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F4D06F] py-2 font-bold text-[#0B1220]"
                >
                  View Support
                </button>
              </div>
            )}
          </div>

          {/* NOTIFICATIONS */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowMessages(false);
                setShowProfileMenu(false);
              }}
              className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D4AF37]/15 bg-[#132238]/70 text-white transition hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 sm:h-12 sm:w-12"
            >
              <Bell size={20} />
              <span className="absolute -right-1 -top-2 rounded-full bg-red-500 px-1.5 text-xs font-bold text-white">
                12
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-14 z-50 w-[280px] rounded-2xl border border-[#D4AF37]/20 bg-[#132238] p-4 shadow-2xl shadow-black/40 sm:w-80">
                <h3 className="mb-3 font-bold text-white">Notifications</h3>

                {[
                  "23 profiles waiting approval",
                  "15 photos need verification",
                  "Premium plan purchased today",
                ].map((item) => (
                  <div
                    key={item}
                    className="mb-2 rounded-xl border border-[#D4AF37]/10 bg-[#0B1220]/45 p-3 text-sm text-white/75"
                  >
                    {item}
                  </div>
                ))}

                <button
                  onClick={() => {
                    closeMenus();
                    navigate("/notifications");
                  }}
                  className="mt-2 w-full rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F4D06F] py-2 font-bold text-[#0B1220]"
                >
                  View Notifications
                </button>
              </div>
            )}
          </div>

          {/* PROFILE */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowMessages(false);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 rounded-2xl border border-[#D4AF37]/15 bg-[#132238]/70 p-1.5 text-white transition hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 sm:gap-3 sm:px-3 sm:py-2"
            >
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200"
                alt="Admin"
                className="h-10 w-10 rounded-xl object-cover ring-2 ring-[#D4AF37] sm:h-12 sm:w-12"
              />

              <div className="hidden text-left md:block">
                <h4 className="font-bold">Admin User</h4>
                <p className="text-xs text-[#D4AF37]">Super Admin</p>
              </div>

              <ChevronDown size={16} className="hidden sm:block" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-14 z-50 w-64 rounded-2xl border border-[#D4AF37]/20 bg-[#132238] p-3 shadow-2xl shadow-black/40 sm:top-16">
                <button
                  onClick={() => {
                    closeMenus();
                    navigate("/settings");
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-white/80 transition hover:bg-[#D4AF37]/10 hover:text-white"
                >
                  <User size={17} />
                  My Profile
                </button>

                <button
                  onClick={() => {
                    closeMenus();
                    navigate("/settings");
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-white/80 transition hover:bg-[#D4AF37]/10 hover:text-white"
                >
                  <Settings size={17} />
                  Settings
                </button>

                <button
                  onClick={() => {
                    closeMenus();
                    navigate("/change-password");
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-white/80 transition hover:bg-[#D4AF37]/10 hover:text-white"
                >
                  <Lock size={17} />
                  Change Password
                </button>

                <button
                  onClick={logoutAdmin}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-300 transition hover:bg-red-500/10"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;