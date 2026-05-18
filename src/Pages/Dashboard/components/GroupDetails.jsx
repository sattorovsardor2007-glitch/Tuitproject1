import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ChevronLeft";
import BarChartIcon from "@mui/icons-material/BarChartOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const GroupDetails = ({ group, onBack }) => {
  const [activeTab, setActiveTab] = useState("info");
  const [currentMonth, setCurrentMonth] = useState(1);

  // Formatting days from "Du, Se, Chor, Pay, Ju" to "Du/Se/Ch/Pa/Ju"
  const formatDaysForSchedule = (daysStr) => {
    if (!daysStr) return "Du/Se/Ch/Pa/Ju";
    const dayMap = {
      "Du": "Du",
      "Se": "Se",
      "Chor": "Ch",
      "Pay": "Pa",
      "Ju": "Ju",
      "Shan": "Shan",
      "Yak": "Yak",
      "Dushanba": "Du",
      "Seshanba": "Se",
      "Chorshanba": "Ch",
      "Payshanba": "Pa",
      "Juma": "Ju",
      "Shanba": "Shan",
      "Yakshanba": "Yak"
    };
    return daysStr
      .split(",")
      .map(d => d.trim())
      .map(d => dayMap[d] || d)
      .join("/");
  };

  const scheduleDays = formatDaysForSchedule(group.days);

  // Mock Calendar Days
  const calendarDays = [
    { month: "May", day: 2, isActive: true },
    { month: "May", day: 5, isActive: true },
    { month: "May", day: 7, isActive: true },
    { month: "May", day: 9, isActive: true },
    { month: "May", day: 12, isActive: true },
    { month: "May", day: 14, isActive: false },
    { month: "May", day: 16, isActive: false },
    { month: "May", day: 19, isActive: false },
    { month: "May", day: 21, isActive: false },
    { month: "May", day: 23, isActive: false },
    { month: "May", day: 26, isActive: false },
    { month: "May", day: 28, isActive: false },
    { month: "May", day: 30, isActive: false },
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Back Button & Title Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-500 cursor-pointer"
          >
            <ArrowBackIcon sx={{ fontSize: 24 }} />
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-[24px] font-bold text-gray-900 tracking-tight leading-none">
              Bootcamp Full Stack {group.name}
            </h1>
            <span className="bg-[#E6F4EA] text-[#137333] px-2.5 py-0.5 rounded-lg text-[11px] font-bold leading-normal uppercase">
              {group.isActive ? "Aktiv" : "Faol emas"}
            </span>
          </div>
        </div>
        <button className="flex items-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl font-bold text-[13.5px] transition-all cursor-pointer shadow-sm">
          <BarChartIcon sx={{ fontSize: 18 }} />
          Statistika
        </button>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-8 border-b border-gray-100">
        <button
          onClick={() => setActiveTab("info")}
          className={`pb-3 text-[14.5px] font-bold transition-all relative cursor-pointer ${
            activeTab === "info" ? "text-[#6C5DD3]" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Ma'lumotlar
          {activeTab === "info" && (
            <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#6C5DD3] rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("books")}
          className={`pb-3 text-[14.5px] font-bold transition-all relative cursor-pointer ${
            activeTab === "books" ? "text-[#6C5DD3]" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Guruh darsliklari
          {activeTab === "books" && (
            <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#6C5DD3] rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("attendance")}
          className={`pb-3 text-[14.5px] font-bold transition-all relative cursor-pointer ${
            activeTab === "attendance" ? "text-[#6C5DD3]" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Akademik davomati
          {activeTab === "attendance" && (
            <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#6C5DD3] rounded-full" />
          )}
        </button>
      </div>

      {activeTab === "info" && (
        <>
          {/* Grid Panel Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start">
            {/* Guruh mentorlari Card */}
            <div className="bg-white rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 flex flex-col">
              {/* Card Blue Header */}
              <div className="bg-[#3B82F6] px-6 py-4 flex items-center justify-between text-white">
                <span className="font-bold text-[15px] tracking-wide">Guruh mentorlari</span>
                <button className="text-white/80 hover:text-white transition-colors cursor-pointer">
                  <CloseIcon sx={{ fontSize: 20 }} />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col items-start gap-4 flex-1 min-h-[140px] bg-white">
                {/* Styled Avatar Circle */}
                <div className="w-[64px] h-[64px] rounded-full shadow-sm bg-gray-100 flex items-center justify-center border border-gray-100 overflow-hidden flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80" 
                    alt={group.teacher || "Mohirbek"} 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Badge & Name */}
                <div className="flex flex-col items-start gap-1">
                  <span className="text-[12px] font-semibold text-[#10B981] tracking-wide">
                    Teacher
                  </span>
                  <span className="text-[15px] font-bold text-gray-800">
                    {group.teacher || "Mohirbek"}
                  </span>
                </div>
              </div>
            </div>

            {/* Parametrar Card */}
            <div className="bg-white rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 flex flex-col">
              {/* Card Blue Header */}
              <div className="bg-[#3B82F6] px-6 py-4 flex items-center justify-between text-white">
                <span className="font-bold text-[15px] tracking-wide">Parametrar</span>
                <button className="text-white/80 hover:text-white transition-colors cursor-pointer">
                  <CloseIcon sx={{ fontSize: 20 }} />
                </button>
              </div>

              {/* Card Body with Grid List */}
              <div className="p-6 flex flex-col gap-0.5">
                <div className="flex items-center justify-between py-2.5 border-b border-gray-50">
                  <span className="text-gray-400 font-semibold text-[13.5px]">Kurs:</span>
                  <span className="text-gray-900 font-bold text-[14px]">{group.course}</span>
                </div>
                <div className="flex items-center justify-between py-2.5 border-b border-gray-50">
                  <span className="text-gray-400 font-semibold text-[13.5px]">O'rta yosh:</span>
                  <span className="text-gray-900 font-bold text-[14px]">15</span>
                </div>
                <div className="flex items-center justify-between py-2.5 border-b border-gray-50">
                  <span className="text-gray-400 font-semibold text-[13.5px]">O'quvchilar sig'imi:</span>
                  <span className="text-gray-900 font-bold text-[14px]">20</span>
                </div>
                <div className="flex items-center justify-between py-2.5 border-b border-gray-50">
                  <span className="text-gray-400 font-semibold text-[13.5px]">Mavjud o'quvchilar:</span>
                  <span className="text-gray-900 font-bold text-[14px]">{group.studentsCount || 0}</span>
                </div>
                <div className="flex items-center justify-between py-2.5 border-b border-gray-50">
                  <span className="text-gray-400 font-semibold text-[13.5px]">O'quv oydagi darslar soni:</span>
                  <span className="text-gray-900 font-bold text-[14px]">20</span>
                </div>
                <div className="flex items-center justify-between py-2.5 border-b border-gray-50">
                  <span className="text-gray-400 font-semibold text-[13.5px]">Kurs davomiyligi (oy):</span>
                  <span className="text-gray-900 font-bold text-[14px]">6.0</span>
                </div>
                <div className="flex items-center justify-between py-2.5 last:border-b-0">
                  <span className="text-gray-400 font-semibold text-[13.5px]">Jami darslar soni:</span>
                  <span className="text-gray-900 font-bold text-[14px]">20</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dars Jadvali Section (Image 2) */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col gap-6 mt-1">
            <h3 className="text-[17.5px] font-bold text-gray-800 leading-none">Dars jadvali</h3>

            {/* Schedule List */}
            <div className="flex flex-col gap-3">
              {/* Row 1 */}
              <div className="bg-[#F8FAFC] border border-gray-100/50 rounded-2xl px-6 py-4 flex items-center justify-between text-[13.5px]">
                <div className="w-[25%] font-bold text-[#2563EB] hover:underline cursor-pointer transition-all">
                  {group.teacher || "Mohirbek"}
                </div>
                <div className="w-[18%] font-bold text-gray-600">
                  {scheduleDays}
                </div>
                <div className="w-[20%] font-semibold text-gray-500">
                  {group.time || "09:30"} dan - 12:30 gacha
                </div>
                <div className="w-[22%] font-semibold text-gray-500">
                  15 Yan, 2026 - 27 Iyun, 2026
                </div>
                <div className="w-[15%] text-right font-semibold text-gray-500">
                  F2 {group.room || "Autodesk"} // 18
                </div>
              </div>

              {/* Row 2 */}
              <div className="bg-[#F8FAFC] border border-gray-100/50 rounded-2xl px-6 py-4 flex items-center justify-between text-[13.5px]">
                <div className="w-[25%] font-bold text-[#2563EB] hover:underline cursor-pointer transition-all">
                  +++Yusupova Barchinoy
                </div>
                <div className="w-[18%] font-bold text-gray-600">
                  {scheduleDays}
                </div>
                <div className="w-[20%] font-semibold text-gray-500">
                  08:00 dan - 09:30 gacha
                </div>
                <div className="w-[22%] font-semibold text-gray-500">
                  15 Yan, 2026 - 27 Iyun, 2026
                </div>
                <div className="w-[15%] text-right font-semibold text-gray-500">
                  F2 {group.room || "Autodesk"} // 18
                </div>
              </div>
            </div>

            {/* Show More Button */}
            <button className="border border-gray-200 text-gray-500 rounded-full px-5 py-1.5 text-[12px] font-semibold hover:bg-gray-50 transition-colors mx-auto cursor-pointer flex items-center justify-center">
              Yana ko'rsatish (9)
            </button>

            {/* Calendar dates view */}
            <div className="flex flex-col gap-4 border-t border-gray-50 pt-5 mt-2">
              {/* Pagination */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setCurrentMonth(prev => Math.max(1, prev - 1))}
                  className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <ChevronLeftIcon sx={{ fontSize: 18 }} />
                </button>
                <span className="text-[13.5px] font-bold text-gray-700 select-none">
                  {currentMonth}-o'quv oyi
                </span>
                <button 
                  onClick={() => setCurrentMonth(prev => prev + 1)}
                  className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <ChevronRightIcon sx={{ fontSize: 18 }} />
                </button>
              </div>

              {/* Day capsules row */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {calendarDays.map((cal, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col items-center justify-center w-[52px] h-[58px] rounded-lg border flex-shrink-0 transition-all select-none ${
                      cal.isActive
                        ? "bg-[#DFE4F2] border-transparent text-[#5A6C8C]"
                        : "bg-white border-gray-200/80 text-gray-400"
                    }`}
                  >
                    <span className={`text-[9px] font-bold uppercase tracking-wider ${
                      cal.isActive ? "text-[#5A6C8C]/80" : "text-gray-400"
                    }`}>
                      {cal.month}
                    </span>
                    <span className={`text-[15px] font-extrabold mt-0.5 leading-none ${
                      cal.isActive ? "text-[#4A5A75]" : "text-gray-700"
                    }`}>
                      {cal.day}
                    </span>
                  </div>
                ))}
              </div>

              {/* View All Button */}
              <button className="border border-gray-200 text-gray-500 rounded-xl px-7 py-2 text-[13px] font-bold hover:bg-gray-50 transition-colors mx-auto cursor-pointer flex items-center justify-center w-full max-w-[190px] mt-2">
                Barchasini ko'rish
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GroupDetails;
