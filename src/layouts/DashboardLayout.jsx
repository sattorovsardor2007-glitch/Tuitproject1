import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import SettingsSidebar from "../components/layout/SettingsSidebar";
import Header from "../components/layout/Header";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const isSettingsActive = location.pathname.includes('/dashboard/settings');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-[#f8f9fc] overflow-hidden font-sans relative">
      {/* Sidebar Area with toggle button on its edge */}
      <div className="relative z-50 flex-shrink-0 h-full">
        <Sidebar isOpen={isSidebarOpen} />
        
        {/* SettingsSidebar overlaps main content */}
        <div className="absolute left-full top-0 h-full z-40">
          <SettingsSidebar isOpen={isSidebarOpen && isSettingsActive} />
        </div>

        {/* Collapse Button placed exactly on the border */}
        <button
          onClick={toggleSidebar}
          className={`absolute top-[24px] w-[30px] h-[30px] rounded-lg bg-[#6C5DD3] text-white flex items-center justify-center hover:bg-[#5b4eb3] transition-all duration-300 shadow-md shadow-[#6c5dd3]/30 z-50 border border-white ${isSidebarOpen && isSettingsActive ? '-right-[15px] translate-x-64' : '-right-[15px]'}`}
        >
          <svg className={`w-4 h-4 transition-transform duration-300 ${!isSidebarOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
