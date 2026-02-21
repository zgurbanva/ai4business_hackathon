/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Shield,
  Lock,
  Mail,
  Eye,
  ArrowRight,
  Rocket,
  Building2,
  UserCheck,
  Settings,
  CheckCircle2,
  FileText,
  Database,
  AlertCircle,
  Loader2,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

import Header from '../components/Header';
import authService from '../services/auth';

export default function SecureLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = await authService.login({ email, password });

      const params = new URLSearchParams(location.search);
      const redirectUrl = params.get('redirectUrl');

      if (redirectUrl) {
        navigate(redirectUrl);
        return;
      }

      // Redirect based on role (backend roles: startup, investor, mentor, iria_admin)
      switch (data.user.role) {
        case 'iria_admin': navigate('/admin'); break;
        case 'startup': navigate('/register'); break;
        case 'investor': navigate('/investor'); break;
        case 'mentor': navigate('/mentor'); break;
        default: navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark flex flex-col text-slate-100">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full p-8 grid lg:grid-cols-[1fr,450px] gap-12 items-center">
        {/* Entity Selection Section */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-5xl font-black text-white tracking-tight">Enterprise Access Management</h2>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              Secure multi-role environment for verified institutional partners. Manage assets, review compliance, and monitor infrastructure with military-grade encryption.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Startup Entity', desc: 'Financial reporting, pitch deck encryption, and capital management dashboard.', icon: <Rocket />, level: 'Level 1', tags: ['Fundraising', 'Data Room'] },
              { title: 'Institutional Investor', desc: 'Cross-portfolio analytics, deep-dive due diligence, and capital call automation.', icon: <Building2 />, level: 'Level 2', tags: ['Analytics', 'Compliance'] },
              { title: 'Government Officer', desc: 'Regulatory oversight, audit visibility, and tax compliance verification portal.', icon: <UserCheck />, level: 'Level 3', tags: ['Regulatory', 'Audit'] },
              { title: 'Expert Mentor', desc: 'Guidance portal, mentee tracking, and ecosystem contribution analytics.', icon: <Users />, level: 'Level 2', tags: ['Mentorship', 'Expertise'] },
            ].map((entity, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="size-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                    {entity.icon}
                  </div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{entity.level}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{entity.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">{entity.desc}</p>
                <div className="flex gap-2">
                  {entity.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-3 py-1 bg-slate-800 text-slate-500 rounded-full text-[10px] font-bold uppercase border border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800">
            {[
              { label: 'AES-256 Encrypted', desc: 'Data at rest & transit', icon: <Shield /> },
              { label: 'Audit Logs', desc: 'Immutable trace records', icon: <FileText /> },
              { label: 'Secure Infra', desc: 'Tier-4 Data Centers', icon: <Database /> },
            ].map((feat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-accent">{feat.icon}</div>
                <h4 className="text-xs font-black text-white uppercase tracking-widest">{feat.label}</h4>
                <p className="text-[10px] text-slate-500 font-medium">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Login Form Section */}
        <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Lock size={120} />
          </div>

          <div className="space-y-2 relative z-10">
            <h3 className="text-3xl font-black text-white">Secure Login</h3>
            <p className="text-slate-500 text-sm font-medium">Authorized Personnel Only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Institutional Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.az"
                  className="w-full h-14 bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 text-white focus:ring-2 focus:ring-accent outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Access Key</label>
                <a href="#" className="text-[10px] font-bold text-accent hover:underline uppercase tracking-widest">Forgot Key?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-14 bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-12 text-white focus:ring-2 focus:ring-accent outline-none transition-all"
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors">
                  <Eye size={18} />
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-500 text-xs font-bold">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-accent text-white rounded-xl font-black text-lg flex items-center justify-center gap-3 hover:bg-accent/90 transition-all shadow-xl shadow-accent/20 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : (
                <>
                  Authenticate
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="pt-8 border-t border-slate-800 space-y-4">
            <div className="flex items-center gap-3 text-slate-500">
              <CheckCircle2 className="text-emerald-500" size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Multi-Factor Authentication Active</span>
            </div>
            <div className="flex items-center gap-3 text-slate-500">
              <CheckCircle2 className="text-emerald-500" size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">AES-256 Data Encryption</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-slate-500">
            <Shield size={16} />
            <span className="text-xs">© 2024 National Security Gateway. All Rights Reserved.</span>
          </div>
          <nav className="flex gap-8 text-xs font-bold text-slate-600">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">System Status</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
