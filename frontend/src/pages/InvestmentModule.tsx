/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Building2, 
  Search, 
  Bell, 
  Filter, 
  Download, 
  CheckCircle2, 
  TrendingUp, 
  AlertTriangle,
  ChevronDown,
  Share2,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const startups = [
  { id: 'nexus-ai', name: 'Nexus AI', sector: 'Enterprise SaaS', stage: 'Series B', score: 88, funding: '$12.4M', risk: 'Low Risk', riskColor: 'text-emerald-500 bg-emerald-50' },
  { id: 'quantum-pay', name: 'Quantum Pay', sector: 'FinTech', stage: 'Series A', score: 74, funding: '$8.2M', risk: 'Medium Risk', riskColor: 'text-amber-500 bg-amber-50' },
  { id: 'bioflow', name: 'BioFlow', sector: 'HealthTech', stage: 'Seed', score: 92, funding: '$2.1M', risk: 'Low Risk', riskColor: 'text-emerald-500 bg-emerald-50' },
  { id: 'aerologix', name: 'AeroLogix', sector: 'Logistics', stage: 'Series C', score: 61, funding: '$45.0M', risk: 'High Risk', riskColor: 'text-rose-500 bg-rose-50' },
];

export default function InvestmentModule() {
  return (
    <div className="min-h-screen bg-background-dark flex flex-col text-slate-100">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-8 h-16 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-accent p-1.5 rounded text-white">
              <Building2 size={20} />
            </div>
            <span className="font-bold text-white text-lg">Institutional Investor Pro</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/investor" className="text-sm font-bold text-white">Dashboard</Link>
            <a href="#" className="text-sm font-medium text-slate-400 hover:text-accent transition-colors">Portfolio</a>
            <a href="#" className="text-sm font-medium text-slate-400 hover:text-accent transition-colors">Market Analysis</a>
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
          <button className="text-slate-500 hover:text-accent transition-colors"><Bell size={20} /></button>
          <div className="size-8 rounded-full overflow-hidden border border-slate-700">
            <img src="https://picsum.photos/seed/investor/100/100" alt="Investor" referrerPolicy="no-referrer" />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-8 grid lg:grid-cols-[1fr,350px] gap-8">
        {/* Main List Section */}
        <div className="space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-black text-white mb-2">Investment Module</h1>
              <p className="text-slate-400">Real-time startup performance metrics and growth indicators.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 h-10 bg-slate-800 border border-slate-700 rounded-lg text-sm font-bold text-slate-300 hover:bg-slate-700 transition-all">
                <Filter size={16} />
                Filters
              </button>
              <button className="flex items-center gap-2 px-4 h-10 bg-accent text-white rounded-lg text-sm font-bold hover:bg-accent/90 transition-all shadow-lg shadow-accent/10">
                <Download size={16} />
                Export Report
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-3">
            {['Sector: All', 'Stage: Series A+', 'Min Funding: $5M', 'Risk: Low-Mid'].map((filter, idx) => (
              <button key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-slate-400 hover:border-slate-600 transition-all">
                {filter}
                <ChevronDown size={14} />
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/50">
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Name</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Sector</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Stage</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Success Score</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Funding</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Risk Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {startups.map((startup) => (
                  <tr key={startup.id} className="hover:bg-slate-800/50 transition-colors cursor-pointer group">
                    <td className="px-6 py-4">
                      <Link to={`/startup/${startup.id}`} className="flex items-center gap-3">
                        <div className="size-8 bg-slate-800 rounded flex items-center justify-center text-white font-black text-xs">
                          {startup.name[0]}
                        </div>
                        <span className="font-bold text-white group-hover:text-accent transition-colors">{startup.name}</span>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-slate-400 bg-slate-800 px-2 py-1 rounded">{startup.sector}</span>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-500">{startup.stage}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden min-w-[60px]">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${startup.score}%` }}
                            transition={{ duration: 1 }}
                            className="h-full bg-accent"
                          />
                        </div>
                        <span className="text-xs font-black text-white">{startup.score}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-white">{startup.funding}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${startup.riskColor.replace('bg-emerald-50', 'bg-emerald-500/10').replace('bg-amber-50', 'bg-amber-500/10').replace('bg-rose-50', 'bg-rose-500/10')}`}>
                        {startup.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Analysis Section */}
        <div className="space-y-6">
          <div className="bg-accent rounded-2xl p-6 text-white space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp size={80} />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">AI Pick</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold">Recommendation: Invest</h3>
              <p className="text-white/60 text-xs">Based on market trends & proprietary scoring.</p>
            </div>

            <div className="bg-white/10 rounded-xl p-4 flex justify-between items-center border border-white/10">
              <div>
                <p className="text-[10px] font-bold text-white/60 uppercase mb-1">Match Score</p>
                <p className="text-3xl font-black">94%</p>
              </div>
              <div className="size-12 rounded-full border-2 border-emerald-400 flex items-center justify-center text-emerald-400 font-black text-xl">
                A+
              </div>
            </div>

            <ul className="space-y-3">
              {[
                'Strong 24% MoM organic growth.',
                'Founders from top-tier exits.',
                'Market white-space identified.'
              ].map((point, idx) => (
                <li key={idx} className="flex items-center gap-3 text-xs font-medium">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  {point}
                </li>
              ))}
            </ul>

            <button className="w-full h-12 bg-white text-accent rounded-lg font-bold hover:bg-white/90 transition-all">
              View Full Analysis
            </button>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-white">Risk Profile</h4>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Quantum Pay</span>
            </div>
            
            <div className="space-y-4">
              {[
                { label: 'Market Volatility', value: '60%', status: 'Moderate', color: 'bg-amber-500' },
                { label: 'Regulatory Risk', value: '20%', status: 'Low', color: 'bg-emerald-500' },
                { label: 'Operational Risk', value: '85%', status: 'High', color: 'bg-rose-500' },
              ].map((risk, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-slate-500">{risk.label}</span>
                    <span className="text-white">{risk.status}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${risk.color}`} style={{ width: risk.value }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm space-y-6">
            <h4 className="font-bold text-white">Growth Potential</h4>
            <div className="flex items-end justify-between gap-2 h-24">
              {[20, 35, 50, 65, 80, 100].map((h, idx) => (
                <div key={idx} className="flex-1 bg-slate-800 rounded-t-sm group relative">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: idx * 0.1 }}
                    className={`w-full rounded-t-sm ${idx > 3 ? 'bg-accent' : 'bg-slate-700'}`}
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Projected ARR</p>
                <p className="text-lg font-black text-white">$4.2M <span className="text-emerald-400 text-xs">+12%</span></p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Burn Rate</p>
                <p className="text-lg font-black text-white">$140k/mo</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 h-12 bg-slate-800 text-white rounded-lg font-bold hover:bg-slate-700 transition-all">
              Add to Watchlist
            </button>
            <button className="size-12 bg-slate-800 text-white rounded-lg flex items-center justify-center hover:bg-slate-700 transition-all">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
