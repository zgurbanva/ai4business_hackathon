import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Users,
  FileText,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MoreVertical,
  Search,
  Zap,
  Eye,
  RefreshCw,
  ShieldAlert,
  Terminal,
  Database
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const auditLogs = [
  { id: 'LOG-001', user: 'admin_user', action: 'RBAC Policy Update', target: 'IT Registry', timestamp: '2024-02-21 10:15:30', status: 'Success' },
  { id: 'LOG-002', user: 'investor_42', action: 'MFA Login', target: 'Investment Portal', timestamp: '2024-02-21 10:12:45', status: 'Success' },
  { id: 'LOG-003', user: 'system_bot', action: 'Data Encryption Sync', target: 'Startup DB', timestamp: '2024-02-21 10:05:00', status: 'Success' },
  { id: 'LOG-004', user: 'unknown_ip', action: 'Failed Login Attempt', target: 'Admin Portal', timestamp: '2024-02-21 09:58:12', status: 'Blocked' },
  { id: 'LOG-005', user: 'founder_x', action: 'Startup ID Generation', target: 'Registry', timestamp: '2024-02-21 09:45:22', status: 'Success' },
];

const incidents = [
  { id: 'INC-204', type: 'Brute Force Attempt', severity: 'Medium', status: 'Mitigated', time: '2h ago' },
  { id: 'INC-203', type: 'Unauthorized API Access', severity: 'High', status: 'Under Investigation', time: '5h ago' },
  { id: 'INC-202', type: 'Database Latency Spike', severity: 'Low', status: 'Resolved', time: '1d ago' },
];

import Header from '../components/Header';

