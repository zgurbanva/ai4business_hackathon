import React, { useState } from 'react';
import {
    Newspaper,
    TrendingUp,
    Award,
    BookOpen,
    Search,
    Filter,
    ArrowRight,
    Share2,
    Bookmark,
    MessageSquare,
    Clock,
    Sparkles,
    Calendar,
    Building2,
    ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';

const newsItems = [
    {
        id: 1,
        category: "Funding",
        title: "National Innovation Fund Announces $5M Seed Round for AI Startups",
        excerpt: "The Ministry of Digital Development and Transport has unveiled a major funding initiative aimed at home-grown artificial intelligence projects.",
        date: "Aug 20, 2024",
        readTime: "5 min",
        image: "https://picsum.photos/seed/funding/800/400",
        author: "Fidan Aliyeva",
        tags: ["Seed", "AI", "Government"]
    },
    {
        id: 2,
        category: "Policy",
        title: "New Tax Incentives for IT Residents Approved in Parliament",
        excerpt: "Key changes to the Tax Code provide 0% income tax for employees of registered IT companies for the next 10 years.",
        date: "Aug 18, 2024",
        readTime: "3 min",
        image: "https://picsum.photos/seed/policy/800/400",
        author: "Emin Mammadov",
        tags: ["Tax", "IT Hub", "Regulation"]
    },
    {
        id: 3,
        category: "Success Story",
        title: "Baku-Based Fintech 'EcoPay' Named Startup of the Year",
        excerpt: "The sustainability-focused payment platform has reached 100,000 active users and eyes regional expansion into Central Asia.",
        date: "Aug 15, 2024",
        readTime: "4 min",
        image: "https://picsum.photos/seed/success/800/400",
        author: "Leyla Gasimova",
        tags: ["Fintech", "Scaleup", "Award"]
    },
    {
        id: 4,
        category: "Ecosystem",
        title: "Regional Innovation Hubs to Open in Ganja and Sumqayit",
        excerpt: "A network of new tech parks will provide infrastructure and mentorship to young entrepreneurs outside the capital.",
        date: "Aug 12, 2024",
        readTime: "6 min",
        image: "https://picsum.photos/seed/hub/800/400",
        author: "Rashad Baghirov",
        tags: ["Infrastructure", "Regional", "Ganja"]
    }
];

const categories = ["All", "Funding", "Policy", "Success Story", "Ecosystem", "Reports"];

export default function ResourcesPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const openChatbot = () => {
        window.dispatchEvent(new CustomEvent('toggle-chatbot'));
    };

    const filteredNews = activeCategory === "All"
        ? newsItems
        : newsItems.filter(item => item.category === activeCategory);

    return (
        <div className="min-h-screen bg-background-dark flex flex-col text-slate-100">
            <Header />

            <main className="flex-1">
                {/* Banner Section */}
                <section className="relative py-24 px-8 bg-slate-950 border-b border-slate-900 overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at 70% 30%, #573f9d 0%, transparent 60%)' }}></div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="grid lg:grid-cols-[1fr,400px] gap-16 items-center">
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/20 text-accent text-xs font-black uppercase tracking-widest">
                                    <Sparkles size={14} />
                                    Ecosystem Intelligence
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                                    Startup <br />
                                    <span className="text-accent underline decoration-white/20 underline-offset-8">Resources</span> Hub
                                </h1>
                                <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
                                    The central engine for innovation news, policy updates, and growth resources. Stay informed about the latest movements in Azerbaijan's tech landscape.
                                </p>
                                <div className="flex items-center gap-6 pt-4">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="size-10 rounded-full border-2 border-slate-950 overflow-hidden">
                                                <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="Contributor" />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-sm font-bold text-slate-500">
                                        Join <span className="text-white font-black">12,000+</span> subscribers for weekly ecosystem insights.
                                    </p>
                                </div>
                            </div>

                            <div className="hidden lg:block">
                                <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 backdrop-blur-xl shadow-2xl relative group overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
                                        <TrendingUp size={120} />
                                    </div>
                                    <h3 className="text-white font-bold text-xl mb-4">Need Assistance?</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                        Our AI assistant can guide you through any resource or answer ecosystem-related questions instantly.
                                    </p>
                                    <button
                                        onClick={openChatbot}
                                        className="w-full h-14 bg-accent text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-accent/90 transition-all shadow-xl shadow-accent/20"
                                    >
                                        <MessageSquare size={20} />
                                        Start Live Support
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20 px-8 max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${activeCategory === cat
                                            ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20'
                                            : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-white'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search resources..."
                                className="w-full h-12 bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 text-sm text-white focus:ring-2 focus:ring-accent outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {filteredNews.map((news, idx) => (
                            <motion.article
                                key={news.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <div className="space-y-6">
                                    <div className="aspect-[16/9] bg-slate-800 rounded-3xl overflow-hidden border border-slate-800 relative shadow-2xl">
                                        <img
                                            src={news.image}
                                            alt={news.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute top-6 left-6 flex gap-2">
                                            <span className="bg-slate-950/80 backdrop-blur-md text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/10">
                                                {news.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5"><Calendar size={12} className="text-accent" /> {news.date}</span>
                                            <span className="size-1 bg-slate-700 rounded-full" />
                                            <span className="flex items-center gap-1.5"><Clock size={12} className="text-accent" /> {news.readTime} Read</span>
                                        </div>

                                        <h2 className="text-2xl md:text-3xl font-black text-white group-hover:text-accent transition-colors leading-tight">
                                            {news.title}
                                        </h2>

                                        <p className="text-slate-400 leading-relaxed line-clamp-2">
                                            {news.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 bg-slate-900 rounded-full border border-slate-800 flex items-center justify-center font-black text-xs text-accent">
                                                    {news.author.charAt(0)}
                                                </div>
                                                <p className="text-sm font-bold text-slate-300">{news.author}</p>
                                            </div>
                                            <div className="flex gap-4">
                                                <button className="text-slate-500 hover:text-white transition-colors"><Bookmark size={20} /></button>
                                                <button className="text-slate-500 hover:text-white transition-colors"><Share2 size={20} /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    <div className="mt-20 p-12 bg-slate-900 rounded-[3rem] border border-slate-800 text-center space-y-8 relative overflow-hidden">
                        <div className="absolute bottom-0 right-0 p-12 opacity-5">
                            <BookOpen size={200} />
                        </div>
                        <h3 className="text-3xl font-black text-white">Unlock Deep Ecosystem Analytics</h3>
                        <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
                            Access high-fidelity data on historical funding rounds, sector-specific growth metrics, and full institutional reporting.
                        </p>
                        <button className="h-14 px-10 bg-accent text-white rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl shadow-accent/20">
                            View Full Reports Archive
                        </button>
                    </div>
                </section>
            </main>

            <footer className="py-12 border-t border-slate-800 bg-slate-950">
                <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500">
                    <div className="flex items-center gap-2">
                        <Building2 size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Innovation Azerbaijan Newsroom</span>
                    </div>
                    <p className="text-xs">© 2024 Ecosystem Intelligence Portal. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}
