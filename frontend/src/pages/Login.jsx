import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Lock,
} from "lucide-react";

import PageLayout from "../components/layout/PageLayout";
import Button from "../components/ui/Button";
import InputField from "../components/forms/InputField";

const API_URL = "http://localhost:5000/api/auth/login";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please fill all required fields.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      if (!data.token) {
        setError("Token not received from server.");
        return;
      }

      const loggedInUser = data.user || data.findUser || data.existingUser || {};

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      setSuccess("Login successful. Redirecting...");

      setTimeout(() => {
        navigate("/profile");
        window.location.reload();
      }, 700);
    } catch (error) {
      console.log("Login error:", error);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <main className="mx-auto grid min-h-[78vh] max-w-[1300px] place-items-center px-6 py-12">
        <div className="grid w-full overflow-hidden rounded-[36px] border border-[#d4af37]/25 bg-[#0b1425] shadow-2xl shadow-black/35 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative hidden overflow-hidden bg-[#050914] lg:block">
            <img
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop"
              alt="Indian wedding"
              className="h-full min-h-[620px] w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-[#050914]/35 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8 rounded-[28px] border border-[#d4af37]/25 bg-[#050914]/75 p-6 backdrop-blur-xl">
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[2px] text-[#f4d06f]">
                <Sparkles size={14} />
                Premium Indian Matrimony
              </p>

              <h2 className="mt-3 font-serif text-4xl font-black leading-tight text-white">
                Continue your journey toward a trusted match.
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {["Verified", "Secure", "Private"].map((item) => (
                  <span
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-center text-xs font-black text-white/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-[#111c33] via-[#0b1425] to-[#07101f] p-8 md:p-10">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#d4af37]/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#7a1128]/20 blur-3xl" />

            <div className="relative">
              <div className="mb-8 text-center">
                <div className="mx-auto grid h-18 w-18 place-items-center rounded-3xl border border-[#d4af37]/25 bg-[#d4af37]/10 text-[#f4d06f]">
                  <HeartHandshake size={38} />
                </div>

                <p className="mt-5 text-xs font-black uppercase tracking-[3px] text-[#d4af37]">
                  Welcome Back
                </p>

                <h1 className="mt-2 font-serif text-5xl font-black text-white">
                  Login
                </h1>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/55">
                  Access your profile, explore verified matches and continue
                  your VivahConnect journey.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />

                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Lock size={14} className="text-[#f4d06f]" />
                    <label className="text-sm font-black uppercase tracking-[1px] text-white/75">
                      Password
                    </label>
                    <span className="text-[#d4af37]">*</span>
                  </div>

                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="h-16 w-full rounded-2xl border border-[#d4af37]/15 bg-gradient-to-br from-[#111c33] via-[#0b1425] to-[#07101f] px-5 pr-12 text-sm font-semibold text-white shadow-lg shadow-black/20 outline-none transition placeholder:text-white/30 focus:border-[#f4d06f] focus:ring-2 focus:ring-[#d4af37]/20"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/55 transition hover:text-[#f4d06f]"
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <label className="flex items-center gap-2 font-semibold text-white/65">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={form.remember}
                      onChange={handleChange}
                      className="accent-[#d4af37]"
                    />
                    Remember me
                  </label>

                  <Link
                    to="/forgot-password"
                    className="font-black text-[#f4d06f] transition hover:text-white"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {error && (
                  <p className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm font-black text-red-300">
                    {error}
                  </p>
                )}

                {success && (
                  <p className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm font-black text-emerald-300">
                    {success}
                  </p>
                )}

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Logging In..." : "Login To My Account"}
                </Button>

                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                  <p className="flex items-center gap-2 text-sm font-black text-emerald-300">
                    <ShieldCheck size={17} />
                    Your login is secure and privacy protected.
                  </p>
                </div>
              </form>

              <p className="mt-7 text-center text-sm text-white/60">
                Don’t have an account?{" "}
                <Link to="/register" className="font-black text-[#f4d06f]">
                  Register Free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default Login;