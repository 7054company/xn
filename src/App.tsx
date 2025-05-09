import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Settings from './pages/Settings';
import Services from './pages/Services';
import Activity from './pages/Activity';
import AI from './pages/AI';
import { Layout } from 'lucide-react';
import ProfileMenu from './components/ProfileMenu';
import CommandMenu from './components/CommandMenu';
import Footer from './components/Footer';
import Loader from './components/Loader'; // Import the Loader component

function App() {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading delay or any async operation
    const loadApp = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(loadApp);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) return <Loader />; // Show loader while loading

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 fixed w-full z-10 flex items-center justify-between px-4 h-16">
          <div className="flex items-center">
            <Layout className="h-8 w-8 text-blue-500 mr-2" />
            <span className="font-bold text-xl text-gray-800">MyDashboard</span>
          </div>
          <div className="ml-auto">
            <ProfileMenu setCommandMenuOpen={setCommandMenuOpen} />
          </div>
        </header>

        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className="flex-shrink-0 pt-16 border-r border-gray-200 bg-white"
        >
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 pt-16 overflow-y-auto">
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/account" element={<Account />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/services" element={<Services />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/ai" element={<AI />} />
            </Routes>
          </main>
          <Footer />
        </div>

        {/* Command Menu Overlay */}
        <CommandMenu isOpen={commandMenuOpen} setIsOpen={setCommandMenuOpen} />
      </div>
    </Router>
  );
}

export default App;
