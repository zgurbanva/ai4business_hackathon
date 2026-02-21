/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Building2, 
  Bell, 
  Settings, 
  Info, 
  Save, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  XCircle,
  MessageSquare,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function ProgramApplication() {
  return (
    <div className="min-h-screen bg-background-dark flex flex-col text-slate-100">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-8 h-16 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-accent p-1.5 rounded text-white">
            <Building2 size={20} />
          </div>
          <span className="font-bold text-white text-lg">Institutional Program Portal</span>
        </div>
        <nav className="flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-slate-400 hover:text-accent transition-colors">Dashboard</Link>
          <Link to="/program" className="text-sm font-bold text-accent border-b-2 border-accent h-16 flex items-center">Applications</Link>
          <a href="#" className="text-sm font-medium text-slate-400 hover:text-accent transition-colors">Help Center</a>
          <div className="flex items-center gap-4">
            <button className="text-slate-500 hover:text-accent transition-colors"><Bell size={20} /></button>
            <button className="text-slate-500 hover:text-accent transition-colors"><Settings size={20} /></button>
            <div className="size-8 rounded-full overflow-hidden border border-slate-700">
              <img src="https://picsum.photos/seed/user2/100/100" alt="User" referrerPolicy="no-referrer" />
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full p-8 space-y-8">
        {/* Progress Steps */}
        <div className="flex justify-between items-center px-4">
          {[
            { id: 1, label: '1. Basic Info', active: true },
            { id: 2, label: '2. Documents', active: false },
            { id: 3, label: '3. AI Eligibility', active: false },
            { id: 4, label: '4. Review Status', active: false },
          ].map((step) => (
            <div key={step.id} className={`flex items-center gap-2 pb-4 border-b-2 transition-all ${step.active ? 'border-accent text-accent' : 'border-transparent text-slate-600'}`}>
              <span className="text-sm font-bold">{step.label}</span>
            </div>
          ))}
        </div>

        {/* Application Form */}
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-black text-white mb-2">Program Application</h1>
              <p className="text-slate-400">Graduate Research Fellowship - Autumn 2024 Cycle</p>
            </div>
            <span className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-amber-500/20 flex items-center gap-2">
              <div className="size-2 rounded-full bg-amber-500 animate-pulse" />
              Draft in Progress
            </span>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
            <div className="bg-slate-950 p-6 flex justify-between items-center border-b border-slate-800">
              <div className="flex items-center gap-4">
                <div className="size-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                  <Info size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Step 1: Personal & Academic Details</h3>
                  <p className="text-xs text-slate-500">Please ensure all identity information matches your official transcripts.</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 h-10 bg-accent text-white rounded-lg text-sm font-bold hover:bg-accent/90 transition-all">
                <Save size={16} />
                Save Draft
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">First Name</label>
                  <input type="text" placeholder="e.g. Alexander" className="w-full h-12 px-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-accent" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">Last Name</label>
                  <input type="text" placeholder="e.g. Hamilton" className="w-full h-12 px-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-accent" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">Institutional Email</label>
                  <input type="email" placeholder="alexander@university.edu" className="w-full h-12 px-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-accent" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">Phone Number</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" className="w-full h-12 px-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-accent" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300">Current Department / Faculty</label>
                <select className="w-full h-12 px-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-accent">
                  <option className="bg-slate-900">Select Department</option>
                  <option className="bg-slate-900">Computer Science</option>
                  <option className="bg-slate-900">Engineering</option>
                  <option className="bg-slate-900">Economics</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300">Brief Statement of Purpose (Max 500 words)</label>
                <textarea 
                  placeholder="Describe your research goals and interest in this program..."
                  className="w-full h-32 p-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-accent resize-none"
                />
              </div>
            </div>

            <div className="p-6 bg-slate-950 border-t border-slate-800 flex justify-between">
              <button className="px-6 h-12 bg-slate-800 border border-slate-700 rounded-lg text-sm font-bold text-slate-400 hover:bg-slate-700 transition-all">
                Discard Changes
              </button>
              <button className="px-8 h-12 bg-accent text-white rounded-lg font-bold flex items-center gap-2 hover:bg-accent/90 transition-all">
                Next Step
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid lg:grid-cols-[1fr,350px] gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-accent">
              <Clock size={20} />
              <h3 className="font-bold">Recent Submissions</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { title: 'Summer Internship Program', id: 'APP-40921', date: 'Apr 12, 2024', status: 'Approved', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: <CheckCircle2 className="text-emerald-400" /> },
                { title: 'PhD Research Assistantship', id: 'APP-41225', date: 'May 05, 2024', status: 'Under Review', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', icon: <Clock className="text-blue-400" /> },
                { title: 'Conference Travel Grant', id: 'APP-39882', date: 'Feb 28, 2024', status: 'Rejected', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20', icon: <XCircle className="text-rose-400" /> },
              ].map((sub, idx) => (
                <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="size-10 bg-slate-800 rounded-lg flex items-center justify-center">
                      {sub.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{sub.title}</h4>
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">ID: {sub.id} • Submitted {sub.date}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${sub.color}`}>
                    {sub.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-accent rounded-2xl p-6 text-white space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 opacity-10">
                <MessageSquare size={120} />
              </div>
              <h3 className="text-xl font-bold">Need Assistance?</h3>
              <p className="text-white/60 text-sm">Our institutional advisors are available to guide you through the application workflow.</p>
              <button className="w-full h-12 bg-white text-accent rounded-lg font-bold hover:bg-white/90 transition-all">
                Live Chat Support
              </button>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-rose-400">
                <AlertTriangle size={18} />
                <h4 className="font-bold">Important Deadlines</h4>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Main Application', date: 'June 30' },
                  { label: 'Document Uploads', date: 'July 05' },
                  { label: 'Referee Letters', date: 'July 12' },
                ].map((d, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">{d.label}</span>
                    <span className="text-white font-black">{d.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Pre-Eligibility Status */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center gap-3">
            <Sparkles className="text-accent" size={20} />
            <h3 className="font-bold text-white">AI Pre-Eligibility Status</h3>
          </div>
          <div className="p-8 space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: 'GPA Threshold', value: '3.8 / 4.0', status: 'success' },
                { label: 'Prerequisites', value: '12/12 Credits', status: 'success' },
                { label: 'Residency Status', value: 'Verified', status: 'success' },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-800/50 p-6 rounded-xl border border-slate-800 flex flex-col gap-4">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-black text-white">{item.value}</span>
                    <CheckCircle2 className="text-emerald-400" size={20} />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 flex items-start gap-4">
              <div className="size-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
                <Info size={18} />
              </div>
              <p className="text-sm text-blue-100 font-medium leading-relaxed">
                <span className="font-bold">AI Analysis Complete:</span> Based on the information provided, you meet all primary eligibility criteria for the 2024 Research Fellowship. Final determination will be made by the faculty review board.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-slate-500">
            <Building2 size={16} />
            <span className="text-xs">© 2024 Institutional Program Portal. All Rights Reserved.</span>
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
