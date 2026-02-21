/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StartupRegistration from './pages/StartupRegistration';
import GovAdminDashboard from './pages/GovAdminDashboard';
import InvestmentModule from './pages/InvestmentModule';
import ResourcesPage from './pages/ResourcesPage';
import AuthPage from './pages/AuthPage';
import StartupProfile from './pages/StartupProfile';
import InvestorProfile from './pages/InvestorProfile';
import InvestorDiscover from './pages/InvestorDiscover';
import SupportPage from './pages/SupportPage';
import ITRegistry from './pages/ITRegistry';
import SecurityPortal from './pages/SecurityPortal';
import MentorDashboard from './pages/MentorDashboard';
import EventsPage from './pages/EventsPage';
import AIChatbot from './components/AIChatbot';
import InvestorLayout from './components/InvestorLayout';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/startup-onboarding" element={<StartupRegistration />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/admin" element={<GovAdminDashboard />} />

        {/* Investor Portal with Sidebar Layout */}
        <Route path="/investor" element={<InvestorLayout><InvestmentModule /></InvestorLayout>} />
        <Route path="/investor-profile" element={<InvestorLayout><InvestorProfile /></InvestorLayout>} />
        <Route path="/investor-discover" element={<InvestorLayout><InvestorDiscover /></InvestorLayout>} />
        <Route path="/startup/:id" element={<InvestorLayout><StartupProfile /></InvestorLayout>} />

        <Route path="/program" element={<ResourcesPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/analytics" element={<InvestorLayout><InvestmentModule /></InvestorLayout>} />
        <Route path="/reports" element={<InvestorLayout><InvestmentModule /></InvestorLayout>} />
        <Route path="/it-registry" element={<InvestorLayout><ITRegistry noHeader /></InvestorLayout>} />
        <Route path="/security" element={<SecurityPortal />} />
        <Route path="/mentor" element={<MentorDashboard />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
      <AIChatbot />
    </Router>
  );
}
