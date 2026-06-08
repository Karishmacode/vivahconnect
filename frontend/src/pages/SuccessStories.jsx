import { useEffect, useState } from "react";
import {
  Heart,
  Users,
  Crown,
  Sparkles,
  BadgeCheck,
  MapPin,
  Quote,
} from "lucide-react";

import PageLayout from "../components/layout/PageLayout";
import StatCard from "../components/ui/StatCard";
import StoryCard from "../components/cards/StoryCard";

const API_URL = "http://localhost:5000/api/stories";

const fallbackImage =
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop";

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStories = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      if (res.ok) {
        const list = Array.isArray(data) ? data : data.stories || [];

        const approvedStories = list
          .filter((story) => story.status === "Approved" && story.active !== false)
          .map((story) => ({
            id: story._id,
            names: story.couple || "Happy Couple",
            date: story.weddingDate
              ? `Married on ${story.weddingDate}`
              : "Wedding date coming soon",
            city: story.city || "India",
            image: story.image || fallbackImage,
            story: story.story || "",
            title: story.title || "",
          }));

        setStories(approvedStories);
      }
    } catch (error) {
      console.log("Fetch success stories error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const featuredStory = stories[0];

  return (
    <PageLayout>
      <main className="mx-auto max-w-[1500px] px-6 py-12">
        <section className="relative overflow-hidden rounded-[40px] border border-[#d4af37]/20 bg-gradient-to-br from-[#111c33] via-[#0b1425] to-[#07101f] p-10 shadow-2xl shadow-black/25">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#d4af37]/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#7a1128]/20 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-5 py-2 text-xs font-black uppercase tracking-[3px] text-[#f4d06f]">
              <Sparkles size={14} />
              Real Indian Success Stories
            </div>

            <h1 className="mt-6 font-serif text-6xl font-black leading-none text-white">
              Couples Who Found <br />
              <span className="bg-gradient-to-r from-[#f4d06f] to-[#d4af37] bg-clip-text text-transparent">
                Their Forever
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60">
              Real families, verified profiles and meaningful connections that
              turned into lifelong relationships.
            </p>
          </div>
        </section>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <StatCard
            icon={Heart}
            value={`${stories.length}+`}
            title="Success Stories"
            desc="Couples featured on VivahConnect"
          />

          <StatCard
            icon={Users}
            value="12K+"
            title="Verified Users"
            desc="Trusted members across India"
          />

          <StatCard
            icon={Crown}
            value="2K+"
            title="Premium Members"
            desc="Serious members with upgraded plans"
          />
        </div>

        <section className="mt-12 grid gap-7 lg:grid-cols-[1.1fr_.9fr]">
          <div className="relative overflow-hidden rounded-[36px] border border-[#d4af37]/20 bg-[#0b1425] shadow-2xl shadow-black/25">
            <img
              src={featuredStory?.image || fallbackImage}
              alt={featuredStory?.names || "Featured success story"}
              className="h-[470px] w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-[#050914]/25 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 rounded-[28px] border border-[#d4af37]/25 bg-[#050914]/75 p-6 backdrop-blur-xl">
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[2px] text-[#f4d06f]">
                <BadgeCheck size={14} />
                Featured Marriage Story
              </p>

              <h2 className="mt-3 font-serif text-4xl font-black text-white">
                {featuredStory?.names || "Your Story Could Be Here"}
              </h2>

              <p className="mt-3 leading-7 text-white/65">
                {featuredStory?.story ||
                  "VivahConnect helps families connect with trust, verified profiles and meaningful match suggestions."}
              </p>
            </div>
          </div>

          <div className="rounded-[36px] border border-[#d4af37]/20 bg-gradient-to-br from-[#16243d] to-[#07101f] p-8 shadow-2xl shadow-black/25">
            <Quote size={44} className="text-[#f4d06f]" />

            <h2 className="mt-5 font-serif text-4xl font-black text-white">
              Built for real families and real commitments.
            </h2>

            <p className="mt-4 leading-8 text-white/60">
              From Hindu, Muslim, Sikh, Christian and Jain communities to North,
              South, East and West Indian families, VivahConnect helps people
              find meaningful relationships with respect and trust.
            </p>

            <div className="mt-7 grid gap-3">
              {[
                "Verified profiles before connection",
                "Community and family-focused matching",
                "Privacy-first communication",
                "Premium support for serious members",
              ].map((item) => (
                <p
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-bold text-white/65"
                >
                  <span className="text-[#f4d06f]">✓</span> {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[3px] text-[#f4d06f]">
                More Happy Couples
              </p>
              <h2 className="mt-2 font-serif text-5xl font-black text-white">
                Matrimony Success Stories
              </h2>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm font-black text-emerald-300">
              <MapPin size={17} />
              Stories from across India
            </div>
          </div>

          {loading ? (
            <div className="rounded-[30px] border border-[#d4af37]/20 bg-[#0b1425] p-10 text-center text-white/60">
              Loading success stories...
            </div>
          ) : stories.length === 0 ? (
            <div className="rounded-[30px] border border-[#d4af37]/20 bg-[#0b1425] p-10 text-center text-white/60">
              No approved success stories yet.
            </div>
          ) : (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          )}
        </section>
      </main>
    </PageLayout>
  );
};

export default SuccessStories;