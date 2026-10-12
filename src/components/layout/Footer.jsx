import React from 'react';
import { ArrowLeftRight, Heart } from 'lucide-react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="w-full bg-slate-950/80 border-t border-white/5 py-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Column */}
        <div className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActivePage('home')}>
            <div className="bg-gradient-to-tr from-indigo-500 to-purple-600 p-1.5 rounded-lg text-white shadow-lg">
              <ArrowLeftRight size={16} />
            </div>
            <span className="font-display font-bold text-lg text-white">
              Skill<span className="text-gradient">Swap</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed text-left max-w-sm">
            Empowering students to share their expertise, expand their networks, and grow their skills collaboratively—all without the cost of expensive classes.
          </p>
        </div>

        {/* Stats Column */}
        <div className="flex flex-col items-start gap-3">
          <span className="text-sm font-semibold text-white">Platform Stats</span>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <span className="block text-lg font-bold text-gradient">2,500+</span>
              <span className="block text-[10px] text-slate-400 font-medium uppercase tracking-wider">Students Matched</span>
            </div>
            <div>
              <span className="block text-lg font-bold text-gradient">180+</span>
              <span className="block text-[10px] text-slate-400 font-medium uppercase tracking-wider">Unique Skills</span>
            </div>
            <div>
              <span className="block text-lg font-bold text-gradient">4,200+</span>
              <span className="block text-[10px] text-slate-400 font-medium uppercase tracking-wider">Sessions Booked</span>
            </div>
            <div>
              <span className="block text-lg font-bold text-gradient">98.4%</span>
              <span className="block text-[10px] text-slate-400 font-medium uppercase tracking-wider">Satisfaction</span>
            </div>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col items-start gap-3">
          <span className="text-sm font-semibold text-white">Quick Navigation</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-400">
            <button onClick={() => setActivePage('home')} className="hover:text-indigo-400 transition-colors">Home</button>
            <button onClick={() => setActivePage('about')} className="hover:text-indigo-400 transition-colors">About Us</button>
            <button onClick={() => setActivePage('explore')} className="hover:text-indigo-400 transition-colors">Explore peers</button>
            <button onClick={() => setActivePage('about')} className="hover:text-indigo-400 transition-colors">FAQ</button>
          </div>
          <div className="h-px w-full bg-white/5 my-1" />
          <span className="text-[10px] text-slate-500 text-left">
            SkillSwap is a secure peer-to-peer exchange ecosystem. Verified student emails required for registration.
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between border-t border-white/5 mt-10 pt-6 text-[10px] text-slate-500">
        <span>© {new Date().getFullYear()} SkillSwap Inc. All rights reserved.</span>
        <span className="flex items-center gap-1 mt-2 sm:mt-0">
          Built with <Heart size={10} className="text-rose-500 fill-rose-500" /> for global student empowerment.
        </span>
      </div>
    </footer>
  );
}
