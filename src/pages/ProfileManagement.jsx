import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDatabase } from '../context/DatabaseContext';
import { User, GraduationCap, Clock, Link2, Plus, X, Globe, Save, Award } from 'lucide-react';

export default function ProfileManagement() {
  const { currentUser } = useAuth();
  const { updateUserProfile } = useDatabase();

  if (!currentUser) return null;

  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [institute, setInstitute] = useState(currentUser.institute);
  const [experienceLevel, setExperienceLevel] = useState(currentUser.experienceLevel);
  const [availability, setAvailability] = useState(currentUser.availability);
  const [availabilityTiming, setAvailabilityTiming] = useState(currentUser.availabilityTiming);
  
  // Tag fields
  const [skillsOffered, setSkillsOffered] = useState(currentUser.skillsOffered);
  const [skillsWanted, setSkillsWanted] = useState(currentUser.skillsWanted);
  const [newOfferInput, setNewOfferInput] = useState('');
  const [newWantInput, setNewWantInput] = useState('');

  // Social Links
  const [email, setEmail] = useState(currentUser.socialLinks.email || '');
  const [github, setGithub] = useState(currentUser.socialLinks.github || '');
  const [linkedin, setLinkedin] = useState(currentUser.socialLinks.linkedin || '');
  const [twitter, setTwitter] = useState(currentUser.socialLinks.twitter || '');

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAddOfferSkill = (e) => {
    e.preventDefault();
    if (newOfferInput.trim() && !skillsOffered.includes(newOfferInput.trim())) {
      setSkillsOffered([...skillsOffered, newOfferInput.trim()]);
      setNewOfferInput('');
    }
  };

  const handleRemoveOfferSkill = (skill) => {
    setSkillsOffered(skillsOffered.filter(s => s !== skill));
  };

  const handleAddWantSkill = (e) => {
    e.preventDefault();
    if (newWantInput.trim() && !skillsWanted.includes(newWantInput.trim())) {
      setSkillsWanted([...skillsWanted, newWantInput.trim()]);
      setNewWantInput('');
    }
  };

  const handleRemoveWantSkill = (skill) => {
    setSkillsWanted(skillsWanted.filter(s => s !== skill));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile(currentUser.id, {
      name,
      bio,
      institute,
      experienceLevel,
      availability,
      availabilityTiming,
      skillsOffered,
      skillsWanted,
      socialLinks: {
        email,
        github,
        linkedin,
        twitter
      }
    });

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-10 text-left space-y-8 animate-in fade-in duration-300">
      
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Profile Management</h1>
          <p className="text-xs text-slate-400 mt-1">Keep your skills and academic information updated to receive the best matches.</p>
        </div>
        {saveSuccess && (
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-semibold animate-bounce">
            Profile saved! +15 XP earned.
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Basic Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-card rounded-2xl border border-white/5 p-6 space-y-4">
            <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider text-slate-300">Student Profile Data</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 text-slate-400" size={15} />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Institute / University Name</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3.5 top-3.5 text-slate-400" size={15} />
                  <input 
                    type="text" 
                    value={institute}
                    onChange={(e) => setInstitute(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Bio / Description</label>
              <textarea 
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell other students about your background, major, projects, or teaching philosophy..."
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Experience Level</label>
                <select 
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-all cursor-pointer"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Availability Parameter</label>
                <select 
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-all cursor-pointer"
                >
                  <option value="Online">Online Sessions Only</option>
                  <option value="Offline">Offline Face-to-Face</option>
                  <option value="Flexible">Flexible / Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Availability Timing</label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-3.5 text-slate-400" size={15} />
                  <input 
                    type="text" 
                    value={availabilityTiming}
                    onChange={(e) => setAvailabilityTiming(e.target.value)}
                    placeholder="e.g. Weekends 2-6 PM"
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Skills Management Panel */}
          <div className="glass-card rounded-2xl border border-white/5 p-6 space-y-6">
            <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider text-slate-300">Skills Directories Management</h3>
            
            {/* Skills Offered */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Skills You Can Offer (Teaching)</label>
              
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newOfferInput}
                  onChange={(e) => setNewOfferInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddOfferSkill(e)}
                  placeholder="e.g. React.js, Web Design, Adobe Premiere..."
                  className="flex-1 px-4 py-3 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button 
                  type="button"
                  onClick={handleAddOfferSkill}
                  className="px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-all"
                >
                  <Plus size={14} /> Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {skillsOffered.length === 0 ? (
                  <span className="text-slate-500 text-xs italic">No teaching skills listed yet. Add some above.</span>
                ) : (
                  skillsOffered.map((skill, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/10 text-indigo-300 text-xs font-semibold rounded-lg border border-indigo-500/20"
                    >
                      {skill}
                      <button 
                        type="button" 
                        onClick={() => handleRemoveOfferSkill(skill)}
                        className="text-indigo-400 hover:text-indigo-200 transition-colors cursor-pointer"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="h-px bg-white/5" />

            {/* Skills Wanted */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Skills You Want To Acquire (Learning)</label>
              
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newWantInput}
                  onChange={(e) => setNewWantInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddWantSkill(e)}
                  placeholder="e.g. Python, Machine Learning, Public Speaking..."
                  className="flex-1 px-4 py-3 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button 
                  type="button"
                  onClick={handleAddWantSkill}
                  className="px-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-all"
                >
                  <Plus size={14} /> Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {skillsWanted.length === 0 ? (
                  <span className="text-slate-500 text-xs italic">No learning skills listed yet. Add some above.</span>
                ) : (
                  skillsWanted.map((skill, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600/10 text-purple-300 text-xs font-semibold rounded-lg border border-purple-500/20"
                    >
                      {skill}
                      <button 
                        type="button" 
                        onClick={() => handleRemoveWantSkill(skill)}
                        className="text-purple-400 hover:text-purple-200 transition-colors cursor-pointer"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Avatar & Socials */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl border border-white/5 p-6 flex flex-col items-center text-center gap-3">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-24 h-24 rounded-full border-2 border-indigo-500/40 object-cover p-1"
            />
            <div>
              <span className="block font-bold text-base text-white">{currentUser.name}</span>
              <span className="inline-flex items-center gap-1 text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-white/5 font-bold uppercase tracking-wider mt-1">
                Level {currentUser.level} Orator
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Avatar dynamically synchronized.</span>
          </div>

          <div className="glass-card rounded-2xl border border-white/5 p-6 space-y-4">
            <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider text-slate-300">Social Affiliations</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">GitHub Username</label>
                <input 
                  type="text" 
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="github.com/username"
                  className="w-full px-3 py-2.5 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">LinkedIn Profile</label>
                <input 
                  type="text" 
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="linkedin.com/in/username"
                  className="w-full px-3 py-2.5 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Twitter (X) handle</label>
                <input 
                  type="text" 
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  placeholder="twitter.com/username"
                  className="w-full px-3 py-2.5 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-sm font-semibold shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Save size={16} /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
