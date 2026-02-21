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
    Users,
    User,
    AlertCircle,
    Loader2,
    Fingerprint,
    ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from '../components/Header';
import authService from '../services/auth';

type AuthMode = 'login' | 'register';
type Role = 'startup' | 'investor' | 'mentor';

export default function AuthPage() {
    const [mode, setMode] = useState<AuthMode>('login');
    const [role, setRole] = useState<Role>('startup');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/register') {
            setMode('register');
        } else {
            setMode('login');
        }
    }, [location.pathname]);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            let data;
            if (mode === 'login') {
                data = await authService.login({ email, password });
            } else {
                data = await authService.register({
                    email,
                    password,
                    full_name: fullName,
                    role: role
                });
            }

            const params = new URLSearchParams(location.search);
            const redirectUrl = params.get('redirectUrl');

            if (redirectUrl) {
                navigate(redirectUrl);
                return;
            }

            // Redirect based on role
            switch (data.user.role) {
                case 'iria_admin': navigate('/admin'); break;
                case 'startup': navigate('/startup-onboarding'); break; // Leads to profile setup
                case 'investor': navigate('/investor-profile'); break;
                case 'mentor': navigate('/mentor'); break;
                default: navigate('/');
            }
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Authentication failed. Please check your details.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-dark flex flex-col text-slate-100">
            <Header />

            <main className="flex-1 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-5xl w-full grid lg:grid-cols-[1fr,450px] gap-12 items-center relative z-10">

                    {/* Left Column: Value Prop */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hidden lg:flex flex-col gap-8"
                    >
                        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full w-fit border border-accent/20">
                            <Fingerprint size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Secure Gateway v2.0</span>
                        </div>

                        <h2 className="text-5xl font-black text-white leading-[1.1] tracking-tight">
                            {mode === 'login' ? (
                                <>Welcome Back to <br /><span className="text-accent">Innovation AZ</span></>
                            ) : (
                                <>Join the Future of <br /><span className="text-accent">Azerbaijan's</span> Tech</>
                            )}
                        </h2>

                        <p className="text-lg text-slate-400 leading-relaxed max-w-md">
                            The national strategic platform for startup growth, institutional investment, and expert mentorship.
                            {mode === 'login'
                                ? " Access your dashboard to manage your innovation pipeline."
                                : " Register today to unlock national resources and global opportunities."}
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl">
                                <Shield className="text-accent mb-3" size={24} />
                                <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">State Security</h4>
                                <p className="text-[10px] text-slate-500 font-medium">Military-grade AES-256 data protection.</p>
                            </div>
                            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl">
                                <Users className="text-indigo-400 mb-3" size={24} />
                                <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">Verified Network</h4>
                                <p className="text-[10px] text-slate-500 font-medium">Connect with verified institutional partners.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Auth Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative"
                    >
                        <div className="space-y-6">
                            <div className="flex justify-between items-center mb-8">
                                <button
                                    onClick={() => setMode('login')}
                                    className={`text-lg font-black transition-all ${mode === 'login' ? 'text-white border-b-2 border-accent pb-1' : 'text-slate-600 hover:text-slate-400'}`}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => setMode('register')}
                                    className={`text-lg font-black transition-all ${mode === 'register' ? 'text-white border-b-2 border-accent pb-1' : 'text-slate-600 hover:text-slate-400'}`}
                                >
                                    Register
                                </button>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.form
                                    key={mode}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    onSubmit={handleAuth}
                                    className="space-y-5"
                                >
                                    {mode === 'register' && (
                                        <>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Identify Your Role</label>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {[
                                                        { id: 'startup', label: 'Startup', icon: <Rocket size={14} /> },
                                                        { id: 'investor', label: 'Investor', icon: <Building2 size={14} /> },
                                                        { id: 'mentor', label: 'Mentor', icon: <Users size={14} /> },
                                                    ].map((r) => (
                                                        <button
                                                            key={r.id}
                                                            type="button"
                                                            onClick={() => setRole(r.id as Role)}
                                                            className={`flex flex-col items-center gap-2 p-3 rounded-xl border font-bold text-[10px] transition-all ${role === r.id ? 'bg-accent/10 border-accent text-accent' : 'bg-slate-950 border-slate-800 text-slate-600 hover:border-slate-700'}`}
                                                        >
                                                            {r.icon}
                                                            {r.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Full Name / Entity Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                                                    <input
                                                        type="text"
                                                        required
                                                        value={fullName}
                                                        onChange={(e) => setFullName(e.target.value)}
                                                        placeholder="John Doe or Peak Ventures"
                                                        className="w-full h-12 bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 text-white focus:ring-2 focus:ring-accent outline-none transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}

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
                                                className="w-full h-12 bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 text-white focus:ring-2 focus:ring-accent outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Access Key</label>
                                            {mode === 'login' && (
                                                <a href="#" className="text-[10px] font-bold text-accent hover:underline uppercase tracking-widest">Forgot?</a>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                                            <input
                                                type="password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••••••"
                                                className="w-full h-12 bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-12 text-white focus:ring-2 focus:ring-accent outline-none transition-all"
                                            />
                                            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors">
                                                <Eye size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-500 text-xs font-bold"
                                        >
                                            <AlertCircle size={16} />
                                            {error}
                                        </motion.div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-14 bg-accent text-white rounded-xl font-black text-lg flex items-center justify-center gap-3 hover:bg-accent/90 transition-all shadow-xl shadow-accent/20 disabled:opacity-50"
                                    >
                                        {isLoading ? <Loader2 className="animate-spin" /> : (
                                            <>
                                                {mode === 'login' ? 'Authenticate' : 'Create Account'}
                                                <ArrowRight size={20} />
                                            </>
                                        )}
                                    </button>
                                </motion.form>
                            </AnimatePresence>

                            {mode === 'login' ? (
                                <p className="text-center text-xs text-slate-500 font-medium">
                                    New to Innovation AZ? <button onClick={() => setMode('register')} className="text-accent font-bold hover:underline">Register your entity</button>
                                </p>
                            ) : (
                                <p className="text-center text-xs text-slate-500 font-medium">
                                    Already have an account? <button onClick={() => setMode('login')} className="text-accent font-bold hover:underline">Return to login</button>
                                </p>
                            )}
                        </div>
                    </motion.div>
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
