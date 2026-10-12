import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const DatabaseContext = createContext();

// Preloaded high-quality student profiles for testing
const INITIAL_USERS = [
  {
    id: 'user-sarah',
    name: 'Sarah Connor',
    email: 'sarah@mit.edu',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
    bio: 'Computer Science sophomore at MIT. Passionate about frontend development, user interfaces, and tech education.',
    institute: 'Massachusetts Institute of Technology (MIT)',
    skillsOffered: ['React.js', 'JavaScript', 'CSS Grid', 'Tailwind CSS'],
    skillsWanted: ['Python', 'UI/UX Design', 'Machine Learning'],
    experienceLevel: 'Intermediate',
    availability: 'Online',
    availabilityTiming: 'Weekends 2 PM - 6 PM EST',
    socialLinks: {
      email: 'sarah@mit.edu',
      github: 'github.com/sarahconnor',
      linkedin: 'linkedin.com/in/sarahconnor',
      twitter: 'twitter.com/sarahcodes'
    },
    xp: 280,
    level: 3,
    badges: [
      { id: 'b1', name: 'Top Mentor', icon: '⭐', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', description: 'Taught 5+ successful sessions' },
      { id: 'b2', name: 'Fast Learner', icon: '⚡', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30', description: 'Acquired 2 new skills' }
    ],
    status: 'Active',
    role: 'User'
  },
  {
    id: 'user-alex',
    name: 'Alex Mercer',
    email: 'alex@stanford.edu',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    bio: 'Data Science major at Stanford. I love coding backend systems, data pipelines, and training machine learning models.',
    institute: 'Stanford University',
    skillsOffered: ['Python', 'Machine Learning', 'SQL', 'Node.js'],
    skillsWanted: ['React.js', 'UI/UX Design', 'Public Speaking'],
    experienceLevel: 'Advanced',
    availability: 'Online',
    availabilityTiming: 'Weekdays 6 PM - 9 PM PST',
    socialLinks: {
      email: 'alex@stanford.edu',
      github: 'github.com/alexmercer',
      linkedin: 'linkedin.com/in/alexmercer',
      twitter: 'twitter.com/alex_data'
    },
    xp: 450,
    level: 5,
    badges: [
      { id: 'b1', name: 'Top Mentor', icon: '⭐', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', description: 'Taught 5+ successful sessions' },
      { id: 'b3', name: 'Code Wizard', icon: '🧙‍♂️', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30', description: 'Offered 4+ technical skills' }
    ],
    status: 'Active',
    role: 'User'
  },
  {
    id: 'user-elena',
    name: 'Elena Rostova',
    email: 'elena@oxford.edu',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
    bio: 'Graphic Design student at Oxford. Creating modern web experiences and visual design systems is my hobby.',
    institute: 'University of Oxford',
    skillsOffered: ['UI/UX Design', 'Figma', 'Graphic Design', 'Adobe Photoshop'],
    skillsWanted: ['React.js', 'Node.js', 'JavaScript'],
    experienceLevel: 'Advanced',
    availability: 'Offline',
    availabilityTiming: 'Tuesdays & Thursdays 4 PM - 8 PM GMT',
    socialLinks: {
      email: 'elena@oxford.edu',
      github: 'github.com/elenarostova',
      linkedin: 'linkedin.com/in/elenadesign',
      twitter: 'twitter.com/elena_ux'
    },
    xp: 150,
    level: 2,
    badges: [
      { id: 'b4', name: 'Creative Eye', icon: '🎨', color: 'bg-pink-500/20 text-pink-300 border-pink-500/30', description: 'Helped design three student web projects' }
    ],
    status: 'Active',
    role: 'User'
  },
  {
    id: 'user-marcus',
    name: 'Marcus Aurelius',
    email: 'marcus@roma.edu',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
    bio: 'Philosophy and Communications major. Specialized in classical debate, rhetoric, and corporate negotiations.',
    institute: 'Sapienza University of Rome',
    skillsOffered: ['Public Speaking', 'English Literature', 'Negotiation', 'Debate'],
    skillsWanted: ['Python', 'Figma', 'SQL'],
    experienceLevel: 'Intermediate',
    availability: 'Online',
    availabilityTiming: 'Flexible timing',
    socialLinks: {
      email: 'marcus@roma.edu',
      github: 'github.com/marcusdebate',
      linkedin: 'linkedin.com/in/marcusaurelius',
      twitter: 'twitter.com/philosopher_talk'
    },
    xp: 90,
    level: 1,
    badges: [
      { id: 'b5', name: 'Orator Extraordinaire', icon: '📢', color: 'bg-green-500/20 text-green-300 border-green-500/30', description: 'Taught public speaking to 2 peers' }
    ],
    status: 'Active',
    role: 'User'
  },
  {
    id: 'user-satoshi',
    name: 'Satoshi Nakamoto',
    email: 'satoshi@tokyotech.edu',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120',
    bio: 'Cryptography researcher. Interested in decentralized networks, game theory, and backend API structures.',
    institute: 'Tokyo Institute of Technology',
    skillsOffered: ['Blockchain', 'Cryptography', 'Node.js', 'Go (Golang)'],
    skillsWanted: ['Public Speaking', 'UI/UX Design', 'English Literature'],
    experienceLevel: 'Advanced',
    availability: 'Online',
    availabilityTiming: 'Midnight coding hours JST',
    socialLinks: {
      email: 'satoshi@tokyotech.edu',
      github: 'github.com/bitcoin',
      linkedin: 'linkedin.com/in/satoshinakamoto',
      twitter: 'twitter.com/satoshin'
    },
    xp: 620,
    level: 7,
    badges: [
      { id: 'b6', name: 'Legendary Creator', icon: '👑', color: 'bg-red-500/20 text-red-300 border-red-500/30', description: 'Top XP contributor in the platform history' }
    ],
    status: 'Active',
    role: 'User'
  },
  {
    id: 'user-clara',
    name: 'Clara Oswald',
    email: 'clara@london.edu',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
    bio: 'Film and Cinema production freshman. Let me teach you video editing, colour grading and sound design!',
    institute: 'University College London (UCL)',
    skillsOffered: ['Video Editing', 'Adobe Premiere Pro', 'DaVinci Resolve', 'After Effects'],
    skillsWanted: ['React.js', 'Blockchain', 'JavaScript'],
    experienceLevel: 'Beginner',
    availability: 'Offline',
    availabilityTiming: 'Fridays 10 AM - 4 PM',
    socialLinks: {
      email: 'clara@london.edu',
      github: 'github.com/claraslices',
      linkedin: 'linkedin.com/in/claraoswald',
      twitter: 'twitter.com/clara_edits'
    },
    xp: 50,
    level: 1,
    badges: [],
    status: 'Active',
    role: 'User'
  },
  {
    id: 'user-admin',
    name: 'Platform Moderator',
    email: 'admin@skillswap.com',
    password: 'adminpassword',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=120',
    bio: 'Official Admin Account for SkillSwap content moderation and platform performance tracking.',
    institute: 'SkillSwap Headquarters',
    skillsOffered: ['Content Moderation', 'Conflict Resolution'],
    skillsWanted: [],
    experienceLevel: 'Advanced',
    availability: 'Online',
    availabilityTiming: '24/7',
    socialLinks: { email: 'admin@skillswap.com' },
    xp: 1000,
    level: 10,
    badges: [{ id: 'b-adm', name: 'Admin Staff', icon: '🛡️', color: 'bg-red-500/20 text-red-300 border-red-500/30', description: 'SkillSwap Official Moderator' }],
    status: 'Active',
    role: 'Admin'
  }
];

const INITIAL_CHATS = [
  {
    id: 'chat-sarah-alex',
    participants: ['user-sarah', 'user-alex'],
    messages: [
      { id: 'm1', senderId: 'user-alex', text: 'Hey Sarah! I saw you are teaching React.js and looking for Python. I would love to do a swap!', timestamp: '2026-06-19T10:00:00Z' },
      { id: 'm2', senderId: 'user-sarah', text: 'Hi Alex! That sounds amazing. Yes, I really need some help with my Python assignments. What React concepts do you want to learn?', timestamp: '2026-06-19T10:05:00Z' },
      { id: 'm3', senderId: 'user-alex', text: 'I am building a web app and need to learn about hooks (useEffect, useContext) and state management. Let\'s schedule a call!', timestamp: '2026-06-19T10:10:00Z' }
    ]
  },
  {
    id: 'chat-sarah-elena',
    participants: ['user-sarah', 'user-elena'],
    messages: [
      { id: 'm4', senderId: 'user-elena', text: 'Hello Sarah! I can teach you UI/UX design (Figma components, layouts) in exchange for React.', timestamp: '2026-06-20T08:30:00Z' }
    ]
  }
];

const INITIAL_BOOKINGS = [
  {
    id: 'book-1',
    senderId: 'user-sarah',
    receiverId: 'user-alex',
    senderSkill: 'React.js',
    receiverSkill: 'Python',
    date: '2026-06-25',
    time: '15:00',
    status: 'Accepted',
    meetLink: 'https://meet.google.com/abc-defg-hij',
    notes: 'First session: Setting up Python environment and React functional components.'
  },
  {
    id: 'book-2',
    senderId: 'user-elena',
    receiverId: 'user-sarah',
    senderSkill: 'UI/UX Design',
    receiverSkill: 'React.js',
    date: '2026-06-28',
    time: '10:00',
    status: 'Pending',
    meetLink: 'https://meet.google.com/xyz-pdqk-lmn',
    notes: 'Let\'s design a landing page together!'
  }
];

const INITIAL_REPORTS = [
  {
    id: 'rep-1',
    reporterId: 'user-clara',
    reportedUserId: 'user-marcus',
    reason: 'Spamming connection requests with copy-pasted messages.',
    timestamp: '2026-06-20T05:00:00Z',
    status: 'Pending'
  }
];

export const DatabaseProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('ss_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem('ss_chats');
    return saved ? JSON.parse(saved) : INITIAL_CHATS;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('ss_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('ss_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('ss_notifications');
    return saved ? JSON.parse(saved) : [
      { id: 'n1', userId: 'user-sarah', text: 'Alex Mercer accepted your Booking request!', read: false, type: 'booking', timestamp: '2026-06-19T10:15:00Z' },
      { id: 'n2', userId: 'user-sarah', text: 'Elena Rostova sent you a new message.', read: false, type: 'chat', timestamp: '2026-06-20T08:30:00Z' }
    ];
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ss_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('ss_chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('ss_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('ss_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('ss_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Gamification: XP Addition & Level Up triggers
  const addXP = (userId, amount) => {
    setUsers(prev => prev.map(u => {
      if (u.id !== userId) return u;
      const newXP = u.xp + amount;
      const newLevel = Math.floor(newXP / 100) + 1;
      const leveledUp = newLevel > u.level;

      if (leveledUp) {
        // Trigger visual confetti
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
        
        // Add a level up notification
        addNotification(userId, `🎉 Congratulations! You reached Level ${newLevel}! Keep sharing your skills!`, 'system');

        // Check and reward badge
        let updatedBadges = [...u.badges];
        if (newLevel >= 5 && !updatedBadges.some(b => b.id === 'badge-level5')) {
          updatedBadges.push({
            id: 'badge-level5',
            name: 'Skill Master',
            icon: '🏆',
            color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
            description: 'Reached Level 5'
          });
          addNotification(userId, `🏆 Awarded new badge: Skill Master!`, 'system');
        }
        
        return { ...u, xp: newXP, level: newLevel, badges: updatedBadges };
      }
      return { ...u, xp: newXP };
    }));
  };

  // Add Notification
  const addNotification = (userId, text, type) => {
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}-${Math.random()}`,
        userId,
        text,
        read: false,
        type,
        timestamp: new Date().toISOString()
      },
      ...prev
    ]);
  };

  const markNotificationAsRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const clearNotifications = (userId) => {
    setNotifications(prev => prev.filter(n => n.userId !== userId));
  };

  // Smart Matching: Dual-Reciprocity Engine
  const calculateMatchScore = (userA, userB) => {
    if (!userA || !userB || userA.id === userB.id) return 0;
    
    // User A offered matches User B wanted
    const matchesAtoB = userA.skillsOffered.filter(s => 
      userB.skillsWanted.some(w => w.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(w.toLowerCase()))
    );

    // User B offered matches User A wanted
    const matchesBtoA = userB.skillsOffered.filter(s => 
      userA.skillsWanted.some(w => w.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(w.toLowerCase()))
    );

    // Base reciprocity calculations
    const reciprocityScore = (matchesAtoB.length > 0 && matchesBtoA.length > 0) ? 50 : 0;
    const skillsOfferedScore = matchesAtoB.length * 25;
    const skillsWantedScore = matchesBtoA.length * 25;

    const total = reciprocityScore + skillsOfferedScore + skillsWantedScore;
    return Math.min(total, 100); // capped at 100%
  };

  const getSkillMatches = (user) => {
    if (!user) return [];
    return users
      .filter(u => u.id !== user.id && u.role !== 'Admin' && u.status === 'Active')
      .map(u => ({
        user: u,
        score: calculateMatchScore(user, u),
        commonSkills: {
          teaching: user.skillsOffered.filter(s => u.skillsWanted.some(w => w.toLowerCase().includes(s.toLowerCase()))),
          learning: u.skillsOffered.filter(s => user.skillsWanted.some(w => w.toLowerCase().includes(s.toLowerCase())))
        }
      }))
      .filter(m => m.score > 0)
      .sort((a, b) => b.score - a.score);
  };

  // Chat Actions
  const getOrCreateConversation = (user1Id, user2Id) => {
    const existing = chats.find(c => 
      c.participants.includes(user1Id) && c.participants.includes(user2Id)
    );
    if (existing) return existing;

    const newChat = {
      id: `chat-${Date.now()}`,
      participants: [user1Id, user2Id],
      messages: []
    };

    setChats(prev => [...prev, newChat]);
    return newChat;
  };

  const sendMessage = (chatId, senderId, text, attachment = null) => {
    setChats(prev => prev.map(c => {
      if (c.id !== chatId) return c;
      const updatedMessages = [
        ...c.messages,
        {
          id: `m-${Date.now()}`,
          senderId,
          text,
          timestamp: new Date().toISOString(),
          attachment
        }
      ];

      // Send simulated push alert to the recipient
      const recipientId = c.participants.find(p => p !== senderId);
      const sender = users.find(u => u.id === senderId);
      addNotification(recipientId, `💬 New message from ${sender?.name}: "${text.length > 30 ? text.substring(0, 30) + '...' : text}"`, 'chat');

      // Add a small XP amount for active communication
      addXP(senderId, 5);

      // Trigger automatic AI support or bot response if message is to a particular receiver
      if (recipientId === 'user-admin' || text.toLowerCase().includes('bot') || text.toLowerCase().includes('help')) {
        setTimeout(() => {
          simulateBotResponse(chatId, recipientId, senderId);
        }, 1500);
      }

      return { ...c, messages: updatedMessages };
    }));
  };

  // Automated chatbot simulation
  const simulateBotResponse = (chatId, botId, recipientId) => {
    const botMessages = [
      "Hello! I am the SkillSwap Learning Assistant. 💡 How can I help you today?",
      "To optimize your profile matches, try adding more specific skills like 'Figma prototyping' or 'Next.js router'.",
      "Need a meeting space? Once your match accepts a booking, we automatically generate a virtual conference link for you!",
      "Tip: You earn 50 XP for every completed skill exchange session, which helps you unlock badges like 'Top Mentor'!"
    ];
    const text = botMessages[Math.floor(Math.random() * botMessages.length)];

    setChats(prev => prev.map(c => {
      if (c.id !== chatId) return c;
      return {
        ...c,
        messages: [
          ...c.messages,
          {
            id: `m-bot-${Date.now()}`,
            senderId: botId,
            text,
            timestamp: new Date().toISOString()
          }
        ]
      };
    }));

    addNotification(recipientId, `🤖 Assistant: "${text}"`, 'chat');
  };

  // Booking Actions
  const createBooking = (bookingData) => {
    const newBooking = {
      id: `book-${Date.now()}`,
      ...bookingData,
      status: 'Pending',
      meetLink: `https://meet.google.com/${Math.random().toString(36).substring(2, 5)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 5)}`
    };

    setBookings(prev => [newBooking, ...prev]);
    
    const sender = users.find(u => u.id === bookingData.senderId);
    addNotification(bookingData.receiverId, `📅 ${sender?.name} requested a skill exchange booking session!`, 'booking');
  };

  const updateBookingStatus = (bookingId, status) => {
    setBookings(prev => prev.map(b => {
      if (b.id !== bookingId) return b;
      
      const receiver = users.find(u => u.id === b.receiverId);
      const sender = users.find(u => u.id === b.senderId);

      if (status === 'Accepted') {
        addNotification(b.senderId, `✅ Your booking request with ${receiver?.name} has been Accepted!`, 'booking');
        addXP(b.senderId, 20);
        addXP(b.receiverId, 20);
      } else if (status === 'Rejected') {
        addNotification(b.senderId, `❌ Your booking request with ${receiver?.name} was Declined.`, 'booking');
      } else if (status === 'Completed') {
        addNotification(b.senderId, `🎉 Session with ${receiver?.name} completed! +50 XP rewarded.`, 'booking');
        addNotification(b.receiverId, `🎉 Session with ${sender?.name} completed! +50 XP rewarded.`, 'booking');
        addXP(b.senderId, 50);
        addXP(b.receiverId, 50);
      }

      return { ...b, status };
    }));
  };

  // Moderation / Admin Actions
  const reportUser = (reporterId, reportedUserId, reason) => {
    const newReport = {
      id: `rep-${Date.now()}`,
      reporterId,
      reportedUserId,
      reason,
      timestamp: new Date().toISOString(),
      status: 'Pending'
    };
    setReports(prev => [newReport, ...prev]);
    
    // Notify admin
    addNotification('user-admin', `⚠️ New Content Report filed against user id: ${reportedUserId}`, 'system');
  };

  const resolveReport = (reportId) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'Resolved' } : r));
  };

  const updateUserStatus = (userId, status) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
    
    if (status === 'Suspended') {
      addNotification(userId, `⚠️ Your account has been suspended by the platform moderator due to policy violations.`, 'system');
    } else {
      addNotification(userId, `✅ Your account status has been restored.`, 'system');
    }
  };

  const deleteUser = (userId) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    setBookings(prev => prev.filter(b => b.senderId !== userId && b.receiverId !== userId));
    setChats(prev => prev.filter(c => !c.participants.includes(userId)));
  };

  // User Edit Settings
  const updateUserProfile = (userId, updatedFields) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updatedFields } : u));
    addXP(userId, 15); // Reward for updating profile information!
  };

  const registerUser = (newUser) => {
    setUsers(prev => [...prev, newUser]);
  };

  return (
    <DatabaseContext.Provider value={{
      users,
      chats,
      bookings,
      reports,
      notifications,
      getSkillMatches,
      getOrCreateConversation,
      sendMessage,
      createBooking,
      updateBookingStatus,
      reportUser,
      resolveReport,
      updateUserStatus,
      deleteUser,
      updateUserProfile,
      markNotificationAsRead,
      clearNotifications,
      addXP,
      registerUser
    }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => useContext(DatabaseContext);
