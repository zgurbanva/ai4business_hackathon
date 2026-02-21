/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  DollarSign, 
  ArrowRight, 
  BarChart3, 
  CheckCircle2, 
  HelpCircle,
  Image as ImageIcon,
  QrCode
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function StartupRegistration() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeAnalysis, setActiveAnalysis] = useState<'swot' | 'market' | 'financial'>('swot');
  const [formData, setFormData] = useState({
    name: '',
    sector: '',
    location: '',
    stage: 'Idea',
    teamSize: '',
    revenue: '',
    funding: ''
  });

  const handleRegister = () => {
    if (!formData.name) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsRegistered(true);
    }, 2000);
  };

  const renderAnalysisContent = () => {
    switch (activeAnalysis) {
      case 'market':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-slate-900">Market Fit Analysis</h4>
              <span className="text-[10px] font-bold text-emerald-500 uppercase">High Potential</span>
            </div>
            <div className="space-y-3">
              {[
                { label: 'TAM Coverage', value: '65%', color: 'bg-primary' },
                { label: 'Competitor Gap', value: '42%', color: 'bg-accent' },
                { label: 'Regulatory Alignment', value: '88%', color: 'bg-emerald-500' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                    <span>{item.label}</span>
                    <span className="text-slate-900">{item.value}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: item.value }}
                      className={`h-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 italic leading-relaxed">
              AI Insight: Your sector ({formData.sector || 'N/A'}) shows a 12% increase in regional demand over the last quarter.
            </p>
          </div>
        );
      case 'financial':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-slate-900">Financial Health</h4>
              <span className="text-[10px] font-bold text-blue-500 uppercase">Stable Runway</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Burn Rate</p>
                <p className="text-lg font-black text-slate-900">$12k/mo</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Runway</p>
                <p className="text-lg font-black text-slate-900">14 Mo</p>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-2">
                <span>Funding Efficiency</span>
                <span className="text-slate-900">72%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '72%' }}
                  className="h-full bg-blue-500"
                />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h4 className="font-bold text-slate-900">Strategic SWOT Framework</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                <p className="text-[10px] font-black text-emerald-600 uppercase mb-2">Strengths</p>
                <div className="h-1.5 w-full bg-emerald-200 rounded-full mb-1" />
                <div className="h-1.5 w-2/3 bg-emerald-200 rounded-full" />
              </div>
              <div className="bg-rose-50 p-3 rounded-lg border border-rose-100">
                <p className="text-[10px] font-black text-rose-600 uppercase mb-2">Weaknesses</p>
                <div className="h-1.5 w-full bg-rose-200 rounded-full mb-1" />
                <div className="h-1.5 w-1/2 bg-rose-200 rounded-full" />
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p className="text-[10px] font-black text-blue-600 uppercase mb-2">Opportunities</p>
                <div className="h-1.5 w-full bg-blue-200 rounded-full mb-1" />
                <div className="h-1.5 w-3/4 bg-blue-200 rounded-full" />
              </div>
              <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                <p className="text-[10px] font-black text-orange-600 uppercase mb-2">Threats</p>
                <div className="h-1.5 w-full bg-orange-200 rounded-full mb-1" />
                <div className="h-1.5 w-1/3 bg-orange-200 rounded-full" />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-8 h-16 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-accent p-1.5 rounded text-white">
            <Building2 size={20} />
          </div>
          <span className="font-bold text-white text-lg">Institutional Portal</span>
        </div>
        <nav className="flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-slate-400 hover:text-accent transition-colors">Dashboard</Link>
          <Link to="/program" className="text-sm font-medium text-slate-400 hover:text-accent transition-colors">Resources</Link>
          <a href="#" className="text-sm font-medium text-slate-400 hover:text-accent transition-colors">Support</a>
          <div className="size-8 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
            <img src="https://picsum.photos/seed/user1/100/100" alt="User" referrerPolicy="no-referrer" />
          </div>
        </nav>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-8 grid lg:grid-cols-[1fr,400px] gap-8">
        {/* Form Section */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-black text-white mb-2">
              {isRegistered ? 'Institutional Dashboard' : 'Startup Registration'}
            </h1>
            <p className="text-slate-400">
              {isRegistered 
                ? 'Manage your startup credentials and access advanced AI diagnostic tools.' 
                : 'Complete the institutional profile to unlock diagnostic analysis and resource allocation.'}
            </p>
          </motion.div>

          {!isRegistered ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-sm space-y-6"
            >
              <div className="grid gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">Startup Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Nexus Dynamics"
                    className="w-full h-12 px-4 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300">Industry Sector</label>
                    <select 
                      className="w-full h-12 px-4 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-accent outline-none"
                      onChange={(e) => setFormData({...formData, sector: e.target.value})}
                    >
                      <option value="">Select Sector</option>
                      <option value="FinTech">FinTech</option>
                      <option value="HealthTech">HealthTech</option>
                      <option value="AgriTech">AgriTech</option>
                      <option value="EdTech">EdTech</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input 
                        type="text" 
                        placeholder="HQ City, Country"
                        className="w-full h-12 pl-11 pr-4 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-accent outline-none"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-6">
                <div className="flex items-center gap-2 text-accent">
                  <BarChart3 size={20} />
                  <h3 className="font-bold">Growth & Funding Metrics</h3>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">Development Stage</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['Idea', 'MVP', 'Seed', 'Series A'].map((stage) => (
                      <button
                        key={stage}
                        onClick={() => setFormData({...formData, stage})}
                        className={`h-12 rounded-lg border font-medium transition-all ${
                          formData.stage === stage 
                          ? 'bg-accent/20 border-accent text-accent' 
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                        }`}
                      >
                        {stage}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300">Team Size</label>
                    <input 
                      type="text" 
                      placeholder="1-500"
                      className="w-full h-12 px-4 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-accent outline-none"
                      value={formData.teamSize}
                      onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300">Annual Revenue (USD)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                      <input 
                        type="text" 
                        placeholder="0.00"
                        className="w-full h-12 pl-8 pr-4 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-accent outline-none"
                        value={formData.revenue}
                        onChange={(e) => setFormData({...formData, revenue: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">Total Funding Raised</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <input 
                      type="text" 
                      placeholder="Total investment to date"
                      className="w-full h-12 pl-8 pr-4 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-accent outline-none"
                      value={formData.funding}
                      onChange={(e) => setFormData({...formData, funding: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <button 
                onClick={handleRegister}
                disabled={isAnalyzing}
                className="w-full h-14 bg-accent text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-accent/90 transition-all shadow-lg shadow-accent/10 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <div className="flex items-center gap-2">
                    <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing Institutional ID...
                  </div>
                ) : (
                  <>
                    Complete Registration & Generate ID
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl flex items-center gap-4">
                <div className="size-12 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-400">Registration Successful</h3>
                  <p className="text-sm text-emerald-500/80">Your startup is now officially registered in the national ecosystem.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { label: 'Active Grants', value: '03', icon: <DollarSign className="text-blue-400" /> },
                  { label: 'Network Connections', value: '12', icon: <Users className="text-purple-400" /> },
                  { label: 'Compliance Score', value: '98%', icon: <CheckCircle2 className="text-emerald-400" /> },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
                      {stat.icon}
                    </div>
                    <span className="text-2xl font-black text-white">{stat.value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                  <h3 className="font-bold text-white">Institutional Resource Access</h3>
                  <button className="text-xs font-bold text-accent hover:underline">View All Resources</button>
                </div>
                <div className="p-6 grid gap-4">
                  {[
                    'Tax Incentive Certification (Form 12-B)',
                    'Cloud Infrastructure Subsidy Application',
                    'Government Procurement Portal Access'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-800 hover:border-accent/40 transition-all cursor-pointer group">
                      <span className="text-sm font-medium text-slate-300 group-hover:text-accent">{item}</span>
                      <ArrowRight size={16} className="text-slate-600 group-hover:text-accent" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Preview & Analysis Section */}
        <div className="space-y-6">
          <div className="bg-accent rounded-2xl p-6 text-white overflow-hidden relative min-h-[300px]">
            <div className="absolute top-4 left-4 bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
              {isRegistered ? 'Institutional ID' : 'Live Preview'}
            </div>
            
            <div className="mt-12 space-y-6">
              <h3 className="text-xl font-bold">{isRegistered ? 'Verified Credential' : 'Registration Preview'}</h3>
              
              <div className="bg-white rounded-xl p-6 text-slate-900 shadow-2xl relative">
                {isRegistered && (
                  <div className="absolute -top-3 -right-3 bg-emerald-500 text-white p-1.5 rounded-full border-4 border-white shadow-lg">
                    <CheckCircle2 size={16} />
                  </div>
                )}
                <div className="flex justify-between items-start mb-6">
                  <div className="size-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                    <ImageIcon size={24} />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Credential ID</p>
                    <p className="text-sm font-black">AZ - ST - 0001</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-2xl font-black">{formData.name || '[Startup Name]'}</h4>
                  <p className="text-slate-500 text-sm font-medium">
                    {formData.sector || '[Sector]'} • {formData.location || '[Location]'}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                    <div className={`flex items-center gap-1.5 font-bold text-xs ${isRegistered ? 'text-emerald-500' : 'text-orange-500'}`}>
                      {!isRegistered && <div className="size-2 rounded-full bg-orange-500 animate-pulse" />}
                      {isRegistered ? 'Verified Active' : 'Pending Validation'}
                    </div>
                  </div>
                  <div className="size-10 bg-slate-50 rounded flex items-center justify-center text-slate-300">
                    <QrCode size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-white">Diagnostic Analysis</h4>
              <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase">AI Engine</span>
            </div>
            
            <div className="flex border-b border-slate-800">
              {(['swot', 'market', 'financial'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveAnalysis(tab)}
                  className={`flex-1 pb-3 text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeAnalysis === tab 
                    ? 'text-accent border-b-2 border-accent' 
                    : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="min-h-[180px]">
              {renderAnalysisContent()}
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-white text-sm">Success Probability</h4>
                <span className="text-xl font-black text-accent">
                  {formData.name ? (isRegistered ? '84%' : '72%') : '--%'}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: formData.name ? (isRegistered ? '84%' : '72%') : '0%' }}
                  className="h-full bg-accent"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 flex items-center gap-4 border border-slate-800">
            <div className="size-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
              <HelpCircle size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Need assistance?</p>
              <p className="text-xs text-slate-500">Contact Institutional Support</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t border-slate-800 text-center bg-slate-950">
        <p className="text-xs text-slate-500">© 2024 Institutional Startup Portal. All data processing compliant with standard regulatory frameworks.</p>
      </footer>
    </div>
  );
}
