import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarTodayOutlined";

const AddGroupDrawer = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    room: "",
    days: [],
    time: "09:00",
    startDate: "",
    description: "",
  });

  // Dropdown open states
  const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);
  const [isRoomDropdownOpen, setIsRoomDropdownOpen] = useState(false);

  // Dropdown options
  const courseOptions = [
    { value: "Backend", label: "Backend" },
    { value: "Frontend", label: "Frontend" },
    { value: "Design", label: "UX/UI Design" },
    { value: "Mobile", label: "Mobile Development" }
  ];

  const roomOptions = [
    { value: "Autodesk", label: "Autodesk" },
    { value: "Amazon", label: "Amazon" },
    { value: "Google", label: "Google" },
    { value: "Intel", label: "Intel" }
  ];

  // Dropdown refs for click-outside detection
  const courseRef = useRef(null);
  const roomRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (courseRef.current && !courseRef.current.contains(event.target)) {
        setIsCourseDropdownOpen(false);
      }
      if (roomRef.current && !roomRef.current.contains(event.target)) {
        setIsRoomDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCourse = (value) => {
    setFormData((prev) => ({ ...prev, course: value }));
    setIsCourseDropdownOpen(false);
  };

  const handleSelectRoom = (value) => {
    setFormData((prev) => ({ ...prev, room: value }));
    setIsRoomDropdownOpen(false);
  };

  const getCourseDisplayText = () => {
    if (isCourseDropdownOpen) return ""; // Blank when open to match the screenshot perfectly
    if (!formData.course) return "Kursni tanlang";
    return courseOptions.find(o => o.value === formData.course)?.label || formData.course;
  };

  const getRoomDisplayText = () => {
    if (isRoomDropdownOpen) return ""; // Blank when open to match the screenshot perfectly
    if (!formData.room) return "Xonani tanlang";
    return roomOptions.find(o => o.value === formData.room)?.label || formData.room;
  };

  // Selection states
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Modal open states
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  // Search queries
  const [teacherSearchQuery, setTeacherSearchQuery] = useState("");
  const [studentSearchQuery, setStudentSearchQuery] = useState("");

  // Temp selections to keep modal changes draftable until saved
  const [tempTeachers, setTempTeachers] = useState([]);
  const [tempStudents, setTempStudents] = useState([]);

  // Mock databases
  const availableTeachers = ["Mohirbek"];
  const availableStudents = ["Ali Valiyev", "Salim Qodirov", "Bobur", "Qodir Salimov"];

  const col1Days = ["Dushanba", "Chorshanba", "Juma", "Yakshanba"];
  const col2Days = ["Seshanba", "Payshanba", "Shanba"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleDay = (day) => {
    setFormData((prev) => {
      const isSelected = prev.days.includes(day);
      const newDays = isSelected
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day];
      return { ...prev, days: newDays };
    });
  };

  // Teacher modal handlers
  const handleOpenTeacherModal = () => {
    setTempTeachers(selectedTeachers);
    setTeacherSearchQuery("");
    setIsTeacherModalOpen(true);
  };

  const handleToggleTempTeacher = (teacher) => {
    setTempTeachers((prev) =>
      prev.includes(teacher) ? prev.filter((t) => t !== teacher) : [...prev, teacher]
    );
  };

  const handleSaveTeachers = () => {
    setSelectedTeachers(tempTeachers);
    setIsTeacherModalOpen(false);
  };

  const handleRemoveTeacher = (teacher) => {
    setSelectedTeachers((prev) => prev.filter((t) => t !== teacher));
  };

  // Student modal handlers
  const handleOpenStudentModal = () => {
    setTempStudents(selectedStudents);
    setStudentSearchQuery("");
    setIsStudentModalOpen(true);
  };

  const handleToggleTempStudent = (student) => {
    setTempStudents((prev) =>
      prev.includes(student) ? prev.filter((s) => s !== student) : [...prev, student]
    );
  };

  const handleSaveStudents = () => {
    setSelectedStudents(tempStudents);
    setIsStudentModalOpen(false);
  };

  const handleRemoveStudent = (student) => {
    setSelectedStudents((prev) => prev.filter((s) => s !== student));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.course || !formData.room || formData.days.length === 0 || !formData.startDate) {
      alert("Iltimos, barcha majburiy maydonlarni to'ldiring!");
      return;
    }

    const dayMap = {
      Dushanba: "Du",
      Seshanba: "Se",
      Chorshanba: "Chor",
      Payshanba: "Pay",
      Juma: "Ju",
      Shanba: "Shan",
      Yakshanba: "Yak",
    };
    
    const dayOrder = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba", "Yakshanba"];
    const sortedSelectedDays = dayOrder.filter(d => formData.days.includes(d));
    const formattedDays = sortedSelectedDays.map(d => dayMap[d]).join(", ");

    onSave({
      name: formData.name,
      course: formData.course,
      room: formData.room,
      days: formattedDays,
      time: formData.time,
      startDate: formData.startDate,
      description: formData.description,
      teachers: selectedTeachers,
      students: selectedStudents,
    });

    // Reset Form & Selections
    setFormData({
      name: "",
      course: "",
      room: "",
      days: [],
      time: "09:00",
      startDate: "",
      description: "",
    });
    setSelectedTeachers([]);
    setSelectedStudents([]);
    onClose();
  };

  const filteredTeachers = availableTeachers.filter((t) =>
    t.toLowerCase().includes(teacherSearchQuery.toLowerCase())
  );

  const filteredStudents = availableStudents.filter((s) =>
    s.toLowerCase().includes(studentSearchQuery.toLowerCase())
  );

  return createPortal(
    <>
      {/* Drawer Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-[999] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Slide-out Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-[1000] shadow-2xl transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-gray-100">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold text-gray-900">Guruh qo'shish</h2>
              <p className="text-[12px] text-gray-400 font-semibold">
                Yangi guruh yaratish uchun quyidagi ma'lumotlarni kiriting.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </button>
          </div>

          {/* Form Body Container */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
          {/* Guruh nomi */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13.5px] font-bold text-gray-700">
              Guruh nomi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Frontend 2024"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6C5DD3] focus:ring-2 focus:ring-[#6C5DD3]/15 outline-none transition-all placeholder:text-gray-400 text-[14px] text-gray-800 font-medium"
            />
          </div>

          {/* Kurs Dropdown */}
          <div className="flex flex-col gap-1.5 relative" ref={courseRef}>
            <label className="text-[13.5px] font-bold text-gray-700">
              Kurs <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div
                onClick={() => setIsCourseDropdownOpen(!isCourseDropdownOpen)}
                className={`w-full px-4 py-3 rounded-xl border transition-all text-[14px] font-semibold bg-white cursor-pointer flex items-center justify-between select-none ${
                  isCourseDropdownOpen
                    ? "border-[#6C5DD3] ring-2 ring-[#6C5DD3]/15"
                    : "border-gray-200"
                }`}
              >
                <span
                  className={
                    !formData.course && !isCourseDropdownOpen
                      ? "text-gray-400 font-medium"
                      : "text-gray-800 font-semibold"
                  }
                >
                  {getCourseDisplayText()}
                </span>
                <div
                  className={`text-gray-400 transition-transform duration-200 ${
                    isCourseDropdownOpen ? "rotate-180" : ""
                  }`}
                >
                  <KeyboardArrowDownIcon />
                </div>
              </div>

              {/* Custom Dropdown List overlay */}
              {isCourseDropdownOpen && (
                <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.08)] border border-gray-100 py-1 z-[100] animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* First item: gray placeholder */}
                  <div className="px-4 py-2.5 text-[14px] font-medium text-gray-400 select-none cursor-default">
                    Kursni tanlang
                  </div>
                  {/* Course Options */}
                  {courseOptions.map((opt) => (
                    <div
                      key={opt.value}
                      onClick={() => handleSelectCourse(opt.value)}
                      className="px-4 py-2.5 text-[14px] text-gray-800 font-semibold hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Xona Dropdown */}
          <div className="flex flex-col gap-1.5 relative" ref={roomRef}>
            <label className="text-[13.5px] font-bold text-gray-700">
              Xona <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div
                onClick={() => setIsRoomDropdownOpen(!isRoomDropdownOpen)}
                className={`w-full px-4 py-3 rounded-xl border transition-all text-[14px] font-semibold bg-white cursor-pointer flex items-center justify-between select-none ${
                  isRoomDropdownOpen
                    ? "border-[#6C5DD3] ring-2 ring-[#6C5DD3]/15"
                    : "border-gray-200"
                }`}
              >
                <span
                  className={
                    !formData.room && !isRoomDropdownOpen
                      ? "text-gray-400 font-medium"
                      : "text-gray-800 font-semibold"
                  }
                >
                  {getRoomDisplayText()}
                </span>
                <div
                  className={`text-gray-400 transition-transform duration-200 ${
                    isRoomDropdownOpen ? "rotate-180" : ""
                  }`}
                >
                  <KeyboardArrowDownIcon />
                </div>
              </div>

              {/* Custom Dropdown List overlay */}
              {isRoomDropdownOpen && (
                <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.08)] border border-gray-100 py-1 z-[100] animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* First item: gray placeholder */}
                  <div className="px-4 py-2.5 text-[14px] font-medium text-gray-400 select-none cursor-default">
                    Xonani tanlang
                  </div>
                  {/* Room Options */}
                  {roomOptions.map((opt) => (
                    <div
                      key={opt.value}
                      onClick={() => handleSelectRoom(opt.value)}
                      className="px-4 py-2.5 text-[14px] text-gray-800 font-semibold hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Dars kunlari Checkbox grid */}
          <div className="flex flex-col gap-2">
            <label className="text-[13.5px] font-bold text-gray-700">
              Dars kunlari <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Column 1 */}
              <div className="flex flex-col gap-3">
                {col1Days.map((day) => {
                  const isChecked = formData.days.includes(day);
                  return (
                    <label
                      key={day}
                      className={`flex items-center gap-3 px-4 py-3 border rounded-xl cursor-pointer transition-all select-none ${
                        isChecked
                          ? "border-[#6C5DD3] bg-[#6C5DD3]/5"
                          : "border-gray-200 hover:bg-gray-50/50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleDay(day)}
                        className="rounded border-gray-300 text-[#6C5DD3] focus:ring-[#6C5DD3] w-4.5 h-4.5 cursor-pointer"
                      />
                      <span className="text-[13.5px] font-bold text-gray-700 leading-none">
                        {day}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-3">
                {col2Days.map((day) => {
                  const isChecked = formData.days.includes(day);
                  return (
                    <label
                      key={day}
                      className={`flex items-center gap-3 px-4 py-3 border rounded-xl cursor-pointer transition-all select-none ${
                        isChecked
                          ? "border-[#6C5DD3] bg-[#6C5DD3]/5"
                          : "border-gray-200 hover:bg-gray-50/50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleDay(day)}
                        className="rounded border-gray-300 text-[#6C5DD3] focus:ring-[#6C5DD3] w-4.5 h-4.5 cursor-pointer"
                      />
                      <span className="text-[13.5px] font-bold text-gray-700 leading-none">
                        {day}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dars vaqti */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13.5px] font-bold text-gray-700">
              Dars vaqti <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                placeholder="09:00"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6C5DD3] focus:ring-2 focus:ring-[#6C5DD3]/15 outline-none transition-all placeholder:text-gray-400 text-[14px] text-gray-800 font-semibold"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <AccessTimeIcon sx={{ fontSize: 20 }} />
              </div>
            </div>
          </div>

          {/* Boshlanish sanasi */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13.5px] font-bold text-gray-700">
              Boshlanish sanasi <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                placeholder="dd/mm/yyyy"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6C5DD3] focus:ring-2 focus:ring-[#6C5DD3]/15 outline-none transition-all placeholder:text-gray-400 text-[14px] text-gray-800 font-semibold"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <CalendarTodayIcon sx={{ fontSize: 18 }} />
              </div>
            </div>
          </div>

          {/* Tavsif */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13.5px] font-bold text-gray-700">Tavsif</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Guruh haqida qo'shimcha ma'lumot (ixtiyoriy)"
              rows="3"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6C5DD3] focus:ring-2 focus:ring-[#6C5DD3]/15 outline-none transition-all placeholder:text-gray-400 text-[14px] text-gray-800 font-semibold resize-none"
            />
          </div>

          {/* O'qituvchilar Selection Box */}
          <div className="flex flex-col gap-2">
            <label className="text-[13.5px] font-bold text-gray-700">O'qituvchilar</label>
            <div>
              <button
                type="button"
                onClick={handleOpenTeacherModal}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 hover:border-[#6C5DD3]/50 hover:bg-gray-50/50 cursor-pointer transition-all text-[#6C5DD3] font-semibold text-[14px]"
              >
                <span className="text-lg leading-none">+</span>
                Qo'shish
              </button>

              {/* Selected teachers display capsules */}
              {selectedTeachers.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedTeachers.map((t) => (
                    <span
                      key={t}
                      className="bg-gray-100 px-3 py-1.5 rounded-xl text-[12.5px] font-bold text-gray-600 flex items-center gap-1.5"
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() => handleRemoveTeacher(t)}
                        className="hover:text-red-500 font-bold cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Talabalar Selection Box */}
          <div className="flex flex-col gap-2">
            <label className="text-[13.5px] font-bold text-gray-700">Talabalar</label>
            <div>
              <button
                type="button"
                onClick={handleOpenStudentModal}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 hover:border-[#6C5DD3]/50 hover:bg-gray-50/50 cursor-pointer transition-all text-[#6C5DD3] font-semibold text-[14px]"
              >
                <span className="text-lg leading-none">+</span>
                Qo'shish
              </button>

              {/* Selected students display capsules */}
              {selectedStudents.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedStudents.map((s) => (
                    <span
                      key={s}
                      className="bg-gray-100 px-3 py-1.5 rounded-xl text-[12.5px] font-bold text-gray-600 flex items-center gap-1.5"
                    >
                      {s}
                      <button
                        type="button"
                        onClick={() => handleRemoveStudent(s)}
                        className="hover:text-red-500 font-bold cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action buttons fixed footer */}
          <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50 mt-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-[14px] font-semibold text-gray-500 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all cursor-pointer"
            >
               Bekor qilish
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 rounded-xl text-[14px] font-semibold text-white bg-[#6C5DD3] hover:bg-[#5b4eb3] transition-all shadow-lg shadow-[#6c5dd3]/20 cursor-pointer"
            >
              Saqlash
            </button>
          </div>
      </div>
      </form></div>

      {/* Teachers Selection Modal Portal */}
      {isTeacherModalOpen &&
        createPortal(
          <>
            {/* Modal Overlay */}
            <div
              className="fixed inset-0 bg-black/60 z-[2000] transition-opacity duration-300 flex items-center justify-center"
              onClick={() => setIsTeacherModalOpen(false)}
            >
              {/* Modal Card */}
              <div
                className="bg-white rounded-3xl p-6 shadow-2xl relative w-full max-w-[420px] mx-4 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold text-gray-900">O'qituvchi qo'shish</h3>
                    <p className="text-[12px] text-gray-400 font-medium">
                      Bitta yoki bir nechta o'qituvchini tanlang
                    </p>
                  </div>
                  <button
                    onClick={() => setIsTeacherModalOpen(false)}
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <CloseIcon sx={{ fontSize: 20 }} />
                  </button>
                </div>

                {/* Search Bar */}
                <input
                  type="text"
                  placeholder="O'qituvchi qidirish..."
                  value={teacherSearchQuery}
                  onChange={(e) => setTeacherSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#6C5DD3] focus:ring-2 focus:ring-[#6C5DD3]/10 outline-none text-[14px] placeholder-gray-400 transition-all font-semibold"
                />

                {/* Teacher Checkbox List */}
                <div className="border border-gray-200 rounded-xl overflow-hidden flex flex-col max-h-[220px] overflow-y-auto">
                  {filteredTeachers.map((teacher) => {
                    const isChecked = tempTeachers.includes(teacher);
                    return (
                      <label
                        key={teacher}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleTempTeacher(teacher)}
                          className="rounded border-gray-300 text-[#6C5DD3] focus:ring-[#6C5DD3] w-4.5 h-4.5 cursor-pointer"
                        />
                        <span className="text-[14px] font-bold text-gray-700">{teacher}</span>
                      </label>
                    );
                  })}
                  {filteredTeachers.length === 0 && (
                    <p className="text-center text-gray-400 text-[13px] py-4">
                      O'qituvchilar topilmadi
                    </p>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => setIsTeacherModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-[14px] font-semibold text-gray-500 hover:text-gray-700 transition-all cursor-pointer"
                  >
                    Bekor qilish
                  </button>
                  <button
                    onClick={handleSaveTeachers}
                    className="px-6 py-2.5 rounded-xl text-[14px] font-semibold text-white bg-[#6C5DD3] hover:bg-[#5b4eb3] transition-all shadow-md shadow-[#6c5dd3]/20 cursor-pointer"
                  >
                    Saqlash
                  </button>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}

      {/* Students Selection Modal Portal */}
      {isStudentModalOpen &&
        createPortal(
          <>
            {/* Modal Overlay */}
            <div
              className="fixed inset-0 bg-black/60 z-[2000] transition-opacity duration-300 flex items-center justify-center"
              onClick={() => setIsStudentModalOpen(false)}
            >
              {/* Modal Card */}
              <div
                className="bg-white rounded-3xl p-6 shadow-2xl relative w-full max-w-[420px] mx-4 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold text-gray-900">Talaba qo'shish</h3>
                    <p className="text-[12px] text-gray-400 font-medium">
                      Bitta yoki bir nechta talabani tanlang
                    </p>
                  </div>
                  <button
                    onClick={() => setIsStudentModalOpen(false)}
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <CloseIcon sx={{ fontSize: 20 }} />
                  </button>
                </div>

                {/* Search Bar */}
                <input
                  type="text"
                  placeholder="Talaba qidirish..."
                  value={studentSearchQuery}
                  onChange={(e) => setStudentSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#6C5DD3] focus:ring-2 focus:ring-[#6C5DD3]/10 outline-none text-[14px] placeholder-gray-400 transition-all font-semibold"
                />

                {/* Students Checkbox List */}
                <div className="border border-gray-200 rounded-xl overflow-hidden flex flex-col max-h-[220px] overflow-y-auto">
                  {filteredStudents.map((student) => {
                    const isChecked = tempStudents.includes(student);
                    return (
                      <label
                        key={student}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleTempStudent(student)}
                          className="rounded border-gray-300 text-[#6C5DD3] focus:ring-[#6C5DD3] w-4.5 h-4.5 cursor-pointer"
                        />
                        <span className="text-[14px] font-bold text-gray-700">{student}</span>
                      </label>
                    );
                  })}
                  {filteredStudents.length === 0 && (
                    <p className="text-center text-gray-400 text-[13px] py-4">
                      Talabalar topilmadi
                    </p>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => setIsStudentModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-[14px] font-semibold text-gray-500 hover:text-gray-700 transition-all cursor-pointer"
                  >
                    Bekor qilish
                  </button>
                  <button
                    onClick={handleSaveStudents}
                    className="px-6 py-2.5 rounded-xl text-[14px] font-semibold text-white bg-[#6C5DD3] hover:bg-[#5b4eb3] transition-all shadow-md shadow-[#6c5dd3]/20 cursor-pointer"
                  >
                    Saqlash
                  </button>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </>,
    document.body
  );
};

export default AddGroupDrawer;
