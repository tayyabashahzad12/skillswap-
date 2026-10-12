import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDatabase } from './DatabaseContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { users, registerUser } = useDatabase();
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = sessionStorage.getItem('ss_current_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [error, setError] = useState('');

  // Sync session storage with currentUser state
  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem('ss_current_user', JSON.stringify(currentUser));
    } else {
      sessionStorage.removeItem('ss_current_user');
    }
  }, [currentUser]);

  // Keep currentUser state in sync with any updates in the central database users list
  useEffect(() => {
    if (currentUser) {
      const dbUser = users.find(u => u.id === currentUser.id);
      if (dbUser) {
        setCurrentUser(dbUser);
      }
    }
  }, [users]);

  const login = (email, password) => {
    setError('');
    const user = users.find(u => u.email === email);
    
    if (!user) {
      setError('No student account found with this email address.');
      return false;
    }
    
    if (user.password !== password) {
      setError('Invalid password. Please try again.');
      return false;
    }

    if (user.status === 'Suspended') {
      setError('This account has been suspended for policy violations.');
      return false;
    }

    setCurrentUser(user);
    return true;
  };

  const register = (name, email, password, institute) => {
    setError('');
    
    // Check if email already exists
    const exists = users.some(u => u.email === email);
    if (exists) {
      setError('An account with this email already exists.');
      return false;
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      bio: 'Hey there! I just joined SkillSwap and would love to exchange knowledge.',
      institute,
      skillsOffered: [],
      skillsWanted: [],
      experienceLevel: 'Beginner',
      availability: 'Online',
      availabilityTiming: 'Flexible hours',
      socialLinks: {
        email: email
      },
      xp: 0,
      level: 1,
      badges: [],
      status: 'Active',
      role: 'User'
    };

    registerUser(newUser);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      setCurrentUser,
      login,
      register,
      logout,
      error,
      setError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
