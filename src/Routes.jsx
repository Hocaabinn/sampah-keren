import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import HomeDashboard from './pages/home-dashboard';
import RequestPickupService from './pages/request-pickup-service';
import WasteEducationHub from './pages/waste-education-hub';
import UserProfileSettings from './pages/user-profile-settings';
import ReportWasteIssue from './pages/report-waste-issue';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminDashboardOverview from '././pages/admin/dashboard-overview';
import WasteReports  from '././pages/admin/Waste-reports';
import AnalyticsAndReports  from '././pages/admin/analytics-and-reports';
import WastePickupRequests from '././pages/admin/waste-pickup-requests';
import ServiceSchedule from '././pages/admin/service-schedule';
import StaffManagement from '././pages/admin/staff-management';
const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Public routes */}
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/home-dashboard" element={<HomeDashboard />} />
          <Route path="/request-pickup-service" element={<RequestPickupService />} />
          <Route path="/waste-education-hub" element={<WasteEducationHub />} />
          <Route path="/user-profile-settings" element={<UserProfileSettings />} />
          <Route path="/report-waste-issue" element={<ReportWasteIssue />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin route */}
          <Route path="/dashboard-overview" element={<AdminDashboardOverview />} />
          <Route path="/waste-reports" element={<WasteReports />} />
          <Route path="/analytics-and-reports" element={<AnalyticsAndReports />} />
          <Route path="/waste-pickup-requests" element={<WastePickupRequests />} />
          <Route path="/service-schedule" element={<ServiceSchedule />} />
          <Route path="/staff-management" element={<StaffManagement />} />
          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
