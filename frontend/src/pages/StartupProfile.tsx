import {
  Building2,
  Search,
  MapPin,
  TrendingUp,
  Users,
  Activity,
  Clock,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  ArrowUpRight,
  Share2,
  ChevronRight,
  Rocket,
  ShieldAlert,
  Mail,
  Zap,
  X,
  CreditCard,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';

import startupService, { Startup } from '../services/startup';
import investorService from '../services/investor';
import { useEffect, useState } from 'react';

export default function StartupProfile() {
  const { id } = useParams<{ id: string }>();
  const [startup, setStartup] = useState<Startup | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [investmentNote, setInvestmentNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;
      try {
        const data = await startupService.getProfile(id);
        setStartup(data);
      } catch (err) {
        console.error('Failed to fetch profile', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  const handleInvest = async () => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      await investorService.markInterest(id, investmentNote);
      alert('Interest successfully registered!');
      setShowInvestModal(false);
    } catch (err) {
      console.error('Failed to mark interest', err);
      alert('You have already expressed interest or there was an error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scoreData = [
    { name: 'Score', value: startup?.latest_success_score || 0, color: '#6366f1' },
    { name: 'Remaining', value: 100 - (startup?.latest_success_score || 0), color: '#1e293b' },
  ];

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
        <Link to="/investor" className="hover:text-white transition-colors">Portfolio</Link>
        <ChevronRight size={14} />
        <span className="text-slate-400">Startup Profile</span>
      </div>

      <div className="grid lg:grid-cols-[300px,1fr] gap-8">
        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-sm space-y-8">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="size-8 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="size-24 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700">
                    <div className="size-16 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                      <Rocket size={32} />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-black text-white uppercase tracking-tight">{startup?.name}</h1>
                    <p className="text-[10px] font-black text-accent uppercase tracking-widest mt-1 bg-accent/10 px-2 py-0.5 rounded inline-block">{startup?.startup_id_code}</p>
                  </div>
                </div>

                <div className="space-y-6 border-t border-slate-800 pt-6">
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Sector</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
                      <ShieldAlert size={16} className="text-slate-500" />
                      {startup?.sector}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Stage</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
                      <Rocket size={16} className="text-slate-500" />
                      {startup?.stage}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Location</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
                      <MapPin size={16} className="text-slate-500" />
                      {startup?.city || 'Baku'}
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="space-y-3">
              <button
                onClick={() => setShowInvestModal(true)}
                className="w-full h-14 bg-accent text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-accent/90 transition-all shadow-xl shadow-accent/20"
              >
                <Zap size={20} />
                Invest in Startup
              </button>
              <button className="w-full h-12 bg-slate-800 text-slate-300 border border-slate-700 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-slate-700 transition-all">
                <Mail size={18} />
                Contact Founder
              </button>
            </div>
          </div>

          <div className="bg-accent rounded-2xl p-8 text-white space-y-4 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
            <div className="relative z-10">
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-2">Investment Status</p>
              <h3 className="text-3xl font-black">$2.5M Committed</h3>
              <p className="text-xs text-white/50 mt-1">Lead investor: Peak Ventures</p>
            </div>
            <div className="absolute bottom-4 right-4 text-white/10 rotate-12">
              <TrendingUp size={80} />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="space-y-8">
          {/* Top Row: Success Score & Key Metrics */}
          <div className="grid md:grid-cols-[1.2fr,1fr,1fr] gap-6">
            {/* Success Score Gauge */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-sm flex flex-col items-center justify-center relative min-h-[300px]">
              <h3 className="text-md font-bold text-white absolute top-8 left-8">Success Score</h3>
              <div className="size-48 relative mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={scoreData.map(d => ({ ...d, color: d.name === 'Score' ? '#573f9d' : '#1e293b' }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={0}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                      stroke="none"
                    >
                      {scoreData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.name === 'Score' ? '#573f9d' : '#1e293b'} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black text-white">{(startup?.latest_success_score || 0).toFixed(0)}</span>
                  <span className="text-[12px] font-bold text-slate-500 uppercase">/100</span>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-emerald-400 font-bold text-sm">
                <TrendingUp size={16} />
                +4.2% from last quarter
              </div>
            </div>

            {/* Metrics Pair 1 */}
            <div className="grid grid-rows-2 gap-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm flex items-start gap-5">
                <div className="size-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">User Growth</p>
                  <h4 className="text-3xl font-black text-white">124k</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Active Monthly Users</p>
                </div>
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm flex items-start gap-5">
                <div className="size-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400">
                  <Building2 size={24} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Burn Rate</p>
                  <h4 className="text-3xl font-black text-white">$180k</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Monthly Average</p>
                </div>
              </div>
            </div>

            {/* Metrics Pair 2 */}
            <div className="grid grid-rows-2 gap-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm flex items-start gap-5">
                <div className="size-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                  <Zap size={24} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Retention</p>
                  <h4 className="text-3xl font-black text-white">82%</h4>
                  <p className="text-[11px] text-slate-500 font-medium">LTM Average</p>
                </div>
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm flex items-start gap-5">
                <div className="size-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400">
                  <Activity size={24} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Runway</p>
                  <h4 className="text-3xl font-black text-white">18 Mo</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Estimated Duration</p>
                </div>
              </div>
            </div>
          </div>

          {/* SWOT Analysis Section */}
          <div className="bg-slate-900 rounded-[2rem] border border-slate-800 shadow-sm overflow-hidden min-h-[480px] flex flex-col">
            <div className="p-6 border-b border-slate-800 flex items-center gap-3">
              <ShieldAlert className="text-accent" size={24} />
              <h3 className="font-black text-white text-lg">SWOT Analysis</h3>
            </div>
            <div className="flex-1 grid md:grid-cols-2 divide-x divide-y divide-slate-800">
              {/* Strengths */}
              <div className="p-10 space-y-6">
                <div className="flex items-center gap-2.5 text-emerald-400">
                  <CheckCircle2 size={24} />
                  <h4 className="font-black text-lg">Strengths</h4>
                </div>
                <ul className="space-y-4">
                  {[
                    'Proprietary AI matching algorithm with 95% accuracy.',
                    'Experienced founding team with 2 prior exits.',
                    'Exclusive partnership with major banking infrastructure.'
                  ].map((s, idx) => (
                    <li key={idx} className="text-[15px] text-slate-400 flex items-start gap-3 leading-relaxed">
                      <div className="size-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Weaknesses */}
              <div className="p-10 space-y-6">
                <div className="flex items-center gap-2.5 text-rose-400">
                  <AlertCircle size={24} />
                  <h4 className="font-black text-lg">Weaknesses</h4>
                </div>
                <ul className="space-y-4">
                  {[
                    'High customer acquisition cost in current market.',
                    'Limited international presence outside US/UK.',
                    'Dependency on third-party cloud provider AWS.'
                  ].map((w, idx) => (
                    <li key={idx} className="text-[15px] text-slate-400 flex items-start gap-3 leading-relaxed">
                      <div className="size-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Opportunities */}
              <div className="p-10 space-y-6">
                <div className="flex items-center gap-2.5 text-blue-400">
                  <Rocket size={24} />
                  <h4 className="font-black text-lg">Opportunities</h4>
                </div>
                <ul className="space-y-4">
                  {[
                    'Expansion into the LATAM fintech market in Q4.',
                    'New B2B API licensing model potential.',
                    'Increasing demand for digital-first payment rails.'
                  ].map((o, idx) => (
                    <li key={idx} className="text-[15px] text-slate-400 flex items-start gap-3 leading-relaxed">
                      <div className="size-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Threats */}
              <div className="p-10 space-y-6">
                <div className="flex items-center gap-2.5 text-orange-400">
                  <AlertTriangle size={24} />
                  <h4 className="font-black text-lg">Threats</h4>
                </div>
                <ul className="space-y-4">
                  {[
                    'Rapidly shifting regulatory environment in EU.',
                    'Entry of established players (Stripe/Adyen).',
                    'Cybersecurity risks associated with ledger scaling.'
                  ].map((t, idx) => (
                    <li key={idx} className="text-[15px] text-slate-400 flex items-start gap-3 leading-relaxed">
                      <div className="size-1.5 rounded-full bg-orange-400 mt-2 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Similar Startups */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-white text-lg">Similar Startups</h3>
              <button className="text-xs font-black text-accent hover:text-accent/80 transition-colors uppercase tracking-widest border-b border-accent/20 pb-0.5">View Benchmark Analysis</button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'QuantPay Inc.', sector: 'FINTECH | SERIES A', score: 82, color: 'bg-accent' },
                { name: 'LedgerFlow', sector: 'FINTECH | SEED', score: 65, color: 'bg-emerald-500' },
                { name: 'Neon Wealth', sector: 'FINTECH | SERIES B', score: 91, color: 'bg-accent' },
              ].map((s, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm space-y-5 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className={`size-12 ${idx === 1 ? 'bg-slate-800' : 'bg-accent/20 text-accent'} rounded-xl flex items-center justify-center text-white font-black text-sm`}>
                      {idx === 0 && <TrendingUp size={24} />}
                      {idx === 1 && <Building2 size={24} />}
                      {idx === 2 && <ShieldAlert size={24} />}
                    </div>
                    <div>
                      <h4 className="font-black text-white text-md group-hover:text-accent transition-colors">{s.name}</h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">{s.sector}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest px-0.5">
                      <span className="text-slate-500">Success Score</span>
                      <span className="text-white">{s.score}/100</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${s.color}`} style={{ width: `${s.score}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Invest Modal */}
      <AnimatePresence>
        {showInvestModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-800"
            >
              <div className="p-8 space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em] mb-1">Execution Terminal</p>
                    <h2 className="text-3xl font-black text-white tracking-tight">Invest in {startup?.name}</h2>
                  </div>
                  <button
                    onClick={() => setShowInvestModal(false)}
                    className="size-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all border border-slate-700"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-800 space-y-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Investment Note</span>
                      <span className="text-xs font-black text-accent uppercase">Tier 1 institutional</span>
                    </div>
                    <div className="relative">
                      <textarea
                        value={investmentNote}
                        onChange={(e) => setInvestmentNote(e.target.value)}
                        className="w-full bg-transparent text-lg font-bold text-white focus:outline-none placeholder:text-slate-600 min-h-[100px] resize-none"
                        placeholder="Express your interest or add a note for the founder..."
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleInvest}
                      disabled={isSubmitting}
                      className="w-full h-16 bg-accent text-white rounded-2xl font-black text-lg flex items-center justify-center gap-4 hover:bg-accent/90 transition-all shadow-xl shadow-accent/20 group disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="size-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <CreditCard size={24} className="group-hover:scale-110 transition-transform" />
                      )}
                      Confirm Interest
                    </button>
                    <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-widest px-4 leading-relaxed">
                      By clicking confirm, you agree to the <span className="text-accent underline underline-offset-2 hover:text-accent/80 cursor-pointer">Digital Subscription Agreement</span> and the <span className="text-accent underline underline-offset-2 hover:text-accent/80 cursor-pointer">Risk Disclosure terms</span>.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
