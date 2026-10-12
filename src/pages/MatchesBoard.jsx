import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDatabase } from '../context/DatabaseContext';
import { Calendar, MessageSquare, ArrowLeftRight, Check, X, ShieldAlert, AlertCircle, Sparkles, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MatchesBoard({ setActivePage, setSelectedChatUser }) {
  const { currentUser } = useAuth();
  const { getSkillMatches, createBooking, getOrCreateConversation } = useDatabase();

  if (!currentUser) return null;

  const matches = getSkillMatches(currentUser);
  
  // Booking modal state
  const [bookingPartner, setBookingPartner] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [senderSkill, setSenderSkill] = useState('');
  const [receiverSkill, setReceiverSkill] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleStartChat = (user) => {
    getOrCreateConversation(currentUser.id, user.id);
    setSelectedChatUser(user);
    setActivePage('chat');
  };

  const handleOpenBooking = (partner, commonSkills) => {
    setBookingPartner(partner);
    setSenderSkill(commonSkills.teaching[0] || currentUser.skillsOffered[0] || '');
    setReceiverSkill(commonSkills.learning[0] || partner.skillsOffered[0] || '');
    setBookingDate('');
    setBookingTime('');
    setBookingNotes('');
    setBookingSuccess(false);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingPartner || !bookingDate || !bookingTime || !senderSkill || !receiverSkill) return;

    createBooking({
      senderId: currentUser.id,
      receiverId: bookingPartner.id,
      senderSkill,
      receiverSkill,
      date: bookingDate,
      time: bookingTime,
      notes: bookingNotes
    });

    setBookingSuccess(true);
    
    // Confetti celebration for initiating an active skill exchange booking!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setBookingSuccess(false);
      setBookingPartner(null);
      setActivePage('dashboard');
    }, 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-10 text-left space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-2xl text-white">Smart Skill Matches Board</h1>
        <p className="text-xs text-slate-400 mt-1">Intelligent double-reciprocity matching. These students teach what you want to learn, and want what you offer.</p>
      </div>

      {matches.length === 0 ? (
        <div className="py-20 text-center text-slate-400 text-sm bg-slate-950/20 rounded-3xl border border-dashed border-white/5 space-y-4">
          <AlertCircle size={32} className="mx-auto text-slate-500 opacity-50" />
          <p className="max-w-md mx-auto px-6">
            We couldn't compute any dual-reciprocity matches for you yet. 
            Try adding more skills in <span onClick={() => setActivePage('profile')} className="text-indigo-400 font-semibold hover:underline cursor-pointer">Profile Management</span> to increase match compatibility!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {matches.map(match => (
            <div 
              key={match.user.id}
              className="glass-card rounded-2xl border border-white/5 hover:border-indigo-500/20 hover:shadow-xl transition-all p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              {/* User details */}
              <div className="flex gap-4 items-start text-left">
                <img 
                  src={match.user.avatar} 
                  alt={match.user.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-slate-700 p-0.5"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-base text-white">{match.user.name}</span>
                    <span className="bg-indigo-600/10 text-indigo-400 border border-indigo-500/15 text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                      {match.user.experienceLevel}
                    </span>
                    <span className="bg-slate-800 text-slate-400 text-[9px] font-bold px-2 py-0.5 rounded border border-white/5">
                      LVL {match.user.level}
                    </span>
                  </div>
                  <span className="block text-xs text-slate-400 mt-1">{match.user.institute}</span>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-md mt-2">
                    "{match.user.bio}"
                  </p>
                </div>
              </div>

              {/* Reciprocity score & actions */}
              <div className="w-full md:w-auto flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end gap-4 shrink-0 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                <div className="text-left md:text-right">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Reciprocity Score</span>
                  <span className="text-xl font-extrabold text-gradient">{match.score}% Match</span>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleStartChat(match.user)}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/5 hover:border-white/10 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <MessageSquare size={13} /> Chat
                  </button>
                  <button 
                    onClick={() => handleOpenBooking(match.user, match.commonSkills)}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-indigo-600/15 transition-all flex items-center gap-1.5"
                  >
                    <Calendar size={13} /> Book Swap
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Form Overlay Modal */}
      {bookingPartner && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full rounded-3xl border border-white/10 p-6 shadow-2xl relative text-left flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setBookingPartner(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <Calendar size={18} className="text-indigo-400" />
              <h3 className="font-display font-bold text-sm text-white">Propose Skill Exchange Booking</h3>
            </div>

            {bookingSuccess ? (
              <div className="py-8 text-center text-xs font-bold text-emerald-400 animate-bounce">
                🎉 Exchange Request Sent Successfully! +20 XP earned.
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Exchanging with</span>
                  <div className="flex items-center gap-2 p-2 bg-slate-900/50 border border-white/5 rounded-xl">
                    <img src={bookingPartner.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <span className="block font-bold text-xs text-white">{bookingPartner.name}</span>
                      <span className="block text-[9px] text-slate-400">{bookingPartner.institute}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Skill you teach */}
                  <div>
                    <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">You teach them</label>
                    <select 
                      value={senderSkill}
                      onChange={(e) => setSenderSkill(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    >
                      {currentUser.skillsOffered.map((s, idx) => (
                        <option key={idx} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Skill they teach */}
                  <div>
                    <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">They teach you</label>
                    <select 
                      value={receiverSkill}
                      onChange={(e) => setReceiverSkill(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    >
                      {bookingPartner.skillsOffered.map((s, idx) => (
                        <option key={idx} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Booking Date */}
                  <div>
                    <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">Select Date</label>
                    <input 
                      type="date" 
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                    />
                  </div>

                  {/* Booking Time */}
                  <div>
                    <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">Select Time</label>
                    <input 
                      type="time" 
                      required
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">Session Goals / Notes (Optional)</label>
                  <textarea 
                    rows={3}
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    placeholder="Describe what concepts you plan to cover..."
                    className="w-full px-3 py-2 bg-slate-900 border border-white/5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-2 justify-end mt-2">
                  <button 
                    type="button"
                    onClick={() => setBookingPartner(null)}
                    className="px-4 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold border border-white/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/15 transition-all"
                  >
                    Send Proposal
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
