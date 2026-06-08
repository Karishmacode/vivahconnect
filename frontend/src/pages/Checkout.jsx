import { useEffect, useState } from "react";
import { CheckCircle, Crown, ShieldCheck, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import PageLayout from "../components/layout/PageLayout";

const API_URL = "http://localhost:5000/api/payments/fake-upgrade";

const Checkout = () => {
  const navigate = useNavigate();

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedPlan = localStorage.getItem("selectedPlan");

    if (!savedPlan) {
      navigate("/membership");
      return;
    }

    setPlan(JSON.parse(savedPlan));
  }, [navigate]);

  const getPlanPrice = (price) => {
    if (typeof price === "number") {
      return `₹${price.toLocaleString("en-IN")}`;
    }

    return price || "₹0";
  };

  const getFeatures = () => {
    if (!plan?.features) return [];

    if (Array.isArray(plan.features)) {
      return plan.features;
    }

    return String(plan.features)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const handleActivatePlan = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          planId: plan.id,
          plan: plan.name,
          price: plan.price,
          duration: plan.duration,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to activate plan");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.removeItem("selectedPlan");

      alert(data.message || "Plan activated successfully");
      navigate("/membership");
    } catch (error) {
      console.log("Membership upgrade error:", error);
      alert("Membership activation failed. Check backend terminal.");
    } finally {
      setLoading(false);
    }
  };

  if (!plan) return null;

  const features = getFeatures();

  return (
    <PageLayout>
      <main className="mx-auto max-w-[1100px] px-6 py-12">
        <Link
          to="/membership"
          className="inline-flex items-center gap-2 text-sm font-bold text-white/60 transition hover:text-[#f4d06f]"
        >
          <ArrowLeft size={17} />
          Back to Membership
        </Link>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[38px] border border-[#d4af37]/20 bg-gradient-to-br from-[#111c33] via-[#0b1425] to-[#07101f] p-8 shadow-2xl shadow-black/30">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-5 py-2 text-xs font-black uppercase tracking-[3px] text-[#f4d06f]">
              <Crown size={14} />
              Checkout
            </div>

            <h1 className="mt-6 font-serif text-5xl font-black text-white">
              Confirm Your Plan
            </h1>

            <p className="mt-4 max-w-xl leading-7 text-white/55">
              Activate your membership plan and unlock better match connection
              features on VivahConnect.
            </p>

            <div className="mt-8 rounded-[30px] border border-[#d4af37]/20 bg-white/[0.03] p-6">
              <h2 className="font-serif text-4xl font-black text-[#f4d06f]">
                {plan.name}
              </h2>

              <p className="mt-4 font-serif text-5xl font-black text-white">
                {getPlanPrice(plan.price)}
              </p>

              <p className="mt-2 text-sm font-black uppercase tracking-[2px] text-white/40">
                {plan.duration || "Lifetime Free"}
              </p>

              <div className="mt-6 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#d4af37] to-transparent" />

              <div className="mt-7 space-y-4">
                {features.map((feature) => (
                  <p
                    key={feature}
                    className="flex items-start gap-3 text-sm font-semibold leading-6 text-white/70"
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#d4af37]/10 text-[#f4d06f]">
                      <CheckCircle size={14} />
                    </span>
                    {feature}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[38px] border border-[#d4af37]/20 bg-gradient-to-br from-[#16243d] to-[#07101f] p-8 shadow-2xl shadow-black/30">
            <div className="grid h-16 w-16 place-items-center rounded-3xl border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#f4d06f]">
              <ShieldCheck size={30} />
            </div>

            <h2 className="mt-6 text-3xl font-black text-white">
              Secure Activation
            </h2>

            <p className="mt-4 leading-7 text-white/55">
              For now this is demo checkout. Later we can connect Razorpay for
              real payment. This button will activate selected membership.
            </p>

            <div className="mt-7 rounded-3xl border border-[#d4af37]/15 bg-[#d4af37]/5 p-5">
              <p className="text-sm font-bold text-white/60">Selected Plan</p>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-xl font-black text-white">{plan.name}</p>
                <p className="text-xl font-black text-[#f4d06f]">
                  {getPlanPrice(plan.price)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleActivatePlan}
              disabled={loading}
              className="mt-7 flex h-12 w-full items-center justify-center rounded-2xl bg-[#D4AF37] text-sm font-black text-[#050914] shadow-xl shadow-[#d4af37]/20 transition hover:bg-[#f4d06f] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Activating..." : `Activate ${plan.name} Plan`}
            </button>

            <p className="mt-4 text-center text-xs font-semibold text-white/40">
              Family Safe • Privacy Protected • Verified Profiles
            </p>
          </div>
        </section>
      </main>
    </PageLayout>
  );
};

export default Checkout;