import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "@mui/icons-material/Close";

const EditRoomDrawer = ({ isOpen, onClose, room, onSave }) => {
  const [formData, setFormData] = useState({ name: "", capacity: "" });

  // Har safar room o'zgarganda inputlarni to'ldirish
  useEffect(() => {
    if (room) {
      setFormData({ name: room.name, capacity: String(room.capacity) });
    }
  }, [room]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.capacity) return;
    onSave({ ...room, name: formData.name.trim(), capacity: Number(formData.capacity) });
    onClose();
  };

  return createPortal(
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-[999] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-[1000] shadow-2xl transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Xonani tahrirlash</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex flex-col gap-6">
              {/* Nomi */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-gray-700">
                  Nomi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Xona nomi"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6C5DD3] focus:ring-2 focus:ring-[#6C5DD3]/20 outline-none transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Sig'imi */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-gray-700">
                  Sig'imi <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="Masalan: 20"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6C5DD3] focus:ring-2 focus:ring-[#6C5DD3]/20 outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50">
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
    </>,
    document.body
  );
};

export default EditRoomDrawer;
