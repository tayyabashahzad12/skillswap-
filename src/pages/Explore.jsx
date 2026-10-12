import React, { useState } from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { useAuth } from '../context/AuthContext';
import { Search, Filter, MapPin, Award, Mail, Code, Globe, Link2, MessageSquare, AlertTriangle, ArrowLeftRight, Clock, X } from 'lucide-react';

export default function Explore({ setActivePage, setSelectedChatUser }) {
  const { currentUser } = useAuth();
  const { users, reportUser, getOrCreateConversation } = useDatabase();

  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [availFilter, setAvailFilter] = useState('All');
  const [instituteFilter, setInstituteFilter] = useState('');

  // Selected student details modal / socials
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // Report User modal state
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  // Exclude Admin from directories
  const students = users.filter(u => u.role !== 'Admin' && u.status === 'Active');

  // Filter students based on queries
  const filteredStudents = students.filter(student => {
    // Prevent showing current user themselves
    if (currentUser && student.id === currentUser.id) return false;

    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.skillsOffered.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      student.skillsWanted.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLevel = levelFilter === 'All' || student.experienceLevel === levelFilter;
    const matchesAvail = availFilter === 'All' || student.availability === availFilter;
    const matchesInstitute = 
      !instituteFilter || 
      student.institute.toLowerCase().includes(instituteFilter.toLowerCase());

    return matchesSearch && matchesLevel && matchesAvail && matchesInstitute;
  });

  const handleStartChat = (student) => {
    if (!currentUser) {
      setActivePage('login');
      return;
    }
    getOrCreateConversation(currentUser.id, student.id);
    setSelectedChatUser(student);
    setActivePage('chat');
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) return;
    if (!reportReason.trim()) return;

    reportUser(currentUser.id, selectedStudent.id, reportReason);
    setReportSuccess(true);
    setReportReason('');
    
    setTimeout(() => {
      setReportSuccess(false);
      setShowReportModal(false);
      setSelectedStudent(null);
    }, 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10 text-left space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-2xl text-white">Explore Student Peers</h1>
        <p className="text-xs text-slate-400 mt-1">Discover other student profiles, filter by their skillset, and initiate exchange connections.</p>
      </div>

      {/* Search & Filters Panel */}
      <div className="glass-card rounded-2xl border border-white/5 p-5 grid grid-cols-1 md:grid-cols-4 gap-4 items-end shadow-xl">
        
        {/* Skill / Name Search */}
        <div className="md:col-span-1 space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Search Skills or Names</label>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-500" size={15} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. React.js, Python, Alex..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Experience Level */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Experience Level</label>
          <select 
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-all cursor-pointer"
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Availability */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Availability</label>
          <select 
            value={availFilter}
            onChange={(e) => setAvailFilter(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-all cursor-pointer"
          >
            <option value="All">All Locations</option>
            <option value="Online">Online Sessions</option>
            <option value="Offline">Offline Face-to-Face</option>
            <option value="Flexible">Flexible / Hybrid</option>
          </select>
        </div>

        {/* Institute Filter */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Institute Name</label>
          <input 
            type="text" 
            value={instituteFilter}
            onChange={(e) => setInstituteFilter(e.target.value)}
            placeholder="e.g. Stanford, Oxford..."
            className="w-full px-3 py-2.5 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Directory Grid */}
      {filteredStudents.length === 0 ? (
        <div className="py-20 text-center text-slate-400 text-sm bg-slate-950/20 rounded-3xl border border-dashed border-white/5">
          No students match your active filters. Try refining your queries.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map(student => (
            <div 
              key={student.id}
              className="glass-card rounded-2xl border border-white/5 hover:border-white/10 hover:shadow-xl transition-all p-5 flex flex-col justify-between gap-4"
            >
              {/* Header Details */}
              <div className="flex gap-3">
                <img 
                  src={student.avatar} 
                  alt={student.name} 
                  className="w-12 h-12 rounded-full object-cover border border-slate-700 p-0.5 shrink-0"
                />
                <div className="min-w-0 text-left">
                  <span className="block font-bold text-sm text-white truncate">{student.name}</span>
                  <span className="block text-[10px] text-slate-400 truncate mt-0.5">{student.institute}</span>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="bg-indigo-600/10 text-indigo-400 border border-indigo-500/15 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                      {student.experienceLevel}
                    </span>
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                      {student.availability}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio snippet */}
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 text-left">
                {student.bio}
              </p>

              {/* Skills columns */}
              <div className="grid grid-cols-2 gap-3 text-left text-xs bg-slate-950/25 p-3 rounded-xl border border-white/5">
                <div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Teaches</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {student.skillsOffered.slice(0, 3).map((s, i) => (
                      <span key={i} className="bg-indigo-500/10 text-indigo-300 text-[9px] px-1.5 py-0.5 rounded font-medium border border-indigo-500/10">
                        {s}
                      </span>
                    ))}
                    {student.skillsOffered.length > 3 && (
                      <span className="text-[9px] text-slate-400 font-medium">+{student.skillsOffered.length - 3} more</span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Wants</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {student.skillsWanted.slice(0, 3).map((s, i) => (
                      <span key={i} className="bg-purple-500/10 text-purple-300 text-[9px] px-1.5 py-0.5 rounded font-medium border border-purple-500/10">
                        {s}
                      </span>
                    ))}
                    {student.skillsWanted.length > 3 && (
                      <span className="text-[9px] text-slate-400 font-medium">+{student.skillsWanted.length - 3} more</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button 
                  onClick={() => handleStartChat(student)}
                  className="py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-indigo-600/10 transition-all flex items-center justify-center gap-1.5"
                >
                  <MessageSquare size={13} /> Propose Swap
                </button>
                <button 
                  onClick={() => setSelectedStudent(student)}
                  className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/5 rounded-xl text-xs font-semibold transition-all"
                >
                  View Connections
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Student Connect details modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full rounded-3xl border border-white/10 p-6 shadow-2xl relative text-center flex flex-col items-center gap-4 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => { setSelectedStudent(null); setShowReportModal(false); }}
              className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            <img 
              src={selectedStudent.avatar} 
              alt={selectedStudent.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/40 p-0.5"
            />
            
            <div>
              <h3 className="font-display font-extrabold text-lg text-white">{selectedStudent.name}</h3>
              <span className="block text-xs text-indigo-400 font-semibold">{selectedStudent.institute}</span>
              <span className="inline-block text-[9px] text-slate-400 bg-slate-900 border border-white/5 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider mt-1">
                Level {selectedStudent.level} Scholar
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              "{selectedStudent.bio}"
            </p>

            <div className="w-full h-px bg-white/5 my-1" />

            {/* Social details list */}
            <div className="w-full text-left space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Direct Contact Options</span>
              
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-300">
                <a 
                  href={`mailto:${selectedStudent.socialLinks.email}`} 
                  className="p-3 bg-slate-900/50 hover:bg-slate-900 border border-white/5 hover:border-indigo-500/30 rounded-xl flex items-center gap-2 transition-all"
                >
                  <Mail size={14} className="text-indigo-400" /> Email Student
                </a>
                
                {selectedStudent.socialLinks.github ? (
                  <a 
                    href={`https://${selectedStudent.socialLinks.github}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-3 bg-slate-900/50 hover:bg-slate-900 border border-white/5 hover:border-indigo-500/30 rounded-xl flex items-center gap-2 transition-all"
                  >
                    <Code size={14} className="text-indigo-400" /> GitHub Profile
                  </a>
                ) : (
                  <div className="p-3 bg-slate-950/20 border border-white/5 rounded-xl opacity-40 flex items-center gap-2">
                    <Code size={14} /> No GitHub
                  </div>
                )}

                {selectedStudent.socialLinks.linkedin ? (
                  <a 
                    href={`https://${selectedStudent.socialLinks.linkedin}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-3 bg-slate-900/50 hover:bg-slate-900 border border-white/5 hover:border-indigo-500/30 rounded-xl flex items-center gap-2 transition-all"
                  >
                    <Globe size={14} className="text-indigo-400" /> LinkedIn
                  </a>
                ) : (
                  <div className="p-3 bg-slate-950/20 border border-white/5 rounded-xl opacity-40 flex items-center gap-2">
                    <Globe size={14} /> No LinkedIn
                  </div>
                )}

                {selectedStudent.socialLinks.twitter ? (
                  <a 
                    href={`https://${selectedStudent.socialLinks.twitter}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-3 bg-slate-900/50 hover:bg-slate-900 border border-white/5 hover:border-indigo-500/30 rounded-xl flex items-center gap-2 transition-all"
                  >
                    <Link2 size={14} className="text-indigo-400" /> Twitter (X)
                  </a>
                ) : (
                  <div className="p-3 bg-slate-950/20 border border-white/5 rounded-xl opacity-40 flex items-center gap-2">
                    <Link2 size={14} /> No Twitter
                  </div>
                )}
              </div>
            </div>

            <div className="w-full h-px bg-white/5 my-1" />

            {/* Moderation trigger */}
            <div className="w-full flex items-center justify-between">
              <button 
                onClick={() => handleStartChat(selectedStudent)}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg transition-all"
              >
                Open Chat Conversation
              </button>
              
              <button 
                onClick={() => setShowReportModal(true)}
                className="text-[10px] font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 p-2 rounded hover:bg-rose-500/5 transition-all"
              >
                <AlertTriangle size={12} /> Report Profile
              </button>
            </div>

            {/* Report Form Overlap */}
            {showReportModal && (
              <form 
                onSubmit={handleReportSubmit}
                className="absolute inset-0 bg-slate-950 rounded-3xl p-6 flex flex-col justify-center gap-4 text-left border border-white/10 animate-in slide-in-from-bottom-5 duration-200"
              >
                <h4 className="font-display font-bold text-sm text-white flex items-center gap-1.5 text-rose-400">
                  <AlertTriangle size={16} /> Report Content / Profile
                </h4>
                <p className="text-[11px] text-slate-400">
                  Report this profile if it violates community policy (spamming connection requests, incorrect skills listing, inappropriate messages).
                </p>

                {reportSuccess ? (
                  <div className="py-8 text-center text-xs font-bold text-emerald-400">
                    Report filed successfully. Thank you!
                  </div>
                ) : (
                  <>
                    <textarea 
                      rows={3}
                      required
                      value={reportReason}
                      onChange={(e) => setReportReason(e.target.value)}
                      placeholder="Specify report reason..."
                      className="w-full px-3 py-2 bg-slate-900 border border-white/5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors resize-none"
                    />
                    <div className="flex gap-2 justify-end">
                      <button 
                        type="button"
                        onClick={() => setShowReportModal(false)}
                        className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold border border-white/5 transition-all"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold transition-all"
                      >
                        Submit Report
                      </button>
                    </div>
                  </>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
