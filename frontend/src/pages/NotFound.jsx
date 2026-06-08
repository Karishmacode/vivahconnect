import { Link } from "react-router-dom";
import { SearchX, HeartHandshake, Sparkles, Home } from "lucide-react";

import PageLayout from "../components/layout/PageLayout";
import Button from "../components/ui/Button";

const NotFound = () => {
  return (
    <PageLayout>
      <main className="mx-auto grid min-h-[72vh] max-w-[1100px] place-items-center px-6 py-16 text-center">
        <div className="relative w-full overflow-hidden rounded-[40px] border border-[#d4af37]/20 bg-gradient-to-br from-[#111c33] via-[#0b1425] to-[#07101f] p-10 shadow-2xl shadow-black/30">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#d4af37]/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#7a1128]/20 blur-3xl" />

          <div className="relative mx-auto grid h-24 w-24 place-items-center rounded-[30px] border border-[#d4af37]/25 bg-[#d4af37]/10 text-[#f4d06f]">
            <SearchX size={46} />
          </div>

          <div className="relative mt-7 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-5 py-2 text-xs font-black uppercase tracking-[3px] text-[#f4d06f]">
            <Sparkles size={14} />
            Page Not Found
          </div>

          <h1 className="relative mt-6 font-serif text-8xl font-black leading-none text-[#f4d06f] md:text-9xl">
            404
          </h1>

          <h2 className="relative mt-4 font-serif text-4xl font-black text-white">
            This match was not found.
          </h2>

          <p className="relative mx-auto mt-4 max-w-2xl leading-7 text-white/60">
            The page you are looking for may have been moved, deleted or never
            existed. Let’s help you return to verified matches and trusted
            matrimony profiles.
          </p>

          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/">
              <Button>
                <Home size={18} />
                Back to Home
              </Button>
            </Link>

            <Link to="/matches">
              <Button variant="outline">
                <HeartHandshake size={18} />
                Explore Matches
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default NotFound;