import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Clock,
  Sparkles,
} from "lucide-react";

import PageLayout from "../components/layout/PageLayout";
import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";
import InputField from "../components/forms/InputField";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <PageLayout>
      <main className="mx-auto max-w-[1400px] px-6 py-12">
        <SectionTitle
          title="Contact"
          highlight="VivahConnect"
          desc="Need help with profile, membership or verified matches? Our support team is ready to assist."
        />

        <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-5">
            <div className="relative overflow-hidden rounded-[32px] border border-[#d4af37]/20 bg-gradient-to-br from-[#111c33] via-[#0b1425] to-[#07101f] p-7 shadow-2xl shadow-black/25">
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#d4af37]/10 blur-3xl" />

              <div className="relative inline-flex items-center gap-2 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-4 py-2 text-xs font-black uppercase tracking-[2px] text-[#f4d06f]">
                <Sparkles size={14} />
                Premium Support
              </div>

              <h2 className="relative mt-5 font-serif text-4xl font-black text-white">
                We are here to help your matrimony journey.
              </h2>

              <p className="relative mt-4 leading-7 text-white/60">
                Get assistance with profile verification, membership plans,
                privacy settings and match discovery.
              </p>
            </div>

            {[
              [Phone, "+91 98765 43210", "Call our support team"],
              [Mail, "support@vivahconnect.com", "Send us your query"],
              [MapPin, "India", "Serving families across India"],
              [Clock, "Mon - Sun, 9:00 AM - 9:00 PM", "Support hours"],
            ].map(([Icon, text, sub]) => (
              <div
                key={text}
                className="group rounded-[28px] border border-white/10 bg-[#0b1425] p-5 transition hover:-translate-y-1 hover:border-[#d4af37]/40"
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/10 text-[#f4d06f]">
                    <Icon size={22} />
                  </div>

                  <div>
                    <p className="font-black text-white">{text}</p>
                    <p className="mt-1 text-sm text-white/45">{sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-[32px] border border-[#d4af37]/20 bg-gradient-to-br from-[#111c33] via-[#0b1425] to-[#07101f] p-8 shadow-2xl shadow-black/30"
          >
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#d4af37]/10 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-[#7a1128]/20 blur-3xl" />

            <div className="relative mb-7">
              <div className="grid h-16 w-16 place-items-center rounded-3xl border border-[#d4af37]/25 bg-[#d4af37]/10 text-[#f4d06f]">
                <MessageCircle size={32} />
              </div>

              <h2 className="mt-5 font-serif text-4xl font-black text-white">
                Send us a message
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/55">
                Our team usually responds within 24 hours.
              </p>
            </div>

            <div className="relative space-y-5">
              <InputField
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />

              <InputField
                label="Email Address"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
              />

              <label>
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles size={14} className="text-[#f4d06f]" />
                  <span className="text-sm font-black uppercase tracking-[1px] text-white/75">
                    Message
                  </span>
                  <span className="text-[#d4af37]">*</span>
                </div>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message..."
                  className="h-40 w-full resize-none rounded-2xl border border-[#d4af37]/15 bg-gradient-to-br from-[#111c33] via-[#0b1425] to-[#07101f] p-5 text-sm font-semibold text-white shadow-lg shadow-black/20 outline-none transition placeholder:text-white/30 focus:border-[#f4d06f] focus:ring-2 focus:ring-[#d4af37]/20"
                />
              </label>

              {success && (
                <p className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm font-black text-emerald-300">
                  Message submitted successfully. Our team will contact you soon.
                </p>
              )}

              <Button type="submit" className="w-full">
                Send Message
              </Button>

              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                <p className="flex items-center gap-2 text-sm font-black text-emerald-300">
                  <ShieldCheck size={17} />
                  Your contact details are privacy protected.
                </p>
              </div>
            </div>
          </form>
        </section>
      </main>
    </PageLayout>
  );
};

export default Contact;