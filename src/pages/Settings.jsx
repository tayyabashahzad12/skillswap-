import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Settings, Key, Shield, Eye, EyeOff, Bot, Sparkles, Save } from 'lucide-react';

export default function SettingsPage() {
  const { currentUser } = useAuth();
  
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('ss_openai_key') || '');
  const [useRealAI, setUseRealAI] = useState(() => localStorage.getItem('ss_use_real_ai') === 'true');
  const [showKey, setShowKey] = useState(false);
  
  const [theme, setTheme] = useState('dark');
  const [notifSound, setNotifSound] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('ss_openai_key', apiKey);
    localStorage.setItem('ss_use_real_ai', useRealAI.toString());
    
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-10 text-left space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-white flex items-center gap-2">
            <Settings className="text-indigo-400" /> Platform Settings
          </h1>
          <p className="text-xs text-slate-400 mt-1">Configure your workspace preferences and manage AI service API integrations.</p>
        </div>
        {saveSuccess && (
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-semibold">
            Settings saved successfully!
          </div>
        )}
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        
        {/* OpenAI Configuration Panel */}
        <div className="glass-card rounded-2xl border border-white/5 p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <Bot className="text-indigo-400" size={18} />
            <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider text-slate-300">AI Integration Features</h3>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            By default, SkillSwap utilizes an intelligent, high-fidelity local simulation model to calculate skill matches, generate chatbot replies, and custom roadmaps. 
            You can optionally connect a real OpenAI GPT endpoint using your personal API key.
          </p>

          <div className="flex items-center justify-between p-3 bg-slate-900/50 border border-white/5 rounded-xl">
            <div className="text-left pr-4">
              <span className="block text-xs font-bold text-white">Enable Real OpenAI API integration</span>
              <span className="block text-[10px] text-slate-400 mt-0.5">Toggle real API execution over mock simulation.</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={useRealAI}
                onChange={(e) => setUseRealAI(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 peer-checked:after:bg-white" />
            </label>
          </div>

          {useRealAI && (
            <div className="animate-in slide-in-from-top-3 duration-200">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">OpenAI API Key</label>
              <div className="relative">
                <Key className="absolute left-3 top-3 text-slate-500" size={15} />
                <input 
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-900 border border-white/5 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button 
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-white transition-colors"
                >
                  {showKey ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <span className="block text-[9px] text-slate-500 mt-1.5">Your key is persisted locally in your browser's local storage and is never sent to any external server other than api.openai.com.</span>
            </div>
          )}
        </div>

        {/* UI Settings */}
        <div className="glass-card rounded-2xl border border-white/5 p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <Shield className="text-indigo-400" size={18} />
            <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider text-slate-300">Workspace Customization</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Theme selection */}
            <div className="space-y-1.5 text-left">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select Theme</label>
              <select 
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-900 border border-white/5 rounded-xl text-xs text-white cursor-pointer"
              >
                <option value="dark">Sleek Dark Mode (Active)</option>
                <option value="light">Glassmorphic Light (Mock)</option>
              </select>
            </div>

            {/* Notification triggers */}
            <div className="flex items-center justify-between p-3 bg-slate-900/50 border border-white/5 rounded-xl self-end h-[42px]">
              <span className="text-xs font-semibold text-white">Enable Push Alert Sounds</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifSound}
                  onChange={(e) => setNotifSound(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 peer-checked:after:bg-white" />
              </label>
            </div>
          </div>
        </div>

        {/* Save button */}
        <button 
          type="submit"
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-sm font-semibold shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <Save size={16} /> Save Workspace Settings
        </button>

      </form>
    </div>
  );
}
