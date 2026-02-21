import React from 'react';
import {
  HelpCircle,
  Search,
  MessageSquare,
  Mail,
  Phone,
  FileText,
  Shield,
  Zap,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  LifeBuoy,
  BookOpen,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: "How do I register my startup?",
    answer: "You can register your startup by clicking the 'Register Startup' button on the landing page and filling out the registration form with your company details."
  },
  {
    question: "What are the eligibility criteria for programs?",
    answer: "Eligibility varies by program. Our AI Pre-Eligibility tool on the Program Application page can help you determine if you meet the basic requirements."
  },
  {
    question: "How can I connect with investors?",
    answer: "Once registered, your profile becomes visible to verified institutional investors. You can also use the Investment Module to see market insights."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we use military-grade AES-256 encryption and multi-factor authentication to ensure all institutional data remains private and secure."
  }
];

const categories = [
  { title: 'Getting Started', icon: <Zap />, count: 12 },
  { title: 'Account & Security', icon: <Shield />, count: 8 },
  { title: 'Investment Portal', icon: <FileText />, count: 15 },
  { title: 'Program Applications', icon: <BookOpen />, count: 10 },
  { title: 'Ecosystem Analytics', icon: <Users />, count: 6 },
  { title: 'Technical Support', icon: <LifeBuoy />, count: 9 },
];

import Header from '../components/Header';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background-dark flex flex-col text-slate-100">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-8 bg-slate-950 border-b border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, #573f9d 0%, transparent 70%)' }}></div>
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h1 className="text-5xl font-black text-white tracking-tight">How can we help you?</h1>
              <p className="text-xl text-slate-400">Search our knowledge base or browse categories below.</p>
            </motion.div>

            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={24} />
              <input
                type="text"
                placeholder="Search for articles, guides, and more..."
                className="w-full h-16 pl-14 pr-6 rounded-2xl bg-slate-900 border border-slate-800 text-white text-lg outline-none focus:ring-2 focus:ring-accent shadow-2xl transition-all"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm font-bold text-slate-500 uppercase tracking-widest">
              <span>Popular:</span>
              <a href="#" className="text-accent hover:underline">Registration</a>
              <a href="#" className="text-accent hover:underline">Investment Stage</a>
              <a href="#" className="text-accent hover:underline">MFA Setup</a>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto p-8 py-16 space-y-20">
          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-accent/50 transition-all cursor-pointer group"
              >
                <div className="size-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-all">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{cat.title}</h3>
                <div className="flex justify-between items-center text-slate-500">
                  <span className="text-sm font-medium">{cat.count} Articles</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQs & Contact */}
          <div className="grid lg:grid-cols-[1fr,400px] gap-12">
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden">
                    <button className="w-full p-6 text-left flex justify-between items-center hover:bg-slate-800 transition-colors group">
                      <span className="font-bold text-white">{faq.question}</span>
                      <ChevronRight size={20} className="text-slate-600 group-hover:text-accent transition-colors" />
                    </button>
                    <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
              <button className="flex items-center gap-2 text-accent font-bold hover:underline">
                View all FAQs
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-accent rounded-3xl p-8 text-white space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute -bottom-4 -right-4 opacity-10">
                  <MessageSquare size={120} />
                </div>
                <h3 className="text-2xl font-black">Still need help?</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Our support team is available 24/7 to assist you with any institutional or technical queries.
                </p>
                <div className="space-y-4 pt-4">
                  <button className="w-full h-14 bg-white text-accent rounded-xl font-black flex items-center justify-center gap-3 hover:bg-white/90 transition-all">
                    <MessageSquare size={20} />
                    Start Live Chat
                  </button>
                  <button className="w-full h-14 bg-accent-dark border border-white/20 text-white rounded-xl font-black flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
                    <Mail size={20} />
                    Email Support
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 space-y-6">
                <h4 className="font-bold text-white">Other ways to connect</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-slate-400">
                    <div className="size-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-500">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest">Phone Support</p>
                      <p className="text-sm font-bold text-white">+994 (12) 000-00-00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-slate-400">
                    <div className="size-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-500">
                      <ExternalLink size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest">Community Forum</p>
                      <p className="text-sm font-bold text-white">forum.innovation.az</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-slate-500">
            <HelpCircle size={16} />
            <span className="text-xs">© 2024 Innovation Azerbaijan Support Center.</span>
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
