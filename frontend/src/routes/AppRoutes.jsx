import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Matches from "../pages/Matches";
import Profile from "../pages/Profile";
import ProfileDetails from "../pages/ProfileDetails";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SuccessStories from "../pages/SuccessStories";
import Membership from "../pages/Membership";
import About from "../pages/About";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import SafetyTips from "../pages/SafetyTips";
import TermsConditions from "../pages/TermsConditions";
import RefundPolicy from "../pages/RefundPolicy";
import HowItWorks from "../pages/HowItWorks";
import Blog from "../pages/Blog";
import FAQs from "../pages/FAQs";
import NotFound from "../pages/NotFound";
import ForgotPassword from "../pages/ForgotPassword";
import SentInterests from "../pages/SentInterests";
import ReceivedInterests from "../pages/ReceivedInterests";
import Checkout from "../pages/Checkout";
import Support from "../pages/Support";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/profile" replace /> : children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/matches" element={<Matches />} />
      <Route path="/profile/:id" element={<ProfileDetails />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/sent-interests"
        element={
          <ProtectedRoute>
            <SentInterests />
          </ProtectedRoute>
        }
      />

      <Route
        path="/received-interests"
        element={
          <ProtectedRoute>
            <ReceivedInterests />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route path="/contact" element={<Contact />} />
      <Route path="/support" element={<Support />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/success-stories" element={<SuccessStories />} />
      <Route path="/membership" element={<Membership />} />

      <Route path="/about" element={<About />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/safety-tips" element={<SafetyTips />} />
      <Route path="/terms-and-conditions" element={<TermsConditions />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />

      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;