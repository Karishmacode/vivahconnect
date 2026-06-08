import { useEffect, useState } from "react";
import {
  UserPlus,
  Search,
  MessageCircle,
  HeartHandshake,
  Sparkles,
  ShieldCheck,
  Users,
  BadgeCheck,
} from "lucide-react";

import { Link } from "react-router-dom";

import PageLayout from "../components/layout/PageLayout";
import Button from "../components/ui/Button";

const iconMap = {
  UserPlus,
  Search,
  MessageCircle,
  HeartHandshake,
  Sparkles,
  ShieldCheck,
  Users,
  BadgeCheck,
};

const defaultSteps = [
  {
    icon: UserPlus,
    title: "Create Profile",
    desc: "Add personal, family, education and lifestyle information.",
  },
  {
    icon: Search,
    title: "Discover Matches",
    desc: "Explore verified profiles by religion, community and preferences.",
  },
  {
    icon: MessageCircle,
    title: "Connect Families",
    desc: "Send interests, shortlist profiles and begin conversations.",
  },
  {
    icon: HeartHandshake,
    title: "Find Your Forever",
    desc: "Meet compatible families and build a lifelong relationship.",
  },
];

const HowItWorks = () => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/pages/slug/how-it-works"
        );

        const data = await res.json();

        if (res.ok) {
          setPage(data.page);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, []);

  const steps =
    page?.sections?.length > 0
      ? page.sections.map((section, index) => ({
          icon:
            iconMap[section.icon] ||
            defaultSteps[index]?.icon ||
            BadgeCheck,
          title: section.title,
          desc: section.description,
        }))
      : defaultSteps;

  if (loading) {
    return (
      <PageLayout>
        <div className="py-20 text-center text-white">Loading...</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <main className="mx-auto max-w-[1400px] px-6 py-12">
        <section className="relative overflow-hidden rounded-[40px] border border-[#d4af37]/20 bg-gradient-to-br from-[#111c33] via-[#0b1425] to-[#07101f] p-10">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#d4af37]/10 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-[#7a1128]/20 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-5 py-2 text-xs font-black uppercase tracking-[3px] text-[#f4d06f]">
              <Sparkles size={14} />
              {page?.highlight || "Premium Matrimony Journey"}
            </div>

            <h1 className="mt-6 font-serif text-6xl font-black leading-none">
              <span className="text-white">
                {page?.title || "Find Your Partner"}
              </span>
              <br />
              <span className="text-[#f4d06f]">
                {page?.subtitle || "In 4 Simple Steps"}
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60">
              {page?.description ||
                "Designed for Indian families looking for verified profiles, trusted connections and meaningful relationships."}
            </p>
          </div>
        </section>

        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {[
            ["12K+", "Verified Profiles"],
            ["45K+", "Successful Matches"],
            ["100%", "Privacy Protected"],
            ["2K+", "Premium Members"],
          ].map(([value, title]) => (
            <div
              key={title}
              className="rounded-[28px] border border-[#d4af37]/15 bg-gradient-to-br from-[#111c33] to-[#07101f] p-6"
            >
              <h3 className="text-4xl font-black text-white">{value}</h3>
              <p className="mt-2 font-black text-[#f4d06f]">{title}</p>
            </div>
          ))}
        </div>

        <section className="mt-14">
          <div className="mb-10">
            <p className="text-xs font-black uppercase tracking-[3px] text-[#f4d06f]">
              Matrimony Process
            </p>

            <h2 className="mt-2 font-serif text-5xl font-black text-white">
              Your Journey Begins Here
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="group relative overflow-hidden rounded-[32px] border border-[#d4af37]/15 bg-gradient-to-br from-[#111c33] to-[#07101f] p-7 transition hover:-translate-y-2 hover:border-[#d4af37]/50"
                >
                  <span className="absolute right-5 top-4 text-6xl font-black text-white/[0.04]">
                    0{index + 1}
                  </span>

                  <div className="grid h-16 w-16 place-items-center rounded-3xl border border-[#d4af37]/20 bg-[#d4af37]/10 text-[#f4d06f]">
                    <Icon size={30} />
                  </div>

                  <h3 className="mt-6 text-2xl font-black text-white">
                    {step.title}
                  </h3>

                  <p className="mt-4 leading-7 text-white/60">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-14 rounded-[35px] border border-[#d4af37]/20 bg-gradient-to-br from-[#16243d] to-[#07101f] p-8">
          <div className="flex items-center gap-3">
            <ShieldCheck size={36} className="text-[#f4d06f]" />

            <div>
              <h2 className="text-3xl font-black text-white">
                Why Families Trust VivahConnect
              </h2>

              <p className="mt-1 text-white/60">
                {page?.content ||
                  "Built around trust, privacy and serious relationship intent."}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ["Verified Profiles", BadgeCheck],
              ["Family Focused Matching", Users],
              ["Safe Communication", MessageCircle],
            ].map(([title, Icon]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <Icon className="text-[#f4d06f]" size={22} />

                <h3 className="mt-4 text-xl font-black text-white">{title}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[40px] border border-[#d4af37]/20 bg-gradient-to-r from-[#16243d] via-[#0b1425] to-[#07101f] p-10 text-center">
          <h2 className="font-serif text-5xl font-black text-white">
            Begin Your Forever Story
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/60">
            Join thousands of verified Indian families who trust VivahConnect to
            find meaningful lifelong relationships.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button>Create Free Profile</Button>
            </Link>

            <Link to="/matches">
              <Button variant="outline">Explore Matches</Button>
            </Link>
          </div>
        </section>
      </main>
    </PageLayout>
  );
};

export default HowItWorks;