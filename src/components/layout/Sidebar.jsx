import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlined";
import LayersIcon from "@mui/icons-material/LayersOutlined";
import SchoolIcon from "@mui/icons-material/SchoolOutlined";
import DiamondIcon from "@mui/icons-material/DiamondOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Sidebar = ({ isOpen, onIconClick, onSettingsClick }) => {
  const location = useLocation();
  const navItems = [
    { name: "Asosiy", path: "/dashboard", icon: <HomeIcon /> },
    { name: "O'qituvchilar", path: "/dashboard/teachers", icon: <PersonIcon /> },
    { name: "Guruhlar", path: "/dashboard/classes", icon: <LayersIcon /> },
    { name: "Talabalar", path: "/dashboard/students", icon: <SchoolIcon /> },
    { name: "Sovg'alar", path: "/dashboard/gifts", icon: <DiamondIcon /> },
    { name: "Moliya", path: "/dashboard/finance", icon: <AccountBalanceWalletOutlinedIcon />, hasCrown: true },
    { name: "Boshqarish", path: "/dashboard/settings", icon: <SettingsIcon /> },
  ];

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-white h-screen shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-300 flex flex-col`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-2.5 p-6 ${!isOpen ? 'justify-center px-0' : ''}`}>
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#EA580C] to-[#F97316] flex items-center justify-center shadow-md shadow-orange-500/20 flex-shrink-0">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.905 0-5.64-.78-8.006-2.141" />
          </svg>
        </div>
        {isOpen && (
          <span className="text-xl font-bold font-sans whitespace-nowrap tracking-tight">
            <span className="text-[#1E293B]">Najot</span>
            <span className="text-[#6C5DD3]">Edu</span>
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className={`flex-1 ${isOpen ? 'px-4' : 'px-2'} mt-2 flex flex-col gap-1`}>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/dashboard"}
            onClick={(e) => {
              if (item.path === "/dashboard/settings" && onSettingsClick) {
                onSettingsClick();
              }
              if (!isOpen && onIconClick) {
                // If already in this section, prevent navigating to the base path
                // so we can "continue from where we left off"
                const isActive = item.path === "/dashboard" 
                  ? location.pathname === "/dashboard" 
                  : location.pathname.startsWith(item.path);
                
                if (isActive) {
                  e.preventDefault();
                }
                onIconClick();
              }
            }}
            className={({ isActive }) =>
              `group relative flex items-center ${isOpen ? 'justify-start px-4 gap-3' : 'justify-center px-0'} py-3 rounded-xl transition-all duration-200 text-[15px] font-medium ${
                isActive
                  ? "bg-[#6C5DD3] text-white shadow-md shadow-[#6c5dd3]/30"
                  : isOpen 
                    ? "text-gray-500 hover:bg-gray-50 hover:text-gray-900" 
                    : "text-gray-500 hover:bg-[#EEEDFC] hover:text-[#6C5DD3]"
              }`
            }
          >
            <span className="flex items-center justify-center">
              {item.icon}
            </span>
            {isOpen && <span className="flex-1 text-left whitespace-nowrap">{item.name}</span>}
            {isOpen && item.hasCrown && (
              <EmojiEventsIcon sx={{ fontSize: 18, color: '#F59E0B' }} />
            )}

            {/* Custom Tooltip when Sidebar is Collapsed */}
            {!isOpen && (
              <div className="absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all duration-200 z-[9999] flex items-center">
                {/* Arrow */}
                <div className="w-0 h-0 border-y-[6px] border-y-transparent border-r-[6px] border-r-[#1E293B]" />
                {/* Tooltip Content */}
                <div className="bg-[#1E293B] text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-md">
                  {item.name}
                </div>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Subscription Card */}
      {isOpen && (
        <div className="p-4 mb-4">
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col items-center text-center gap-2">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 mb-1">
              <AssignmentTurnedInIcon fontSize="small" />
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-gray-800">Obuna</h4>
              <p className="text-[12px] font-medium text-red-500 mt-0.5">
                Obunangiz tugagan
              </p>
            </div>
            <button className="w-full bg-[#EF4444] text-white text-[13px] font-semibold py-2 rounded-lg mt-2 hover:bg-red-600 transition-colors whitespace-nowrap">
              ⚡ Obunani yangilash
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
