import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ShieldCheck, Crown, HeartHandshake } from "lucide-react";

const API_URL = "http://localhost:5000/api/auth/login";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "admin@vivahconnect.com",
    password: "admin123",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginAdmin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid email or password");
        return;
      }

      const token = data.token || data.adminToken;

      if (!token) {
        setError("Login success but token not received from backend.");
        return;
      }

      localStorage.setItem("adminToken", token);
      localStorage.setItem("token", token);

      navigate("/");
    } catch (error) {
      console.log("Admin login error:", error);
      setError("Server error. Please check backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#132238_0%,#0B1220_45%,#050816_100%)] px-4 py-10 text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-[120px]" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-[#F4D06F]/5 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div>
          <div className="mb-8 inline-flex items-center gap-4 rounded-3xl border border-[#D4AF37]/25 bg-[#132238]/70 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]">
              <HeartHandshake size={32} />
              <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#F4D06F] text-[#0B1220]">
                <Crown size={14} />
              </span>
            </div>

            <div>
              <h1 className="font-serif text-4xl font-black leading-none text-[#F4D06F]">
                VivahConnect
              </h1>
              <p className="mt-1 text-xs font-black uppercase tracking-[0.45em] text-[#D4AF37]">
                Premium Matrimony
              </p>
            </div>
          </div>

          <h2 className="max-w-2xl text-5xl font-black leading-tight">
            Manage your premium matrimonial platform.
          </h2>

          <p className="mt-5 max-w-xl text-lg leading-8 text-white/60">
            Secure admin login for users, profiles, memberships, reports,
            notifications and support management.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {["Secure Login", "Profile Control", "Premium Reports"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#D4AF37]/20 bg-[#132238]/70 p-4 shadow-xl shadow-black/20 backdrop-blur-xl"
                >
                  <ShieldCheck className="mb-3 text-[#D4AF37]" />
                  <p className="font-bold text-white">{item}</p>
                </div>
              )
            )}
          </div>
        </div>

        <form
          onSubmit={loginAdmin}
          className="rounded-[28px] border border-[#D4AF37]/20 bg-[#132238]/90 p-7 shadow-2xl shadow-black/40 backdrop-blur-xl"
        >
          <h2 className="text-3xl font-black text-white">Admin Login</h2>
          <p className="mt-1 text-[#F4D06F]/70">
            Sign in to continue to dashboard.
          </p>

          {error && (
            <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">
              {error}
            </div>
          )}

          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm text-white/70">Email</label>
              <div className="flex items-center gap-3 rounded-2xl border border-[#D4AF37]/20 bg-[#0B1220]/50 px-4 transition focus-within:border-[#D4AF37]">
                <Mail size={18} className="text-[#D4AF37]" />
                <input
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="h-14 w-full bg-transparent text-white outline-none placeholder:text-white/35"
                  placeholder="admin@vivahconnect.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">
                Password
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-[#D4AF37]/20 bg-[#0B1220]/50 px-4 transition focus-within:border-[#D4AF37]">
                <Lock size={18} className="text-[#D4AF37]" />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="h-14 w-full bg-transparent text-white outline-none placeholder:text-white/35"
                  placeholder="admin123"
                />
              </div>
            </div>
          </div>

          <button
            disabled={loading}
            className="mt-7 w-full rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F4D06F] py-4 font-black text-[#0B1220] transition hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(212,175,55,0.35)] disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login Dashboard"}
          </button>

          <p className="mt-5 text-center text-sm text-white/45">
            Demo: admin@vivahconnect.com / admin123
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;