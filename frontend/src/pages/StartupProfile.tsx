/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Building2, 
  Search, 
  Bell, 
  MapPin, 
  Mail, 
  TrendingUp, 
  Users, 
  Activity, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  ArrowUpRight,
  Share2,
  ChevronRight,
  Rocket
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer 
} from 'recharts';

const scoreData = [
  { name: 'Score', value: 78, color: '#573f9d' },
  { name: 'Remaining', value: 22, color: '#1e293b' },
];

export default function StartupProfile() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-background-dark flex flex-col text-slate-100">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-8 h-16 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-accent p-1.5 rounded text-white">
              <Building2 size={20} />
            </div>
            <span className="font-bold text-white text-lg uppercase tracking-tight">Investor Portal</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/investor" className="text-sm font-medium text-slate-400 hover:text-accent transition-colors">Dashboard</Link>
            <a href="#" className="text-sm font-bold text-white border-b-2 border-accent h-16 flex items-center">Portfolio</a>
            <a href="#" className="text-sm font-medium text-slate-400 hover:text-accent transition-colors">Market Insights</a>
            <a href="#" className="text-sm font-medium text-slate-400 hover:text-accent transition-colors">Reports</a>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search startups..."
              className="bg-slate-800 h-9 pl-9 pr-4 rounded-lg text-xs w-64 text-white outline-none focus:ring-2 focus:ring-accent transition-all"
            />
          </div>
          <div className="size-8 rounded-lg bg-slate-800 overflow-hidden border border-slate-700">
            <img src="https://picsum.photos/seed/investor-avatar/100/100" alt="User" referrerPolicy="no-referrer" />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-8 space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
          <Link to="/investor" className="hover:text-accent transition-colors">Portfolio</Link>
          <ChevronRight size={14} />
          <span className="text-white">Startup Profile</span>
        </div>

        <div className="grid lg:grid-cols-[300px,1fr] gap-8">
          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-sm space-y-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="size-24 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700">
                  <div className="size-16 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                    <Building2 size={32} />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-black text-white">TechNova Solutions</h1>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">AZ-ST-0001</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Sector</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <Building2 size={16} className="text-slate-500" />
                    Fintech & Payments
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Stage</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <Rocket size={16} className="text-slate-500" />
                    Series A (Raised $12M)
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Location</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <MapPin size={16} className="text-slate-500" />
                    New York, NY
                  </div>
                </div>
              </div>

              <button className="w-full h-14 bg-accent text-white rounded-xl font-black flex items-center justify-center gap-3 hover:bg-accent/90 transition-all shadow-lg shadow-accent/10">
                <Mail size={20} />
                Contact Founder
              </button>
            </div>

            <div className="bg-accent rounded-2xl p-8 text-white space-y-4 shadow-2xl relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 opacity-10">
                <TrendingUp size={120} />
              </div>
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Investment Status</p>
              <h3 className="text-3xl font-black">$2.5M Committed</h3>
              <p className="text-xs text-white/60">Lead investor: Peak Ventures</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Top Metrics Row */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-sm flex flex-col items-center justify-center relative">
                <h3 className="text-sm font-bold text-white absolute top-6">Success Score</h3>
                <div className="size-40 relative mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={scoreData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={70}
                        paddingAngle={0}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                      >
                        {scoreData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-white">78</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">/100</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-emerald-400 font-bold text-xs">
                  <TrendingUp size={14} />
                  +4.2% from last quarter
                </div>
              </div>

              <div className="grid grid-rows-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm flex items-start gap-4">
                  <div className="size-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">User Growth</p>
                    <h4 className="text-2xl font-black text-white">124k</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Active Monthly Users</p>
                  </div>
                </div>
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm flex items-start gap-4">
                  <div className="size-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400">
                    <Activity size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Burn Rate</p>
                    <h4 className="text-2xl font-black text-white">$180k</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Monthly Average</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-rows-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm flex items-start gap-4">
                  <div className="size-10 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-400">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Retention</p>
                    <h4 className="text-2xl font-black text-white">82%</h4>
                    <p className="text-[10px] text-slate-500 font-medium">LTM Average</p>
                  </div>
                </div>
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm flex items-start gap-4">
                  <div className="size-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-400">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Runway</p>
                    <h4 className="text-2xl font-black text-white">18 Mo</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Estimated Duration</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SWOT Analysis Section */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
              <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center gap-3">
                <Activity className="text-accent" size={20} />
                <h3 className="font-bold text-white">SWOT Analysis</h3>
              </div>
              <div className="p-8 grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 size={18} />
                      <h4 className="font-bold">Strengths</h4>
                    </div>
                    <ul className="space-y-3">
                      {[
                        'Proprietary AI matching algorithm with 95% accuracy.',
                        'Experienced founding team with 2 prior exits.',
                        'Exclusive partnership with major banking infrastructure.'
                      ].map((s, idx) => (
                        <li key={idx} className="text-sm text-slate-400 flex items-start gap-2">
                          <div className="size-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-blue-400">
                      <TrendingUp size={18} />
                      <h4 className="font-bold">Opportunities</h4>
                    </div>
                    <ul className="space-y-3">
                      {[
                        'Expansion into the LATAM fintech market in Q4.',
                        'New B2B API licensing model potential.',
                        'Increasing demand for digital-first payment rails.'
                      ].map((o, idx) => (
                        <li key={idx} className="text-sm text-slate-400 flex items-start gap-2">
                          <div className="size-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-rose-400">
                      <AlertTriangle size={18} />
                      <h4 className="font-bold">Weaknesses</h4>
                    </div>
                    <ul className="space-y-3">
                      {[
                        'High customer acquisition cost in current market.',
                        'Limited international presence outside US/UK.',
                        'Dependency on third-party cloud provider AWS.'
                      ].map((w, idx) => (
                        <li key={idx} className="text-sm text-slate-400 flex items-start gap-2">
                          <div className="size-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-amber-400">
                      <AlertTriangle size={18} />
                      <h4 className="font-bold">Threats</h4>
                    </div>
                    <ul className="space-y-3">
                      {[
                        'Rapidly shifting regulatory environment in EU.',
                        'Entry of established players (Stripe/Adyen).',
                        'Cybersecurity risks associated with ledger scaling.'
                      ].map((t, idx) => (
                        <li key={idx} className="text-sm text-slate-400 flex items-start gap-2">
                          <div className="size-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Startups */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-white">Similar Startups</h3>
                <button className="text-xs font-bold text-slate-500 hover:text-accent transition-colors uppercase tracking-widest">View Benchmark Analysis</button>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: 'QuantPay Inc.', sector: 'FINTECH | SERIES A', score: 82 },
                  { name: 'LedgerFlow', sector: 'FINTECH | SEED', score: 65 },
                  { name: 'Neon Wealth', sector: 'FINTECH | SERIES B', score: 91 },
                ].map((s, idx) => (
                  <div key={idx} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm space-y-4 hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-slate-800 rounded-lg flex items-center justify-center text-white font-black text-xs">
                        {s.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm group-hover:text-accent transition-colors">{s.name}</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{s.sector}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-slate-500">Success Score</span>
                        <span className="text-white">{s.score}/100</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-accent" style={{ width: `${s.score}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-slate-500">
            <Building2 size={16} />
            <span className="text-xs">© 2024 Investor Portal. All rights reserved.</span>
          </div>
          <nav className="flex gap-8 text-xs font-bold text-slate-600">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Support</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
