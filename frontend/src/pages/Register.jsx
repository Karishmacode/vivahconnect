import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  UserPlus,
} from "lucide-react";

import PageLayout from "../components/layout/PageLayout";
import Button from "../components/ui/Button";
import InputField from "../components/forms/InputField";
import SelectField from "../components/forms/SelectField";

const API_URL = "http://localhost:5000/api/auth/register";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    gender: "Bride",
    religion: "Hindu",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleMobileChange = (e) => {
    setForm({
      ...form,
      mobile: e.target.value.replace(/\D/g, "").slice(0, 10),
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.email ||
      !form.mobile ||
      !form.city ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.mobile)) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Password and confirm password do not match.");
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
          fullName: form.fullName.trim(),
          name: form.fullName.trim(),
          email: form.email.trim(),
          mobile: form.mobile,
          phone: form.mobile,
          gender: form.gender,
          religion: form.religion,
          city: form.city.trim(),
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      const registeredUser =
        data.user || data.newUser || data.createdUser || data.savedUser || {};

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(registeredUser));

        setSuccess("Registration successful. Opening your profile...");

        setTimeout(() => {
          navigate("/profile");
          window.location.reload();
        }, 700);

        return;
      }

      setSuccess("Registration successful. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 900);
    } catch (error) {
      console.log("Register error:", error);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <main className="mx-auto grid min-h-[78vh] max-w-[1350px] place-items-center px-6 py-12">
        <div className="grid w-full overflow-hidden rounded-[36px] border border-[#d4af37]/25 bg-[#0b1425] shadow-2xl shadow-black/35 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative hidden overflow-hidden bg-[#050914] lg:block">
            <img
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop"
              alt="Indian wedding"
              className="h-full min-h-[720px] w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-[#050914]/40 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8 rounded-[28px] border border-[#d4af37]/25 bg-[#050914]/75 p-6 backdrop-blur-xl">
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[2px] text-[#f4d06f]">
                <Sparkles size={14} />
                Join Premium Indian Matrimony
              </p>

              <h2 className="mt-3 font-serif text-4xl font-black leading-tight text-white">
                Create a profile your family can trust.
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {["Verified", "Private", "Family Safe"].map((item) => (
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
                  Free Registration
                </p>

                <h1 className="mt-2 font-serif text-5xl font-black text-white">
                  Create Profile
                </h1>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/55">
                  Start your trusted matrimony journey with verified Indian
                  families.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid gap-5 md:grid-cols-2"
              >
                <InputField
                  label="Full Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />

                <InputField
                  label="Email Address"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />

                <InputField
                  label="Mobile Number"
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleMobileChange}
                  placeholder="Enter mobile number"
                  maxLength={10}
                  required
                />

                <SelectField
                  label="Profile For"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  options={["Bride", "Groom"]}
                  required
                />

                <SelectField
                  label="Religion"
                  name="religion"
                  value={form.religion}
                  onChange={handleChange}
                  options={["Hindu", "Muslim", "Sikh", "Christian", "Jain"]}
                  required
                />

                <InputField
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  required
                />

                <div>
                  <label className="mb-3 block text-sm font-black uppercase tracking-[1px] text-white/75">
                    Password <span className="text-[#d4af37]">*</span>
                  </label>

                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Create password"
                      className="h-16 w-full rounded-2xl border border-[#d4af37]/15 bg-gradient-to-br from-[#111c33] via-[#0b1425] to-[#07101f] px-5 pr-12 text-sm font-semibold text-white shadow-lg shadow-black/20 outline-none transition placeholder:text-white/30 focus:border-[#f4d06f] focus:ring-2 focus:ring-[#d4af37]/20"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/55 hover:text-[#f4d06f]"
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                </div>

                <InputField
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  required
                />

                {error && (
                  <p className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm font-black text-red-300 md:col-span-2">
                    {error}
                  </p>
                )}

                {success && (
                  <p className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm font-black text-emerald-300 md:col-span-2">
                    {success}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="md:col-span-2"
                >
                  <UserPlus size={18} />
                  {loading ? "Creating Profile..." : "Create My Profile"}
                </Button>

                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 md:col-span-2">
                  <p className="flex items-center gap-2 text-sm font-black text-emerald-300">
                    <ShieldCheck size={17} />
                    Your profile details are privacy protected.
                  </p>
                </div>
              </form>

              <p className="mt-7 text-center text-sm text-white/60">
                Already have an account?{" "}
                <Link to="/login" className="font-black text-[#f4d06f]">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default Register;