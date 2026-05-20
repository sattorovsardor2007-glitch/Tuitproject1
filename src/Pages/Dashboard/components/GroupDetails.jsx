import React, { useState, useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ChevronLeft";
import BarChartIcon from "@mui/icons-material/BarChartOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CodeIcon from '@mui/icons-material/Code';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const GroupDetails = ({ group, onBack }) => {
  const [activeTab, setActiveTab] = useState("info");
  const [activeSubTab, setActiveSubTab] = useState("homework");
  const [isCreatingHomework, setIsCreatingHomework] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);

  const [selectedTopicDetails, setSelectedTopicDetails] = useState(null);
  const [topicTab, setTopicTab] = useState("kutayotganlar");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  if (selectedTopicDetails) {
    return (
      <div className="flex flex-col gap-6 animate-in fade-in duration-200 w-full">
        <div className="flex items-center gap-3 mt-1">
          <button
            onClick={() => setSelectedTopicDetails(null)}
            className="flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer text-gray-800 pr-1"
          >
            <ChevronLeftIcon sx={{ fontSize: 22 }} />
          </button>
          <h1 className="text-[17px] font-extrabold text-gray-900 tracking-tight leading-none">
            {selectedTopicDetails.title}
          </h1>
        </div>

        {/* Info Card */}
        <div className="bg-[#F8FAFC] rounded-2xl p-6 flex items-start justify-start gap-40 mt-1">
          <div className="flex flex-col gap-1.5">
            <span className="text-[12.5px] font-bold text-[#A0AAB4]">Mavzu</span>
            <span className="text-[14px] font-extrabold text-gray-900">{selectedTopicDetails.title}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[12.5px] font-bold text-[#A0AAB4]">Tugash vaqti</span>
            <span className="text-[14px] font-extrabold text-gray-900">{selectedTopicDetails.endDate}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-100 mt-2">
          <button 
            onClick={() => setTopicTab("kutayotganlar")}
            className={`pb-3 text-[13.5px] font-extrabold flex items-center gap-2 relative transition-colors cursor-pointer ${topicTab === "kutayotganlar" ? "text-[#10B981]" : "text-gray-500 hover:text-gray-700"}`}
          >
            Kutayotganlar
            <span className={`w-[22px] h-[22px] rounded-full flex items-center justify-center text-[11.5px] font-bold text-white ${topicTab === "kutayotganlar" ? "bg-[#F59E0B]" : "bg-[#F59E0B]/80"}`}>
              {selectedTopicDetails.stats?.kutayotganlar || 0}
            </span>
            {topicTab === "kutayotganlar" && <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#10B981] rounded-full" />}
          </button>

          <button 
            onClick={() => setTopicTab("qaytarilganlar")}
            className={`pb-3 text-[13.5px] font-extrabold flex items-center gap-2 relative transition-colors cursor-pointer ${topicTab === "qaytarilganlar" ? "text-[#10B981]" : "text-gray-500 hover:text-gray-700"}`}
          >
            Qaytarilganlar
            <span className={`w-[22px] h-[22px] rounded-full flex items-center justify-center text-[11.5px] font-bold text-white ${topicTab === "qaytarilganlar" ? "bg-[#EF4444]" : "bg-[#EF4444]/80"}`}>
              {selectedTopicDetails.stats?.qaytarilganlar || 0}
            </span>
            {topicTab === "qaytarilganlar" && <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#10B981] rounded-full" />}
          </button>

          <button 
            onClick={() => setTopicTab("qabul")}
            className={`pb-3 text-[13.5px] font-extrabold flex items-center gap-2 relative transition-colors cursor-pointer ${topicTab === "qabul" ? "text-[#10B981]" : "text-gray-500 hover:text-gray-700"}`}
          >
            Qabul qilinganlar
            <span className={`w-[22px] h-[22px] rounded-full flex items-center justify-center text-[11.5px] font-bold text-white ${topicTab === "qabul" ? "bg-[#10B981]" : "bg-[#10B981]/80"}`}>
              {selectedTopicDetails.stats?.qabul || 0}
            </span>
            {topicTab === "qabul" && <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#10B981] rounded-full" />}
          </button>

          <button 
            onClick={() => setTopicTab("bajarilmagan")}
            className={`pb-3 text-[13.5px] font-extrabold flex items-center gap-2 relative transition-colors cursor-pointer ${topicTab === "bajarilmagan" ? "text-[#10B981]" : "text-gray-500 hover:text-gray-700"}`}
          >
            Bajarilmagan
            <span className={`w-[22px] h-[22px] rounded-full flex items-center justify-center text-[11.5px] font-bold text-white ${topicTab === "bajarilmagan" ? "bg-[#10B981]" : "bg-[#10B981]/80"}`}>
              {selectedTopicDetails.stats?.bajarilmagan || 0}
            </span>
            {topicTab === "bajarilmagan" && <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#10B981] rounded-full" />}
          </button>
        </div>

        {/* Empty State */}
        <div className="flex flex-col mt-4">
          <div className="grid grid-cols-2 pb-5 border-b border-gray-50">
            <span className="text-[13px] font-bold text-[#A0AAB4]">O'quvchi ismi</span>
            <span className="text-[13px] font-bold text-[#A0AAB4] text-center pr-20">Uyga vazifa jo'natilgan vaqt</span>
          </div>
          <div className="flex justify-center items-center py-24 text-[13.5px] font-bold text-[#A0AAB4]">
            Ma'lumot mavjud emas
          </div>
        </div>
      </div>
    );
  }

  if (isCreatingHomework) {
    return (
      <div className="flex flex-col gap-8 animate-in fade-in duration-200 w-full max-w-5xl">
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => setIsCreatingHomework(false)}
            className="flex items-center justify-center hover:bg-gray-100 p-1 rounded-full transition-colors cursor-pointer text-gray-800"
          >
            <ChevronLeftIcon sx={{ fontSize: 24 }} />
          </button>
          <h1 className="text-[22px] font-bold text-gray-900 tracking-tight leading-none">
            Yangi uyga vazifa yaratish
          </h1>
        </div>

        <div className="flex flex-col gap-8 w-full mt-2">
          {/* Mavzu */}
          <div className="flex flex-col gap-2.5">
            <label className="text-[13.5px] font-extrabold text-gray-900">
              <span className="text-red-500 mr-0.5">*</span>Mavzu
            </label>
            <div className="relative w-full" ref={dropdownRef}>
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full bg-white border ${isDropdownOpen ? 'border-[#3B82F6]' : 'border-gray-200'} rounded-lg px-4 py-3 text-[14px] ${selectedTopic ? 'text-gray-800' : 'text-[#8C98A4]'} font-medium outline-none transition-colors cursor-pointer flex items-center justify-between`}
              >
                <span>{selectedTopic || "Mavzulardan birini tanlang"}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className={`text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                  <polygon points="7 9 12 14 17 9"></polygon>
                </svg>
              </div>
              
              {isDropdownOpen && (
                <div className="absolute top-[calc(100%+2px)] left-0 w-full bg-white border border-gray-100 rounded-b-lg shadow-[0_8px_24px_rgba(0,0,0,0.12)] py-1 z-10 overflow-hidden">
                  <div className="px-4 py-2.5 text-[13.5px] text-[#A0AAB4] font-medium pointer-events-none">Mavzulardan birini tanlang</div>
                  <div 
                    className="px-4 py-2 hover:bg-gray-50 text-[14px] text-gray-800 cursor-pointer transition-colors"
                    onClick={() => { setSelectedTopic("Html asoslari"); setIsDropdownOpen(false); }}
                  >
                    Html asoslari
                  </div>
                  <div 
                    className="px-4 py-2 hover:bg-gray-50 text-[14px] text-gray-800 cursor-pointer transition-colors"
                    onClick={() => { setSelectedTopic("Kirish"); setIsDropdownOpen(false); }}
                  >
                    Kirish
                  </div>
                  <div 
                    className="px-4 py-2 hover:bg-gray-50 text-[14px] text-gray-800 cursor-pointer transition-colors"
                    onClick={() => { setSelectedTopic("Nodejs"); setIsDropdownOpen(false); }}
                  >
                    Nodejs
                  </div>
                  <div 
                    className="px-4 py-2 hover:bg-gray-50 text-[14px] text-gray-800 cursor-pointer transition-colors"
                    onClick={() => { setSelectedTopic("takrorlash"); setIsDropdownOpen(false); }}
                  >
                    takrorlash
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Izoh */}
          <div className="flex flex-col gap-2.5">
            <label className="text-[13.5px] font-extrabold text-gray-900">
              <span className="text-red-500 mr-0.5">*</span>Izoh
            </label>
            <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              {/* Toolbar */}
              <div className="flex items-center gap-1.5 border-b border-gray-50 bg-white px-4 py-3 text-gray-500 flex-wrap">
                <button className="px-2 py-1 text-[13.5px] font-bold hover:bg-gray-50 rounded text-gray-700 transition-colors cursor-pointer">H1</button>
                <button className="px-2 py-1 text-[13.5px] font-bold hover:bg-gray-50 rounded text-gray-700 transition-colors cursor-pointer">H2</button>
                
                <div className="w-px h-5 bg-gray-100 mx-1"></div>
                
                <select className="bg-transparent text-[13px] font-bold text-gray-600 outline-none cursor-pointer px-1">
                  <option>Sans Serif</option>
                </select>
                
                <div className="w-px h-5 bg-gray-100 mx-1"></div>
                
                <select className="bg-transparent text-[13px] font-bold text-gray-600 outline-none cursor-pointer px-1">
                  <option>Normal</option>
                </select>
                
                <div className="w-px h-5 bg-gray-100 mx-2"></div>
                
                <button className="p-1 hover:bg-gray-50 rounded transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"><FormatBoldIcon sx={{ fontSize: 18 }} /></button>
                <button className="p-1 hover:bg-gray-50 rounded transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"><FormatItalicIcon sx={{ fontSize: 18 }} /></button>
                <button className="p-1 hover:bg-gray-50 rounded transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"><FormatUnderlinedIcon sx={{ fontSize: 18 }} /></button>
                <button className="p-1 hover:bg-gray-50 rounded transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"><StrikethroughSIcon sx={{ fontSize: 18 }} /></button>
                <button className="p-1 hover:bg-gray-50 rounded transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"><FormatQuoteIcon sx={{ fontSize: 18 }} /></button>
                <button className="p-1 hover:bg-gray-50 rounded transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"><CodeIcon sx={{ fontSize: 18 }} /></button>
                
                <div className="w-px h-5 bg-gray-100 mx-2"></div>
                
                <button className="p-1 hover:bg-gray-50 rounded transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"><FormatListBulletedIcon sx={{ fontSize: 18 }} /></button>
                <button className="p-1 hover:bg-gray-50 rounded transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"><FormatListNumberedIcon sx={{ fontSize: 18 }} /></button>
                <button className="p-1 hover:bg-gray-50 rounded transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"><FormatAlignLeftIcon sx={{ fontSize: 18 }} /></button>
                <button className="p-1 hover:bg-gray-50 rounded transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"><FormatAlignCenterIcon sx={{ fontSize: 18 }} /></button>
                <button className="p-1 hover:bg-gray-50 rounded transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"><InsertLinkIcon sx={{ fontSize: 18 }} /></button>
              </div>
              <textarea 
                className="w-full min-h-[180px] p-5 text-[14px] text-gray-700 outline-none resize-y placeholder-gray-400 font-medium" 
                placeholder="Vazifa haqida batafsil ma'lumot kiriting..."
              ></textarea>
            </div>
          </div>

          {/* Upload */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border border-dashed border-gray-200 rounded-2xl bg-white flex flex-col items-center justify-center py-12 cursor-pointer hover:bg-gray-50 transition-colors mt-2 shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
          >
            <input type="file" ref={fileInputRef} className="hidden" />
            <div className="text-[#10B981] mb-3">
              <CloudUploadIcon sx={{ fontSize: 40 }} />
            </div>
            <span className="text-[13.5px] font-bold text-gray-400">
              Faylni tanlash yoki shu yerga tashlang
            </span>
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-4 mt-6">
            <button 
              onClick={() => setIsCreatingHomework(false)}
              className="px-8 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 font-bold text-[14px] hover:bg-gray-50 transition-colors cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              Bekor qilish
            </button>
            <button 
              className="px-8 py-2.5 rounded-xl bg-[#10B981] text-white font-bold text-[14px] hover:bg-[#059669] transition-colors shadow-sm shadow-emerald-500/20 cursor-pointer"
            >
              E'lon qilish
            </button>
          </div>
        </div>
      </div>
    );
  }

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

      {activeTab === "books" && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200 mt-2">
          {/* Sub-header area */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h2 className="text-[20px] font-bold text-gray-900 tracking-tight">Guruh darsliklari</h2>
              
              <div className="flex items-center bg-gray-50/80 p-1 rounded-xl border border-gray-100">
                {[
                  { id: "homework", label: "Uyga vazifa" },
                  { id: "videos", label: "Videolar" },
                  { id: "exams", label: "Imtihonlar" },
                  { id: "journal", label: "Jurnal" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSubTab(tab.id)}
                    className={`px-5 py-2 rounded-lg text-[13.5px] font-bold transition-all cursor-pointer ${
                      activeSubTab === tab.id
                        ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-gray-900 border border-gray-100/50"
                        : "text-gray-500 hover:text-gray-800 border border-transparent"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setIsCreatingHomework(true)}
              className="bg-[#10B981] text-white px-6 py-2.5 rounded-xl font-bold text-[14px] hover:bg-[#059669] transition-colors cursor-pointer shadow-sm shadow-emerald-500/20"
            >
              Qo'shish
            </button>
          </div>

          {/* Table Area */}
          <div className="bg-white rounded-3xl pt-2 pb-6 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100/60 mt-1">
            <div className="w-full overflow-x-auto rounded-t-2xl">
              <table className="w-full text-left border-collapse min-w-full mt-4">
                <thead>
                  <tr className="border-b border-gray-100 text-[13px] font-bold text-gray-500">
                    <th className="pb-4 pt-2 px-2 w-[50px] text-center">#</th>
                    <th className="pb-4 pt-2 px-4">Mavzu</th>
                    <th className="pb-4 pt-2 px-4 text-center w-[70px]">
                      <PersonOutlineOutlinedIcon  sx={{ fontSize: 20 }} className="text-gray-400" />
                    </th>
                    <th className="pb-4 pt-2 px-4 text-center w-[70px]">
                      <TimerOutlinedIcon sx={{ fontSize: 20 }} className="text-[#F59E0B]" />
                    </th>
                    <th className="pb-4 pt-2 px-4 text-center w-[70px]">
                      <CheckCircleOutlineOutlinedIcon  sx={{ fontSize: 20 }} className="text-[#10B981]" />
                    </th>
                    <th className="pb-4 pt-2 px-4">Berilgan vaqt</th>
                    <th className="pb-4 pt-2 px-4">Tugash vaqti</th>
                    <th className="pb-4 pt-2 px-4">Dars sanasi</th>
                    <th className="pb-4 pt-2 px-2 w-[50px]"></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1 */}
                  <tr 
                    onClick={() => setSelectedTopicDetails({ title: "Html asoslari", endDate: "14 May, 2026 06:00", stats: { kutayotganlar: 0, qaytarilganlar: 0, qabul: 0, bajarilmagan: 5 }})}
                    className="border-b border-gray-100/60 hover:bg-[#F8FAFC] transition-colors group cursor-pointer"
                  >
                    <td className="py-5 px-2 text-[14px] font-semibold text-gray-700 text-center">1</td>
                    <td className="py-5 px-4 whitespace-nowrap">
                      <span className="bg-[#FF7A59] text-white px-5 py-2 rounded-full text-[13.5px] font-bold inline-block">
                        Html asoslari
                      </span>
                    </td>
                    <td className="py-5 px-4 text-center text-[14px] font-bold text-gray-600">5</td>
                    <td className="py-5 px-4 text-center text-[14px] font-bold text-gray-600">1</td>
                    <td className="py-5 px-4 text-center text-[14px] font-bold text-gray-600">0</td>
                    <td className="py-5 px-4 text-[13.5px] font-semibold text-gray-600 whitespace-nowrap">13 May, 2026 10:00</td>
                    <td className="py-5 px-4 text-[13.5px] font-semibold text-gray-600 whitespace-nowrap">14 May, 2026 06:00</td>
                    <td className="py-5 px-4 text-[13.5px] font-semibold text-gray-600 whitespace-nowrap">12 May, 2026</td>
                    <td className="py-5 px-2 text-center">
                      <button className="text-gray-300 hover:text-gray-500 cursor-pointer">
                        <MoreVertIcon sx={{ fontSize: 20 }} />
                      </button>
                    </td>
                  </tr>
                  
                  {/* Row 2 */}
                  <tr 
                    onClick={() => setSelectedTopicDetails({ title: "Kirish", endDate: "14 May, 2026 07:52", stats: { kutayotganlar: 0, qaytarilganlar: 0, qabul: 0, bajarilmagan: 5 }})}
                    className="border-b border-gray-100/60 hover:bg-[#F8FAFC] transition-colors group cursor-pointer"
                  >
                    <td className="py-5 px-2 text-[14px] font-semibold text-gray-700 text-center">2</td>
                    <td className="py-5 px-4 whitespace-nowrap">
                      <span className="text-[14px] font-bold text-gray-800 px-5 inline-block group-hover:text-[#6C5DD3] transition-colors">
                        Kirish
                      </span>
                    </td>
                    <td className="py-5 px-4 text-center text-[14px] font-bold text-gray-600">5</td>
                    <td className="py-5 px-4 text-center text-[14px] font-bold text-gray-600">0</td>
                    <td className="py-5 px-4 text-center text-[14px] font-bold text-gray-600">0</td>
                    <td className="py-5 px-4 text-[13.5px] font-semibold text-gray-600 whitespace-nowrap">13 May, 2026 11:52</td>
                    <td className="py-5 px-4 text-[13.5px] font-semibold text-gray-600 whitespace-nowrap">14 May, 2026 07:52</td>
                    <td className="py-5 px-4 text-[13.5px] font-semibold text-gray-600 whitespace-nowrap">9 May, 2026</td>
                    <td className="py-5 px-2 text-center">
                      <button className="text-gray-300 hover:text-gray-500 cursor-pointer">
                        <MoreVertIcon sx={{ fontSize: 20 }} />
                      </button>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr 
                    onClick={() => setSelectedTopicDetails({ title: "Nodejs", endDate: "15 May, 2026 05:47", stats: { kutayotganlar: 0, qaytarilganlar: 0, qabul: 0, bajarilmagan: 5 }})}
                    className="hover:bg-[#F8FAFC] transition-colors group cursor-pointer"
                  >
                    <td className="py-5 px-2 text-[14px] font-semibold text-gray-700 text-center">3</td>
                    <td className="py-5 px-4 whitespace-nowrap">
                      <span className="text-[14px] font-bold text-gray-800 px-5 inline-block group-hover:text-[#6C5DD3] transition-colors">
                        Nodejs
                      </span>
                    </td>
                    <td className="py-5 px-4 text-center text-[14px] font-bold text-gray-600">5</td>
                    <td className="py-5 px-4 text-center text-[14px] font-bold text-gray-600">0</td>
                    <td className="py-5 px-4 text-center text-[14px] font-bold text-gray-600">3</td>
                    <td className="py-5 px-4 text-[13.5px] font-semibold text-gray-600 whitespace-nowrap">14 May, 2026 09:47</td>
                    <td className="py-5 px-4 text-[13.5px] font-semibold text-gray-600 whitespace-nowrap">15 May, 2026 05:47</td>
                    <td className="py-5 px-4 text-[13.5px] font-semibold text-gray-600 whitespace-nowrap">14 May, 2026</td>
                    <td className="py-5 px-2 text-center">
                      <button className="text-gray-300 hover:text-gray-500 cursor-pointer">
                        <MoreVertIcon sx={{ fontSize: 20 }} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDetails;
