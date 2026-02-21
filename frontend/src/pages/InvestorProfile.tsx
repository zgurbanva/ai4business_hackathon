import {
    Building2,
    TrendingUp,
    Users,
    Activity,
    Clock,
    CheckCircle2,
    AlertCircle,
    AlertTriangle,
    ArrowUpRight,
    Share2,
    ChevronRight,
    Rocket,
    ShieldAlert,
    Mail,
    Zap,
    Globe,
    PieChart as PieIcon,
    Briefcase,
    Target
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer
} from 'recharts';

const healthData = [
    { name: 'Health', value: 84, color: '#4f46e5' },
    { name: 'Remaining', value: 16, color: '#e2e8f0' },
];

export default function InvestorProfile() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 mb-2">Investor Dashboard</h1>
                    <p className="text-sm text-slate-500 font-medium">Strategic oversight for Peak Ventures institutional fund.</p>
                </div>
                <div className="hidden sm:flex gap-3">
                    <button className="flex items-center gap-2 px-4 h-11 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        <Share2 size={18} />
                        Export Data
                    </button>
                    <button className="flex items-center gap-2 px-6 h-11 bg-[#312e81] text-white rounded-xl font-bold hover:bg-[#2e2b7a] transition-all shadow-lg shadow-indigo-100">
                        Institutional Reports
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-[300px,1fr] gap-8">
                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8 text-center sm:text-left">
                        <div className="flex flex-col items-center sm:items-start space-y-4">
                            <div className="size-20 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100">
                                <div className="size-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                                    <TrendingUp size={24} />
                                </div>
                            </div>
                            <div className="text-center sm:text-left">
                                <h1 className="text-2xl font-black text-slate-800">Peak Ventures</h1>
                                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-1 bg-indigo-50 px-2 py-0.5 rounded inline-block">Institutional VC</p>
                            </div>
                        </div>

                        <div className="space-y-6 border-t border-slate-100 pt-6">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">AUM</p>
                                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                    <Briefcase size={16} className="text-slate-400" />
                                    $450M Total Assets
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Core Sectors</p>
                                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                    <Target size={16} className="text-slate-400" />
                                    Fintech, AI, SaaS
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Headquarters</p>
                                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                    <Globe size={16} className="text-slate-400" />
                                    Baku, Azerbaijan
                                </div>
                            </div>
                        </div>

                        <button className="w-full h-12 bg-[#312e81] text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#2e2b7a] transition-all shadow-lg shadow-indigo-100">
                            <Mail size={18} />
                            Contact Fund
                        </button>
                    </div>

                    <div className="bg-[#312e81] rounded-2xl p-8 text-white space-y-4 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
                        <div className="relative z-10">
                            <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-2">Deployment Status</p>
                            <h3 className="text-3xl font-black">74% Deployed</h3>
                            <p className="text-xs text-white/50 mt-1">Available Dry Powder: $117M</p>
                        </div>
                        <div className="absolute bottom-4 right-4 text-white/10 rotate-12">
                            <Activity size={80} />
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="space-y-8">
                    {/* Top Row: Portfolio Health & Key Metrics */}
                    <div className="grid md:grid-cols-[1.2fr,1fr,1fr] gap-6">
                        {/* Portfolio Health Gauge */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center relative min-h-[300px]">
                            <h3 className="text-md font-bold text-slate-800 absolute top-8 left-8">Portfolio Health</h3>
                            <div className="size-48 relative mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={healthData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={65}
                                            outerRadius={85}
                                            paddingAngle={0}
                                            dataKey="value"
                                            startAngle={90}
                                            endAngle={-270}
                                            stroke="none"
                                        >
                                            {healthData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-5xl font-black text-slate-800">84</span>
                                    <span className="text-[12px] font-bold text-slate-400 uppercase">/100</span>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center gap-1.5 text-emerald-500 font-bold text-sm">
                                <TrendingUp size={16} />
                                +2.1% Alpha Gain
                            </div>
                        </div>

                        {/* Metrics Pair 1 */}
                        <div className="grid grid-rows-2 gap-6">
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-5">
                                <div className="size-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                    <Briefcase size={24} />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">AUM Growth</p>
                                    <h4 className="text-3xl font-black text-slate-800">+18%</h4>
                                    <p className="text-[11px] text-slate-400 font-medium">Year-over-Year</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-5">
                                <div className="size-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                                    <Zap size={24} />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Deployment</p>
                                    <h4 className="text-3xl font-black text-slate-800">8.4x</h4>
                                    <p className="text-[11px] text-slate-400 font-medium">Cap Velocity</p>
                                </div>
                            </div>
                        </div>

                        {/* Metrics Pair 2 */}
                        <div className="grid grid-rows-2 gap-6">
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-5">
                                <div className="size-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                    <Target size={24} />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Avg Check</p>
                                    <h4 className="text-3xl font-black text-slate-800">$2.4M</h4>
                                    <p className="text-[11px] text-slate-400 font-medium">Core Equity rounds</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-5">
                                <div className="size-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                                    <Activity size={24} />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">IRR (Net)</p>
                                    <h4 className="text-3xl font-black text-slate-800">32%</h4>
                                    <p className="text-[11px] text-slate-400 font-medium">Portfolio Average</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Investment Thesis Section */}
                    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden min-h-[480px] flex flex-col">
                        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                            <PieIcon className="text-indigo-900" size={24} />
                            <h3 className="font-black text-slate-900 text-lg">Investment Thesis & Strategy</h3>
                        </div>
                        <div className="flex-1 grid md:grid-cols-2 divide-x divide-y divide-slate-100">
                            {/* Strategic Focus */}
                            <div className="p-10 space-y-6">
                                <div className="flex items-center gap-2.5 text-indigo-600">
                                    <Target size={24} />
                                    <h4 className="font-black text-lg">Strategic Focus</h4>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        'Early-stage Fintech with institutional banking potential.',
                                        'B2B SaaS models with high scalability and low churn.',
                                        'Regional focus on Eastern Europe and Central Asia.'
                                    ].map((s, idx) => (
                                        <li key={idx} className="text-[15px] text-slate-600 flex items-start gap-3 leading-relaxed">
                                            <div className="size-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Exit Track Record */}
                            <div className="p-10 space-y-6">
                                <div className="flex items-center gap-2.5 text-emerald-600">
                                    <TrendingUp size={24} />
                                    <h4 className="font-black text-lg">Exit Track Record</h4>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        '3 Major M&A exits in the last 24 months.',
                                        'Average 4.2x multiple on exited capital.',
                                        'Active pipeline for 2 IPO candidates in 2024.'
                                    ].map((w, idx) => (
                                        <li key={idx} className="text-[15px] text-slate-600 flex items-start gap-3 leading-relaxed">
                                            <div className="size-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                            {w}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* LP Composition */}
                            <div className="p-10 space-y-6">
                                <div className="flex items-center gap-2.5 text-blue-600">
                                    <Users size={24} />
                                    <h4 className="font-black text-lg">LP Composition</h4>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        '40% Institutional Funds (Pension/Sovereign).',
                                        '35% Family Offices with strategic alignment.',
                                        '25% Ultra High Net Worth individuals.'
                                    ].map((o, idx) => (
                                        <li key={idx} className="text-[15px] text-slate-600 flex items-start gap-3 leading-relaxed">
                                            <div className="size-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                            {o}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Risk Tolerance */}
                            <div className="p-10 space-y-6">
                                <div className="flex items-center gap-2.5 text-orange-500">
                                    <AlertTriangle size={24} />
                                    <h4 className="font-black text-lg">Risk Tolerance</h4>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        'Moderate risk appetite for Series A expansions.',
                                        'Strict compliance and ESG underwriting criteria.',
                                        'Hedged exposure to emerging market currency risks.'
                                    ].map((t, idx) => (
                                        <li key={idx} className="text-[15px] text-slate-600 flex items-start gap-3 leading-relaxed">
                                            <div className="size-1.5 rounded-full bg-orange-400 mt-2 shrink-0" />
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Portfolio Overview */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="font-black text-slate-800 text-lg">Portfolio Highlight</h3>
                            <Link to="/investor" className="text-xs font-black text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest border-b border-indigo-100 pb-0.5">Explore All Companies</Link>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { name: 'TechNova Solutions', sector: 'FINTECH | SERIES A', score: 78, color: 'bg-indigo-600' },
                                { name: 'CyberShield', sector: 'SECURITY | SEED', score: 62, color: 'bg-emerald-600' },
                                { name: 'AgroRoot', sector: 'AGRITECH | SERIES B', score: 94, color: 'bg-indigo-600' },
                            ].map((s, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 hover:shadow-md transition-all cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className={`size-12 ${idx === 1 ? 'bg-slate-800' : 'bg-[#1e1b4b]'} rounded-xl flex items-center justify-center text-white font-black text-sm`}>
                                            {idx === 0 && <Rocket size={24} />}
                                            {idx === 1 && <ShieldAlert size={24} />}
                                            {idx === 2 && <Activity size={24} />}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-800 text-md group-hover:text-indigo-600 transition-colors">{s.name}</h4>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">{s.sector}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest px-0.5">
                                            <span className="text-slate-400">Perf. Score</span>
                                            <span className="text-slate-800">{s.score}/100</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className={`h-full ${s.color}`} style={{ width: `${s.score}%` }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
