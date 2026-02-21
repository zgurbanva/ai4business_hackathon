import {
    Calendar,
    MapPin,
    Users,
    Trophy,
    ArrowRight,
    Search,
    Filter,
    Clock,
    ExternalLink,
    Plus
} from 'lucide-react';
import { motion } from 'motion/react';
import Header from '../components/Header';

const featuredEvent = {
    title: "Baku Innovation Hackathon 2024",
    date: "Oct 15-17, 2024",
    location: "Baku National Stadium Portal",
    description: "Join Azerbaijan's largest technical gathering to solve critical challenges in Fintech, AgriTech, and Green energy. $50k in prizes and incubation opportunities.",
    organizer: "Innovation Azerbaijan Agency",
    attendees: "1,200+ Registered",
    type: "Hackathon"
};

const events = [
    {
        title: "Venture Capital Summit 2024",
        date: "Sep 12, 2024",
        time: "09:00 AM",
        location: "Four Seasons Hotel, Baku",
        type: "Conference",
        description: "Connect with domestic and international investors to discuss the state of VC in the region.",
        prizes: null,
        status: "Registration Open"
    },
    {
        title: "GovTech Demo Day",
        date: "Sep 28, 2024",
        time: "02:00 PM",
        location: "Online / ASAN Service 7",
        type: "Demo Day",
        description: "Watch the top 10 GovTech startups pitch their solutions to national public sector representatives.",
        prizes: "Incubation Grants",
        status: "Closing Soon"
    },
    {
        title: "AI & Big Data Hackathon",
        date: "Oct 05-06, 2024",
        time: "48 Hours",
        location: "Baku White City Office",
        type: "Hackathon",
        description: "Build innovative LLM applications for the Azerbaijani language and public data sets.",
        prizes: "$10,000 Total Pool",
        status: "Upcoming"
    },
    {
        title: "Startup Weekend Ganja",
        date: "Nov 02-04, 2024",
        time: "54 Hours",
        location: "Ganja Youth House",
        type: "Workshop",
        description: "Go from idea to execution in one weekend with the help of experienced mentors and entrepreneurs.",
        prizes: "Local Awards",
        status: "Early Bird"
    },
    {
        title: "AgriTech Innovation Forum",
        date: "Nov 15, 2024",
        time: "10:00 AM",
        location: "ADA University, Baku",
        type: "Forum",
        description: "Discussing the role of precision agriculture and drone technology in the future of the nation's farms.",
        prizes: null,
        status: "Upcoming"
    }
];

