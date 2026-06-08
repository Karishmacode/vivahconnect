import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.png";

import {
  LayoutDashboard,
  Users,
  Image,
  Heart,
  Crown,
  Trophy,
  BarChart3,
  Bell,
  FileText,
  Settings,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  X,
} from "lucide-react";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Users", icon: Users, path: "/users" },
  {
    name: "Profiles",
    icon: Image,
    path: "/profiles",
    children: [
      { name: "All Profiles", path: "/profiles" },
      { name: "Pending Approval", path: "/profiles/pending" },
      { name: "Verified Profiles", path: "/profiles/verified" },
      { name: "Rejected Profiles", path: "/profiles/rejected" },
      { name: "Photo Verification", path: "/profiles/photos" },
    ],
  },
  { name: "Interests", icon: Heart, path: "/interests" },
  { name: "Membership Plans", icon: Crown, path: "/membership-plans" },
  { name: "Success Stories", icon: Trophy, path: "/success-stories" },
  {
    name: "Reports & Analytics",
    icon: BarChart3,
    path: "/reports",
    children: [
      { name: "Overview", path: "/reports" },
      { name: "User Reports", path: "/reports/users" },
      { name: "Revenue Reports", path: "/reports/revenue" },
    ],
  },
  { name: "Notifications", icon: Bell, path: "/notifications", badge: 12 },
  {
    name: "Content Management",
    icon: FileText,
    path: "/content-management",
    children: [
      { name: "Banners", path: "/content-management/banners" },
      { name: "Pages", path: "/content-management/pages" },
      { name: "FAQs", path: "/content-management/faqs" },
    ],
  },
  { name: "Settings", icon: Settings, path: "/settings" },
  { name: "Support & Help", icon: HelpCircle, path: "/support" },
];

const Sidebar = ({ open = false, onClose }) => {
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState("");

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

<aside
  className={`fixed left-0 top-0 z-50 h-dvh w-[300px] border-r border-[#D4AF37]/10 bg-[#0B1220] transition-transform duration-300 ${
    open ? "translate-x-0" : "-translate-x-full"
  } lg:translate-x-0`}
>
  <div className="flex h-full flex-col">
    {/* LOGO */}
 <div className="relative shrink-0 border-b border-[#D4AF37]/10 px-0 py-0">
  <div className="flex items-center justify-center">
    <img
      src={logo}
      alt="VivahConnect"
      className="h-28 w-auto object-contain"
    />
  </div>
</div>

<div className="mx-5 mb-3 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent" />

    <div className="mx-5 mb-3 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

    {/* MENU */}
    <nav className="flex-1 space-y-2 overflow-y-auto px-4 pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#D4AF37]/40">
      {menu.map((item) => {
        const Icon = item.icon;
        const hasChildren = item.children?.length > 0;
        const isParentActive = hasChildren
          ? pathname.startsWith(item.path)
          : pathname === item.path;
        const isOpen = openMenu === item.name;

        if (hasChildren) {
          return (
            <div key={item.name}>
              <button
                onClick={() => setOpenMenu(isOpen ? "" : item.name)}
                className={`group flex w-full items-center justify-between rounded-2xl px-3.5 py-3 text-left text-sm font-semibold transition-all duration-300 sm:px-4 sm:py-3.5 sm:text-[15px] ${
                  isParentActive
                    ? "bg-gradient-to-r from-[#D4AF37] to-[#F4D06F] text-[#0B1220] shadow-[0_0_28px_rgba(212,175,55,0.25)]"
                    : "text-white/80 hover:bg-[#132238] hover:text-white"
                }`}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <Icon size={18} />
                  </span>
                  <span className="truncate">{item.name}</span>
                </span>

                <ChevronDown
                  size={16}
                  className={`shrink-0 transition-all duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="mt-2 space-y-1 rounded-2xl border border-[#D4AF37]/15 bg-[#132238] p-2">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      end={child.path === item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `block rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                          isActive
                            ? "bg-[#D4AF37]/15 text-[#D4AF37]"
                            : "text-white/60 hover:bg-[#D4AF37]/10 hover:text-white"
                        }`
                      }
                    >
                      {child.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        }

        return (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/"}
            onClick={onClose}
            className={({ isActive }) =>
              `group flex w-full items-center justify-between rounded-2xl px-3.5 py-3 text-left text-sm font-semibold transition-all duration-300 sm:px-4 sm:py-3.5 sm:text-[15px] ${
                isActive
                  ? "bg-gradient-to-r from-[#D4AF37] to-[#F4D06F] text-[#0B1220] shadow-[0_0_28px_rgba(212,175,55,0.25)]"
                  : "text-white/80 hover:bg-[#132238] hover:text-white"
              }`
            }
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5">
                <Icon size={18} />
              </span>
              <span className="truncate">{item.name}</span>
            </span>

            {item.badge && (
              <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                {item.badge}
              </span>
            )}
          </NavLink>
        );
      })}
    </nav>

    {/* ADMIN CARD */}
    <div className="shrink-0 border-t border-[#D4AF37]/10 p-4">
      <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#132238] p-4">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200"
            alt="Admin User"
            className="h-12 w-12 rounded-2xl object-cover ring-2 ring-[#D4AF37]/40"
          />

          <div className="min-w-0">
            <h3 className="truncate font-bold text-white">Admin User</h3>
            <p className="flex items-center gap-1 text-sm text-white/65">
              <ShieldCheck size={14} className="text-[#D4AF37]" />
              Super Admin
            </p>
            <p className="text-xs text-[#F4D06F]">● Online</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</aside>
    </>
  );
};

export default Sidebar;