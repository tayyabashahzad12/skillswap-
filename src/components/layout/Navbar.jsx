import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDatabase } from '../../context/DatabaseContext';
import { Bell, MessageSquare, Shield, LogOut, User, Settings, Compass, LayoutDashboard, HelpCircle, Menu, X, ArrowLeftRight } from 'lucide-react';
import NotificationsPanel from './NotificationsPanel';

export default function Navbar({ activePage, setActivePage }) {
  const { currentUser, logout } = useAuth();
  const { notifications } = useDatabase();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = currentUser 
    ? notifications.filter(n => n.userId === currentUser.id && !n.read).length 
    : 0;

  const handleNav = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    setShowProfileMenu(false);
    setShowNotifications(false);
  };

  const handleLogout = () => {
    logout();
    handleNav('home');
  };

  return (
    <nav className="sticky top-0 z-40 w-full glass border-b border-white/5 px-6 py-4 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => handleNav('home')} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="bg-gradient-to-tr from-indigo-500 to-purple-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <ArrowLeftRight size={22} className="rotate-12 group-hover:rotate-0 transition-transform duration-300" />
          </div>
          <div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              Skill<span className="text-gradient">Swap</span>
            </span>
            <span className="block text-[10px] text-slate-400 tracking-wider font-semibold uppercase -mt-1">Student Platform</span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1 font-medium">
          <button 
            onClick={() => handleNav('home')} 
            className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${activePage === 'home' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
          >
            Home
          </button>
          <button 
            onClick={() => handleNav('about')} 
            className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${activePage === 'about' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
          >
            About
          </button>
          <button 
            onClick={() => handleNav('explore')} 
            className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${activePage === 'explore' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
          >
            Explore Peers
          </button>

          {currentUser && (
            <>
              <button 
                onClick={() => handleNav('dashboard')} 
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-1.5 ${activePage === 'dashboard' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
              >
                <LayoutDashboard size={15} /> Dashboard
              </button>
              <button 
                onClick={() => handleNav('matches')} 
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-1.5 ${activePage === 'matches' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
              >
                <ArrowLeftRight size={15} /> Matches Board
              </button>
              <button 
                onClick={() => handleNav('chat')} 
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-1.5 ${activePage === 'chat' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
              >
                <MessageSquare size={15} /> Chat
              </button>
              {currentUser.role === 'Admin' && (
                <button 
                  onClick={() => handleNav('admin')} 
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-200 flex items-center gap-1.5`}
                >
                  <Shield size={15} /> Admin
                </button>
              )}
            </>
          )}
        </div>

        {/* Action Controls / Profile */}
        <div className="hidden md:flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-3 relative">
              {/* Notification icon */}
              <button 
                onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
                className="relative p-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white border border-white/5 hover:border-white/10 transition-all"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-tr from-pink-500 to-rose-600 rounded-full text-[10px] font-bold text-white flex items-center justify-center animate-bounce shadow-md">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Profile Avatar Trigger */}
              <button 
                onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-slate-800 border border-white/5 hover:border-white/10 transition-all"
              >
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-8 h-8 rounded-full border border-indigo-500/30 object-cover"
                />
                <div className="text-left">
                  <span className="block text-xs font-semibold text-white max-w-[100px] truncate">{currentUser.name}</span>
                  <span className="block text-[9px] text-emerald-400 font-bold tracking-wider uppercase -mt-0.5">LVL {currentUser.level}</span>
                </div>
              </button>

              {/* Notification dropdown panel */}
              {showNotifications && (
                <div className="absolute right-12 top-14 w-80 z-50">
                  <NotificationsPanel onClose={() => setShowNotifications(false)} setActivePage={handleNav} />
                </div>
              )}

              {/* Profile dropdown menu */}
              {showProfileMenu && (
                <div className="absolute right-0 top-14 w-52 glass-card rounded-2xl p-2 z-50 border border-white/10 shadow-2xl animate-in fade-in-50 slide-in-from-top-3 duration-200">
                  <div className="px-3 py-2 border-b border-white/5 mb-1 text-xs">
                    <span className="block font-bold text-white">{currentUser.name}</span>
                    <span className="block text-slate-400 text-[10px] truncate">{currentUser.email}</span>
                  </div>
                  <button 
                    onClick={() => handleNav('profile')}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-indigo-600/20 rounded-lg transition-all text-left"
                  >
                    <User size={15} /> Edit Profile
                  </button>
                  <button 
                    onClick={() => handleNav('settings')}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-indigo-600/20 rounded-lg transition-all text-left"
                  >
                    <Settings size={15} /> Settings
                  </button>
                  <div className="h-px bg-white/5 my-1" />
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-400 hover:text-white hover:bg-rose-600/20 rounded-lg transition-all text-left"
                  >
                    <LogOut size={15} /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={() => handleNav('login')}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-3">
          {currentUser && (
            <button 
              onClick={() => { setShowNotifications(!showNotifications); setMobileMenuOpen(false); }}
              className="relative p-2 rounded-xl bg-slate-800 text-slate-300"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-600 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          )}
          <button 
            onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setShowNotifications(false); }}
            className="p-2 rounded-xl bg-slate-800 text-slate-300"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile notifications overlay dropdown */}
      {showNotifications && !mobileMenuOpen && (
        <div className="absolute right-6 top-16 w-[calc(100vw-48px)] max-w-sm z-50 md:hidden">
          <NotificationsPanel onClose={() => setShowNotifications(false)} setActivePage={handleNav} />
        </div>
      )}

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-white/5 flex flex-col gap-2 animate-in fade-in slide-in-from-top-5 duration-200">
          <button 
            onClick={() => handleNav('home')} 
            className={`w-full py-2.5 px-4 rounded-xl text-left text-sm ${activePage === 'home' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'text-slate-300'}`}
          >
            Home
          </button>
          <button 
            onClick={() => handleNav('about')} 
            className={`w-full py-2.5 px-4 rounded-xl text-left text-sm ${activePage === 'about' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'text-slate-300'}`}
          >
            About
          </button>
          <button 
            onClick={() => handleNav('explore')} 
            className={`w-full py-2.5 px-4 rounded-xl text-left text-sm ${activePage === 'explore' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'text-slate-300'}`}
          >
            Explore Peers
          </button>

          {currentUser ? (
            <>
              <button 
                onClick={() => handleNav('dashboard')} 
                className={`w-full py-2.5 px-4 rounded-xl text-left text-sm flex items-center gap-2 ${activePage === 'dashboard' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'text-slate-300'}`}
              >
                <LayoutDashboard size={15} /> Dashboard
              </button>
              <button 
                onClick={() => handleNav('matches')} 
                className={`w-full py-2.5 px-4 rounded-xl text-left text-sm flex items-center gap-2 ${activePage === 'matches' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'text-slate-300'}`}
              >
                <ArrowLeftRight size={15} /> Matches Board
              </button>
              <button 
                onClick={() => handleNav('chat')} 
                className={`w-full py-2.5 px-4 rounded-xl text-left text-sm flex items-center gap-2 ${activePage === 'chat' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'text-slate-300'}`}
              >
                <MessageSquare size={15} /> Chat
              </button>
              <button 
                onClick={() => handleNav('profile')} 
                className={`w-full py-2.5 px-4 rounded-xl text-left text-sm flex items-center gap-2 ${activePage === 'profile' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'text-slate-300'}`}
              >
                <User size={15} /> Profile Management
              </button>
              <button 
                onClick={() => handleNav('settings')} 
                className={`w-full py-2.5 px-4 rounded-xl text-left text-sm flex items-center gap-2 ${activePage === 'settings' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'text-slate-300'}`}
              >
                <Settings size={15} /> Settings
              </button>
              {currentUser.role === 'Admin' && (
                <button 
                  onClick={() => handleNav('admin')} 
                  className="w-full py-2.5 px-4 rounded-xl text-left text-sm flex items-center gap-2 text-red-400 font-semibold bg-red-500/10"
                >
                  <Shield size={15} /> Admin panel
                </button>
              )}
              <div className="h-px bg-white/5 my-2" />
              <button 
                onClick={handleLogout}
                className="w-full py-2.5 px-4 rounded-xl text-left text-sm flex items-center gap-2 text-rose-400 hover:bg-rose-500/10"
              >
                <LogOut size={15} /> Log Out
              </button>
            </>
          ) : (
            <button 
              onClick={() => handleNav('login')}
              className="mt-2 w-full py-3 bg-indigo-600 text-white rounded-xl text-center text-sm font-semibold shadow-lg shadow-indigo-600/20"
            >
              Sign In
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
