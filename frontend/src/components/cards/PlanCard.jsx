import { Check, Crown, Sparkles, ShieldCheck } from "lucide-react";

const formatPrice = (price) => {
  if (price === undefined || price === null || price === "") return "₹0";

  const cleanPrice = Number(price);

  if (Number.isNaN(cleanPrice)) {
    return String(price);
  }

  if (cleanPrice === 0) return "Free";

  return `₹${cleanPrice}`;
};

const getFeatures = (plan) => {
  const features =
    plan.features ||
    plan.benefits ||
    plan.planFeatures ||
    plan.includes ||
    [];

  if (Array.isArray(features)) {
    return features.filter(Boolean);
  }

  if (typeof features === "string") {
    return features
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const PlanCard = ({ plan = {}, onSelect }) => {
  const planName = plan.name || plan.planName || plan.title || "Plan";

  const planPrice =
    plan.price ?? plan.amount ?? plan.monthlyPrice ?? plan.planPrice ?? 0;

  const duration =
    plan.duration ||
    plan.validity ||
    plan.period ||
    plan.billingCycle ||
    "Monthly";

  const buttonText =
    plan.buttonText ||
    (planName === "Free" ? "Start Free" : `Upgrade to ${planName}`);

  const features = getFeatures(plan);

  const isPopular = Boolean(plan.popular || plan.isPopular || plan.recommended);
  const isCurrent = buttonText === "Current Plan" || plan.isCurrent;

  return (
    <div
      className={`group relative overflow-hidden rounded-[34px] border p-7 transition-all duration-500 ${
        isCurrent
          ? "border-[#f4d06f]/80 bg-gradient-to-br from-[#221322] via-[#111c33] to-[#07101f] shadow-2xl shadow-[#d4af37]/20"
          : isPopular
          ? "border-[#d4af37]/80 bg-gradient-to-br from-[#221322] via-[#111c33] to-[#07101f] shadow-2xl shadow-[#d4af37]/15 hover:-translate-y-2"
          : "border-[#d4af37]/15 bg-gradient-to-br from-[#111c33] via-[#0b1425] to-[#07101f] shadow-2xl shadow-black/25 hover:-translate-y-2 hover:border-[#d4af37]/45"
      }`}
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#d4af37]/12 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#7a1128]/20 blur-3xl" />

      {isPopular && !isCurrent && (
        <div className="absolute left-0 right-0 top-0 bg-gradient-to-r from-[#d4af37] via-[#f4d06f] to-[#d4af37] py-2 text-center text-xs font-black uppercase tracking-[2px] text-[#050914]">
          <Crown size={13} className="mr-1 inline" />
          Most Popular
        </div>
      )}

      {isCurrent && (
        <div className="absolute left-0 right-0 top-0 bg-gradient-to-r from-[#f4d06f] via-[#d4af37] to-[#f4d06f] py-2 text-center text-xs font-black uppercase tracking-[2px] text-[#050914]">
          <ShieldCheck size={13} className="mr-1 inline" />
          Active Plan
        </div>
      )}

      <div className={`relative ${isPopular || isCurrent ? "pt-9" : ""}`}>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#f4d06f] shadow-lg shadow-[#d4af37]/10">
          {isPopular || isCurrent ? <Crown size={30} /> : <Sparkles size={28} />}
        </div>

        <h3 className="mt-6 text-center font-serif text-3xl font-black text-[#f4d06f]">
          {planName}
        </h3>

        <p className="mt-4 text-center font-serif text-5xl font-black text-white">
          {formatPrice(planPrice)}
        </p>

        <p className="mt-2 text-center text-sm font-black uppercase tracking-[2px] text-white/40">
          {duration}
        </p>

        <div className="mx-auto mt-6 h-[2px] w-20 rounded-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

        <div className="mt-7 space-y-4">
          {features.length > 0 ? (
            features.map((feature, index) => (
              <p
                key={`${feature}-${index}`}
                className="flex items-start gap-3 text-sm font-semibold leading-6 text-white/70"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#d4af37]/10 text-[#f4d06f]">
                  <Check size={14} />
                </span>
                {feature}
              </p>
            ))
          ) : (
            <p className="text-center text-sm leading-6 text-white/50">
              Premium matrimony features included.
            </p>
          )}
        </div>

        <div className="mt-7 rounded-2xl border border-[#d4af37]/15 bg-[#d4af37]/5 p-4">
          <p className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-[1px] text-[#f4d06f]">
            <ShieldCheck size={15} />
            Family Safe • Privacy Protected
          </p>
        </div>

        <button
          type="button"
          onClick={onSelect}
          disabled={isCurrent}
          className={`mt-7 flex h-12 w-full items-center justify-center rounded-2xl text-sm font-black shadow-xl transition disabled:cursor-not-allowed ${
            isCurrent
              ? "border border-[#d4af37]/30 bg-white/10 text-white/45 shadow-none"
              : "bg-[#D4AF37] text-[#050914] shadow-[#d4af37]/20 hover:bg-[#f4d06f]"
          }`}
        >
          {buttonText}
        </button>
      </div>

      <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#d4af37] to-[#f4d06f] transition-all duration-500 group-hover:w-full" />
    </div>
  );
};

export default PlanCard;