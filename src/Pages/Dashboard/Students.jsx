import React, { useState } from "react";
import AddStudentDrawer from "./components/AddStudentDrawer";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

const Students = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  
  const [students, setStudents] = useState([
    {
      id: 1,
      fullName: "Ali Valiyev",
      email: "ali@gmail.com",
      phone: "+998976541223",
      birthDate: "2010-12-12",
      address: "Sirdaryo",
      createdAt: "12.05.2026",
      groups: ["N16", "n105"],
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali",
      bgColor: "bg-amber-100/60 text-amber-700",
    },
    {
      id: 2,
      fullName: "Salim Qodirov",
      email: "salim@gmail.com",
      phone: "+998977777777",
      birthDate: "2007-01-14",
      address: "Buxoro",
      createdAt: "14.05.2026",
      groups: ["n105"],
      avatar: null,
      bgColor: "bg-purple-100/60 text-purple-700",
      initial: "S",
    },
    {
      id: 3,
      fullName: "Bobur",
      email: "bobur@gmail.com",
      phone: "+998999999999",
      birthDate: "2002-03-14",
      address: "Toshkent",
      createdAt: "14.05.2026",
      groups: ["n105"],
      avatar: null,
      bgColor: "bg-indigo-100 text-indigo-700",
      initial: "B",
    },
    {
      id: 4,
      fullName: "Qodir Salimov",
      email: "qodir@gmail.com",
      phone: "+998911111111",
      birthDate: "2026-04-29",
      address: "O'zbekcha",
      createdAt: "14.05.2026",
      groups: ["n105"],
      avatar: null,
      bgColor: "bg-[#EEF4FC] text-blue-700",
      initial: "Q",
    },
  ]);

  const handleAddStudent = (newStudent) => {
    // Generate beautiful initial or display values
    const firstLetter = newStudent.fullName.trim().charAt(0).toUpperCase();
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

    setStudents((prev) => [
      ...prev,
      {
        id: Date.now(),
        fullName: newStudent.fullName,
        email: newStudent.email || "—",
        phone: newStudent.phone,
        birthDate: newStudent.birthDate,
        address: newStudent.address,
        createdAt: formattedDate,
        groups: newStudent.groups.length > 0 ? newStudent.groups : ["n105"],
        avatar: newStudent.avatarPreview || null,
        bgColor: randomBg,
        initial: firstLetter,
      },
    ]);
  };

  const handleDeleteStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const handleToggleSelectStudent = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((sId) => sId !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map((s) => s.id));
    }
  };

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.phone.includes(searchQuery) ||
      student.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper to format date of birth to match screenshot style (e.g. 12.12.2010)
  const formatDateOfBirth = (dateStr) => {
    if (!dateStr) return "—";
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      // dateStr is yyyy-mm-dd
      return `${parts[2]}.${parts[1]}.${parts[0]}`;
    }
    return dateStr;
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Title section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h1 className="text-[26px] font-bold text-gray-900 leading-none">Talabalar</h1>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-1.5 bg-[#6C5DD3] text-white px-4 py-2 rounded-xl font-semibold text-[14px] hover:bg-[#5b4eb3] transition-all shadow-md shadow-[#6c5dd3]/20 whitespace-nowrap"
          >
            <AddIcon sx={{ fontSize: 18 }} />
            Talaba qo'shish
          </button>
        </div>
        <p className="text-[14px] text-gray-400 font-medium leading-relaxed">
          Ushbu sahifada siz Talabalar ro'yxatini va ularning ma'lumotlarini topasiz. Har bir Talaba ismi, fanlari va aloqa ma'lumotlari keltirilgan.
        </p>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex flex-col gap-6">
        {/* Table Filters Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="flex items-center bg-gray-50/50 px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm w-full sm:max-w-[320px] focus-within:border-[#6C5DD3]/50 focus-within:ring-2 focus-within:ring-[#6C5DD3]/10 transition-all">
            <SearchIcon className="text-gray-400 mr-2" fontSize="small" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-[14px] text-gray-700 w-full placeholder-gray-400"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-gray-700 font-medium text-[13px]">
              <FilterListIcon fontSize="small" className="text-gray-400" />
              Filters
            </button>
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-gray-700 font-medium text-[13px]">
              Arxiv
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-left border-collapse min-w-[800px] lg:min-w-full">
            <thead>
              <tr className="border-b border-gray-100 text-[13px] font-bold text-gray-500 bg-gray-50/40">
                <th className="py-4 px-6 w-12">
                  <input
                    type="checkbox"
                    checked={
                      filteredStudents.length > 0 &&
                      selectedStudents.length === filteredStudents.length
                    }
                    onChange={handleToggleSelectAll}
                    className="rounded border-gray-300 text-[#6C5DD3] focus:ring-[#6C5DD3] w-4 h-4 cursor-pointer"
                  />
                </th>
                <th className="py-4 px-4 w-[220px]">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                    Nomi <span className="text-[10px]">↓</span>
                  </div>
                </th>
                <th className="py-4 px-4 w-[120px]">Guruh</th>
                <th className="py-4 px-4">Telefon raqamlari</th>
                <th className="py-4 px-4">Email</th>
                <th className="py-4 px-4">Tug'ilgan sanasi</th>
                <th className="py-4 px-4">Manzil</th>
                <th className="py-4 px-4">Yaratilgan sana</th>
                <th className="py-4 px-4 text-center w-32">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                  const isSelected = selectedStudents.includes(student.id);
                  return (
                    <tr
                      key={student.id}
                      className={`border-b border-gray-50 hover:bg-gray-50/30 transition-colors group ${
                        isSelected ? "bg-[#6C5DD3]/5" : ""
                      }`}
                    >
                      <td className="py-4 px-6">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectStudent(student.id)}
                          className="rounded border-gray-300 text-[#6C5DD3] focus:ring-[#6C5DD3] w-4 h-4 cursor-pointer"
                        />
                      </td>
                      <td className="py-4 px-4 font-semibold text-gray-800">
                        <div className="flex items-center gap-3">
                          {student.avatar ? (
                            <img
                              src={student.avatar}
                              alt={student.fullName}
                              className="w-9 h-9 rounded-full object-cover border border-gray-100"
                            />
                          ) : (
                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[14px] ${student.bgColor}`}
                            >
                              {student.initial}
                            </div>
                          )}
                          <span className="capitalize">{student.fullName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1.5">
                          {student.groups.map((group) => (
                            <span
                              key={group}
                              className="bg-gray-100 px-2.5 py-0.5 rounded-lg text-[12px] font-medium text-gray-500 border border-gray-100"
                            >
                              {group}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600 font-medium text-[13.5px]">
                        {student.phone}
                      </td>
                      <td className="py-4 px-4 text-gray-500 text-[13.5px]">
                        {student.email}
                      </td>
                      <td className="py-4 px-4 text-gray-500 text-[13.5px]">
                        {formatDateOfBirth(student.birthDate)}
                      </td>
                      <td className="py-4 px-4 text-gray-600 font-medium text-[13.5px]">
                        {student.address}
                      </td>
                      <td className="py-4 px-4 text-gray-500 text-[13.5px]">
                        {student.createdAt}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors">
                            <RemoveRedEyeOutlinedIcon sx={{ fontSize: 18 }} />
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(student.id)}
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
                  <td colSpan="9" className="py-8 text-center text-gray-400 font-medium">
                    Talabalar topilmadi.
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

      {/* Add Student Drawer modal */}
      <AddStudentDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleAddStudent}
      />
    </div>
  );
};

export default Students;
