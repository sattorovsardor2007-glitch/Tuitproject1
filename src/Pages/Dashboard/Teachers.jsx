import React, { useState } from "react";
import AddTeacherDrawer from "./components/AddTeacherDrawer";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import mohirbekAvatar from "./mohirbek_avatar.png";

const Teachers = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      fullName: "Mohirbek",
      email: "moxirbek@gmail.com",
      phone: "+998944481309",
      address: "Tashkent",
      createdAt: "12.05.2026",
      groups: ["N26", "n105"],
      avatar: mohirbekAvatar,
      bgColor: "bg-indigo-100 text-indigo-700",
      initial: "M",
    },
  ]);

  const handleAddTeacher = (newTeacher) => {
    // Generate beautiful initial or display values
    const firstLetter = newTeacher.fullName.trim().charAt(0).toUpperCase();
    const bgColors = [
      "bg-amber-100/60 text-amber-700",
      "bg-purple-100/60 text-purple-700",
      "bg-indigo-100 text-indigo-700",
      "bg-[#EEF4FC] text-blue-700",
      "bg-pink-100 text-pink-700",
      "bg-teal-100 text-teal-700"
    ];
    const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];

    // Format current date
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}.${String(
      today.getMonth() + 1
    ).padStart(2, "0")}.${today.getFullYear()}`;

    setTeachers((prev) => [
      ...prev,
      {
        id: Date.now(),
        fullName: newTeacher.fullName,
        email: newTeacher.email || "—",
        phone: newTeacher.phone,
        address: newTeacher.address,
        createdAt: formattedDate,
        groups: newTeacher.groups.length > 0 ? newTeacher.groups : ["n106"],
        avatar: newTeacher.avatarPreview || null,
        bgColor: randomBg,
        initial: firstLetter,
      },
    ]);
  };

  const handleDeleteTeacher = (id) => {
    setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));
  };

  const handleToggleSelectTeacher = (id) => {
    setSelectedTeachers((prev) =>
      prev.includes(id) ? prev.filter((tId) => tId !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedTeachers.length === filteredTeachers.length) {
      setSelectedTeachers([]);
    } else {
      setSelectedTeachers(filteredTeachers.map((t) => t.id));
    }
  };

  // Filter teachers based on search query
  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.phone.includes(searchQuery) ||
      teacher.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Title section */}
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center justify-between">
          <h1 className="text-[26px] font-bold text-gray-900 leading-none">O'qituvchilar</h1>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-1.5 bg-[#6C5DD3] text-white px-4 py-2 rounded-xl font-semibold text-[14px] hover:bg-[#5b4eb3] transition-all shadow-md shadow-[#6c5dd3]/20 whitespace-nowrap"
          >
            <AddIcon sx={{ fontSize: 18 }} />
            O'qituvchi qo'shish
          </button>
        </div>
        <p className="text-[14px] text-gray-400 font-medium leading-relaxed max-w-[850px]">
          Ushbu sahifada siz o'qituvchilar ro'yxatini va ularning ma'lumotlarini topasiz. Har bir o'qituvchining ismi, fanlari va aloqa ma'lumotlari keltirilgan.
        </p>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex flex-col gap-6">
        {/* Table Filters Toolbar (Filters and Arxiv on LEFT, Search on RIGHT in screenshot!) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Action buttons on the LEFT */}
          <div className="flex items-center gap-3 order-2 sm:order-1">
            <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-gray-700 font-semibold text-[13px]">
              <FilterListIcon fontSize="small" className="text-gray-400" />
              Filters
            </button>
            <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-gray-700 font-semibold text-[13px]">
              Arxiv
            </button>
          </div>

          {/* Search bar on the RIGHT */}
          <div className="flex items-center bg-gray-50/50 px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm w-full sm:max-w-[320px] focus-within:border-[#6C5DD3]/50 focus-within:ring-2 focus-within:ring-[#6C5DD3]/10 transition-all order-1 sm:order-2">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-[14px] text-gray-700 w-full placeholder-gray-400"
            />
            <SearchIcon className="text-gray-400 ml-2" fontSize="small" />
          </div>
        </div>

        {/* Table Container */}
        <div className="w-full overflow-x-auto rounded-2xl">
          <table className="w-full text-left border-collapse min-w-full">
            <thead>
              <tr className="border-b border-gray-100 text-[13px] font-bold text-gray-500 bg-gray-50/40">
                <th className="py-4 pl-0 pr-4 w-10 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={
                      filteredTeachers.length > 0 &&
                      selectedTeachers.length === filteredTeachers.length
                    }
                    onChange={handleToggleSelectAll}
                    className="rounded border-gray-300 text-[#6C5DD3] focus:ring-[#6C5DD3] w-4 h-4 cursor-pointer"
                  />
                </th>
                <th className="py-4 px-3 w-[20%] whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                    Nomi <span className="text-[10px]">↓</span>
                  </div>
                </th>
                <th className="py-4 px-3 w-[12%] whitespace-nowrap">Guruh</th>
                <th className="py-4 px-3 w-[16%] whitespace-nowrap">Telefon raqamlari</th>
                <th className="py-4 px-3 w-[20%] whitespace-nowrap">Email</th>
                <th className="py-4 px-3 w-[12%] whitespace-nowrap">Manzil</th>
                <th className="py-4 px-3 w-[12%] whitespace-nowrap">Yaratilgan sana</th>
                <th className="py-4 px-3 text-center w-28 whitespace-nowrap">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher) => {
                  const isSelected = selectedTeachers.includes(teacher.id);
                  return (
                    <tr
                      key={teacher.id}
                      className={`border-b border-gray-100 hover:bg-gray-50/30 transition-colors group ${
                        isSelected ? "bg-[#6C5DD3]/5" : ""
                      }`}
                    >
                      <td className="py-4 pl-0 pr-4 w-10 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectTeacher(teacher.id)}
                          className="rounded border-gray-300 text-[#6C5DD3] focus:ring-[#6C5DD3] w-4 h-4 cursor-pointer"
                        />
                      </td>
                      <td className="py-4 px-3 font-semibold text-gray-800 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {teacher.avatar ? (
                            <img
                              src={teacher.avatar}
                              alt={teacher.fullName}
                              className="w-9 h-9 rounded-full object-cover border border-gray-100"
                            />
                          ) : (
                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[14px] ${teacher.bgColor}`}
                            >
                              {teacher.initial}
                            </div>
                          )}
                          <span className="capitalize">{teacher.fullName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 flex-nowrap whitespace-nowrap">
                          {teacher.groups.map((group) => (
                            <span
                              key={group}
                              className="bg-gray-100 px-2.5 py-0.5 rounded-lg text-[12px] font-medium text-gray-500 border border-gray-100 whitespace-nowrap"
                            >
                              {group}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-3 text-gray-600 font-semibold text-[13.5px] whitespace-nowrap">
                        {teacher.phone}
                      </td>
                      <td className="py-4 px-3 text-gray-500 text-[13.5px] whitespace-nowrap">
                        {teacher.email}
                      </td>
                      <td className="py-4 px-3 text-gray-600 font-semibold text-[13.5px] whitespace-nowrap">
                        {teacher.address}
                      </td>
                      <td className="py-4 px-3 text-gray-500 text-[13.5px] whitespace-nowrap">
                        {teacher.createdAt}
                      </td>
                      <td className="py-4 px-3 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                            <RemoveRedEyeOutlinedIcon sx={{ fontSize: 18 }} />
                          </button>
                          <button
                            onClick={() => handleDeleteTeacher(teacher.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }} />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-[#6C5DD3] transition-colors">
                            <EditOutlinedIcon sx={{ fontSize: 18 }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-gray-400 font-medium">
                    O'qituvchilar topilmadi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 pt-4 mt-2">
          {/* Previous Button */}
          <button className="px-4 py-2 border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors shadow-sm">
            ← Previous
          </button>

          {/* Number tags */}
          <div className="flex items-center gap-1.5">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-bold bg-[#6C5DD3] text-white cursor-pointer shadow-md shadow-[#6c5dd3]/20">
              1
            </span>
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-semibold text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors">
              2
            </span>
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-semibold text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors">
              3
            </span>
            <span className="text-gray-400 text-[13px] px-1 select-none">...</span>
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-semibold text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors">
              8
            </span>
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-semibold text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors">
              9
            </span>
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-semibold text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors">
              10
            </span>
          </div>

          {/* Next Button */}
          <button className="px-4 py-2 border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors shadow-sm">
            Next →
          </button>
        </div>
      </div>

      {/* Add Teacher Drawer modal */}
      <AddTeacherDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleAddTeacher}
      />
    </div>
  );
};

export default Teachers;
