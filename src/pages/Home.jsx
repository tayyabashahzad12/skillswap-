import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, ArrowLeftRight, Code, Video, Globe, BookOpen, Compass, Award } from 'lucide-react';

export default function Home({ setActivePage }) {
  const { currentUser } = useAuth();

  const handleStart = () => {
    if (currentUser) {
      setActivePage('dashboard');
    } else {
      setActivePage('login');
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />

        {/* Feature badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6 animate-fade-in">
          <ArrowLeftRight size={12} className="text-indigo-400" /> Peer-to-Peer Learning Ecosystem
        </div>

        {/* Hero Title */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.1] max-w-5xl">
          Learn any skill by <span className="text-gradient">teaching what you know</span>
        </h1>

        {/* Hero Description */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
          Skip the expensive courses. SkillSwap connects you with fellow university students to trade knowledge. Swap coding for design, languages for marketing, and build your portfolio.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={handleStart}
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-sm font-semibold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            Start Swapping Now 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => setActivePage('explore')}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-2xl text-sm font-semibold border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
          >
            <Compass size={16} /> Explore Students
          </button>
        </div>

        {/* Interactive Match Visual Preview */}
        <div className="mt-20 w-full max-w-4xl glass-card rounded-3xl p-6 border border-white/10 shadow-2xl relative animate-float">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 border border-white/10 rounded-full px-4 py-1 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Live Reciprocity Swap Match Simulation
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-0">
            {/* User A */}
            <div className="flex flex-col items-center p-4">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=80" 
                alt="Sarah" 
                className="w-16 h-16 rounded-full border-2 border-indigo-500 object-cover shadow-lg"
              />
              <span className="mt-3 block font-bold text-white text-sm">Sarah Connor</span>
              <span className="block text-[10px] text-indigo-400 font-semibold uppercase">MIT CS Student</span>
              <div className="mt-4 flex flex-col gap-1 w-full text-left">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Teaches:</span>
                <span className="bg-indigo-600/20 text-indigo-300 text-xs px-2.5 py-1 rounded-md border border-indigo-500/20 font-semibold block text-center">React.js</span>
              </div>
            </div>

            {/* Reciprocity Bridge */}
            <div className="flex flex-col items-center justify-center p-4 border-y md:border-y-0 md:border-x border-white/5 py-8">
              <div className="w-12 h-12 bg-gradient-to-tr from-pink-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-indigo-600/30">
                <ArrowLeftRight size={20} className="animate-spin-slow" />
              </div>
              <span className="mt-3 block text-gradient font-extrabold text-lg">100% Match</span>
              <span className="block text-[10px] text-emerald-400 font-bold uppercase tracking-wider mt-1">Dual-Reciprocity Active</span>
            </div>

            {/* User B */}
            <div className="flex flex-col items-center p-4">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80" 
                alt="Alex" 
                className="w-16 h-16 rounded-full border-2 border-purple-500 object-cover shadow-lg"
              />
              <span className="mt-3 block font-bold text-white text-sm">Alex Mercer</span>
              <span className="block text-[10px] text-purple-400 font-semibold uppercase">Stanford Student</span>
              <div className="mt-4 flex flex-col gap-1 w-full text-left">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Teaches:</span>
                <span className="bg-purple-600/20 text-purple-300 text-xs px-2.5 py-1 rounded-md border border-purple-500/20 font-semibold block text-center">Python</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Features */}
      <section className="w-full bg-slate-900/30 py-20 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Designed around how students learn
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base">
              Say goodbye to isolated tutorials. Our platform gives you real projects, real peers, and zero costs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-indigo-500/30 hover:shadow-indigo-500/5 transition-all text-left">
              <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-4 border border-indigo-500/20">
                <BookOpen size={18} />
              </div>
              <h3 className="font-display font-semibold text-white text-base">Complete Match</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Our dual-reciprocity match engine pairing algorithm pairs users who want what you teach, and teach what you want.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-indigo-500/30 hover:shadow-indigo-500/5 transition-all text-left">
              <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-4 border border-purple-500/20">
                <Globe size={18} />
              </div>
              <h3 className="font-display font-semibold text-white text-base">Explore Directory</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Filter students by location, experience levels, and specific sub-skills to find the perfect learning match.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-indigo-500/30 hover:shadow-indigo-500/5 transition-all text-left">
              <div className="w-10 h-10 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-400 mb-4 border border-pink-500/20">
                <Video size={18} />
              </div>
              <h3 className="font-display font-semibold text-white text-base">Slot Bookings</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Schedule study sessions directly with integrated calendars and automatically generated Google Meet links.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-indigo-500/30 hover:shadow-indigo-500/5 transition-all text-left">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/20">
                <Award size={18} />
              </div>
              <h3 className="font-display font-semibold text-white text-base">Gamification Rewards</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Earn experience points (XP) for hosting sessions, unlock custom badges, and climb the public leaderboard.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
