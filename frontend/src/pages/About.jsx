import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Users,
  BadgeCheck,
  Search,
  HeartHandshake,
  Lock,
} from "lucide-react";

import PageLayout from "../components/layout/PageLayout";
import SectionTitle from "../components/ui/SectionTitle";

const API_URL = "http://localhost:5000/api/pages/slug/about";

const About = () => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(API_URL);
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

  if (loading) {
    return (
      <PageLayout>
        <div className="py-24 text-center text-white/60">Loading...</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <main className="mx-auto max-w-[1400px] px-6 py-12">
        <SectionTitle
          title={page?.title || "About"}
          highlight={page?.highlight || "VivahConnect"}
          desc={
            page?.description ||
            "A premium Indian matrimony platform for verified families, serious profiles and trusted marriage decisions."
          }
        />

        <section className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative overflow-hidden rounded-[34px] border border-[#d4af37]/25 bg-[#0b1425] shadow-2xl shadow-black/30">
            <img
              src={
                page?.heroImage ||
                "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop"
              }
              alt={page?.title || "About VivahConnect"}
              className="h-full min-h-[520px] w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#050914]/85 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/10 bg-[#050914]/70 p-5 backdrop-blur-xl">
              <p className="text-xs font-black uppercase tracking-[3px] text-[#f4d06f]">
                Premium Indian Matrimony
              </p>
              <h3 className="mt-2 font-serif text-3xl font-black text-white">
                Trusted by serious families
              </h3>
            </div>
          </div>

          <div className="rounded-[34px] border border-[#d4af37]/20 bg-gradient-to-br from-[#111c33] to-[#07101f] p-8 shadow-2xl shadow-black/30">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-5 py-2 text-xs font-black uppercase tracking-[3px] text-[#f4d06f]">
              <HeartHandshake size={14} />
              Our Story
            </div>

            <h1 className="mt-6 font-serif text-4xl font-black leading-tight text-white md:text-5xl">
              Safer, smarter and more meaningful partner search.
            </h1>

            <p className="mt-6 whitespace-pre-line text-base leading-8 text-white/65">
              {page?.content ||
                "VivahConnect helps modern Indian families discover verified profiles by religion, community, profession, city and family preferences. We support serious marriage decisions across Hindu, Muslim, Sikh, Christian, Jain and other Indian communities."}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: ShieldCheck,
                  title: "Verified Profiles",
                  desc: "Built around trusted and serious matrimonial profiles.",
                },
                {
                  icon: Users,
                  title: "Family Focused",
                  desc: "Designed for Indian families and meaningful decisions.",
                },
                {
                  icon: Search,
                  title: "Smart Discovery",
                  desc: "Search matches by preferences, city and community.",
                },
                {
                  icon: Lock,
                  title: "Privacy First",
                  desc: "Sensitive details stay protected and controlled.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
                  >
                    <Icon className="text-[#f4d06f]" size={24} />
                    <h3 className="mt-4 text-xl font-black text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/55">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {(page?.sections?.length
            ? page.sections
            : [
                {
                  title: "Verified Profiles",
                  description:
                    "Every profile is designed around genuine intent and trusted information.",
                },
                {
                  title: "Indian Community Search",
                  description:
                    "Find matches by religion, community, city, profession and lifestyle.",
                },
                {
                  title: "Privacy First",
                  description:
                    "Member privacy and controlled discovery stay at the center of the platform.",
                },
              ]
          ).map((section) => (
            <div
              key={section.title}
              className="rounded-[30px] border border-[#d4af37]/15 bg-[#0b1425] p-6 transition hover:-translate-y-1 hover:border-[#d4af37]/45"
            >
              <BadgeCheck className="text-[#f4d06f]" size={28} />

              <h3 className="mt-4 font-serif text-2xl font-black text-[#f4d06f]">
                {section.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/60">
                {section.description}
              </p>
            </div>
          ))}
        </section>
      </main>
    </PageLayout>
  );
};

export default About;