import { useState } from "react";
import {
  HelpCircle,
  Mail,
  Phone,
  MessageCircle,
  Send,
  CheckCircle,
} from "lucide-react";

import PageLayout from "../components/layout/PageLayout";
import Button from "../components/ui/Button";
import InputField from "../components/forms/InputField";
import SelectField from "../components/forms/SelectField";

const API_URL = "http://localhost:5000/api/support";

const Support = () => {
  const [form, setForm] = useState({
    user: "",
    email: "",
    subject: "",
    category: "Account",
    priority: "Medium",
    channel: "Email",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitTicket = async (e) => {
    e.preventDefault();

    if (!form.user || !form.email || !form.subject || !form.message) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(
          `Support ticket created successfully. Ticket ID: ${data.ticket?.ticketId}`
        );

        setForm({
          user: "",
          email: "",
          subject: "",
          category: "Account",
          priority: "Medium",
          channel: "Email",
          message: "",
        });
      } else {
        setError(data.message || "Failed to create support ticket.");
      }
    } catch (error) {
      console.log(error);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <main className="mx-auto max-w-[1300px] px-6 py-12">
        <section className="relative overflow-hidden rounded-[40px] border border-[#d4af37]/20 bg-gradient-to-br from-[#111c33] via-[#0b1425] to-[#07101f] p-10">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#d4af37]/10 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-[#7a1128]/20 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-5 py-2 text-xs font-black uppercase tracking-[3px] text-[#f4d06f]">
              <HelpCircle size={14} />
              Support Center
            </div>

            <h1 className="mt-6 font-serif text-6xl font-black leading-none text-white">
              Need Help With
              <br />
              <span className="text-[#f4d06f]">VivahConnect?</span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60">
              Submit your support request and our team will help you with
              account, profile, membership, payment or verification issues.
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5">
            <div className="rounded-[30px] border border-[#d4af37]/20 bg-[#0b1425] p-6">
              <Mail className="text-[#f4d06f]" size={30} />
              <h3 className="mt-4 text-2xl font-black text-white">
                Email Support
              </h3>
              <p className="mt-2 text-white/60">support@vivahconnect.com</p>
            </div>

            <div className="rounded-[30px] border border-[#d4af37]/20 bg-[#0b1425] p-6">
              <Phone className="text-[#f4d06f]" size={30} />
              <h3 className="mt-4 text-2xl font-black text-white">
                Phone Support
              </h3>
              <p className="mt-2 text-white/60">+91 98765 43210</p>
            </div>

            <div className="rounded-[30px] border border-[#d4af37]/20 bg-[#0b1425] p-6">
              <MessageCircle className="text-[#f4d06f]" size={30} />
              <h3 className="mt-4 text-2xl font-black text-white">
                Live Chat
              </h3>
              <p className="mt-2 text-white/60">
                Available 10 AM - 7 PM IST
              </p>
            </div>
          </div>

          <form
            onSubmit={submitTicket}
            className="rounded-[35px] border border-[#d4af37]/20 bg-[#0b1425] p-8 shadow-2xl shadow-black/30"
          >
            <h2 className="font-serif text-4xl font-black text-white">
              Create Support Ticket
            </h2>

            <p className="mt-2 text-white/55">
              Fill the form below and our support team will respond soon.
            </p>

            {success && (
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-green-400/25 bg-green-500/10 px-5 py-4 text-green-300">
                <CheckCircle size={20} />
                {success}
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-2xl border border-red-400/25 bg-red-500/10 px-5 py-4 text-red-300">
                {error}
              </div>
            )}

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <InputField
                label="Full Name"
                name="user"
                value={form.user}
                onChange={handleChange}
                placeholder="Enter your name"
              />

              <InputField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />

              <InputField
                label="Subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What is your issue?"
              />

              <SelectField
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
                options={[
                  "Account",
                  "Payment",
                  "Verification",
                  "Profile",
                  "Membership",
                ]}
              />

              <SelectField
                label="Priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
                options={["Low", "Medium", "High"]}
              />

              <SelectField
                label="Preferred Channel"
                name="channel"
                value={form.channel}
                onChange={handleChange}
                options={["Email", "Chat", "Phone", "WhatsApp"]}
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-white/75">
                Message
              </label>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                placeholder="Explain your issue..."
                className="w-full rounded-2xl border border-[#d4af37]/20 bg-[#07101f] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#f4d06f]"
              />
            </div>

            <Button className="mt-7" disabled={loading}>
              <Send size={18} />
              {loading ? "Submitting..." : "Submit Ticket"}
            </Button>
          </form>
        </section>
      </main>
    </PageLayout>
  );
};

export default Support;