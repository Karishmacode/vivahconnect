import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  HeartHandshake,
  Menu,
  X,
  Crown,
  Sparkles,
  User,
  LogOut,
  Heart,
  Send,
  Inbox,
  ChevronDown,
  Bell,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/interests";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "How It Works", path: "/how-it-works" },
  { name: "Stories", path: "/success-stories" },
  { name: "Membership", path: "/membership" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const getLoggedInUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

const Navbar = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(getLoggedInUser());
  const [sentCount, setSentCount] = useState(0);
  const [receivedCount, setReceivedCount] = useState(0);

  const token = localStorage.getItem("token");

  const closeMenu = () => {
    setOpen(false);
    setProfileOpen(false);
  };

  const fetchInterestCounts = async () => {
    try {
      if (!token) return;

      const [sentRes, receivedRes] = await Promise.all([
        fetch(`${API_URL}/sent`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/received`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const sentData = await sentRes.json();
      const receivedData = await receivedRes.json();

      if (sentRes.ok) {
        const sentList = sentData.interests || sentData || [];
        setSentCount(sentList.length || 0);
      }

      if (receivedRes.ok) {
        const receivedList = receivedData.interests || receivedData || [];
        const pendingReceived = receivedList.filter(
          (item) => item.status === "Pending"
        );
        setReceivedCount(pendingReceived.length || 0);
      }
    } catch (error) {
      console.log("Navbar interest count error:", error);
    }
  };

  useEffect(() => {
    setUser(getLoggedInUser());

    if (token) {
      fetchInterestCounts();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("vivahUser");
    localStorage.removeItem("profileId");
    localStorage.removeItem("selectedPlan");

    setUser(null);
    setSentCount(0);
    setReceivedCount(0);
    closeMenu();
    navigate("/login");
  };

  const avatar =
    user?.photo ||
    user?.profilePhoto ||
    user?.image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.fullName || user?.name || "User"
    )}&background=132238&color=f4d06f`;

  const userName = user?.fullName || user?.name || "My Account";
  const membershipPlan = user?.membershipPlan || "Free";
  const isPremium = membershipPlan !== "Free";

  const Badge = ({ count, type = "gold" }) => {
    if (!count) return null;

    return (
      <span
        className={`grid min-w-6 place-items-center rounded-full px-2 py-1 text-[11px] font-black ${
          type === "red"
            ? "bg-red-500/15 text-red-300"
            : "bg-[#d4af37]/15 text-[#f4d06f]"
        }`}
      >
        {count}
      </span>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#d4af37]/20 bg-[#050914]/90 shadow-2xl shadow-black/30 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
          <div className="relative grid h-11 w-11 place-items-center rounded-xl border border-[#d4af37]/40 bg-gradient-to-br from-[#d4af37]/25 to-[#7a1128]/20 text-[#f4d06f] shadow-lg shadow-[#d4af37]/10 sm:h-14 sm:w-14 sm:rounded-2xl">
            <HeartHandshake size={24} />
            <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-[#f4d06f] text-[#050914] sm:h-5 sm:w-5">
              <Crown size={10} />
            </span>
          </div>

          <div>
            <h1 className="font-serif text-xl font-black leading-none tracking-wide text-[#f4d06f] sm:text-3xl">
              VivahConnect
            </h1>
            <p className="mt-1 text-[8px] font-black uppercase tracking-[3px] text-[#d4af37] sm:text-[10px] sm:tracking-[5px]">
              Premium Matrimony
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 xl:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative text-sm font-black transition ${
                  isActive
                    ? "text-[#f4d06f]"
                    : "text-white/65 hover:text-[#f4d06f]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center gap-2 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-4 py-2 text-xs font-black text-[#f4d06f]">
            {isPremium ? <Crown size={14} /> : <Sparkles size={14} />}
            {isPremium ? `${membershipPlan} Member` : "12,000+ Verified"}
          </div>

          {!user ? (
            <>
              <Link
                to="/login"
                className="rounded-2xl border border-[#d4af37]/40 px-6 py-3 text-sm font-black text-[#f4d06f] transition hover:bg-[#d4af37] hover:text-[#050914]"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#f4d06f] px-6 py-3 text-sm font-black text-[#050914] shadow-lg shadow-[#d4af37]/20 transition hover:scale-[1.02]"
              >
                Register Free
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="relative flex items-center gap-3 rounded-2xl border border-[#d4af37]/35 bg-white/5 px-3 py-2 text-sm font-black text-white transition hover:bg-[#d4af37]/10"
              >
                {receivedCount > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-red-500 text-[10px] font-black text-white">
                    {receivedCount}
                  </span>
                )}

                <img
                  src={avatar}
                  alt={userName}
                  className="h-10 w-10 rounded-full border border-[#d4af37]/40 object-cover"
                />

                <span className="max-w-[130px] truncate text-[#f4d06f]">
                  {userName}
                </span>

                <ChevronDown
                  size={16}
                  className={`transition ${profileOpen ? "rotate-180" : ""}`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-[28px] border border-[#d4af37]/25 bg-[#0b1425] p-3 shadow-2xl shadow-black/50">
                  <div className="mb-2 flex items-center gap-3 rounded-2xl border border-[#d4af37]/15 bg-[#07101f] p-3">
                    <img
                      src={avatar}
                      alt={userName}
                      className="h-12 w-12 rounded-full border border-[#d4af37]/40 object-cover"
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-[#f4d06f]">
                        {userName}
                      </p>
                      <p className="text-xs font-bold text-white/45">
                        {isPremium ? `${membershipPlan} Member` : "Free Member"}
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-white/80 hover:bg-white/5 hover:text-[#f4d06f]"
                  >
                    <User size={17} />
                    My Profile
                  </Link>

                  <Link
                    to="/sent-interests"
                    onClick={closeMenu}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-white/80 hover:bg-white/5 hover:text-[#f4d06f]"
                  >
                    <span className="flex items-center gap-3">
                      <Send size={17} />
                      Sent Interests
                    </span>

                    <Badge count={sentCount} />
                  </Link>

                  <Link
                    to="/received-interests"
                    onClick={closeMenu}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-white/80 hover:bg-white/5 hover:text-[#f4d06f]"
                  >
                    <span className="flex items-center gap-3">
                      <Inbox size={17} />
                      Received Interests
                    </span>

                    <Badge count={receivedCount} type="red" />
                  </Link>

                  {receivedCount > 0 && (
                    <div className="mx-2 my-2 rounded-2xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-200">
                      <Bell size={14} className="mr-1 inline" />
                      You have {receivedCount} pending interest request
                      {receivedCount > 1 ? "s" : ""}.
                    </div>
                  )}

                  <Link
                    to="/membership"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-white/80 hover:bg-white/5 hover:text-[#f4d06f]"
                  >
                    <Heart size={17} />
                    Membership
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="mt-2 flex w-full items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-left text-sm font-black text-red-300 hover:bg-red-500/20"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-[#d4af37]/25 bg-white/5 text-white xl:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#d4af37]/15 bg-[#050914] px-4 py-5 xl:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-black transition ${
                    isActive
                      ? "bg-[#d4af37]/15 text-[#f4d06f]"
                      : "text-white/70 hover:bg-white/5 hover:text-[#f4d06f]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="mt-5 grid gap-3">
            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-xl border border-[#d4af37]/40 px-5 py-3 text-center text-sm font-black text-[#f4d06f]"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f4d06f] px-5 py-3 text-center text-sm font-black text-[#050914]"
                >
                  Register Free
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl border border-[#d4af37]/30 bg-white/5 px-4 py-3"
                >
                  <img
                    src={avatar}
                    alt={userName}
                    className="h-11 w-11 rounded-full border border-[#d4af37]/40 object-cover"
                  />
                  <div>
                    <p className="text-sm font-black text-[#f4d06f]">
                      {userName}
                    </p>
                    <p className="text-xs font-bold text-white/50">
                      {isPremium ? `${membershipPlan} Member` : "Free Member"}
                    </p>
                  </div>
                </Link>

                <Link
                  to="/sent-interests"
                  onClick={closeMenu}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-black text-white/75 hover:bg-white/5"
                >
                  <span className="flex items-center gap-3">
                    <Send size={17} />
                    Sent Interests
                  </span>

                  <Badge count={sentCount} />
                </Link>

                <Link
                  to="/received-interests"
                  onClick={closeMenu}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-black text-white/75 hover:bg-white/5"
                >
                  <span className="flex items-center gap-3">
                    <Inbox size={17} />
                    Received Interests
                  </span>

                  <Badge count={receivedCount} type="red" />
                </Link>

                <Link
                  to="/membership"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-black text-white/75 hover:bg-white/5"
                >
                  <Heart size={17} />
                  Membership
                </Link>

                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-center text-sm font-black text-red-300"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;