export default function SecurityPortal() {
  const [activeTab, setActiveTab] = useState<'overview' | 'rbac' | 'audit' | 'incidents'>('overview');

  return (
    <div className="min-h-screen bg-background-dark flex flex-col text-slate-100">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full p-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 border-b border-slate-800">
          {[
            { id: 'overview', label: 'Security Overview', icon: <Shield size={16} /> },
            { id: 'rbac', label: 'Access Control (RBAC)', icon: <Users size={16} /> },
            { id: 'audit', label: 'Audit Logs', icon: <FileText size={16} /> },
            { id: 'incidents', label: 'Incident Management', icon: <ShieldAlert size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 pb-4 px-2 text-sm font-bold transition-all relative ${activeTab === tab.id
                  ? 'text-accent'
                  : 'text-slate-500 hover:text-slate-300'
                }`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
              )}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Security Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Encryption Status', value: 'AES-256', icon: <Lock className="text-emerald-400" />, sub: 'In-transit & At-rest' },
                { label: 'Active Sessions', value: '142', icon: <Users className="text-blue-400" />, sub: 'All MFA Verified' },
                { label: 'Threats Blocked', value: '1,204', icon: <ShieldAlert className="text-rose-400" />, sub: 'Last 24 Hours' },
                { label: 'Compliance Score', value: '99.8%', icon: <CheckCircle2 className="text-accent" />, sub: 'ISO 27001 Ready' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="size-10 bg-slate-800 rounded-lg flex items-center justify-center">
                      {stat.icon}
                    </div>
                  </div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                  <h4 className="text-2xl font-black text-white">{stat.value}</h4>
                  <p className="text-[10px] text-slate-500 font-bold mt-2">{stat.sub}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Encryption & Data Protection */}
              <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 space-y-6">
                <div className="flex items-center gap-3">
                  <Database className="text-accent" size={24} />
                  <h3 className="text-xl font-bold text-white">Data Protection Layer</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Lock className="text-emerald-400" size={18} />
                      <span className="text-sm font-bold">End-to-End Encryption</span>
                    </div>
                    <span className="text-[10px] font-black text-emerald-400 uppercase bg-emerald-500/10 px-2 py-1 rounded">Active</span>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <RefreshCw className="text-blue-400" size={18} />
                      <span className="text-sm font-bold">Automated Backups</span>
                    </div>
                    <span className="text-[10px] font-black text-blue-400 uppercase bg-blue-500/10 px-2 py-1 rounded">Every 15m</span>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Terminal className="text-accent" size={18} />
                      <span className="text-sm font-bold">Secure API Gateways</span>
                    </div>
                    <span className="text-[10px] font-black text-accent uppercase bg-accent/10 px-2 py-1 rounded">TLS 1.3</span>
                  </div>
                </div>
              </div>

              {/* Authentication & MFA */}
              <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 space-y-6">
                <div className="flex items-center gap-3">
                  <Zap className="text-amber-400" size={24} />
                  <h3 className="text-xl font-bold text-white">Secure Authentication</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-3">
                    <div className="size-12 bg-accent/10 rounded-full flex items-center justify-center text-accent mx-auto">
                      <Shield size={24} />
                    </div>
                    <h4 className="font-bold text-white">MFA Enabled</h4>
                    <p className="text-[10px] text-slate-500">Required for all institutional accounts.</p>
                  </div>
                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-3">
                    <div className="size-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mx-auto">
                      <RefreshCw size={24} />
                    </div>
                    <h4 className="font-bold text-white">OAuth 2.0</h4>
                    <p className="text-[10px] text-slate-500">Secure third-party integration protocol.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rbac' && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden animate-in fade-in duration-500">
            <div className="p-8 border-b border-slate-800">
              <h3 className="text-xl font-bold text-white">Role-Based Access Control (RBAC)</h3>
              <p className="text-sm text-slate-400 mt-1">Define granular permissions for different user entities.</p>
            </div>
            <div className="p-8 grid md:grid-cols-3 gap-8">
              {[
                { role: 'Gov Admin', permissions: ['Full System Access', 'Registry Management', 'KPI Analytics', 'Audit Log View'], color: 'text-accent' },
                { role: 'Institutional Investor', permissions: ['Startup Profile View', 'Investment Execution', 'Market Analysis', 'Portfolio Tracking'], color: 'text-blue-400' },
                { role: 'Startup Founder', permissions: ['Profile Management', 'Program Application', 'Resource Access', 'Success Diagnostics'], color: 'text-emerald-400' },
              ].map((r, idx) => (
                <div key={idx} className="space-y-6 p-6 bg-slate-950 rounded-2xl border border-slate-800">
                  <h4 className={`text-lg font-black ${r.color}`}>{r.role}</h4>
                  <ul className="space-y-3">
                    {r.permissions.map((p, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-3 text-xs font-medium text-slate-400">
                        <CheckCircle2 size={14} className="text-slate-600" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-2 bg-slate-900 border border-slate-800 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all">
                    Edit Permissions
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden animate-in fade-in duration-500">
            <div className="p-8 border-b border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white">System Audit Logs</h3>
                <p className="text-sm text-slate-400 mt-1">Immutable record of all critical system actions.</p>
              </div>
              <div className="flex gap-3">
                <button className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all">
                  <RefreshCw size={18} />
                </button>
                <button className="px-4 py-2 bg-accent text-white rounded-lg text-xs font-bold">Export Logs</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/50">
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Log ID</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">User</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Action</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Target</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Timestamp</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-[10px] text-slate-500">{log.id}</td>
                      <td className="px-6 py-4 text-xs font-bold text-white">{log.user}</td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-400">{log.action}</td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-500">{log.target}</td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-500">{log.timestamp}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${log.status === 'Success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                          }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'incidents' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid lg:grid-cols-[1fr,400px] gap-8">
              <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
                <div className="p-8 border-b border-slate-800">
                  <h3 className="text-xl font-bold text-white">Active Incidents</h3>
                  <p className="text-sm text-slate-400 mt-1">Real-time threat monitoring and response.</p>
                </div>
                <div className="p-8 space-y-4">
                  {incidents.map((inc) => (
                    <div key={inc.id} className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between group hover:border-accent/50 transition-all">
                      <div className="flex items-center gap-4">
                        <div className={`size-12 rounded-xl flex items-center justify-center ${inc.severity === 'High' ? 'bg-rose-500/10 text-rose-500' :
                            inc.severity === 'Medium' ? 'bg-amber-500/10 text-amber-500' :
                              'bg-blue-500/10 text-blue-500'
                          }`}>
                          <AlertTriangle size={24} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h4 className="font-bold text-white">{inc.type}</h4>
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${inc.severity === 'High' ? 'bg-rose-500 text-white' :
                                inc.severity === 'Medium' ? 'bg-amber-500 text-white' :
                                  'bg-blue-500 text-white'
                              }`}>
                              {inc.severity}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{inc.id} • Detected {inc.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-slate-500 uppercase">Status</p>
                          <p className="text-xs font-bold text-white">{inc.status}</p>
                        </div>
                        <button className="p-2 text-slate-500 hover:text-white transition-all">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-accent rounded-3xl p-8 text-white space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute -bottom-4 -right-4 opacity-10">
                  <ShieldAlert size={120} />
                </div>
                <h3 className="text-2xl font-black">Incident Response Protocol</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Our automated response system triggers isolation protocols within 50ms of a high-severity threat detection.
                </p>
                <div className="space-y-4 pt-4">
                  <button className="w-full h-14 bg-white text-accent rounded-xl font-black flex items-center justify-center gap-3 hover:bg-white/90 transition-all">
                    <Zap size={20} />
                    Trigger System Lockdown
                  </button>
                  <button className="w-full h-14 bg-accent-dark border border-white/20 text-white rounded-xl font-black flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
                    <Terminal size={20} />
                    Open Security Console
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="py-12 border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-slate-500">
            <Shield size={16} />
            <span className="text-xs">© 2024 National Cyber Security Command. All Rights Reserved.</span>
          </div>
          <nav className="flex gap-8 text-xs font-bold text-slate-600">
            <a href="#" className="hover:text-accent transition-colors">Incident Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Data Protection</a>
            <a href="#" className="hover:text-accent transition-colors">Compliance Audit</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
