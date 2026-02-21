import {
    Search,
    Filter,
    TrendingUp,
    Building2,
    ShieldAlert,
    ArrowUpRight,
    Zap,
    Activity,
    ChevronRight,
    Rocket
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

import startupService, { Startup } from '../services/startup';
import { useState, useEffect } from 'react';

export default function InvestorDiscover() {
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
    return (
        <div className="space-y-8">
            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white">Marketplace</h1>
                    <p className="text-sm text-slate-400 font-medium">Discover top-tier startups matching your thesis.</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Filter by sector, stage, or name..."
                            className="w-full h-11 bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 text-sm text-white focus:ring-2 focus:ring-accent outline-none transition-all shadow-sm shadow-black/20"
                        />
                    </div>
                    <button className="h-11 px-4 bg-slate-800 border border-slate-700 rounded-xl flex items-center gap-2 text-slate-300 hover:bg-slate-700 transition-all shadow-sm">
                        <Filter size={18} />
                        <span className="text-sm font-bold uppercase tracking-tight">Filters</span>
                    </button>
                </div>
            </div>

            {/* Startup Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full py-12 text-center text-slate-500 font-bold">
                        Discovering startups...
                    </div>
                ) : startups.map((s, idx) => (
                    <Link
                        key={s.id}
                        to={`/startup/${s.id}`}
                        className="group bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-6 hover:shadow-xl hover:shadow-accent/5 hover:border-accent/40 transition-all cursor-pointer relative overflow-hidden"
                    >
                        {/* Hover Decor */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110" />

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`size-14 ${idx % 2 === 0 ? 'bg-accent/20 text-accent' : 'bg-slate-800 text-white'} rounded-xl flex items-center justify-center`}>
                                    {idx % 3 === 0 && <Rocket size={28} />}
                                    {idx % 3 === 1 && <ShieldAlert size={28} />}
                                    {idx % 3 === 2 && <Activity size={28} />}
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="text-[10px] font-black text-white px-2 py-0.5 rounded bg-accent uppercase tracking-widest shadow-lg shadow-accent/20">{(s.latest_success_score || 0).toFixed(0)}/100</div>
                                    <div className="text-[10px] text-slate-500 font-bold mt-1">SUCCESS SCORE</div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-black text-white group-hover:text-accent transition-colors uppercase tracking-tight leading-none">{s.name}</h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded uppercase tracking-widest">{s.sector}</span>
                                    <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded uppercase tracking-widest">{s.stage}</span>
                                </div>
                            </div>

                            <div className="space-y-4 mt-auto">
                                <div className="flex justify-between items-end border-b border-slate-800 pb-2">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Location</p>
                                        <p className="text-sm font-bold text-slate-300 mt-1">{s.city || 'Baku'}</p>
                                    </div>
                                    <ArrowUpRight size={20} className="text-slate-600 group-hover:text-accent transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </div>

                                <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-400">
                                    <Zap size={14} />
                                    Tier 1 Eligibility Confirmed
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="flex justify-center pt-8">
                <button className="px-6 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm font-black text-slate-300 hover:bg-slate-700 transition-all">
                    Load More Startups
                </button>
            </div>
        </div>
    );
}
