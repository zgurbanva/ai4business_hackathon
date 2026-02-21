import {
    LayoutDashboard,
    Briefcase,
    Search,
    FileText,
    Settings,
    ShieldCheck,
    TrendingUp,
    LogOut,
    ChevronRight,
    Target,
    BarChart3,
    Building2
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
    { label: 'Investor Dashboard', icon: <LayoutDashboard size={20} />, path: '/investor-profile' },
    { label: 'Startup Portfolio', icon: <Briefcase size={20} />, path: '/investor' },
    { label: 'Startup Marketplace', icon: <Search size={20} />, path: '/investor-discover' },
    { label: 'IT Registry', icon: <Building2 size={20} />, path: '/it-registry' },
    { label: 'Reports', icon: <FileText size={20} />, path: '/reports' },
    { label: 'Strategy', icon: <Target size={20} />, path: '/strategy' },
    { label: 'Analytics', icon: <BarChart3 size={20} />, path: '/analytics' },
];

import authService from '../services/auth';
import { useEffect, useState } from 'react';

export default function SidebarNav() {
    const location = useLocation();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        setUser(authService.getCurrentUser());
    }, []);

    const handleLogout = () => {
        authService.logout();
        window.location.href = '/login';
    };

    return (
        <aside className="w-64 bg-slate-950 border-r border-slate-900 flex flex-col h-[calc(100vh-64px)] sticky top-16 shadow-2xl">
            <div className="p-6">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 px-2">Main Navigation</p>
                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center justify-between group px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive
                                    ? 'bg-accent/20 text-accent'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`${isActive ? 'text-accent' : 'text-slate-500 group-hover:text-slate-300'}`}>
                                        {item.icon}
                                    </span>
                                    {item.label}
                                </div>
                                {isActive && <div className="size-1.5 rounded-full bg-accent shadow-sm shadow-accent/50" />}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-6 space-y-4">
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-800">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="size-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                            <ShieldCheck size={18} />
                        </div>
                        <p className="text-xs font-black text-white uppercase tracking-tight">{user?.role || 'User'}</p>
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold leading-tight">
                        {user?.full_name || 'Guest User'} is verified for institutional access.
                    </p>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold text-rose-400 hover:bg-rose-500/10 transition-all group"
                >
                    <LogOut size={20} className="text-rose-500 group-hover:text-rose-400" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
