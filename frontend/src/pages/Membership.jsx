import { useEffect, useState } from "react";
import {
  ShieldCheck,
  MessageCircle,
  Eye,
  Crown,
  Sparkles,
  BadgeCheck,
  HeartHandshake,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import PageLayout from "../components/layout/PageLayout";
import StatCard from "../components/ui/StatCard";
import PlanCard from "../components/cards/PlanCard";

const API_URL = "http://localhost:5000/api/admin/membership-plans";

const Membership = () => {
  const navigate = useNavigate();

  const [currentPlan, setCurrentPlan] = useState("Free");
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDuration = (days, name) => {
    if (name === "Free") return "FREE";
    if (Number(days) === 30) return "1 MONTH";
    if (Number(days) === 90) return "3 MONTHS";
    if (Number(days) === 180) return "6 MONTHS";
    return `${days} DAYS`;
  };

  const fetchPlans = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      const dynamicPlans = (data.plans || [])
        .filter(
          (plan) =>
            !plan.status || String(plan.status).toLowerCase() === "active"
        )
        .map((plan) => ({
          id: plan._id,
          name: plan.name,
          price: `₹${Number(plan.price || 0).toLocaleString("en-IN")}`,
          duration: formatDuration(plan.duration, plan.name),
          popular: plan.popular || plan.name === "Gold",
          features: Array.isArray(plan.features)
            ? plan.features
            : String(plan.features || "")
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
        }));

      setPlans(dynamicPlans);
    } catch (error) {
      console.log("Membership plans fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentPlan(user.membership || user.plan || "Free");
    }

    fetchPlans();
  }, []);

  const handlePlanClick = (plan) => {
    if (plan.name === currentPlan) {
      alert(`You are already on ${plan.name} plan`);
      return;
    }

    localStorage.setItem("selectedPlan", JSON.stringify(plan));

    if (plan.name === "Free") {
      navigate("/members");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <PageLayout>
      <main className="mx-auto max-w-[1500px] px-6 py-12">
        <section className="relative overflow-hidden rounded-[40px] border border-[#d4af37]/20 bg-gradient-to-br from-[#111c33] via-[#0b1425] to-[#07101f] p-10">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#d4af37]/10 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-[#7a1128]/20 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-5 py-2 text-xs font-black uppercase tracking-[3px] text-[#f4d06f]">
              <Sparkles size={14} />
              Premium Membership
            </div>

            <h1 className="mt-6 font-serif text-5xl font-black leading-tight md:text-6xl">
              <span className="text-white">Unlock Better</span>
              <br />
              <span className="text-[#f4d06f]">Marriage Opportunities</span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60">
              Choose a trusted membership plan to send more interests, unlock
              WhatsApp access after accepted matches, and improve your profile
              visibility.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-5 py-2 text-sm font-black text-[#f4d06f]">
              <Crown size={16} />
              Current Plan: {currentPlan}
            </div>
          </div>
        </section>

        <div className="mt-10 grid gap-5 md:grid-cols-4">
          <StatCard
            icon={Eye}
            value="5x"
            title="More Visibility"
            desc="Appear higher in search results"
          />
          <StatCard
            icon={MessageCircle}
            value="WA"
            title="WhatsApp Access"
            desc="Available after accepted matches"
          />
          <StatCard
            icon={ShieldCheck}
            value="100%"
            title="Privacy Protected"
            desc="Safe and secure communication"
          />
          <StatCard
            icon={Crown}
            value="VIP"
            title="Priority Support"
            desc="Premium member assistance"
          />
        </div>

        <section className="mt-14">
          <div className="mb-10 text-center">
            <p className="text-xs font-black uppercase tracking-[3px] text-[#f4d06f]">
              Membership Plans
            </p>

            <h2 className="mt-3 font-serif text-5xl font-black">
              Choose Your Perfect Plan
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-white/55">
              Affordable plans designed for Indian matrimony users.
            </p>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-[#d4af37]/20 bg-[#132238] p-10 text-center text-white/70">
              Loading membership plans...
            </div>
          ) : plans.length === 0 ? (
            <div className="rounded-3xl border border-[#d4af37]/20 bg-[#132238] p-10 text-center text-white/70">
              No membership plans found. Please run seed or add plans from admin.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={{
                    ...plan,
                    buttonText:
                      plan.name === currentPlan
                        ? "Current Plan"
                        : plan.name === "Free"
                        ? "Start Free"
                        : `Upgrade to ${plan.name}`,
                  }}
                  onSelect={() => handlePlanClick(plan)}
                />
              ))}
            </div>
          )}
        </section>

        <section className="mt-14 rounded-[35px] border border-[#d4af37]/20 bg-gradient-to-br from-[#16243d] to-[#07101f] p-8">
          <div className="flex items-center gap-3">
            <Crown size={38} className="text-[#f4d06f]" />

            <div>
              <h2 className="text-3xl font-black text-white">
                Why Go Premium?
              </h2>
              <p className="text-white/60">
                Premium members enjoy a faster and more serious match journey.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              [
                "Higher Profile Visibility",
                "Your profile is shown to more compatible matches.",
                Eye,
              ],
              [
                "More Interests",
                "Send more interests every month based on your plan.",
                HeartHandshake,
              ],
              [
                "WhatsApp After Acceptance",
                "Contact details unlock only after both users accept.",
                BadgeCheck,
              ],
            ].map(([title, desc, Icon]) => (
              <div
                key={title}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
              >
                <Icon size={24} className="text-[#f4d06f]" />
                <h3 className="mt-4 text-xl font-black text-white">{title}</h3>
                <p className="mt-3 leading-7 text-white/55">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[40px] border border-[#d4af37]/20 bg-gradient-to-r from-[#16243d] via-[#0b1425] to-[#07101f] p-10 text-center">
          <div className="flex justify-center gap-1 text-[#f4d06f]">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={20} fill="currentColor" />
            ))}
          </div>

          <h2 className="mt-5 font-serif text-4xl font-black text-white">
            Trusted By Families
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-white/60">
            Premium membership helps families connect with serious and verified
            profiles in a safe, professional and family-friendly way.
          </p>

          <p className="mt-5 font-black text-[#f4d06f]">
            — Rahul & Priya, Jaipur
          </p>
        </section>
      </main>
    </PageLayout>
  );
};

export default Membership;