import { useEffect, useState } from "react";
import {
  Bell,
  CheckCircle,
  CreditCard,
  Globe2,
  Lock,
  Mail,
  Save,
  ShieldCheck,
  Smartphone,
  UserCog,
} from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import FormInput from "../components/common/FormInput";
import SelectInput from "../components/common/SelectInput";
import ConfirmModal from "../components/common/ConfirmModal";

const API_URL = "http://localhost:5000/api/settings";

const initialSettings = {
  platformName: "VivahConnect",
  supportEmail: "support@vivahconnect.com",
  adminEmail: "admin@vivahconnect.com",
  websiteUrl: "https://vivahconnect.com",
  currency: "INR",
  timezone: "Asia/Kolkata",
  language: "English",
  profileApproval: "Manual Review",
  photoVerification: "Required",
  defaultPlan: "Free",
  paymentGateway: "Razorpay",
  maintenanceMode: "Disabled",
  emailNotifications: true,
  smsNotifications: true,
  pushNotifications: true,
  whatsappAlerts: false,
  twoFactorAuth: true,
  autoBlockSuspicious: true,
};

const Settings = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [saved, setSaved] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const getToken = () =>
    localStorage.getItem("adminToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem("authToken");

  const fetchSettings = async () => {
    try {
      setLoading(true);

      const res = await fetch(API_URL);
      const data = await res.json();

      if (res.ok) {
        setSettings({
          ...initialSettings,
          ...(data.settings || {}),
        });
      }
    } catch (error) {
      console.log("Fetch settings error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setSaved(false);
  };

  const saveSettings = async (e) => {
    e.preventDefault();

    const token = getToken();

    if (!token) {
      alert("Admin token missing. Please logout and login again.");
      return;
    }

    try {
      setSaving(true);

      const res = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });

      const data = await res.json();

      if (res.ok) {
        setSettings(data.settings);
        setSaved(true);

        setTimeout(() => {
          setSaved(false);
        }, 2500);
      } else {
        alert(data.message || "Failed to save settings.");
      }
    } catch (error) {
      console.log("Save settings error:", error);
      alert("Server error while saving settings.");
    } finally {
      setSaving(false);
    }
  };

  const resetSettings = async () => {
    const token = getToken();

    if (!token) {
      alert("Admin token missing. Please logout and login again.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/reset`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setSettings(data.settings);
        setResetOpen(false);
        setSaved(true);

        setTimeout(() => {
          setSaved(false);
        }, 2500);
      } else {
        alert(data.message || "Failed to reset settings.");
      }
    } catch (error) {
      console.log("Reset settings error:", error);
      alert("Server error while resetting settings.");
    }
  };

  const Toggle = ({ label, desc, name, icon: Icon }) => (
    <label className="group flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-[#D4AF37]/20 bg-[#132238]/70 p-4 transition-all duration-300 hover:border-[#D4AF37]/40 hover:bg-[#162B45]">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] transition-all duration-300 group-hover:scale-110">
          <Icon size={20} />
        </div>

        <div>
          <h4 className="font-bold text-white">{label}</h4>
          <p className="text-sm text-[#F4D06F]/65">{desc}</p>
        </div>
      </div>

      <input
        type="checkbox"
        name={name}
        checked={!!settings[name]}
        onChange={handleChange}
        className="peer hidden"
      />

      <span className="relative h-7 w-12 rounded-full bg-[#0B1220] transition-all duration-300 peer-checked:bg-[#D4AF37]">
        <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white transition-all duration-300 peer-checked:translate-x-5" />
      </span>
    </label>
  );

  if (loading) {
    return (
      <div className="py-20 text-center text-white/60">
        Loading settings...
      </div>
    );
  }

  return (
    <form onSubmit={saveSettings} className="space-y-6">
      <PageHeader
        title="Settings"
        desc="Configure platform preferences, permissions and account settings."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Platform</p>
              <h3 className="mt-2 text-2xl font-black text-white">
                {settings.platformName}
              </h3>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6b545]/10 text-[#f6b545]">
              <Globe2 size={22} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Approval Mode</p>
              <h3 className="mt-2 text-2xl font-black text-white">
                {settings.profileApproval}
              </h3>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 text-green-300">
              <ShieldCheck size={22} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Payment</p>
              <h3 className="mt-2 text-2xl font-black text-white">
                {settings.paymentGateway}
              </h3>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
              <CreditCard size={22} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Security</p>
              <h3 className="mt-2 text-2xl font-black text-white">
                {settings.twoFactorAuth ? "Protected" : "Basic"}
              </h3>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-300">
              <Lock size={22} />
            </div>
          </div>
        </Card>
      </div>

      {saved && (
        <div className="flex items-center gap-3 rounded-2xl border border-green-500/25 bg-green-500/10 px-5 py-4 text-green-300">
          <CheckCircle size={20} />
          <span className="font-semibold">Settings saved successfully.</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-black text-white">Platform Settings</h2>
            <p className="text-sm text-white/50">
              Manage basic platform, admin and website information.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormInput label="Platform Name" name="platformName" value={settings.platformName} onChange={handleChange} />
            <FormInput label="Website URL" name="websiteUrl" value={settings.websiteUrl} onChange={handleChange} />
            <FormInput label="Support Email" name="supportEmail" value={settings.supportEmail} onChange={handleChange} />
            <FormInput label="Admin Email" name="adminEmail" value={settings.adminEmail} onChange={handleChange} />

            <SelectInput label="Currency" name="currency" value={settings.currency} onChange={handleChange} options={["INR", "USD", "AED"]} />
            <SelectInput label="Timezone" name="timezone" value={settings.timezone} onChange={handleChange} options={["Asia/Kolkata", "Asia/Dubai", "UTC"]} />
            <SelectInput label="Language" name="language" value={settings.language} onChange={handleChange} options={["English", "Hindi", "Gujarati", "Tamil"]} />
            <SelectInput label="Default User Plan" name="defaultPlan" value={settings.defaultPlan} onChange={handleChange} options={["Free", "Silver", "Gold", "Platinum"]} />
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-black text-white">
              Verification Rules
            </h2>
            <p className="text-sm text-white/50">
              Control profile approval and photo verification process.
            </p>
          </div>

          <div className="space-y-5">
            <SelectInput label="Profile Approval" name="profileApproval" value={settings.profileApproval} onChange={handleChange} options={["Manual Review", "Auto Approval", "Admin Approval"]} />
            <SelectInput label="Photo Verification" name="photoVerification" value={settings.photoVerification} onChange={handleChange} options={["Required", "Optional", "Disabled"]} />
            <SelectInput label="Payment Gateway" name="paymentGateway" value={settings.paymentGateway} onChange={handleChange} options={["Razorpay", "Stripe", "PayPal", "Cashfree"]} />
            <SelectInput label="Maintenance Mode" name="maintenanceMode" value={settings.maintenanceMode} onChange={handleChange} options={["Disabled", "Enabled"]} />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-black text-white">
            Notification Preferences
          </h2>
          <p className="text-sm text-white/50">
            Enable or disable communication channels.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Toggle label="Email Notifications" desc="Send account and profile updates through email." name="emailNotifications" icon={Mail} />
          <Toggle label="SMS Notifications" desc="Send verification and reminder messages by SMS." name="smsNotifications" icon={Smartphone} />
          <Toggle label="Push Notifications" desc="Allow app/browser push notifications." name="pushNotifications" icon={Bell} />
          <Toggle label="WhatsApp Alerts" desc="Enable WhatsApp reminders and premium alerts." name="whatsappAlerts" icon={Smartphone} />
        </div>
      </Card>

      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-black text-white">Security Settings</h2>
          <p className="text-sm text-white/50">
            Protect admin access and suspicious user activity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Toggle label="Two-Factor Authentication" desc="Require extra verification for admin login." name="twoFactorAuth" icon={Lock} />
          <Toggle label="Auto Block Suspicious Users" desc="Automatically restrict suspicious accounts." name="autoBlockSuspicious" icon={UserCog} />
        </div>
      </Card>

      <div className="sticky bottom-5 z-20 rounded-3xl border border-[#D4AF37]/20 bg-[#132238]/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={() => setResetOpen(true)}
            className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-3 font-bold text-red-300 transition-all duration-300 hover:scale-105 hover:bg-red-500 hover:text-white"
          >
            Reset Settings
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F4D06F] px-7 py-3 font-bold text-[#0B1220] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.35)] disabled:opacity-60"
          >
            <Save size={18} />
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>

      <ConfirmModal
        open={resetOpen}
        title="Reset Settings?"
        desc="All settings will be restored to default values."
        onClose={() => setResetOpen(false)}
        onConfirm={resetSettings}
      />
    </form>
  );
};

export default Settings;