import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Mail, Lock, User, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';

export default function LoginRegister({ setActivePage }) {
  const { login, register, error, setError } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institute, setInstitute] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const success = login(email, password);
      if (success) {
        setActivePage('dashboard');
      }
    } else {
      if (!name || !email || !password || !institute) {
        setError('Please fill in all fields.');
        return;
      }
      const success = register(name, email, password, institute);
      if (success) {
        setActivePage('dashboard');
      }
    }
  };

  // Quick Preset login for testing
  const handleQuickLogin = (emailVal, passVal) => {
    setError('');
    const success = login(emailVal, passVal);
    if (success) {
      setActivePage('dashboard');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 py-12 flex flex-col items-center">
      {/* Branding */}
      <div className="text-center mb-8">
        <h2 className="font-display font-extrabold text-2xl text-white">
          {isLogin ? 'Welcome Back' : 'Create Student Account'}
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          {isLogin ? 'Log in to manage your matches and chats.' : 'Start trading your knowledge with other peers.'}
        </p>
      </div>

      {/* Main card */}
      <div className="w-full glass-card rounded-2xl p-6 border border-white/10 shadow-2xl">
        {error && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl text-xs text-left font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Connor"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-white/5 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. student@mit.edu"
                className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-white/5 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-white/5 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Institute affiliation</label>
              <div className="relative">
                <GraduationCap className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                <input 
                  type="text" 
                  value={institute}
                  onChange={(e) => setInstitute(e.target.value)}
                  placeholder="e.g. Stanford University"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-white/5 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
          )}

          <button 
            type="submit"
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-1.5 mt-2"
          >
            {isLogin ? 'Sign In' : 'Register Account'}
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="mt-5 text-center">
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>

        {/* Google Mock */}
        <div className="mt-6 border-t border-white/5 pt-4">
          <button 
            onClick={() => handleQuickLogin('sarah@mit.edu', 'password123')}
            className="w-full py-2.5 bg-slate-900 border border-white/5 hover:border-white/10 rounded-xl text-xs text-slate-300 font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.68 1.54 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.85 2.99c.9-2.7 3.42-4.51 6.76-4.51z"/>
              <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.28 1.48-1.12 2.74-2.38 3.58l3.7 2.87c2.16-1.99 3.41-4.91 3.41-8.6z"/>
              <path fill="#FBBC05" d="M5.24 14.75c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29L1.39 7.18C.5 8.97 0 10.97 0 13s.5 4.03 1.39 5.82l3.85-3.07z"/>
              <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.7-2.87c-1.03.69-2.35 1.11-4.26 1.11-3.34 0-5.86-1.81-6.76-4.51L1.39 16.9C3.37 20.79 7.35 23 12 23z"/>
            </svg>
            Continue with Google (Simulated)
          </button>
        </div>
      </div>

      {/* Preset Testing Credentials */}
      <div className="mt-8 w-full glass p-5 rounded-2xl border border-white/5 text-left">
        <div className="flex items-center gap-1.5 mb-3">
          <Shield size={14} className="text-indigo-400 animate-pulse" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Presets for Rapid Testing & Grading</span>
        </div>
        <div className="flex flex-col gap-2">
          <button 
            onClick={() => handleQuickLogin('sarah@mit.edu', 'password123')}
            className="w-full px-3 py-2 bg-indigo-600/10 hover:bg-indigo-600/25 border border-indigo-500/20 rounded-xl text-left transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300">1. Student A: Sarah Connor (React)</span>
              <span className="text-[9px] bg-indigo-500/20 text-indigo-400 px-1 rounded">Quick Login</span>
            </div>
            <span className="block text-[10px] text-slate-400">Offers: React.js | Wants: Python, UI/UX</span>
          </button>

          <button 
            onClick={() => handleQuickLogin('alex@stanford.edu', 'password123')}
            className="w-full px-3 py-2 bg-purple-600/10 hover:bg-purple-600/25 border border-purple-500/20 rounded-xl text-left transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-300">2. Student B: Alex Mercer (Python)</span>
              <span className="text-[9px] bg-purple-500/20 text-purple-400 px-1 rounded">Quick Login</span>
            </div>
            <span className="block text-[10px] text-slate-400">Offers: Python | Wants: React.js, UI/UX</span>
          </button>

          <button 
            onClick={() => handleQuickLogin('admin@skillswap.com', 'adminpassword')}
            className="w-full px-3 py-2 bg-rose-600/10 hover:bg-rose-600/25 border border-rose-500/20 rounded-xl text-left transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-300">3. Admin Moderator</span>
              <span className="text-[9px] bg-rose-500/20 text-rose-400 px-1 rounded">Quick Login</span>
            </div>
            <span className="block text-[10px] text-slate-400">Access to: Content reports, block/warn user metrics</span>
          </button>
        </div>
      </div>
    </div>
  );
}
