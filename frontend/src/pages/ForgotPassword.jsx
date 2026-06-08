import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, ShieldCheck } from "lucide-react";

import PageLayout from "../components/layout/PageLayout";
import InputField from "../components/forms/InputField";
import Button from "../components/ui/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    setSuccess(true);
  };

  return (
    <PageLayout>
      <main className="mx-auto flex min-h-[80vh] max-w-[700px] items-center px-6 py-12">
        <div className="w-full overflow-hidden rounded-[36px] border border-[#d4af37]/25 bg-gradient-to-br from-[#111c33] via-[#0b1425] to-[#07101f] p-8 shadow-2xl shadow-black/40">
          <div className="text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl border border-[#d4af37]/25 bg-[#d4af37]/10 text-[#f4d06f]">
              <Mail size={40} />
            </div>

            <p className="mt-5 text-xs font-black uppercase tracking-[3px] text-[#d4af37]">
              Account Recovery
            </p>

            <h1 className="mt-2 font-serif text-5xl font-black text-white">
              Forgot Password
            </h1>

            <p className="mt-4 leading-7 text-white/60">
              Enter your registered email address and we'll send password reset
              instructions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            <InputField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter registered email"
              required
            />

            <Button type="submit" className="mt-6 w-full">
              Send Reset Link
            </Button>

            {success && (
              <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                <p className="flex items-center gap-2 text-sm font-bold text-emerald-300">
                  <ShieldCheck size={18} />
                  Password reset instructions sent successfully.
                </p>
              </div>
            )}
          </form>

          <Link
            to="/login"
            className="mt-6 flex items-center justify-center gap-2 text-sm font-bold text-[#f4d06f]"
          >
            <ArrowLeft size={16} />
            Back To Login
          </Link>
        </div>
      </main>
    </PageLayout>
  );
};

export default ForgotPassword;