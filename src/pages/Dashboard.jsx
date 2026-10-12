import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useDatabase } from '../context/DatabaseContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Award, Calendar, MessageSquare, ArrowLeftRight, Check, X, ExternalLink, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

export default function Dashboard({ setActivePage, setSelectedChatUser }) {
  const { currentUser } = useAuth();
  const { 
    bookings, 
    updateBookingStatus, 
    getSkillMatches, 
    users, 
    getOrCreateConversation 
  } = useDatabase();

  if (!currentUser) return null;

  // Filter bookings involving currentUser
  const myBookings = bookings.filter(b => b.senderId === currentUser.id || b.receiverId === currentUser.id);
  
  // Calculate matches
  const matches = getSkillMatches(currentUser).slice(0, 3);

  // Simulated learning analytics data
  const learningData = [
    { name: 'Week 1', hours: 2 },
    { name: 'Week 2', hours: 5 },
    { name: 'Week 3', hours: currentUser.level * 2 },
    { name: 'Week 4', hours: currentUser.level * 2.8 },
  ];

  const handleStartChat = (user) => {
    getOrCreateConversation(currentUser.id, user.id);
    setSelectedChatUser(user);
    setActivePage('chat');
  };

  const handleBookingClick = (booking, newStatus) => {
    updateBookingStatus(booking.id, newStatus);
  };

  const nextLevelXP = currentUser.level * 100;
  const currentLevelBaseXP = (currentUser.level - 1) * 100;
  const levelProgress = ((currentUser.xp - currentLevelBaseXP) / 100) * 100;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10 text-left space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-900/40 p-6 rounded-3xl border border-indigo-500/10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-2xl -z-10" />
        
        <div className="flex items-center gap-4">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-16 h-16 rounded-full border-2 border-indigo-500/40 object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-xl sm:text-2xl text-white">Welcome back, {currentUser.name}!</h1>
              <span className="bg-indigo-600/20 text-indigo-300 text-[10px] px-2 py-0.5 border border-indigo-500/20 font-bold rounded-full">Student</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-md">{currentUser.institute}</p>
          </div>
        </div>

        {/* Gamification Tracker */}
        <div className="w-full md:w-64 bg-slate-900/80 p-4 rounded-2xl border border-white/5 flex flex-col gap-1.5 self-stretch justify-center">
          <div className="flex items-center justify-between text-xs font-bold text-white">
            <span className="flex items-center gap-1"><Award size={14} className="text-indigo-400" /> LEVEL {currentUser.level}</span>
            <span className="text-slate-400">{currentUser.xp} / {nextLevelXP} XP</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(levelProgress, 100)}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-500">Reach {nextLevelXP} XP to level up!</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Booking & Matches */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Bookings Section */}
          <div className="glass-card rounded-2xl border border-white/5 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h2 className="font-display font-bold text-base text-white flex items-center gap-2">
                <Calendar size={18} className="text-indigo-400" /> Active Exchange Sessions
              </h2>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-bold">{myBookings.length} Total</span>
            </div>

            {myBookings.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs bg-slate-900/20 rounded-xl border border-dashed border-white/5">
                No active bookings. Search for students to propose a swap!
              </div>
            ) : (
              <div className="space-y-3">
                {myBookings.map(book => {
                  const isIncoming = book.receiverId === currentUser.id;
                  const partner = users.find(u => u.id === (isIncoming ? book.senderId : book.receiverId));

                  return (
                    <div 
                      key={book.id}
                      className="p-4 bg-slate-900/40 border border-white/5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-white/10 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={partner?.avatar} 
                          alt={partner?.name} 
                          className="w-10 h-10 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white">{partner?.name}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                              book.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                              book.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                              book.status === 'Completed' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                              'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}>
                              {book.status}
                            </span>
                          </div>
                          <span className="block text-[10px] text-indigo-300 font-semibold mt-0.5">
                            Swap: {isIncoming ? `Teaches you ${book.senderSkill}` : `You teach ${book.senderSkill}`} ⇄ {isIncoming ? `You teach ${book.receiverSkill}` : `Teaches you ${book.receiverSkill}`}
                          </span>
                          <span className="block text-[10px] text-slate-400 mt-0.5">
                            📅 {book.date} @ {book.time}
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        {book.status === 'Pending' && isIncoming && (
                          <>
                            <button 
                              onClick={() => handleBookingClick(book, 'Accepted')}
                              className="p-2 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white rounded-xl border border-emerald-500/30 transition-all cursor-pointer"
                              title="Accept Booking"
                            >
                              <Check size={14} />
                            </button>
                            <button 
                              onClick={() => handleBookingClick(book, 'Rejected')}
                              className="p-2 bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white rounded-xl border border-rose-500/30 transition-all cursor-pointer"
                              title="Decline Booking"
                            >
                              <X size={14} />
                            </button>
                          </>
                        )}
                        {book.status === 'Accepted' && (
                          <>
                            <a 
                              href={book.meetLink} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-indigo-600/10 transition-all"
                            >
                              Join Meet <ExternalLink size={12} />
                            </a>
                            <button 
                              onClick={() => handleBookingClick(book, 'Completed')}
                              className="px-3 py-2 bg-slate-800 hover:bg-emerald-500/25 border border-white/5 hover:border-emerald-500/20 text-slate-300 hover:text-emerald-400 rounded-xl text-xs font-semibold transition-all"
                            >
                              Mark Completed
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recharts Analytics */}
          <div className="glass-card rounded-2xl border border-white/5 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h2 className="font-display font-bold text-base text-white flex items-center gap-2">
                <BookOpen size={18} className="text-indigo-400" /> Learning Analytics & Time Exchange
              </h2>
              <span className="text-[10px] text-slate-400">Monthly breakdown (Hours shared)</span>
            </div>
            
            <div className="w-full h-56 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={learningData}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '12px' }}
                    itemStyle={{ color: '#a5b4fc', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorHours)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Suggested Matches */}
        <div className="space-y-8">
          
          {/* Smart Match recommendations */}
          <div className="glass-card rounded-2xl border border-white/5 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h2 className="font-display font-bold text-base text-white flex items-center gap-2">
                <ArrowLeftRight size={18} className="text-indigo-400" /> Recommended Matches
              </h2>
              <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-bold uppercase">Smart Match</span>
            </div>

            {matches.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs bg-slate-900/20 rounded-xl border border-dashed border-white/5">
                No potential matches found. Add more Skills Offered / Wanted to see suggestions!
              </div>
            ) : (
              <div className="space-y-4">
                {matches.map(match => (
                  <div 
                    key={match.user.id}
                    className="p-4 bg-slate-900/40 border border-white/5 rounded-2xl hover:border-indigo-500/20 transition-all flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img 
                          src={match.user.avatar} 
                          alt={match.user.name} 
                          className="w-9 h-9 rounded-full object-cover border border-slate-700"
                        />
                        <div className="text-left">
                          <span className="block font-bold text-xs text-white">{match.user.name}</span>
                          <span className="block text-[9px] text-slate-400 truncate max-w-[120px]">{match.user.institute}</span>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-gradient">{match.score}% Match</span>
                    </div>

                    <div className="h-px bg-white/5" />

                    <div className="text-xs space-y-1.5">
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">Teaches:</span>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {match.user.skillsOffered.slice(0, 2).map((s, i) => (
                            <span key={i} className="bg-indigo-600/10 text-indigo-300 text-[10px] px-1.5 py-0.5 rounded border border-indigo-500/15">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">Learns:</span>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {match.user.skillsWanted.slice(0, 2).map((s, i) => (
                            <span key={i} className="bg-purple-600/10 text-purple-300 text-[10px] px-1.5 py-0.5 rounded border border-purple-500/15">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <button 
                        onClick={() => handleStartChat(match.user)}
                        className="py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-[11px] shadow-lg shadow-indigo-600/10 transition-all flex items-center justify-center gap-1"
                      >
                        <MessageSquare size={12} /> Chat
                      </button>
                      <button 
                        onClick={() => setActivePage('matches')}
                        className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/5 rounded-xl text-[11px] font-semibold transition-all"
                      >
                        View Match
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Badges Cabinet */}
          <div className="glass-card rounded-2xl border border-white/5 p-6 space-y-4">
            <h2 className="font-display font-bold text-base text-white flex items-center gap-2">
              <Award size={18} className="text-indigo-400" /> Badges Unlocked
            </h2>
            {currentUser.badges.length === 0 ? (
              <div className="py-4 text-center text-slate-500 text-xs">
                No badges unlocked yet. Level up or teach peer sessions to acquire them!
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {currentUser.badges.map(b => (
                  <div 
                    key={b.id} 
                    className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1.5 cursor-help ${b.color}`}
                    title={b.description}
                  >
                    <span className="text-xl">{b.icon}</span>
                    <span className="text-[10px] font-bold tracking-tight">{b.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
