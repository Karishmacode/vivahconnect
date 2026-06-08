import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import Login from "../pages/Login";
import ChangePassword from "../pages/ChangePassword";

import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";

import Profiles from "../pages/Profiles";
import PendingProfiles from "../pages/PendingProfiles";
import VerifiedProfiles from "../pages/VerifiedProfiles";
import RejectedProfiles from "../pages/RejectedProfiles";
import PhotoVerification from "../pages/PhotoVerification";

import Interests from "../pages/Interests";
import MembershipPlans from "../pages/MembershipPlans";
import SuccessStories from "../pages/SuccessStories";
import Notifications from "../pages/Notifications";

import Reports from "../pages/Reports";
import UserReports from "../pages/UserReports";
import RevenueReports from "../pages/RevenueReports";

import Banners from "../pages/Banners";
import Pages from "../pages/Pages";
import FAQs from "../pages/FAQs";

import Settings from "../pages/Settings";
import Support from "../pages/Support";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />

                <Route path="/profiles" element={<Profiles />} />
                <Route path="/profiles/pending" element={<PendingProfiles />} />
                <Route path="/profiles/verified" element={<VerifiedProfiles />} />
                <Route path="/profiles/rejected" element={<RejectedProfiles />} />
                <Route path="/profiles/photos" element={<PhotoVerification />} />

                <Route path="/interests" element={<Interests />} />
                <Route path="/membership-plans" element={<MembershipPlans />} />
                <Route path="/success-stories" element={<SuccessStories />} />
                <Route path="/notifications" element={<Notifications />} />

                <Route path="/reports" element={<Reports />} />
                <Route path="/reports/users" element={<UserReports />} />
                <Route path="/reports/revenue" element={<RevenueReports />} />

                <Route path="/content-management/banners" element={<Banners />} />
                <Route path="/content-management/pages" element={<Pages />} />
                <Route path="/content-management/faqs" element={<FAQs />} />

                <Route path="/settings" element={<Settings />} />
                <Route path="/support" element={<Support />} />
                <Route path="/change-password" element={<ChangePassword />} />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;