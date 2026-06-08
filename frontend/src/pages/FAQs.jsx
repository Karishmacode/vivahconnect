import { useEffect, useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import PageLayout from "../components/layout/PageLayout";

const API_URL = "http://localhost:5000/api/faqs";

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      if (res.ok) {
        setFaqs(
          (data.faqs || []).filter(
            (faq) => faq.status === "Active"
          )
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <main className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-5 py-2 text-[#F4D06F]">
            <HelpCircle size={16} />
            Frequently Asked Questions
          </div>

          <h1 className="mt-6 font-serif text-5xl font-black text-white">
            Help Center
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            Find answers to common questions about memberships,
            profiles, privacy and matchmaking.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-white/60">
            Loading FAQs...
          </div>
        ) : (
          <div className="space-y-5">
            {faqs.map((faq) => (
              <div
                key={faq._id}
                className="overflow-hidden rounded-3xl border border-[#D4AF37]/15 bg-[#132238]/80"
              >
                <button
                  onClick={() =>
                    setOpenId(
                      openId === faq._id ? null : faq._id
                    )
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-bold text-white">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={18}
                    className={`transition ${
                      openId === faq._id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openId === faq._id && (
                  <div className="border-t border-white/10 px-6 py-5 text-white/70">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </PageLayout>
  );
};

export default FAQs;