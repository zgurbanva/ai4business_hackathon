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
    X,
    LayoutDashboard,
    Globe
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

    // Close dropdowns on navigation
    useEffect(() => {
        setIsProfileOpen(false);
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const handleProfileSwitch = async (title: string, path: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            if (title === 'Gov Admin') {
                await authService.login({ email: 'admin@test.com', password: 'admin123' });
            } else if (title === 'Investor') {
                await authService.login({ email: 'investor@test.com', password: 'password123' });
            }
            // For other roles, we just navigate or we could add more demo accounts
            navigate(path);
        } catch (err) {
            console.error('Demo login failed', err);
            navigate(path); // Fallback to just navigating
        }
    };

    const navLinks = variant === 'investor' ? [
        { title: 'Portal Home', link: '/' },
        { title: 'Dashboard', link: '/investor-profile' },
        { title: 'Portfolio', link: '/investor' },
        { title: 'Market Insights', link: '/analytics' },
        { title: 'Reports', link: '/reports' },
    ] : [
        { title: 'Ecosystem', link: '/admin' },
        { title: 'IT Registry', link: '/it-registry' },
        { title: 'Events', link: '/events' },
        { title: 'Analytics', link: '/analytics' },
        { title: 'Resources', link: '/program' },
        { title: 'Support', link: '/support' },
    ];

    const profiles = [
        { title: 'Gov Admin', icon: <Shield size={16} />, link: '/admin' },
        { title: 'Investor', icon: <Wallet size={16} />, link: '/investor-profile' },
        { title: 'Startup', icon: <Rocket size={16} />, link: '/startup-onboarding' },
        { title: 'Mentor', icon: <Users size={16} />, link: '/mentor' },
    ];

    const isActive = (path: string) => location.pathname === path;

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
                            {navLinks.map((nav) => (
                                <Link
                                    key={nav.link}
                                    to={nav.link}
                                    className={`text-sm font-semibold transition-all ${isActive(nav.link)
                                        ? (variant === 'investor' ? 'text-white border-b-2 border-indigo-600 pb-1 -mb-1' : 'text-accent border-b-2 border-accent pb-1 -mb-1 font-bold')
                                        : 'text-slate-300 hover:text-white'
                                        } text-nowrap`}
                                >
                                    {nav.title}
                                </Link>
                            ))}
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
                                                    onClick={(e) => handleProfileSwitch(profile.title, profile.link, e)}
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

                        <button
                            className="lg:hidden text-accent p-2 hover:bg-accent/10 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden border-t border-slate-800 bg-slate-900/95 backdrop-blur-xl overflow-hidden"
                    >
                        <nav className="p-4 flex flex-col gap-2">
                            {navLinks.map((nav) => (
                                <Link
                                    key={nav.link}
                                    to={nav.link}
                                    className={`flex items-center justify-between p-4 rounded-xl text-lg font-bold transition-all ${isActive(nav.link)
                                        ? 'bg-accent/20 text-accent border border-accent/20'
                                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    {nav.title}
                                    {isActive(nav.link) && <div className="size-2 rounded-full bg-accent" />}
                                </Link>
                            ))}

                            {!authService.isAuthenticated() && (
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    <Link to="/login" className="h-14 rounded-xl border border-slate-700 flex items-center justify-center font-bold text-white hover:bg-white/5">
                                        Sign In
                                    </Link>
                                    <Link to="/register" className="h-14 rounded-xl bg-accent flex items-center justify-center font-bold text-white hover:bg-accent/90">
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
