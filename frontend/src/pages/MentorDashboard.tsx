import React from 'react';
import {
  Users,
  MessageSquare,
  Calendar,
  Star,
  TrendingUp,
  BookOpen,
  Award,
  ChevronRight,
  MoreVertical,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const mentees = [
  { id: 1, name: 'Nexus AI', founder: 'Ali Mammadov', stage: 'Seed', nextSession: 'Today, 2:00 PM', progress: 75 },
  { id: 2, name: 'EcoFlow', founder: 'Gunel Huseynova', stage: 'MVP', nextSession: 'Tomorrow, 10:00 AM', progress: 45 },
  { id: 3, name: 'AgroSmart', founder: 'Rashad Aliyev', stage: 'Idea', nextSession: 'Feb 25, 4:00 PM', progress: 20 },
];

import Header from '../components/Header';

export default function MentorDashboard() {
  return (
    <div className="min-h-screen bg-background-dark flex text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 text-white flex flex-col sticky top-0 h-screen border-r border-slate-900">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-emerald-500/20 p-2 rounded-lg">
            <Users size={24} className="text-emerald-400" />
          </div>
          <div>
            <h1 className="font-black text-lg leading-none">MentorPro</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Expert Guidance Portal</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-emerald-500/20 text-emerald-400 rounded-lg font-bold text-sm transition-all">
            <Users size={18} />
            Mentees
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg font-bold text-sm transition-all">
            <Calendar size={18} />
            Schedule
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg font-bold text-sm transition-all">
            <MessageSquare size={18} />
            Messages
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg font-bold text-sm transition-all">
            <BookOpen size={18} />
            Resources
          </a>
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="bg-white/5 p-4 rounded-xl flex items-center gap-3">
            <div className="size-10 rounded-lg overflow-hidden border border-white/10">
              <img src="https://picsum.photos/seed/mentor/100/100" alt="Mentor" referrerPolicy="no-referrer" />
            </div>
            <div>
              <p className="text-xs font-bold">Leyla Aliyeva</p>
              <p className="text-[10px] text-slate-500 font-medium">Senior Strategy Mentor</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <Header />

        <div className="p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Active Mentees', value: '12', icon: <Users className="text-emerald-400" />, bg: 'bg-emerald-500/10' },
              { label: 'Hours Mentored', value: '145', icon: <Clock className="text-blue-400" />, bg: 'bg-blue-500/10' },
              { label: 'Avg. Rating', value: '4.9/5', icon: <Star className="text-amber-400" />, bg: 'bg-amber-500/10' },
              { label: 'Success Rate', value: '92%', icon: <TrendingUp className="text-indigo-400" />, bg: 'bg-indigo-500/10' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-900 p-6 rounded-2xl border border-slate-800"
              >
                <div className={`size-10 ${stat.bg} rounded-lg flex items-center justify-center mb-4`}>
                  {stat.icon}
                </div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                <h4 className="text-2xl font-black text-white">{stat.value}</h4>
              </motion.div>
            ))}
          </div>

          {/* Mentee List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white">Your Mentees</h2>
            <div className="grid gap-4">
              {mentees.map((mentee) => (
                <motion.div
                  key={mentee.id}
                  whileHover={{ x: 5 }}
                  className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <div className="size-12 bg-slate-800 rounded-xl flex items-center justify-center text-white font-black text-lg">
                      {mentee.name[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">{mentee.name}</h3>
                      <p className="text-xs text-slate-500 font-medium">Founder: {mentee.founder} • Stage: {mentee.stage}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-12">
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Next Session</p>
                      <div className="flex items-center gap-2 text-xs font-bold text-white">
                        <Calendar size={14} className="text-emerald-400" />
                        {mentee.nextSession}
                      </div>
                    </div>
                    <div className="w-32">
                      <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase mb-1">
                        <span>Progress</span>
                        <span>{mentee.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${mentee.progress}%` }} />
                      </div>
                    </div>
                    <button className="p-2 text-slate-500 hover:text-white transition-all">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <Award className="text-amber-400" size={24} />
              <h3 className="text-xl font-bold text-white">Mentor Achievements</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Top Strategist', desc: 'Awarded for 50+ successful strategy sessions.', icon: <CheckCircle2 className="text-emerald-400" /> },
                { title: 'Ecosystem Builder', desc: 'Helped 5 startups reach Series A funding.', icon: <TrendingUp className="text-blue-400" /> },
                { title: 'Community Leader', desc: 'Top-rated mentor for 3 consecutive months.', icon: <Award className="text-amber-400" /> },
              ].map((ach, idx) => (
                <div key={idx} className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="size-10 bg-slate-900 rounded-lg flex items-center justify-center">
                    {ach.icon}
                  </div>
                  <h4 className="font-bold text-white">{ach.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{ach.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
