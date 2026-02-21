/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Rocket, 
  Compass, 
  Activity, 
  Fingerprint, 
  BrainCircuit, 
  Wallet, 
  LayoutDashboard, 
  ShieldCheck, 
  Menu, 
  Bot,
  Share2,
  Mail,
  Globe,
  MapPin,
  Phone,
  Shield,
  Languages
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background-dark text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-accent p-1.5 rounded-lg text-white">
                <Bot size={24} />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white uppercase">
                Innovation <span className="text-accent">Azerbaijan</span>
              </span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/admin" className="text-sm font-semibold text-slate-300 hover:text-accent transition-colors">Ecosystem</Link>
              <Link to="/investor" className="text-sm font-semibold text-slate-300 hover:text-accent transition-colors">Analytics</Link>
              <Link to="/program" className="text-sm font-semibold text-slate-300 hover:text-accent transition-colors">Resources</Link>
              <div className="h-4 w-px bg-slate-700"></div>
              <Link to="/login" className="text-sm font-semibold text-accent hover:opacity-80 transition-opacity">Login</Link>
              <Link to="/register" className="bg-accent text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-accent/90 transition-all shadow-sm">
                Register Startup
              </Link>
            </nav>
            
            <div className="md:hidden">
              <Menu className="text-accent" size={28} />
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[700px] flex items-center overflow-hidden ai-network-bg py-24 px-4">
          <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, #573f9d 0%, transparent 70%)' }}></div>
          
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col gap-10 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 text-white px-5 py-2 rounded-full w-fit mx-auto lg:mx-0 border border-white/20 backdrop-blur-sm">
                <Activity size={14} className="animate-pulse text-accent" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase">National Innovation Strategy 2026</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
                The Future of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">Azerbaijan's</span> <br />
                <span className="text-accent">Innovation</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                AI-Powered Startup Registry, Investment Intelligence & Ecosystem Analytics for the next generation of founders.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Link to="/register" className="bg-accent text-white h-16 px-10 rounded-xl font-black text-lg hover:scale-105 transition-all shadow-2xl shadow-accent/40 flex items-center justify-center gap-3">
                  Register Startup
                  <Rocket size={22} />
                </Link>
                <Link to="/admin" className="bg-white/10 text-white border border-white/20 backdrop-blur-md h-16 px-10 rounded-xl font-black text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3">
                  Explore Ecosystem
                  <Compass size={22} />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Activity size={120} className="text-accent" />
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                    <Activity className="text-accent" size={24} />
                    Real-time Ecosystem Health
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <div className="flex justify-between text-xs text-slate-400 mb-2 font-bold uppercase tracking-wider">
                        <span>Growth Velocity</span>
                        <span className="text-accent">84%</span>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '84%' }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-accent"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <div className="flex justify-between text-xs text-slate-400 mb-2 font-bold uppercase tracking-wider">
                        <span>AI Integration Score</span>
                        <span className="text-accent">62%</span>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '62%' }}
                          transition={{ duration: 1, delay: 0.7 }}
                          className="h-full bg-accent"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <div className="flex justify-between text-xs text-slate-400 mb-2 font-bold uppercase tracking-wider">
                        <span>Funding Liquidity</span>
                        <span className="text-accent">75%</span>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '75%' }}
                          transition={{ duration: 1, delay: 0.9 }}
                          className="h-full bg-accent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-[100px]"></div>
            </motion.div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-12 bg-slate-900 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Total Startups', value: '500+' },
                { label: 'Total Funding', value: '$20M+' },
                { label: 'Active Programs', value: '45' },
                { label: 'Registered Investors', value: '120+' },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center md:items-start p-4 border-l-4 border-accent">
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                  <h4 className="text-4xl font-black text-white">{stat.value}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-background-dark px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
              <h2 className="text-white text-3xl md:text-5xl font-black tracking-tight">Institutional Innovation Tools</h2>
              <p className="text-slate-400 text-lg">
                Empowering the Azerbaijani ecosystem with state-of-the-art AI integration and secure institutional-grade data management.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Fingerprint size={32} />,
                  title: 'Startup ID & Registry',
                  desc: 'A digital passport for companies to streamline government interactions, tax incentives, and grant applications.'
                },
                {
                  icon: <BrainCircuit size={32} />,
                  title: 'AI Success Prediction',
                  desc: 'Advanced algorithmic scoring to identify high-potential ventures automatically based on market trends and performance data.'
                },
                {
                  icon: <Wallet size={32} />,
                  title: 'Investment Module',
                  desc: 'A secure, transparent portal for global venture capital firms and local angel investor matching and due diligence.'
                },
                {
                  icon: <LayoutDashboard size={32} />,
                  title: 'KPI Dashboard',
                  desc: 'Real-time tracking of national innovation metrics, job creation, and sector-specific growth for policy makers.'
                },
                {
                  icon: <ShieldCheck size={32} />,
                  title: 'Secure Infrastructure',
                  desc: 'Institutional-grade security and data residency protocols ensuring the safety of sensitive national ecosystem data.'
                }
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-slate-900 p-8 rounded-xl border border-slate-800 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="size-14 bg-accent/10 rounded-lg flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-all">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
              
              {/* Secondary CTA Card */}
              <div className="bg-accent p-8 rounded-xl border border-accent flex flex-col justify-center items-center text-center group">
                <h3 className="text-xl font-bold text-white mb-4">Ready to Innovate?</h3>
                <Link to="/register" className="bg-white text-accent px-8 py-3 rounded-lg font-bold hover:scale-105 transition-all">
                  Start Journey Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Join CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto bg-slate-900 rounded-2xl overflow-hidden relative shadow-2xl border border-slate-800">
            <div 
              className="absolute inset-0 opacity-10" 
              style={{ 
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsKv6JaVqjksoA2mBhDaip6a4fKIbIi6cEOc3417qpELj8tuZ6mhMN2JqMV4qDvKINZLhnJGAbMOMwReUoIEIcZn6cqXsTb2wwDNnQZ7ut9IEMne0K8HtBS4bzQ6V29EURfssJya79P_5HngkG6rjUY1Ckox6bQ_LoGMoT7yXrrprtDY4mFFcj9Ve2Kk7xbwRiIgBIlX3ZNbVM0egH0hTcp7c_m4ZYaz7oFDRw6nuTQS83fnJXQHkqRIRCq70pa1cfK2Ip1VQeKO8W")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
            <div className="relative z-10 p-12 text-center flex flex-col items-center gap-6">
              <h2 className="text-3xl md:text-4xl font-black text-white">Join Azerbaijan's Digital Transformation</h2>
              <p className="text-slate-400 text-lg max-w-2xl">
                Whether you're a first-time founder or a seasoned investor, our platform provides the intelligence and tools you need to succeed.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/register" className="bg-accent text-white px-8 py-4 rounded-lg font-bold hover:scale-105 transition-transform">For Startups</Link>
                <Link to="/investor" className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-lg font-bold hover:bg-white/20 transition-all">For Investors</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-4 border-t border-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 text-white">
                <Bot size={24} />
                <span className="text-xl font-extrabold tracking-tight uppercase">Innovation <span className="text-accent">AZ</span></span>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                The National AI-Powered Innovation Management Platform is an initiative of the Republic of Azerbaijan to foster a world-class startup ecosystem.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors"><Share2 size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors"><Mail size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors"><Globe size={20} /></a>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">Platform</h4>
              <nav className="flex flex-col gap-2">
                <a href="#" className="hover:text-accent transition-colors">Ecosystem Map</a>
                <a href="#" className="hover:text-accent transition-colors">Startup Directory</a>
                <a href="#" className="hover:text-accent transition-colors">Analytics Portal</a>
                <a href="#" className="hover:text-accent transition-colors">Resource Center</a>
              </nav>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">Institutional</h4>
              <nav className="flex flex-col gap-2">
                <a href="#" className="hover:text-accent transition-colors">About Us</a>
                <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-accent transition-colors">Security Standards</a>
                <a href="#" className="hover:text-accent transition-colors">API Integration</a>
              </nav>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">Contact</h4>
              <div className="flex items-start gap-3">
                <MapPin className="text-accent shrink-0" size={20} />
                <p className="text-sm">Baku, Azerbaijan<br />Innovation Zone, White City</p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-accent shrink-0" size={20} />
                <p className="text-sm">support@innovation.az</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-accent shrink-0" size={20} />
                <p className="text-sm">+994 (12) 555-0123</p>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-slate-500">© 2024 Innovation Management Platform. All Rights Reserved.</p>
            <div className="flex gap-8">
              <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                <Shield size={18} />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Secure Gov Platform</span>
              </div>
              <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                <Languages size={18} />
                <span className="text-[10px] font-bold uppercase tracking-tighter">EU Standards</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
