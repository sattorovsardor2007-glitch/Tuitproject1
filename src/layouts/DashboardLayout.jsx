import React, { useState, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import SettingsSidebar from "../components/layout/SettingsSidebar";
import Header from "../components/layout/Header";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const location = useLocation();
  const isSettingsActive = location.pathname.includes('/dashboard/settings');
  const isSettingsRoot = location.pathname === '/dashboard/settings';

  const sidebarAreaRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the menu if clicked outside the sidebar/menu area
      if (sidebarAreaRef.current && !sidebarAreaRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleIconClick = () => {
    setIsSidebarOpen(true);
  };

  const handleSettingsClick = (e) => {
    if (isSettingsActive) {
      if (e) e.preventDefault();
      setIsMenuOpen(prev => !prev);
    } else {
      setIsMenuOpen(true);
    }
  };

  return (
    <div className="flex h-screen bg-[#f8f9fc] overflow-hidden font-sans relative">
      {/* Sidebar Area with toggle button on its edge */}
      <div ref={sidebarAreaRef} className="relative z-50 flex-shrink-0 h-full flex">
        <div className="relative h-full z-20">
          <Sidebar 
            isOpen={isSidebarOpen} 
            onIconClick={handleIconClick} 
            onSettingsClick={handleSettingsClick} 
          />
          
          {/* Collapse Button placed between Sidebar and SettingsSidebar */}
          <button
            onClick={toggleSidebar}
            className={`absolute top-[24px] w-[30px] h-[30px] rounded-lg bg-[#6C5DD3] text-white flex items-center justify-center hover:bg-[#5b4eb3] transition-all duration-300 shadow-md shadow-[#6c5dd3]/30 z-50 border border-white -right-[15px]`}
          >
            <svg className={`w-4 h-4 transition-transform duration-300 ${!isSidebarOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        
        {/* Absolute positioned overlay menu so it covers Header and main content */}
        {isSettingsActive && (
          <div className="absolute top-0 bottom-0 left-full z-10 pointer-events-none">
            <div className="pointer-events-auto h-full shadow-xl">
              <SettingsSidebar isOpen={isMenuOpen} onItemClick={() => setIsMenuOpen(false)} />
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-0">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main 
          className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
