/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  LayoutDashboard, 
  Rocket, 
  Briefcase, 
  Users, 
  FileText, 
  Shield, 
  Settings, 
  Search, 
  Bell,
  TrendingUp,
  DollarSign,
  Star,
  Activity
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const growthData = [
  { name: 'JAN', value: 250 },
  { name: 'MAR', value: 400 },
  { name: 'MAY', value: 350 },
  { name: 'JUL', value: 300 },
  { name: 'SEP', value: 600 },
  { name: 'NOV', value: 450 },
];

const stageData = [
  { name: 'Seed Stage', value: 40, color: '#332069' },
  { name: 'Series A', value: 25, color: '#573f9d' },
  { name: 'Other', value: 35, color: '#94a3b8' },
];

const sectorDistributionData = [
  { name: 'FinTech', value: 320, color: '#332069' },
  { name: 'AgriTech', value: 210, color: '#573f9d' },
  { name: 'Health', value: 150, color: '#8b5cf6' },
  { name: 'EdTech', value: 280, color: '#a78bfa' },
  { name: 'CleanEnergy', value: 120, color: '#c4b5fd' },
];

const regionalIntensityData = [
  { region: 'Baku', intensity: 95 },
  { region: 'Sumqayit', intensity: 65 },
  { region: 'Ganja', intensity: 45 },
  { region: 'Lankaran', intensity: 30 },
  { region: 'Shaki', intensity: 25 },
  { region: 'Gabala', intensity: 40 },
  { region: 'Nakhchivan', intensity: 55 },
  { region: 'Quba', intensity: 20 },
];

export default function GovAdminDashboard() {
  return (
    <div className="min-h-screen bg-background-dark flex text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 text-white flex flex-col sticky top-0 h-screen border-r border-slate-900">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-accent/20 p-2 rounded-lg">
            <Shield size={24} className="text-accent" />
          </div>
          <div>
            <h1 className="font-black text-lg leading-none">GovAdmin</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Ecosystem KPI Portal</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 bg-accent/20 text-accent rounded-lg font-bold text-sm transition-all">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link to="/register" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg font-bold text-sm transition-all">
            <Rocket size={18} />
            Startups
          </Link>
          <Link to="/program" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg font-bold text-sm transition-all">
            <Briefcase size={18} />
            Programs
          </Link>
          <Link to="/investor" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg font-bold text-sm transition-all">
            <Users size={18} />
            Investors
          </Link>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg font-bold text-sm transition-all">
            <FileText size={18} />
            Reports
          </a>
        </nav>

        <div className="p-4 space-y-2 border-t border-white/5">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-white font-bold text-sm transition-all">
            <Shield size={18} />
            Security
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-white font-bold text-sm transition-all">
            <Settings size={18} />
            Settings
          </a>
        </div>

        <div className="p-4">
          <div className="bg-white/5 p-4 rounded-xl flex items-center gap-3">
            <div className="size-10 rounded-lg overflow-hidden border border-white/10">
              <img src="https://picsum.photos/seed/admin/100/100" alt="Admin" referrerPolicy="no-referrer" />
            </div>
            <div>
              <p className="text-xs font-bold">Director General</p>
              <p className="text-[10px] text-slate-500 font-medium">Office of Innovation</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <span>Analytics</span>
            <span className="text-slate-700">/</span>
            <span className="text-white font-bold">Ecosystem Dashboard</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search data points..."
                className="bg-slate-800 h-10 pl-10 pr-4 rounded-lg text-sm w-64 text-white focus:ring-2 focus:ring-accent outline-none transition-all"
              />
            </div>
            <button className="relative text-slate-500 hover:text-accent transition-colors">
              <Bell size={20} />
              <div className="absolute -top-1 -right-1 size-2 bg-rose-500 rounded-full border-2 border-slate-900" />
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Startups', value: '1,240', change: '+5.2%', icon: <Rocket className="text-accent" size={20} />, bg: 'bg-accent/10' },
              { label: 'Total Funding', value: '$450M', change: '+14.8%', icon: <DollarSign className="text-emerald-400" size={20} />, bg: 'bg-emerald-500/10' },
              { label: 'Avg. Success Score', value: '8.2/10', change: '+0.3%', icon: <Star className="text-amber-400" size={20} />, bg: 'bg-amber-500/10' },
              { label: 'Sector Growth Index', value: '+12.5%', change: '-1.2%', icon: <TrendingUp className="text-indigo-400" size={20} />, bg: 'bg-indigo-500/10', negative: true },
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`size-10 ${stat.bg} rounded-lg flex items-center justify-center`}>
                    {stat.icon}
                  </div>
                  <span className={`text-xs font-bold ${stat.negative ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {stat.change} {stat.negative ? '↘' : '↗'}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                <h4 className="text-2xl font-black text-white">{stat.value}</h4>
              </motion.div>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="grid lg:grid-cols-[1fr,350px] gap-6">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-white">Funding Growth Trends</h3>
                <select className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-300 outline-none">
                  <option>Last 12 Months</option>
                  <option>Last 3 Years</option>
                </select>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#573f9d" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#573f9d" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} 
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#573f9d" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
              <h3 className="font-bold text-white mb-8">Stage Distribution</h3>
              <div className="h-[200px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {stageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-black text-white">1.2K</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Total Entrants</span>
                </div>
              </div>
              <div className="mt-8 space-y-3">
                {stageData.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs font-bold text-slate-400">{item.name}</span>
                    </div>
                    <span className="text-xs font-black text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid lg:grid-cols-[1fr,350px] gap-6">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-white">Sector Distribution</h3>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1">
                    <div className="size-2 rounded-full bg-accent" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Primary</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="size-2 rounded-full bg-slate-700" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Secondary</span>
                  </div>
                </div>
              </div>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sectorDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} 
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                    <Tooltip 
                      cursor={{ fill: '#1e293b' }}
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {sectorDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-white">Regional Intensity</h3>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Density Index</span>
              </div>
              <div className="space-y-4">
                {regionalIntensityData.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400">{item.region}</span>
                      <span className="text-xs font-black text-accent">{item.intensity}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.intensity}%` }}
                        transition={{ duration: 1, delay: idx * 0.05 }}
                        className="h-full bg-accent"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Top Region</p>
                  <p className="text-sm font-black text-emerald-400">Baku Metropolitan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
