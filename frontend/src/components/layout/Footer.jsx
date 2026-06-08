import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HeartHandshake,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Crown,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/settings";

const Footer = () => {
  const [settings, setSettings] = useState({
    platformName: "VivahConnect",
    supportEmail: "support@vivahconnect.com",
    phone: "+91 98765 43210",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        if (res.ok) {
          setSettings({
            platformName: data.settings?.platformName || "VivahConnect",
            supportEmail:
              data.settings?.supportEmail || "support@vivahconnect.com",
            phone: data.settings?.phone || "+91 98765 43210",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSettings();
  }, []);

  const footerGroups = [
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "How It Works", path: "/how-it-works" },
        { name: "Success Stories", path: "/success-stories" },
        { name: "FAQs", path: "/faqs" },
      ],
    },
    {
      title: "For Members",
      links: [
        { name: "Membership Plans", path: "/membership" },
        { name: "Premium Features", path: "/membership" },
        { name: "Profile Guide", path: "/profile" },
        { name: "Safety Tips", path: "/safety-tips" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", path: "/support" },
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms & Conditions", path: "/terms-and-conditions" },
        { name: "Refund Policy", path: "/refund-policy" },
      ],
    },
  ];

  const socialLinks = [
    { label: "IG", url: "https://instagram.com" },
    { label: "IN", url: "https://linkedin.com" },
    { label: "YT", url: "https://youtube.com" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-[#d4af37]/20 bg-[#050914]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(212,175,55,.14),transparent_28%),radial-gradient(circle_at_85%_30%,rgba(122,17,40,.22),transparent_30%)]" />

      <div className="relative mx-auto max-w-[1500px] px-8 py-14">
        <div className="mb-12 rounded-[32px] border border-[#d4af37]/25 bg-gradient-to-r from-[#101b31]/90 to-[#160711]/80 p-8">
          <p className="text-sm font-black uppercase tracking-[4px] text-[#d4af37]">
            Premium Indian Matrimony
          </p>

          <h2 className="mt-3 font-serif text-4xl font-black text-white">
            Begin your forever with trusted families.
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
            Verified profiles, privacy-first discovery and serious matches.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.3fr_.8fr_.8fr_.8fr_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <div className="relative grid h-14 w-14 place-items-center rounded-2xl border border-[#d4af37]/40 bg-[#d4af37]/10 text-[#f4d06f]">
                <HeartHandshake size={30} />

                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#f4d06f] text-[#050914]">
                  <Crown size={11} />
                </span>
              </div>

              <div>
                <h2 className="font-serif text-3xl font-black text-[#f4d06f]">
                  {settings.platformName}
                </h2>

                <p className="text-[10px] font-black uppercase tracking-[4px] text-[#d4af37]">
                  Premium Matrimony
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/58">
              India’s trusted matrimony platform connecting verified profiles,
              families and serious marriage seekers since 2024.
            </p>

            <div className="mt-6 flex gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-xs font-black text-white/70 transition hover:border-[#d4af37]/50 hover:text-[#f4d06f]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-black uppercase tracking-[2px] text-[#f4d06f]">
                {group.title}
              </h3>

              <div className="mt-5 space-y-3 text-sm text-white/55">
                {group.links.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block transition hover:text-[#f4d06f]"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-black uppercase tracking-[2px] text-[#f4d06f]">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4 text-sm text-white/60">
              <p className="flex items-center gap-3">
                <Phone size={17} className="text-[#f4d06f]" />
                {settings.phone}
              </p>

              <p className="flex items-center gap-3">
                <Mail size={17} className="text-[#f4d06f]" />
                {settings.supportEmail}
              </p>

              <p className="flex items-center gap-3">
                <MapPin size={17} className="text-[#f4d06f]" />
                India
              </p>

              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                <p className="flex items-center gap-2 text-sm font-black text-emerald-300">
                  <ShieldCheck size={17} />
                  100% Privacy Protected
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/45 md:flex-row">
          <p>© 2026 {settings.platformName}. All rights reserved.</p>
          <p>Verified • Secure • Premium Indian Matrimony</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;