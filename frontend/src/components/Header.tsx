/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import authService from '../services/auth';
import {
    Bot,
    Menu,
    Shield,
    Wallet,
    Rocket,
    Users,
    LogOut,
    ChevronDown,
    User,
    Settings,
    Bell,
    Search,
    TrendingUp,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
    showSearch?: boolean;
    searchPlaceholder?: string;
    variant?: 'default' | 'investor';
}

export default function Header({
    showSearch = false,
    searchPlaceholder = "Search ecosystem...",
    variant = 'default'
}: HeaderProps) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close dropdown on navigation
    useEffect(() => {
        setIsProfileOpen(false);
    }, [location.pathname]);

    const handleProfileSwitch = (path: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(path);
    };

    const profiles = [
        { title: 'Gov Admin', icon: <Shield size={16} />, link: '/admin' },
        { title: 'Investor', icon: <Wallet size={16} />, link: '/investor-profile' },
        { title: 'Startup', icon: <Rocket size={16} />, link: '/startup-onboarding' },
        { title: 'Mentor', icon: <Users size={16} />, link: '/mentor' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-12">
                        {/* Logo / Branding */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className={`size-10 ${variant === 'investor' ? 'bg-indigo-600' : 'bg-accent'} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                                {variant === 'investor' ? <TrendingUp size={24} className="text-white" /> : <Rocket size={24} className="text-white" />}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-black text-white tracking-tighter leading-none">
                                    Innovation <span className={variant === 'investor' ? 'text-indigo-500' : 'text-accent'}>AZ</span>
                                </span>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mt-1">
                                    {variant === 'investor' ? 'Investor Portal' : 'Azerbaijan'}
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {variant === 'investor' ? (
                                <>
                                    <Link to="/" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Portal Home</Link>
                                    <Link to="/investor-profile" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Dashboard</Link>
                                    <Link to="/investor" className="text-sm font-semibold text-white border-b-2 border-indigo-600 pb-1 -mb-1 transition-colors">Portfolio</Link>
                                    <Link to="/analytics" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Market Insights</Link>
                                    <Link to="/reports" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Reports</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/admin" className="text-sm font-semibold text-slate-300 hover:text-accent transition-colors text-nowrap">Ecosystem</Link>
                                    <Link to="/events" className="text-sm font-semibold text-slate-300 hover:text-accent transition-colors text-nowrap">Events</Link>
                                    <Link to="/analytics" className="text-sm font-semibold text-slate-300 hover:text-accent transition-colors text-nowrap">Analytics</Link>
                                    <Link to="/program" className="text-sm font-semibold text-slate-300 hover:text-accent transition-colors text-nowrap">Resources</Link>
                                    <Link to="/support" className="text-sm font-semibold text-slate-300 hover:text-accent transition-colors text-nowrap">Support</Link>
                                </>
                            )}
                        </nav>
                    </div>

                    {/* Search Bar (Optional) */}
                    {showSearch && (
                        <div className="hidden md:block relative flex-1 max-w-md mx-8">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                className="w-full bg-slate-800/50 border border-slate-700 h-10 pl-10 pr-4 rounded-xl text-sm text-white focus:ring-2 focus:ring-accent outline-none transition-all placeholder:text-slate-500"
                            />
                        </div>
                    )}

                    {/* User Section */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        {/* Role Switcher (Avatar) - Always Visible for Demo/Hackathon */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 group p-1 pr-2 rounded-full hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
                                title="Role Switcher"
                            >
                                <div className="size-8 rounded-full bg-gradient-to-tr from-accent to-purple-500 flex items-center justify-center text-white ring-2 ring-slate-800 group-hover:ring-accent/50 transition-all overflow-hidden shadow-lg shadow-accent/20">
                                    <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" referrerPolicy="no-referrer" />
                                </div>
                                <ChevronDown size={14} className={`text-slate-400 group-hover:text-white transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                        className="absolute right-0 mt-3 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden backdrop-blur-xl"
                                    >
                                        <div className="p-4 border-b border-slate-800 bg-white/5">
                                            <p className="text-sm font-bold text-white">
                                                {authService.isAuthenticated() ? authService.getCurrentUser()?.full_name : 'Guest User'}
                                            </p>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                                                {authService.isAuthenticated() ? `${authService.getCurrentUser()?.role} Profile` : 'Verified Profile Preview'}
                                            </p>
                                        </div>

                                        <div className="p-2">
                                            <p className="px-3 pt-2 pb-1 text-[10px] font-black text-slate-500 uppercase tracking-widest">Switch Perspective</p>
                                            {profiles.map((profile, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={(e) => handleProfileSwitch(profile.link, e)}
                                                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-accent/10 hover:translate-x-1 transition-all group text-left"
                                                >
                                                    <div className="size-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-accent group-hover:bg-accent/20 transition-colors">
                                                        {profile.icon}
                                                    </div>
                                                    {profile.title}
                                                </button>
                                            ))}
                                        </div>

                                        {authService.isAuthenticated() && (
                                            <div className="p-2 border-t border-slate-800 bg-white/5">
                                                <Link
                                                    to="/settings"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                                                >
                                                    <Settings size={16} />
                                                    Account Settings
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        setIsProfileOpen(false);
                                                        authService.logout();
                                                        navigate('/login');
                                                    }}
                                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all w-full text-left"
                                                >
                                                    <LogOut size={16} />
                                                    Logout Session
                                                </button>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {!authService.isAuthenticated() && (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="hidden sm:block text-sm font-bold text-slate-300 hover:text-white transition-colors">Sign In</Link>
                                <Link to="/register" className="h-10 px-5 bg-accent text-white rounded-xl text-sm font-black flex items-center justify-center hover:bg-accent/90 transition-all shadow-lg shadow-accent/20">
                                    Get Started
                                </Link>
                            </div>
                        )}

                        <button className="lg:hidden text-accent">
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
