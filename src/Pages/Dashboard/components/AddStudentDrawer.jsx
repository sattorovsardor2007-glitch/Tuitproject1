import React, { useState } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "@mui/icons-material/Close";

const AddStudentDrawer = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    fullName: "",
    birthDate: "",
    address: "",
    password: "",
    groups: [],
    photo: null,
  });

  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [tempSelectedGroups, setTempSelectedGroups] = useState([]);
  const [groupSearchQuery, setGroupSearchQuery] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const availableGroups = ["N26", "n105"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenGroupModal = () => {
    setTempSelectedGroups(formData.groups);
    setGroupSearchQuery("");
    setIsGroupModalOpen(true);
  };

  const handleToggleTempGroup = (group) => {
    setTempSelectedGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  const handleSaveGroups = () => {
    setFormData((prev) => ({ ...prev, groups: tempSelectedGroups }));
    setIsGroupModalOpen(false);
  };

  const handleRemoveGroup = (group) => {
    setFormData((prev) => ({
      ...prev,
      groups: prev.groups.filter((g) => g !== group),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Rasm hajmi 2 MB dan oshmasligi kerak!");
        return;
      }
      setFormData((prev) => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!formData.phone || !formData.fullName || !formData.birthDate || !formData.address) {
      alert("Iltimos, barcha majburiy maydonlarni to'ldiring!");
      return;
    }
    // Call onSave with the student data
    onSave({
      ...formData,
      avatarPreview: imagePreview,
    });

    // Reset state
    setFormData({
      phone: "",
      email: "",
      fullName: "",
      birthDate: "",
      address: "",
      password: "",
      groups: [],
      photo: null,
    });
    setImagePreview(null);
    onClose();
  };

  const filteredGroups = availableGroups.filter((g) =>
    g.toLowerCase().includes(groupSearchQuery.toLowerCase())
  );

  return createPortal(
    <>
      {/* Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-[999] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-[1000] shadow-2xl transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-gray-100">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold text-gray-800">Talaba qo'shish</h2>
              <p className="text-[12px] text-gray-400 font-medium">
                Bu yerda siz yangi Talaba qo'shishingiz mumkin.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex flex-col gap-5">
              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-gray-700">
                  Telefon raqam <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+998"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6C5DD3] focus:ring-2 focus:ring-[#6C5DD3]/20 outline-none transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-gray-700">
                  Mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Elektron pochtani kiriting"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6C5DD3] focus:ring-2 focus:ring-[#6C5DD3]/20 outline-none transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-gray-700">
                  Talaba FIO <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Ma'lumotni kiriting"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6C5DD3] focus:ring-2 focus:ring-[#6C5DD3]/20 outline-none transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Birthdate */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-gray-700">
                  Tug'ilgan sanasi <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6C5DD3] focus:ring-2 focus:ring-[#6C5DD3]/20 outline-none transition-all text-gray-700"
                />
              </div>

              {/* Address */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-gray-700">
                  Manzil <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Manzilini kiriting"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6C5DD3] focus:ring-2 focus:ring-[#6C5DD3]/20 outline-none transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-gray-700">
                  Parol
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Parolni kiriting"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6C5DD3] focus:ring-2 focus:ring-[#6C5DD3]/20 outline-none transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Guruh (Modal Selector) */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-gray-700">
                  Guruh
                </label>
                <div>
                  <button
                    type="button"
                    onClick={handleOpenGroupModal}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 hover:border-[#6C5DD3]/50 hover:bg-gray-50/50 cursor-pointer transition-all text-[#6C5DD3] font-semibold text-[14px]"
                  >
                    <span className="text-lg leading-none">+</span>
                    Guruh qo'shish
                  </button>

                  {/* Selected groups display */}
                  {formData.groups.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.groups.map((g) => (
                        <span
                          key={g}
                          className="bg-gray-100 px-3 py-1 rounded-lg text-[12px] font-medium text-gray-600 flex items-center gap-1.5"
                        >
                          {g}
                          <button
                            type="button"
                            onClick={() => handleRemoveGroup(g)}
                            className="hover:text-red-500 font-bold"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Surati (Drag & Drop) */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-gray-700">
                  Surati
                </label>
                <div
                  onClick={() => document.getElementById("student-photo-input").click()}
                  className="border-2 border-dashed border-gray-200 hover:border-[#6C5DD3] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer bg-gray-50/20 hover:bg-[#6C5DD3]/5 transition-all text-center group"
                >
                  <input
                    type="file"
                    id="student-photo-input"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  {imagePreview ? (
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-100">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImagePreview(null);
                          setFormData((prev) => ({ ...prev, photo: null }));
                        }}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity text-[12px] font-medium"
                      >
                        O'chirish
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-[#6C5DD3] group-hover:bg-[#6C5DD3]/10 transition-all">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-[14px] text-gray-500 font-medium">
                          <span className="text-[#6C5DD3] font-semibold hover:underline">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-[11px] text-gray-400">
                          JPG or PNG (max. 2 MB)
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50 mt-auto">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-[14px] font-semibold text-gray-500 hover:bg-gray-100 transition-all"
            >
              Bekor qilish
            </button>
            <button
              onClick={handleSave}
              className="px-8 py-2.5 rounded-xl text-[14px] font-semibold text-white bg-[#6C5DD3] hover:bg-[#5b4eb3] transition-all shadow-lg shadow-[#6c5dd3]/20"
            >
              Saqlash
            </button>
          </div>
        </div>
      </div>

      {/* "Guruhga biriktirish" Modal (on top of Drawer) */}
      {isGroupModalOpen &&
        createPortal(
          <>
            {/* Modal Overlay (Rich dark shadow backdrop z-[2000]) */}
            <div
              className="fixed inset-0 bg-black/60 z-[2000] transition-opacity duration-300 flex items-center justify-center"
              onClick={() => setIsGroupModalOpen(false)}
            >
              {/* Modal Card (z-[2001]) */}
              <div
                className="bg-white rounded-3xl p-6 shadow-2xl relative w-full max-w-[420px] mx-4 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold text-gray-900">Guruhga biriktirish</h3>
                    <p className="text-[12px] text-gray-400 font-medium">
                      Bir yoki bir nechta guruhni tanlang
                    </p>
                  </div>
                  <button
                    onClick={() => setIsGroupModalOpen(false)}
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <CloseIcon sx={{ fontSize: 20 }} />
                  </button>
                </div>

                {/* Search Bar */}
                <input
                  type="text"
                  placeholder="Guruh qidirish..."
                  value={groupSearchQuery}
                  onChange={(e) => setGroupSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#6C5DD3] focus:ring-2 focus:ring-[#6C5DD3]/10 outline-none text-[14px] placeholder-gray-400 transition-all"
                />

                {/* Group Checkbox Options List */}
                <div className="border border-gray-200 rounded-xl overflow-hidden flex flex-col">
                  {filteredGroups.map((group) => {
                    const isChecked = tempSelectedGroups.includes(group);
                    return (
                      <label
                        key={group}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleTempGroup(group)}
                          className="rounded border-gray-300 text-[#6C5DD3] focus:ring-[#6C5DD3] w-4.5 h-4.5 cursor-pointer"
                        />
                        <span className="text-[14px] font-semibold text-gray-700">{group}</span>
                      </label>
                    );
                  })}
                  {filteredGroups.length === 0 && (
                    <p className="text-center text-gray-400 text-[13px] py-4">
                      Guruhlar topilmadi
                    </p>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => setIsGroupModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-[14px] font-semibold text-gray-500 hover:bg-gray-100 border border-gray-200 transition-all"
                  >
                    Bekor qilish
                  </button>
                  <button
                    onClick={handleSaveGroups}
                    className="px-6 py-2.5 rounded-xl text-[14px] font-semibold text-white bg-[#9D91EB] hover:bg-[#8677e8] transition-all shadow-md shadow-[#9d91eb]/20"
                  >
                    Qo'shish
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

export default AddStudentDrawer;
