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
  UserCheck, 
  Settings,
  CheckCircle2,
  FileText,
  Database,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function SecureLogin() {
  return (
    <div className="min-h-screen bg-background-dark flex flex-col text-slate-100">
      {/* Header */}
      <header className="h-20 bg-slate-900 border-b border-slate-800 px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-accent p-2 rounded-lg text-white">
            <Shield size={28} />
          </div>
          <div>
            <h1 className="font-black text-xl leading-none text-white">Institutional Gateway</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Security Level: Alpha-7</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-12">
          <a href="#" className="text-sm font-bold text-slate-400 hover:text-accent transition-colors">Security Policy</a>
          <a href="#" className="text-sm font-bold text-slate-400 hover:text-accent transition-colors">Audit Logs</a>
          <a href="#" className="text-sm font-bold text-slate-400 hover:text-accent transition-colors">Compliance</a>
        </nav>
        <div className="flex items-center gap-6">
          <div className="bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 flex items-center gap-2">
            <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            System Secure
          </div>
          <div className="size-10 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
            <img src="https://picsum.photos/seed/secure/100/100" alt="User" referrerPolicy="no-referrer" />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-8 grid lg:grid-cols-[1fr,450px] gap-12 items-center">
        {/* Entity Selection Section */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-5xl font-black text-white tracking-tight">Enterprise Access Management</h2>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              Secure multi-role environment for verified institutional partners. Manage assets, review compliance, and monitor infrastructure with military-grade encryption.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Startup Entity', desc: 'Financial reporting, pitch deck encryption, and capital management dashboard.', icon: <Rocket />, level: 'Level 1', tags: ['Fundraising', 'Data Room'] },
              { title: 'Institutional Investor', desc: 'Cross-portfolio analytics, deep-dive due diligence, and capital call automation.', icon: <Building2 />, level: 'Level 2', tags: ['Analytics', 'Compliance'] },
              { title: 'Government Officer', desc: 'Regulatory oversight, audit visibility, and tax compliance verification portal.', icon: <UserCheck />, level: 'Level 3', tags: ['Regulatory', 'Audit'] },
              { title: 'System Admin', desc: 'User provisioning, security policy enforcement, and global system health logs.', icon: <Settings />, level: 'Level 4', tags: ['Full Access', 'Config'] },
            ].map((entity, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="size-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                    {entity.icon}
                  </div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{entity.level}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{entity.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">{entity.desc}</p>
                <div className="flex gap-2">
                  {entity.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-3 py-1 bg-slate-800 text-slate-500 rounded-full text-[10px] font-bold uppercase border border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800">
            {[
              { label: 'AES-256 Encrypted', desc: 'Data at rest & transit', icon: <Shield /> },
              { label: 'Audit Logs', desc: 'Immutable trace records', icon: <FileText /> },
              { label: 'Secure Infra', desc: 'Tier-4 Data Centers', icon: <Database /> },
            ].map((feat, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="size-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-500">
                  {feat.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{feat.label}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Login Form Section */}
        <div className="space-y-8">
          <div className="bg-accent rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Lock size={120} />
            </div>
            
            <div className="relative z-10 space-y-8">
              <div>
                <h3 className="text-3xl font-black mb-2">Secure Login</h3>
                <p className="text-white/60 text-sm">Identity Verification Required</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60">
                    <Mail size={12} />
                    Institutional Email
                  </div>
                  <input 
                    type="email" 
                    placeholder="name@organization.gov"
                    className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-white outline-none focus:ring-2 focus:ring-white/30 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60">
                      <Lock size={12} />
                      Security Password
                    </div>
                    <button className="text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors">Forgot?</button>
                  </div>
                  <div className="relative">
                    <input 
                      type="password" 
                      defaultValue="••••••••••••"
                      className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-white outline-none focus:ring-2 focus:ring-white/30 transition-all"
                    />
                    <Eye className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 cursor-pointer" size={18} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60">
                    <Shield size={12} />
                    MFA Verification Code
                  </div>
                  <div className="flex justify-between gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <input 
                        key={i}
                        type="text" 
                        maxLength={1}
                        className="size-12 bg-white/5 border border-white/10 rounded-xl text-center text-xl font-black text-white outline-none focus:ring-2 focus:ring-white/30 transition-all"
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-white/40 text-center font-medium">Enter the 6-digit code from your authenticator app.</p>
                </div>

                <button className="w-full h-16 bg-white text-accent rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-white/90 transition-all shadow-xl shadow-black/20">
                  Authenticate & Enter
                  <ArrowRight size={20} />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  Encryption: TLS 1.3 / RSA 4096-BIT
                </div>
              </div>
            </div>
          </div>

          {/* Activity Logs */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-white">Recent Activity Logs</h4>
              <div className="size-2 rounded-full bg-slate-800" />
            </div>
            <div className="space-y-4">
              {[
                { time: '2023-11-24 14:22:01', event: 'SUCCESS_LOGIN [IP: 192.168.1.1]', color: 'text-emerald-500' },
                { time: '2023-11-24 12:45:18', event: 'MFA_REQUEST_SENT [UID: 982]', color: 'text-slate-500' },
                { time: '2023-11-24 09:12:44', event: 'SESSION_TIMEOUT [IP: 45.12.8.22]', color: 'text-rose-500' },
              ].map((log, idx) => (
                <div key={idx} className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-slate-500">{log.time}</span>
                  <span className={`font-bold ${log.color}`}>{log.event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-slate-500">
            <AlertCircle size={16} />
            <span className="text-xs">© 2024 Institutional Access Gateway. All rights reserved. Managed by Secure Global Infrastructure.</span>
          </div>
          <nav className="flex gap-8 text-xs font-bold text-slate-600">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="text-rose-500 font-black flex items-center gap-2">
              <AlertCircle size={14} />
              Report Vulnerability
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
