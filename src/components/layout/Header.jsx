import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Header = ({ toggleSidebar }) => {
  const firstName = localStorage.getItem("first_name");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
 

const getUser = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "https://najot-edu.softwareengineer.uz/api/v1/users/admin/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const users = response.data?.data || [];

    const currentPhone = localStorage.getItem("phone");

   const currentUser = users.find((item) => {
  const apiPhone = item.phone?.replace(/\D/g, "");
  const localPhone = currentPhone?.replace(/\D/g, "");

  return apiPhone === localPhone;
});

    setUser(currentUser);

  } catch (error) {
    console.log(error);
  }
};
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="h-[80px] bg-[#f8f9fc] flex items-center justify-between px-6 sticky top-0 z-10 pl-10">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Add Button */}
        <div className="relative">
          <button 
            onClick={() => setIsAddOpen(!isAddOpen)}
            className="flex items-center justify-center gap-1 bg-white px-3 py-2 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-gray-700 font-medium"
          >
            <span className="text-lg leading-none">+</span>
            <ExpandMoreIcon fontSize="small" className={`text-gray-400 ml-1 transition-transform ${isAddOpen ? 'rotate-180' : ''}`} />
          </button>
          {isAddOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Yangi o'qituvchi</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Yangi guruh</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Yangi talaba</a>
            </div>
          )}
        </div>
        
        {/* Search Bar */}
        <div className="hidden sm:flex items-center bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm w-[280px]">
          <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Qidirish..." 
            className="bg-transparent border-none outline-none text-[14px] text-gray-700 w-full placeholder-gray-400"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Language Selector */}
        <div className="relative hidden sm:block">
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-1 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <span className="text-[13px] font-medium text-gray-700">O'zbekcha</span>
            <ExpandMoreIcon fontSize="small" className={`text-gray-400 ml-1 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>
          {isLangOpen && (
            <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">O'zbekcha</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Русский</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">English</a>
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
          <NotificationsNoneOutlinedIcon />
        </button>

        {/* Dark Mode */}
        <button 
          onClick={toggleDarkMode}
          className="w-10 h-10 rounded-xl bg-[#202c4b] text-white flex items-center justify-center hover:bg-[#162039] transition-colors shadow-sm"
        >
          <DarkModeOutlinedIcon fontSize="small" />
        </button>

        {/* Profile Avatar */}
        <div className="relative ml-1">
         <button
            className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm block"
          >
          <div className="w-full h-full bg-green-500 flex items-center justify-center text-white font-bold text-lg">
  S
</div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
