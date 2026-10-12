import React from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { useAuth } from '../context/AuthContext';
import { Shield, Users, Calendar, AlertTriangle, Check, Trash2, ShieldAlert, Ban, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  const { 
    users, 
    bookings, 
    reports, 
    resolveReport, 
    updateUserStatus, 
    deleteUser 
  } = useDatabase();

  // Guard: Only admins can view
  if (!currentUser || currentUser.role !== 'Admin') {
    return (
      <div className="py-20 text-center text-slate-400 max-w-md mx-auto space-y-4">
        <ShieldAlert size={48} className="mx-auto text-rose-500 animate-pulse" />
        <h2 className="text-lg font-bold text-white">Access Denied</h2>
        <p className="text-xs text-slate-500">Only authorized administrators are allowed to view the platform control console.</p>
      </div>
    );
  }

  const activeStudents = users.filter(u => u.role !== 'Admin');
  const pendingReports = reports.filter(r => r.status === 'Pending');

  // Stats cards
  const stats = [
    { name: 'Total Registered Students', value: activeStudents.length, icon: <Users size={16} />, color: 'text-indigo-400 bg-indigo-500/10' },
    { name: 'Total Bookings Scheduled', value: bookings.length, icon: <Calendar size={16} />, color: 'text-blue-400 bg-blue-500/10' },
    { name: 'Open Moderation Reports', value: pendingReports.length, icon: <AlertTriangle size={16} />, color: 'text-rose-400 bg-rose-500/10 animate-pulse' },
    { name: 'Moderator Status', value: 'Active', icon: <Shield size={16} />, color: 'text-emerald-400 bg-emerald-500/10' }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10 text-left space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-2xl text-white flex items-center gap-2">
          <Shield className="text-red-500" /> Admin Moderation Dashboard
        </h1>
        <p className="text-xs text-slate-400 mt-1">Review reported users, toggle student accounts, and manage platform safety parameters.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card rounded-2xl border border-white/5 p-5 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">{stat.name}</span>
              <span className="block text-xl font-bold text-white mt-1">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Grid columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Reports Queue Column (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-2xl border border-white/5 p-6 space-y-4">
            <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <AlertTriangle size={16} className="text-rose-400" /> Reported Profiles Queue
            </h3>
            
            {reports.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-xs">
                No user profile reports have been filed.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/5 text-slate-500 text-[10px] uppercase font-bold tracking-wider text-left">
                      <th className="pb-3">Reporter</th>
                      <th className="pb-3">Reported User</th>
                      <th className="pb-3">Reason</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {reports.map(rep => {
                      const reporter = users.find(u => u.id === rep.reporterId);
                      const reported = users.find(u => u.id === rep.reportedUserId);

                      return (
                        <tr key={rep.id} className="text-slate-300">
                          <td className="py-3 font-semibold text-slate-400">{reporter?.name || rep.reporterId}</td>
                          <td className="py-3 font-bold text-white">{reported?.name || rep.reportedUserId}</td>
                          <td className="py-3 max-w-[200px] truncate" title={rep.reason}>{rep.reason}</td>
                          <td className="py-3">
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                              rep.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-emerald-500/10 text-emerald-400'
                            }`}>
                              {rep.status}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            {rep.status === 'Pending' && (
                              <button 
                                onClick={() => resolveReport(rep.id)}
                                className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-semibold transition-all"
                              >
                                Resolve
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* User Status Moderation Panel (1 col) */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl border border-white/5 p-6 space-y-4">
            <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Users size={16} className="text-indigo-400" /> Student Accounts Status
            </h3>

            <div className="space-y-3">
              {activeStudents.map(student => (
                <div key={student.id} className="p-3 bg-slate-900/40 border border-white/5 rounded-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <img src={student.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <div className="text-left min-w-0">
                      <span className="block font-bold text-xs text-white truncate">{student.name}</span>
                      <span className={`inline-block text-[9px] font-bold uppercase tracking-wider ${
                        student.status === 'Active' ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {student.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-1.5 shrink-0">
                    {student.status === 'Active' ? (
                      <button 
                        onClick={() => updateUserStatus(student.id, 'Suspended')}
                        className="p-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white rounded border border-rose-500/20 transition-all"
                        title="Suspend Account"
                      >
                        <Ban size={12} />
                      </button>
                    ) : (
                      <button 
                        onClick={() => updateUserStatus(student.id, 'Active')}
                        className="p-1.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded border border-emerald-500/20 transition-all"
                        title="Reactivate Account"
                      >
                        <ShieldCheck size={12} />
                      </button>
                    )}
                    
                    <button 
                      onClick={() => deleteUser(student.id)}
                      className="p-1.5 bg-slate-800 text-slate-400 hover:bg-rose-600 hover:text-white rounded border border-white/5 transition-all"
                      title="Permanently Delete"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
