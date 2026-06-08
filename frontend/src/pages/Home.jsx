import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ShieldCheck,
  Lock,
  Heart,
  Headphones,
  Sparkles,
} from "lucide-react";

import PageLayout from "../components/layout/PageLayout";
import Button from "../components/ui/Button";
import SectionTitle from "../components/ui/SectionTitle";
import StatCard from "../components/ui/StatCard";
import SelectField from "../components/forms/SelectField";
import MemberCard from "../components/cards/MemberCard";
import StoryCard from "../components/cards/StoryCard";
import PlanCard from "../components/cards/PlanCard";

import { stories as fallbackStories, plans as fallbackPlans } from "../data/vivahData";
import heroImg from "../assets/images/hero.png";

const PROFILE_API = "http://localhost:5000/api/profiles";
const STORY_API = "http://localhost:5000/api/stories";
const PLAN_API = "http://localhost:5000/api/admin/membership-plans";

const fallbackImage =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop";

const Home = () => {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [profileCount, setProfileCount] = useState(0);
  const [stories, setStories] = useState(fallbackStories);
  const [plans, setPlans] = useState(fallbackPlans);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    lookingFor: "Bride",
    age: "22 - 35",
    religion: "Hindu",
    community: "All Communities",
  });

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);

      const [profileRes, storyRes, planRes] = await Promise.allSettled([
        fetch(PROFILE_API),
        fetch(STORY_API),
        fetch(PLAN_API),
      ]);

      if (profileRes.status === "fulfilled") {
        const data = await profileRes.value.json();
        const profiles = data.profiles || data || [];

        setProfileCount(profiles.length);

        const formattedMembers = profiles.slice(0, 4).map((profile) => ({
          id: profile._id,
          name: profile.fullName || profile.user?.name || "VivahConnect User",
          age: profile.age || "N/A",
          height: profile.height || "5'5",
          religion: profile.religion || "Not added",
          caste: profile.community || "Community",
          city: profile.city || "India",
          job: profile.profession || "Not added",
          education: profile.education || "Not added",
          image: profile.photos?.[0]?.url || profile.photo || fallbackImage,
        }));

        setMembers(formattedMembers);
      }

      if (storyRes.status === "fulfilled") {
        const data = await storyRes.value.json();
        const apiStories = data.stories || data || [];

        if (apiStories.length > 0) {
          const formattedStories = apiStories.slice(0, 3).map((story) => ({
            id: story._id,
            title: story.title,
            couple: story.couple || story.name || story.title,
            desc: story.description || story.story,
            image: story.image || story.photo,
          }));

          setStories(formattedStories);
        }
      }

      if (planRes.status === "fulfilled") {
        const data = await planRes.value.json();
        const apiPlans = data.plans || data.membershipPlans || data || [];

        if (apiPlans.length > 0) {
          const formattedPlans = apiPlans.map((plan) => ({
            id: plan._id || plan.id,
            name: plan.name || plan.planName || plan.title || "Plan",
            price: plan.price ?? plan.amount ?? plan.monthlyPrice ?? 0,
            duration: plan.duration || plan.validity || "Monthly",
            desc: plan.desc || plan.description || "Premium matrimony plan",
            features: plan.features || plan.benefits || [],
            popular: plan.popular || plan.isPopular || false,
          }));

          setPlans(formattedPlans);
        }
      }
    } catch (error) {
      console.log("Home data error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const goToCreateProfile = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/profile" : "/register");
  };

  const handleSearch = () => {
    const params = new URLSearchParams(filters);
    navigate(`/matches?${params.toString()}`);
  };

  const handlePlanClick = (plan) => {
    localStorage.setItem("selectedPlan", JSON.stringify(plan));

    if (plan.name === "Free") {
      navigate("/matches");
    } else {
      navigate("/checkout");
    }
  };

  const dynamicStats = [
    {
      icon: ShieldCheck,
      value: profileCount > 0 ? `${profileCount}+` : "100%",
      title: "Verified Profiles",
      desc: "Real profiles from your database",
    },
    {
      icon: Lock,
      value: "Safe",
      title: "Privacy Protection",
      desc: "Your privacy is our priority",
    },
    {
      icon: Heart,
      value: "Real",
      title: "Serious Relationships",
      desc: "Genuine profiles, real intentions",
    },
    {
      icon: Headphones,
      value: "24/7",
      title: "Customer Support",
      desc: "We are here to help you",
    },
  ];

  return (
    <PageLayout>
      <section className="relative min-h-[760px] overflow-hidden border-b border-[#d4af37]/20 bg-[#050914]">
        <img
          src={heroImg}
          alt="Indian bride and groom"
          className="absolute inset-0 h-full w-full object-cover object-[65%_center] opacity-95"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#050914] via-[#050914]/80 to-[#050914]/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050914]/25 via-transparent to-[#050914]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,transparent_0%,rgba(5,9,20,.35)_48%,rgba(5,9,20,.92)_100%)]" />
        <div className="absolute right-10 top-20 h-[420px] w-[420px] rounded-full bg-[#d4af37]/15 blur-[120px]" />
        <div className="absolute left-0 top-0 h-full w-full bg-[#050914]/35 backdrop-blur-[1px]" />

        <div className="relative mx-auto grid max-w-[1500px] gap-12 px-6 py-20 lg:grid-cols-[1fr_.72fr]">
          <div className="pt-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#07101f]/55 px-5 py-2 text-sm font-black text-[#f4d06f] shadow-lg shadow-black/30 backdrop-blur-2xl">
              <Sparkles size={16} />
              India’s Premium Family Matrimony Platform
            </div>

            <h1 className="mt-7 font-serif text-5xl font-black leading-[1.05] text-white drop-shadow-2xl md:text-7xl xl:text-8xl">
              Find a Match <br />
              Your Family Will <br />
              <span className="bg-gradient-to-r from-[#f4d06f] via-[#d4af37] to-[#fff1a8] bg-clip-text text-transparent">
                Truly Trust
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg font-semibold leading-8 text-white/78">
              Discover verified Indian profiles by community, religion, city,
              profession and family preferences. Built for serious marriage
              decisions.
            </p>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              {["Family Verified", "Kundli Friendly", "Community Based"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[#d4af37]/25 bg-[#07101f]/55 px-4 py-3 text-sm font-black text-white/85 shadow-lg shadow-black/25 backdrop-blur-2xl"
                  >
                    <span className="text-[#f4d06f]">✓</span> {item}
                  </div>
                )
              )}
            </div>

            <div className="mt-10 rounded-[34px] border border-[#d4af37]/25 bg-[#07101f]/65 p-6 shadow-2xl shadow-black/45 backdrop-blur-2xl">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-black text-white">
                  Start Your Match Search
                </h3>

                <span className="rounded-full border border-[#d4af37]/20 bg-[#d4af37]/10 px-3 py-1 text-xs font-black text-[#f4d06f]">
                  Free Registration
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-5">
                <SelectField
                  label="Looking For"
                  name="lookingFor"
                  value={filters.lookingFor}
                  onChange={handleChange}
                  options={["Bride", "Groom"]}
                />

                <SelectField
                  label="Age"
                  name="age"
                  value={filters.age}
                  onChange={handleChange}
                  options={["22 - 35", "18 - 25", "26 - 35", "36 - 45"]}
                />

                <SelectField
                  label="Religion"
                  name="religion"
                  value={filters.religion}
                  onChange={handleChange}
                  options={["Hindu", "Muslim", "Sikh", "Christian", "Jain"]}
                />

                <SelectField
                  label="Community"
                  name="community"
                  value={filters.community}
                  onChange={handleChange}
                  options={[
                    "All Communities",
                    "Agarwal",
                    "Punjabi",
                    "Iyer",
                    "Kayastha",
                    "Marwari",
                    "Gujarati",
                  ]}
                />

                <Button
                  onClick={handleSearch}
                  className="mt-7 h-16 w-full rounded-2xl"
                >
                  <Search size={18} />
                  Search
                </Button>
              </div>
            </div>
          </div>

          <div className="hidden items-end justify-end lg:flex">
            <div className="mb-20 w-full max-w-sm rounded-[34px] border border-[#d4af37]/25 bg-[#07101f]/45 p-5 shadow-2xl shadow-black/45 backdrop-blur-2xl">
              <div className="rounded-3xl border border-[#d4af37]/20 bg-gradient-to-br from-[#7a1128]/40 via-[#111c33]/75 to-[#07101f]/85 p-5">
                <p className="text-sm font-black text-[#f4d06f]">
                  Today’s Premium Match
                </p>

                <h3 className="mt-3 text-2xl font-black text-white">
                  Verified families, serious profiles
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/60">
                  Match by education, profession, family background and
                  community.
                </p>

                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  {[
                    [`${profileCount || 12}+`, "Profiles"],
                    ["45K+", "Matches"],
                    ["100%", "Secure"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-xl"
                    >
                      <p className="font-black text-[#f4d06f]">{value}</p>
                      <p className="text-xs text-white/45">{label}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate("/matches")}
                  className="mt-6 w-full rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#f4d06f] px-5 py-3 text-sm font-black text-[#050914]"
                >
                  Browse Verified Matches
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/10 bg-[#07101f]">
        <div className="mx-auto grid max-w-[1500px] gap-5 px-6 py-10 md:grid-cols-4">
          {dynamicStats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
      </section>

      <main className="mx-auto max-w-[1500px] px-6 py-14">
        <SectionTitle
          title="Featured"
          highlight="Premium Members"
          desc="Handpicked verified profiles with serious relationship intent."
          right={
            <Button variant="outline" onClick={() => navigate("/matches")}>
              View All Members
            </Button>
          }
        />

        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[500px] animate-pulse rounded-[30px] border border-[#d4af37]/20 bg-[#0b1425]"
              />
            ))}
          </div>
        ) : members.length === 0 ? (
          <div className="rounded-3xl border border-[#d4af37]/20 bg-[#0b1425] p-8 text-center">
            <p className="font-bold text-white/60">
              No profiles found. Create a profile first.
            </p>

            <button
              onClick={goToCreateProfile}
              className="mt-5 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#f4d06f] px-6 py-3 font-black text-[#050914]"
            >
              Create Profile
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}

        <section className="mt-20">
          <SectionTitle
            title="Indian"
            highlight="Success Stories"
            desc="Real couples who found their forever through VivahConnect."
            right={
              <Button
                variant="outline"
                onClick={() => navigate("/success-stories")}
              >
                View All Stories
              </Button>
            }
          />

          <div className="grid gap-7 lg:grid-cols-[1.35fr_.9fr]">
            <div className="grid gap-5 md:grid-cols-3">
              {stories.map((story) => (
                <StoryCard key={story.id || story._id} story={story} />
              ))}
            </div>

            <div className="relative overflow-hidden rounded-[32px] border border-[#d4af37]/25 bg-gradient-to-br from-[#16243d] via-[#0f1b30] to-[#07101f] p-8 shadow-2xl shadow-black/30">
              <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#d4af37]/10 blur-3xl" />
              <div className="absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-[#7a1128]/15 blur-3xl" />

              <div className="relative">
                <span className="inline-flex items-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-2 text-xs font-black uppercase tracking-[2px] text-[#f4d06f]">
                  Trusted By Families Across India
                </span>

                <h3 className="mt-5 font-serif text-4xl font-black leading-tight text-white">
                  Find a life partner your family will truly trust.
                </h3>

                <p className="mt-4 max-w-lg leading-7 text-white/65">
                  Join verified Indian families searching for meaningful and
                  lifelong relationships.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={goToCreateProfile}
                    className="rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#f4d06f] px-6 py-4 font-black text-[#050914]"
                  >
                    Create Free Profile
                  </button>

                  <button
                    onClick={() => navigate("/matches")}
                    className="rounded-2xl border border-[#d4af37]/30 px-6 py-4 font-black text-[#f4d06f]"
                  >
                    Browse Matches
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <SectionTitle
            title="Choose Your"
            highlight="Membership"
            desc="Premium plans designed for serious matches."
          />

          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id || plan._id || plan.name}
                plan={plan}
                onSelect={() => handlePlanClick(plan)}
              />
            ))}
          </div>
        </section>
      </main>
    </PageLayout>
  );
};

export default Home;