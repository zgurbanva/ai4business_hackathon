/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StartupRegistration from './pages/StartupRegistration';
import GovAdminDashboard from './pages/GovAdminDashboard';
import InvestmentModule from './pages/InvestmentModule';
import ProgramApplication from './pages/ProgramApplication';
import SecureLogin from './pages/SecureLogin';
import StartupProfile from './pages/StartupProfile';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<StartupRegistration />} />
        <Route path="/admin" element={<GovAdminDashboard />} />
        <Route path="/investor" element={<InvestmentModule />} />
        <Route path="/program" element={<ProgramApplication />} />
        <Route path="/login" element={<SecureLogin />} />
        <Route path="/startup/:id" element={<StartupProfile />} />
      </Routes>
    </Router>
  );
}
