import React, { useState } from 'react';
import { ArrowLeftRight, Heart, Users, ShieldAlert, Sparkles, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

export default function About() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "Is SkillSwap completely free?",
      a: "Yes! SkillSwap is built on the principle of direct reciprocity. You trade the knowledge you have for the knowledge you want, so no money is ever exchanged. All booking links and messaging tools are entirely free."
    },
    {
      q: "How does the matching engine work?",
      a: "Our engine uses a dual-reciprocity model. If you offer React and want Python, it will search for students who want React and offer Python, calculating a 100% match. Partial matches are also recommended if there is overlap."
    },
    {
      q: "Can I swap skills if I'm a complete beginner?",
      a: "Absolutely! Many students look for beginners to teach because teaching helps reinforce their own concepts. You can mark your experience level as 'Beginner' in your profile settings."
    },
    {
      q: "How do we meet for the actual session?",
      a: "Once a booking slot is accepted by both students, a Google Meet meeting link is automatically generated and displayed on your Dashboard. You can join the room at the scheduled time."
    },
    {
      q: "How does the XP and leveling system work?",
      a: "You earn XP by updating your profile (+15 XP), sending messages (+5 XP), accepting bookings (+20 XP), and completing sessions (+50 XP). Getting enough XP level-ups your profile and rewards you with badges."
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-16 text-left">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles size={12} /> Our Mission
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
          Overcoming constraints to <span className="text-gradient">unlock knowledge</span>
        </h1>
        <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          Traditional tutoring and online certifications are expensive. SkillSwap was founded by students, for students, to foster a community where direct knowledge exchange replaces monetary paywalls.
        </p>
      </div>

      {/* Core Values / Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="glass-card rounded-2xl p-6 border border-white/5">
          <div className="w-10 h-10 bg-indigo-500/15 rounded-xl flex items-center justify-center text-indigo-400 mb-4 border border-indigo-500/20">
            <Users size={18} />
          </div>
          <h3 className="font-display font-semibold text-white text-base">Community Networking</h3>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            Connect with peers at your own university and global institutions to build high-quality portfolios and network.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/5">
          <div className="w-10 h-10 bg-pink-500/15 rounded-xl flex items-center justify-center text-pink-400 mb-4 border border-pink-500/20">
            <ArrowLeftRight size={18} />
          </div>
          <h3 className="font-display font-semibold text-white text-base">Mutual Empowerment</h3>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            By teaching others, you solidify your own understanding. Skill exchange is a double-sided catalyst for growth.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-white/5">
          <div className="w-10 h-10 bg-emerald-500/15 rounded-xl flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/20">
            <BookOpen size={18} />
          </div>
          <h3 className="font-display font-semibold text-white text-base">Diverse Directory</h3>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            Discover a wide variety of subjects, including frontend, backend, photography, languages, and interview skills.
          </p>
        </div>
      </div>

      {/* Workflow Map */}
      <div className="glass-card rounded-3xl p-8 border border-white/5 mb-20">
        <h2 className="font-display font-bold text-2xl text-white mb-8 text-center">Step-by-Step Platform Workflow</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-white mb-3 shadow-lg shadow-indigo-600/30">1</div>
            <h4 className="font-semibold text-white text-sm">Register Account</h4>
            <p className="text-[11px] text-slate-400 mt-1 max-w-[150px]">Create an account using your verified student email.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-white mb-3 shadow-lg shadow-indigo-600/30">2</div>
            <h4 className="font-semibold text-white text-sm">Specify Skills</h4>
            <p className="text-[11px] text-slate-400 mt-1 max-w-[150px]">Fill in what you offer and what you are looking to learn.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-white mb-3 shadow-lg shadow-indigo-600/30">3</div>
            <h4 className="font-semibold text-white text-sm">Find Matches</h4>
            <p className="text-[11px] text-slate-400 mt-1 max-w-[150px]">Discover optimal user profiles using our filters.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-white mb-3 shadow-lg shadow-indigo-600/30">4</div>
            <h4 className="font-semibold text-white text-sm">Connect & Meet</h4>
            <p className="text-[11px] text-slate-400 mt-1 max-w-[150px]">Chat, arrange booking times, and meet in virtual rooms.</p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display font-bold text-2xl text-white text-center mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="glass-card rounded-xl border border-white/5 overflow-hidden transition-all duration-200"
            >
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-white hover:bg-white/5 transition-colors font-medium text-sm sm:text-base text-left"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp size={16} className="text-indigo-400" /> : <ChevronDown size={16} className="text-slate-400" />}
              </button>
              
              {openFaq === idx && (
                <div className="px-6 pb-5 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/5">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
