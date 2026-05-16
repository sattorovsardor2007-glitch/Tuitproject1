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

const Sidebar = ({ isOpen, onIconClick }) => {
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
      <div className={`flex items-center gap-2 p-6 ${!isOpen ? 'justify-center px-0' : ''}`}>
        <MonetizationOnIcon sx={{ color: '#F59E0B', fontSize: 32 }} />
        {isOpen && (
          <span className="text-[#6C5DD3] text-2xl font-bold font-sans whitespace-nowrap">
            EduCoin
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
              `flex items-center ${isOpen ? 'justify-start px-4 gap-3' : 'justify-center px-0'} py-3 rounded-xl transition-all duration-200 text-[15px] font-medium ${
                isActive
                  ? "bg-[#6C5DD3] text-white shadow-md shadow-[#6c5dd3]/30"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
            title={!isOpen ? item.name : ""}
          >
            <span className="flex items-center justify-center">
              {item.icon}
            </span>
            {isOpen && <span className="flex-1 text-left whitespace-nowrap">{item.name}</span>}
            {isOpen && item.hasCrown && (
              <EmojiEventsIcon sx={{ fontSize: 18, color: '#F59E0B' }} />
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