export default function EventsPage() {
    return (
        <div className="min-h-screen bg-background-dark flex flex-col text-slate-100">
            <Header />

            <main className="flex-1">
                {/* Hero / Featured Event */}
                <section className="relative py-20 px-8 bg-slate-950 border-b border-slate-900 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, #573f9d 0%, transparent 70%)' }}></div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="grid lg:grid-cols-[1.2fr,1fr] gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-8"
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/20 text-accent text-xs font-black uppercase tracking-widest">
                                    <Trophy size={14} />
                                    Featured Hackathon
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                                    Innovate for the <br />
                                    <span className="text-accent underline decoration-white/20 underline-offset-8">Future</span>
                                </h1>
                                <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
                                    Join the most influential gatherings of founders, builders, and investors in Azerbaijan. From high-stakes hackathons to networking summits.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <button className="h-14 px-8 bg-accent text-white rounded-xl font-black flex items-center gap-3 hover:scale-105 transition-all shadow-lg shadow-accent/20">
                                        Register for BIH 2024
                                        <ArrowRight size={20} />
                                    </button>
                                    <button className="h-14 px-8 bg-slate-800 text-white rounded-xl font-black hover:bg-slate-700 transition-all flex items-center gap-2">
                                        <Calendar size={20} />
                                        Add to Calendar
                                    </button>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 backdrop-blur-xl shadow-2xl relative"
                            >
                                <div className="absolute -top-12 -right-12 size-48 bg-accent/20 rounded-full blur-3xl" />

                                <div className="relative space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Next Major Event</p>
                                            <h2 className="text-2xl font-black text-white">{featuredEvent.title}</h2>
                                        </div>
                                        <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                                            Live
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-800">
                                            <Calendar className="text-accent mb-2" size={18} />
                                            <p className="text-[10px] font-bold text-slate-500 uppercase">Date</p>
                                            <p className="text-sm font-bold text-white">{featuredEvent.date}</p>
                                        </div>
                                        <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-800">
                                            <MapPin className="text-accent mb-2" size={18} />
                                            <p className="text-[10px] font-bold text-slate-500 uppercase">Location</p>
                                            <p className="text-sm font-bold text-white truncate">{featuredEvent.location}</p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        {featuredEvent.description}
                                    </p>

                                    <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                                        <div className="flex items-center gap-3">
                                            <Users size={16} className="text-slate-500" />
                                            <span className="text-xs font-bold text-slate-400">{featuredEvent.attendees}</span>
                                        </div>
                                        <span className="text-xs font-bold text-accent">Registration Closing Soon</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Search & Filters */}
                <section className="bg-slate-900/50 sticky top-16 z-40 backdrop-blur-md border-b border-slate-800">
                    <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between gap-8">
                        <div className="flex-1 max-w-md relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                placeholder="Find events, workshops, hackathons..."
                                className="w-full h-11 bg-slate-800/50 border border-slate-800 rounded-xl pl-10 pr-4 text-sm text-white focus:ring-2 focus:ring-accent outline-none transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="h-11 px-4 bg-slate-800/50 border border-slate-800 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all flex items-center gap-2">
                                <Filter size={16} />
                                All Dates
                            </button>
                            <button className="h-11 px-4 bg-slate-800/50 border border-slate-800 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all">
                                Category
                            </button>
                        </div>
                    </div>
                </section>

                {/* Regular Events List */}
                <section className="py-20 px-8 max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-white">Upcoming Pipeline</h2>
                            <p className="text-slate-500 font-medium">Verified startup events across the country.</p>
                        </div>
                        <button className="text-sm font-black text-accent uppercase tracking-widest hover:underline flex items-center gap-2">
                            Submit Your Event
                            <Plus size={16} />
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8 flex flex-col justify-between hover:shadow-2xl hover:shadow-accent/5 transition-all group"
                            >
                                <div className="space-y-6">
                                    <div className="flex justify-between items-start">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${event.type === 'Hackathon' ? 'bg-accent/10 text-accent border-accent/20' :
                                                event.type === 'Demo Day' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                    'bg-slate-800 text-slate-400 border-slate-700'
                                            }`}>
                                            {event.type}
                                        </span>
                                        <button className="text-slate-600 hover:text-white transition-colors">
                                            <ExternalLink size={18} />
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                                            {event.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                                            {event.description}
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-slate-400">
                                            <Calendar size={16} className="text-accent" />
                                            <span className="text-xs font-bold">{event.date}</span>
                                            <Clock size={16} className="text-slate-600 ml-2" />
                                            <span className="text-xs font-medium text-slate-500">{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-400">
                                            <MapPin size={16} className="text-accent" />
                                            <span className="text-xs font-medium truncate">{event.location}</span>
                                        </div>
                                        {event.prizes && (
                                            <div className="flex items-center gap-3 text-emerald-400 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10">
                                                <Trophy size={16} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">{event.prizes}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-800/50 flex items-center justify-between">
                                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                                        Status: <span className="text-slate-300 ml-1">{event.status}</span>
                                    </span>
                                    <button className="h-10 px-6 bg-slate-800 text-white rounded-lg text-xs font-black hover:bg-accent transition-colors">
                                        Join Event
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="py-12 bg-slate-950 border-t border-slate-900 mt-20">
                <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-xs text-slate-600 font-bold uppercase tracking-widest">Innovation Azerbaijan Events Registry</p>
                    <div className="flex gap-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <a href="#" className="hover:text-accent transition-colors">Privacy</a>
                        <a href="#" className="hover:text-accent transition-colors">Terms</a>
                        <a href="#" className="hover:text-accent transition-colors">Submit Hackathon</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
