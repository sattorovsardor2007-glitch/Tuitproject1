import React, { useEffect, useState } from "react";
import axios from "axios";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const StatCard = ({ title, count, icon }) => {
  return (
    <div className="bg-white rounded-2xl py-4 px-2 flex flex-col items-center justify-center gap-1 border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full">
      <div className="text-[#a59be0]">
        {icon}
      </div>
      <p className="text-[12px] text-gray-800 font-bold text-center leading-tight mt-1">{title}</p>
      <h3 className="text-[22px] font-bold text-gray-900 leading-none mt-1">{count}</h3>
    </div>
  );
};

const DashboardHome = () => {
  const [user, setUser] = useState(null);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);
  const [isProfitOpen, setIsProfitOpen] = useState(false);
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

      console.log(response.data);

      const users = response.data?.data || [];
console.log("USERS:", users);
console.log("LOCAL:", localStorage.getItem("phone"));

users.forEach((u) => {
  console.log("COMPARE:", u.phone);
});
const currentPhone = localStorage.getItem("phone");

const currentUser = users.find((item) => {
  const apiPhone = item.phone?.replace(/\D/g, "");
  const localPhone = currentPhone?.replace(/\D/g, "");

  return apiPhone === localPhone;
});
console.log("API USERS:", users);
console.log("CURRENT PHONE:", currentPhone);
console.log("FOUND USER:", currentUser);

setUser(currentUser);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  const stats = [
    { title: "Faol talabalar", count: "60", icon: <SchoolOutlinedIcon fontSize="large" /> },
    { title: "Guruhlar", count: "23", icon: <GroupsOutlinedIcon fontSize="large" /> },
    { title: "Joriy oy to'lovlar", count: "0", icon: <CreditCardOutlinedIcon fontSize="large" /> },
    { title: "Qarzdorlar", count: "439", icon: <WarningAmberOutlinedIcon fontSize="large" /> },
    { title: "Muzlatilganlar", count: "4", icon: <AcUnitOutlinedIcon fontSize="large" /> },
    { title: "Arxivdagilar", count: "24", icon: <Inventory2OutlinedIcon fontSize="large" /> },
  ];

  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      {/* Greeting Section */}
      <div>
        <h1 className="text-[28px] font-bold text-gray-900 mb-1">
       Salom, {user?.first_name} {user?.last_name}!
        </h1>
        <p className="text-gray-500 text-[14px]">
          EduCoin platformasiga xush kelibsiz!
        </p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((stat, index) => (
          <StatCard key={index} title={stat.title} count={stat.count} icon={stat.icon} />
        ))}
      </div>

      {/* Summary Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-2">
        {/* Joriy oy uchun to'lovlar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <button 
            onClick={() => setIsPaymentsOpen(!isPaymentsOpen)}
            className="w-full p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <span className="text-[16px] font-bold text-gray-800 text-left">
              Joriy oy uchun to'lovlar
            </span>
            <KeyboardArrowDownIcon className={`text-gray-400 transition-transform duration-300 ${isPaymentsOpen ? "rotate-180" : ""}`} />
          </button>
          <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isPaymentsOpen ? "max-h-96 py-4 border-t border-gray-100 bg-gray-50/50" : "max-h-0 py-0"}`}>
            <p className="text-gray-500 text-sm">To'lovlar bo'yicha batafsil ma'lumotlar bu yerda joylashadi...</p>
          </div>
        </div>

        {/* Yillik Foyda */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <button 
            onClick={() => setIsProfitOpen(!isProfitOpen)}
            className="w-full p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <span className="text-[16px] font-bold text-gray-800">
              Yillik Foyda
            </span>
            <KeyboardArrowDownIcon className={`text-gray-400 transition-transform duration-300 ${isProfitOpen ? "rotate-180" : ""}`} />
          </button>
          <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isProfitOpen ? "max-h-96 py-4 border-t border-gray-100 bg-gray-50/50" : "max-h-0 py-0"}`}>
            <p className="text-gray-500 text-sm">Yillik foyda ko'rsatkichlari bu yerda joylashadi...</p>
          </div>
        </div>
      </div>

      {/* Dars Jadvali Accordion */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-4">
        <button
          onClick={() => setIsScheduleOpen(!isScheduleOpen)}
          className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
        >
          <span className="text-[15px] font-semibold text-gray-800">
            Dars Jadvali
          </span>
          <KeyboardArrowDownIcon
            className={`text-gray-400 transition-transform duration-300 ${
              isScheduleOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {/* Accordion Content */}
        <div
          className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${
            isScheduleOpen ? "max-h-96 py-4 border-t border-gray-100" : "max-h-0 py-0"
          }`}
        >
          <p className="text-gray-500 text-sm">
            Bu yerda dars jadvali ko'rsatiladi...
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
