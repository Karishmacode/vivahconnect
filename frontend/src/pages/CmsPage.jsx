import { useEffect, useState } from "react";
import { FileText, ShieldCheck, Sparkles } from "lucide-react";

import PageLayout from "../components/layout/PageLayout";

const API_URL = "http://localhost:5000/api/pages/slug";

const CmsPage = ({ slug }) => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`${API_URL}/${slug}`);
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
  }, [slug]);

  if (loading) {
    return (
      <PageLayout>
        <div className="py-24 text-center text-white/60">Loading...</div>
      </PageLayout>
    );
  }

  if (!page) {
    return (
      <PageLayout>
        <div className="py-24 text-center text-white">Page not found</div>
      </PageLayout>
    );
  }

  const paragraphs =
    page.content?.split("\n").filter((text) => text.trim() !== "") || [];

  return (
    <PageLayout>
      <main className="mx-auto max-w-[1200px] px-5 py-10 md:px-6 md:py-12">
        <section className="relative overflow-hidden rounded-[32px] border border-[#d4af37]/20 bg-gradient-to-br from-[#111c33] via-[#0b1425] to-[#07101f] p-6 md:rounded-[40px] md:p-10 lg:p-12">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#d4af37]/10 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-[#7a1128]/20 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[2px] text-[#f4d06f] md:px-5 md:text-xs md:tracking-[3px]">
              <Sparkles size={14} />
              {page.category || "Policy"}
            </div>

            <h1 className="mt-5 font-serif text-4xl font-black leading-tight text-white md:mt-6 md:text-6xl">
              {page.title}
              {page.highlight && (
                <>
                  <br />
                  <span className="text-[#f4d06f]">{page.highlight}</span>
                </>
              )}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/60 md:mt-5 md:text-lg md:leading-8">
              {page.description}
            </p>
          </div>
        </section>

        {page.heroImage && (
          <section className="mt-7 overflow-hidden rounded-[28px] border border-[#d4af37]/20 bg-[#0b1425] md:mt-8 md:rounded-[34px]">
            <img
              src={page.heroImage}
              alt={page.title}
              className="h-[230px] w-full object-cover md:h-[360px] lg:h-[390px]"
            />
          </section>
        )}

        <section className="mt-7 grid gap-7 lg:mt-8 lg:grid-cols-[0.32fr_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-[30px] border border-[#d4af37]/20 bg-[#0b1425] p-6">
              <FileText className="text-[#f4d06f]" size={30} />

              <h3 className="mt-4 font-serif text-2xl font-black text-white">
                {page.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/55">
                {page.description}
              </p>

              <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                <p className="flex items-center gap-2 text-sm font-black text-emerald-300">
                  <ShieldCheck size={17} />
                  Secure & Transparent
                </p>
              </div>
            </div>
          </aside>

          <article className="rounded-[30px] border border-[#d4af37]/20 bg-gradient-to-br from-[#111c33] to-[#07101f] p-5 md:rounded-[34px] md:p-8 lg:p-10">
            <div className="mb-6 border-b border-white/10 pb-5 md:mb-7">
              <p className="text-[10px] font-black uppercase tracking-[3px] text-[#d4af37] md:text-xs">
                Official Document
              </p>

              <h2 className="mt-2 font-serif text-3xl font-black text-white md:text-4xl">
                {page.title}
              </h2>
            </div>

            <div className="space-y-4 md:space-y-5">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-white/68 md:p-5 md:text-base md:leading-8"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </section>
      </main>
    </PageLayout>
  );
};

export default CmsPage;