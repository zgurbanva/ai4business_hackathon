import React from 'react';
import {
  Building2,
  Search,
  Filter,
  Globe,
  ShieldCheck,
  Download,
  ChevronDown,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  MapPin,
  Tag
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const companies = [
  { id: 'it-001', name: 'CyberNet LLC', type: 'Resident', sector: 'Software Dev', employees: 120, status: 'Active', location: 'Baku', joined: '2022-05-12' },
  { id: 'it-002', name: 'GlobalTech Solutions', type: 'Non-Resident', sector: 'Cloud Services', employees: 450, status: 'Verified', location: 'Tallinn', joined: '2023-01-20' },
  { id: 'it-003', name: 'AgroSoft Systems', type: 'Resident', sector: 'AgriTech', employees: 45, status: 'Pending', location: 'Ganja', joined: '2024-02-15' },
  { id: 'it-004', name: 'FinFlow International', type: 'Non-Resident', sector: 'FinTech', employees: 890, status: 'Active', location: 'London', joined: '2021-11-30' },
  { id: 'it-005', name: 'Baku AI Lab', type: 'Resident', sector: 'Artificial Intelligence', employees: 15, status: 'Active', location: 'Baku', joined: '2023-09-05' },
];

import Header from '../components/Header';
import startupService, { Startup } from '../services/startup';
import { useState, useEffect } from 'react';

interface ITRegistryProps {
  noHeader?: boolean;
}

export default function ITRegistry({ noHeader = false }: ITRegistryProps) {
  const [filter, setFilter] = useState<'All' | 'Resident' | 'Non-Resident'>('All');
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const data = await startupService.getStartups();
        setStartups(data.items);
      } catch (err) {
        console.error('Failed to fetch startups', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStartups();
  }, []);

  const filteredCompanies = filter === 'All'
    ? startups
    : startups.filter(c => c.stage === filter); // Mapping stage/type as needed

  const content = (
    <div className="flex-1 max-w-7xl mx-auto w-full p-8 space-y-8">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-white">Unified IT Registry</h1>
          <p className="text-slate-400">Centralized management of resident and non-resident IT entities in Azerbaijan.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 h-11 bg-slate-800 border border-slate-700 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-700 transition-all">
            <Download size={18} />
            Export Registry
          </button>
          <button className="flex items-center gap-2 px-6 h-11 bg-accent text-white rounded-xl font-bold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20">
            Add New Entity
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Entities', value: '842', icon: <Building2 className="text-accent" />, sub: '+12 this month' },
          { label: 'Resident Companies', value: '520', icon: <MapPin className="text-emerald-400" />, sub: '62% of total' },
          { label: 'Non-Resident', value: '322', icon: <Globe className="text-blue-400" />, sub: 'Global partners' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="size-10 bg-slate-800 rounded-lg flex items-center justify-center">
                {stat.icon}
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.sub}</span>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <h4 className="text-3xl font-black text-white">{stat.value}</h4>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
        <div className="flex gap-2">
          {(['All', 'Resident', 'Non-Resident'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === t
                ? 'bg-accent text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search by name, ID, or sector..."
            className="w-full bg-slate-800 h-11 pl-10 pr-4 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-accent transition-all"
          />
        </div>
      </div>

      {/* Registry Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/50">
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Company ID</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Entity Name</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Type</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Sector</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Employees</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-500 font-bold">
                  Loading registry data...
                </td>
              </tr>
            ) : filteredCompanies.map((company) => (
              <tr key={company.id} className="hover:bg-slate-800/50 transition-colors group">
                <td className="px-6 py-4 font-mono text-[10px] text-slate-500">{company.startup_id_code}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 bg-slate-800 rounded-lg flex items-center justify-center text-white font-black text-xs">
                      {company.name[0]}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-white group-hover:text-accent transition-colors">{company.name}</span>
                      <span className="text-[10px] text-slate-500">{company.city || 'Baku'}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400`}>
                    {company.stage}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs font-medium text-slate-400">{company.sector}</td>
                <td className="px-6 py-4 text-xs font-bold text-white">{company.team_size || 0}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span className="text-xs font-bold">Active</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link to={`/startup/${company.id}`} className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-all inline-block">
                    <ArrowUpRight size={16} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Compliance Section */}
      <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="size-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Compliance & Data Protection</h3>
            <p className="text-sm text-slate-400 max-w-xl mt-1">
              All registry data is processed in accordance with the Law on Personal Data of the Republic of Azerbaijan and international GDPR standards.
            </p>
          </div>
        </div>
        <button className="px-6 h-12 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-all flex items-center gap-2">
          View Compliance Report
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );

  if (noHeader) {
    return content;
  }

  return (
    <div className="min-h-screen bg-background-dark flex flex-col text-slate-100">
      <Header showSearch searchPlaceholder="Search by name, ID, or sector..." />
      <main>{content}</main>
      <footer className="py-12 border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-slate-500">
            <Building2 size={16} />
            <span className="text-xs">© 2024 National IT Registry Portal. All Rights Reserved.</span>
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
