import Navbar from "./Navbar";
import Footer from "./Footer";

const PageLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050914] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(212,175,55,.14),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(122,17,40,.18),transparent_32%),linear-gradient(135deg,#050914_0%,#07101f_45%,#050914_100%)]" />

      <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.04] bg-[linear-gradient(45deg,#d4af37_1px,transparent_1px),linear-gradient(-45deg,#d4af37_1px,transparent_1px)] bg-[size:44px_44px]" />

      <Navbar />

      <div className="relative z-10">
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default PageLayout;