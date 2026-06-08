import { useEffect, useState } from "react";
import {
  CalendarDays,
  ArrowRight,
  Sparkles,
  HeartHandshake,
} from "lucide-react";

import PageLayout from "../components/layout/PageLayout";
import Button from "../components/ui/Button";

const defaultBlogs = [
  {
    id: 1,
    title: "How To Create A Matrimony Profile Families Trust",
    category: "Profile Tips",
    date: "12 Mar 2026",
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200",
    desc: "Build a profile that attracts genuine matches and creates trust with families.",
  },
  {
    id: 2,
    title: "Questions Every Family Should Discuss Before Marriage",
    category: "Marriage Advice",
    date: "18 Mar 2026",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200",
    desc: "Important discussions that help couples and families make informed decisions.",
  },
  {
    id: 3,
    title: "Finding Compatibility Beyond Profession & Salary",
    category: "Compatibility",
    date: "24 Mar 2026",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200",
    desc: "Learn how values, lifestyle and family culture influence long-term compatibility.",
  },
];

const Blog = () => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/pages/slug/blog");
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

  const blogs =
    page?.sections?.length > 0
      ? page.sections.map((section, index) => ({
          id: index + 1,
          title: section.title,
          category: section.category || "Matrimony Guide",
          date: section.date || "Updated Recently",
          image:
            section.image ||
            page?.heroImage ||
            defaultBlogs[index]?.image ||
            defaultBlogs[0].image,
          desc: section.description,
        }))
      : defaultBlogs;

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
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-5 py-2 text-xs font-black uppercase tracking-[3px] text-[#f4d06f]">
              <Sparkles size={14} />
              {page?.highlight || "Matrimony Knowledge Hub"}
            </div>

            <h1 className="mt-6 font-serif text-6xl font-black leading-none">
              <span className="text-white">
                {page?.title || "Indian Marriage"}
              </span>
              <br />
              <span className="text-[#f4d06f]">
                {page?.subtitle || "Insights & Advice"}
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60">
              {page?.description ||
                "Expert relationship guidance, matrimony tips, family advice and success stories designed for modern Indian families."}
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <div className="overflow-hidden rounded-[35px] border border-[#d4af37]/20 bg-[#0b1425]">
            <img
              src={
                page?.heroImage ||
                "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1600"
              }
              alt={page?.title || "Blog"}
              className="h-[420px] w-full object-cover"
            />

            <div className="p-8">
              <span className="rounded-full bg-[#d4af37] px-4 py-2 text-xs font-black text-[#050914]">
                FEATURED ARTICLE
              </span>

              <h2 className="mt-5 font-serif text-4xl font-black text-white">
                {page?.featuredTitle ||
                  "The Modern Indian Guide To Finding The Right Life Partner"}
              </h2>

              <p className="mt-4 leading-7 text-white/60">
                {page?.content ||
                  "Discover how modern Indian families are balancing tradition, compatibility, career goals and personal values while searching for the perfect life partner."}
              </p>

              <Button className="mt-6">Read Featured Article</Button>
            </div>
          </div>

          <div className="rounded-[35px] border border-[#d4af37]/20 bg-gradient-to-br from-[#16243d] to-[#07101f] p-8">
            <HeartHandshake size={42} className="text-[#f4d06f]" />

            <h3 className="mt-5 text-3xl font-black text-[#f4d06f]">
              Trusted Marriage Guidance
            </h3>

            <p className="mt-4 leading-7 text-white/60">
              Weekly advice on family compatibility, profile building,
              relationship readiness and successful matrimony journeys.
            </p>

            <div className="mt-6 space-y-4">
              {[
                "Profile Building Tips",
                "Family Compatibility",
                "Marriage Preparation",
                "Success Stories",
                "Relationship Advice",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-semibold text-white/70"
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[3px] text-[#f4d06f]">
              Latest Articles
            </p>

            <h2 className="mt-2 font-serif text-5xl font-black text-white">
              Matrimony Resources
            </h2>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="group overflow-hidden rounded-[30px] border border-[#d4af37]/15 bg-gradient-to-br from-[#111c33] to-[#07101f] transition hover:-translate-y-2 hover:border-[#d4af37]/50"
              >
                <div className="overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-60 w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <span className="rounded-full bg-[#d4af37]/10 px-3 py-1 text-xs font-black text-[#f4d06f]">
                    {blog.category}
                  </span>

                  <p className="mt-4 flex items-center gap-2 text-sm text-white/50">
                    <CalendarDays size={15} />
                    {blog.date}
                  </p>

                  <h3 className="mt-4 text-2xl font-black leading-tight text-white">
                    {blog.title}
                  </h3>

                  <p className="mt-4 leading-7 text-white/55">{blog.desc}</p>

                  <button className="mt-6 flex items-center gap-2 font-black text-[#f4d06f]">
                    Read Article
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PageLayout>
  );
};

export default Blog;