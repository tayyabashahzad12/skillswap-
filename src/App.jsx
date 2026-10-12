import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import LoginRegister from './pages/LoginRegister';
import Explore from './pages/Explore';
import Dashboard from './pages/Dashboard';
import MatchesBoard from './pages/MatchesBoard';
import Chat from './pages/Chat';
import ProfileManagement from './pages/ProfileManagement';
import AdminDashboard from './pages/AdminDashboard';
import SettingsPage from './pages/Settings';

import { DatabaseProvider } from './context/DatabaseContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

function AppContent() {
  const [activePage, setActivePage] = useState('home');
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const { currentUser } = useAuth();

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} />;
      case 'about':
        return <About />;
      case 'login':
        return <LoginRegister setActivePage={setActivePage} />;
      case 'explore':
        return <Explore setActivePage={setActivePage} setSelectedChatUser={setSelectedChatUser} />;
      case 'dashboard':
        return currentUser ? (
          <Dashboard setActivePage={setActivePage} setSelectedChatUser={setSelectedChatUser} />
        ) : (
          <LoginRegister setActivePage={setActivePage} />
        );
      case 'matches':
        return currentUser ? (
          <MatchesBoard setActivePage={setActivePage} setSelectedChatUser={setSelectedChatUser} />
        ) : (
          <LoginRegister setActivePage={setActivePage} />
        );
      case 'chat':
        return currentUser ? (
          <Chat selectedChatUser={selectedChatUser} setSelectedChatUser={setSelectedChatUser} />
        ) : (
          <LoginRegister setActivePage={setActivePage} />
        );
      case 'profile':
        return currentUser ? (
          <ProfileManagement />
        ) : (
          <LoginRegister setActivePage={setActivePage} />
        );
      case 'admin':
        return currentUser && currentUser.role === 'Admin' ? (
          <AdminDashboard />
        ) : (
          <Home setActivePage={setActivePage} />
        );
      case 'settings':
        return currentUser ? (
          <SettingsPage />
        ) : (
          <LoginRegister setActivePage={setActivePage} />
        );
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-slate-100">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer setActivePage={setActivePage} />
    </div>
  );
}

export default function App() {
  return (
    <DatabaseProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </DatabaseProvider>
  );
}
