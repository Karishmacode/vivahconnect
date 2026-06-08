import { useState } from "react";
import { CheckCircle, Lock, ShieldCheck } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import FormInput from "../components/common/FormInput";

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
    setError("");
  };

  const updatePassword = (e) => {
    e.preventDefault();

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (form.newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    setMessage("Password changed successfully.");
    setForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Card className="p-5">
          <Lock className="mb-3 text-[#D4AF37]" />
          <p className="text-sm text-white/60">Password Security</p>
          <h3 className="mt-2 text-2xl font-black text-white">Protected</h3>
        </Card>

        <Card className="p-5">
          <ShieldCheck className="mb-3 text-[#F4D06F]" />
          <p className="text-sm text-white/60">Two Factor Auth</p>
          <h3 className="mt-2 text-2xl font-black text-white">Enabled</h3>
        </Card>

        <Card className="p-5">
          <CheckCircle className="mb-3 text-[#8FA3BF]" />
          <p className="text-sm text-white/60">Last Updated</p>
          <h3 className="mt-2 text-2xl font-black text-white">Today</h3>
        </Card>
      </div>

      <Card className="mx-auto max-w-3xl p-7">
        <h2 className="text-2xl font-black text-white">Change Password</h2>
        <p className="mt-1 text-[#F4D06F]/70">
          Update admin password for secure account access.
        </p>

        {message && (
          <div className="mt-5 rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-4 py-3 text-[#F4D06F]">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={updatePassword} className="mt-6 space-y-5">
          <FormInput
            type="password"
            label="Current Password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            placeholder="Enter current password"
          />

          <FormInput
            type="password"
            label="New Password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
          />

          <FormInput
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
          />

          <button className="rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F4D06F] px-8 py-3.5 font-black text-[#0B1220] transition hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.35)]">
            Update Password
          </button>
        </form>
      </Card>
    </div>
  );
};

export default ChangePassword;