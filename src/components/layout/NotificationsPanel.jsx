import React from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { useAuth } from '../../context/AuthContext';
import { X, Check, Trash2, Calendar, MessageSquare, Award, AlertCircle } from 'lucide-react';

export default function NotificationsPanel({ onClose, setActivePage }) {
  const { currentUser } = useAuth();
  const { notifications, markNotificationAsRead, clearNotifications } = useDatabase();

  if (!currentUser) return null;

  const userNotifications = notifications.filter(n => n.userId === currentUser.id);

  const getIcon = (type) => {
    switch (type) {
      case 'booking':
        return <Calendar size={14} className="text-blue-400" />;
      case 'chat':
        return <MessageSquare size={14} className="text-indigo-400" />;
      case 'system':
        return <Award size={14} className="text-emerald-400" />;
      default:
        return <AlertCircle size={14} className="text-slate-400" />;
    }
  };

  const handleNotificationClick = (notif) => {
    markNotificationAsRead(notif.id);
    if (notif.type === 'chat') {
      setActivePage('chat');
    } else if (notif.type === 'booking') {
      setActivePage('dashboard');
    }
    onClose();
  };

  return (
    <div className="glass-card rounded-2xl border border-white/10 shadow-2xl p-4 w-full flex flex-col text-left max-h-[400px] overflow-hidden animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="font-display font-bold text-sm text-white">Notifications</span>
          {userNotifications.filter(n => !n.read).length > 0 && (
            <span className="bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              {userNotifications.filter(n => !n.read).length} New
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {userNotifications.length > 0 && (
            <button 
              onClick={() => clearNotifications(currentUser.id)}
              className="text-slate-400 hover:text-rose-400 transition-colors p-1 rounded hover:bg-white/5"
              title="Clear all"
            >
              <Trash2 size={13} />
            </button>
          )}
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-white/5"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {userNotifications.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            <AlertCircle size={24} className="mx-auto text-slate-500 mb-2 opacity-50" />
            No notifications yet
          </div>
        ) : (
          userNotifications.map(notif => (
            <div 
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex gap-2.5 relative group ${notif.read ? 'bg-slate-900/20 border-white/5 opacity-70' : 'bg-indigo-600/5 hover:bg-indigo-600/10 border-indigo-500/10 hover:border-indigo-500/20'}`}
            >
              <div className={`p-2 rounded-lg shrink-0 flex items-center justify-center self-start ${notif.read ? 'bg-slate-800 text-slate-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                {getIcon(notif.type)}
              </div>
              <div className="flex-1 min-w-0 pr-4">
                <p className="text-xs text-slate-200 leading-relaxed break-words font-medium">{notif.text}</p>
                <span className="text-[9px] text-slate-500 mt-1 block">
                  {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {!notif.read && (
                <button 
                  onClick={(e) => { e.stopPropagation(); markNotificationAsRead(notif.id); }}
                  className="absolute right-3 top-3 w-4 h-4 bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500 rounded flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                  title="Mark as read"
                >
                  <Check size={10} />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
