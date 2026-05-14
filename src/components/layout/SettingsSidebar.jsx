import React from "react";
import { NavLink } from "react-router-dom";
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

const SettingsSidebar = ({ isOpen }) => {
  const menuItems = [
    { name: "Kurslar", path: "/dashboard/settings/courses", icon: <ClassOutlinedIcon fontSize="small" /> },
    { name: "Xonalar", path: "/dashboard/settings/rooms", icon: <MeetingRoomOutlinedIcon fontSize="small" /> },
    { name: "Filial", path: "/dashboard/settings/branches", icon: <BusinessOutlinedIcon fontSize="small" /> },
    { name: "Hodimlar", path: "/dashboard/settings/employees", icon: <PeopleOutlineOutlinedIcon fontSize="small" /> },
    { name: "Sabablar", path: "/dashboard/settings/reasons", icon: <FormatListBulletedOutlinedIcon fontSize="small" /> },
    { name: "Rollar", path: "/dashboard/settings/roles", icon: <SupervisorAccountOutlinedIcon fontSize="small" /> },
    { name: "Coin", path: "/dashboard/settings/coin", icon: <MonetizationOnOutlinedIcon fontSize="small" /> },
    { name: "Xabar Yuborish", path: "/dashboard/settings/messages", icon: <ChatBubbleOutlineOutlinedIcon fontSize="small" /> },
    { name: "FAQ", path: "/dashboard/settings/faq", icon: <HelpOutlineOutlinedIcon fontSize="small" /> },
    { name: "Tekshiruv", path: "/dashboard/settings/check", icon: <VerifiedUserOutlinedIcon fontSize="small" /> },
  ];

  return (
    <aside
      className={`${
        isOpen ? "w-64 border-l border-gray-100" : "w-0 overflow-hidden"
      } bg-white h-screen shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-300 flex flex-col`}
    >
      <div className="p-6 pb-2">
        <h2 className="text-lg font-bold text-gray-800">Menu</h2>
      </div>
      
      <nav className="flex-1 px-4 py-2 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-[14px] font-medium ${
                isActive
                  ? "bg-gray-50 text-[#6C5DD3]"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <span className="flex items-center justify-center text-gray-400">
              {item.icon}
            </span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SettingsSidebar;
