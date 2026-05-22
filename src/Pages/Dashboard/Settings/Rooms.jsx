import React, { useState } from "react";
import ReactDOM from "react-dom";
import EditRoomDrawer from "./components/EditRoomDrawer";
import AddRoomDrawer from "./components/AddRoomDrawer";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";

const Rooms = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ open: false, roomId: null, roomName: "" });
  const [editDrawer, setEditDrawer] = useState({ open: false, room: null });

  const [rooms, setRooms] = useState([
    { id: 1, name: "genious room", capacity: 15 },
    { id: 2, name: "Impact room", capacity: 12 },
    { id: 3, name: "1A", capacity: 25 },
    { id: 4, name: "205-xona", capacity: 32 },
    { id: 5, name: "16-xona", capacity: 18 },
    { id: 6, name: "5 xona", capacity: 30 },
    { id: 7, name: "IELTS with Islambek", capacity: 20 },
    { id: 8, name: "Beginner", capacity: 18 },
    { id: 9, name: "99", capacity: 25 },
  ]);

  const openDeleteModal = (room) => {
    setDeleteModal({ open: true, roomId: room.id, roomName: room.name });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, roomId: null, roomName: "" });
  };

  const confirmDelete = () => {
    setRooms((prev) => prev.filter((r) => r.id !== deleteModal.roomId));
    closeDeleteModal();
  };

  const openEditDrawer = (room) => {
    setEditDrawer({ open: true, room });
  };

  const closeEditDrawer = () => {
    setEditDrawer({ open: false, room: null });
  };

  const handleEditSave = (updatedRoom) => {
    setRooms((prev) => prev.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)));
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-800">Xonalar</h2>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <RefreshIcon fontSize="small" />
            </button>
          </div>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 bg-[#6C5DD3] text-white px-5 py-2.5 rounded-xl font-semibold text-[14px] hover:bg-[#5b4eb3] transition-all shadow-lg shadow-[#6c5dd3]/20"
          >
            <AddIcon fontSize="small" />
            Xonani qo'shish
          </button>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="group bg-gray-50/50 rounded-2xl p-6 border border-gray-100 hover:border-[#6C5DD3]/30 hover:bg-white hover:shadow-xl hover:shadow-[#6c5dd3]/5 transition-all duration-300 relative"
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-[15px] font-bold text-gray-800 capitalize">
                  {room.name}
                </h3>
                <p className="text-[13px] text-gray-400 font-medium">
                  Sig'imi: {room.capacity}
                </p>
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openDeleteModal(room)}
                  className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <DeleteOutlineOutlinedIcon sx={{ fontSize: 20 }} />
                </button>
                <button
                  onClick={() => openEditDrawer(room)}
                  className="p-1.5 text-gray-400 hover:text-[#6C5DD3] transition-colors"
                >
                  <EditOutlinedIcon sx={{ fontSize: 20 }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddRoomDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <EditRoomDrawer
        isOpen={editDrawer.open}
        onClose={closeEditDrawer}
        room={editDrawer.room}
        onSave={handleEditSave}
      />

      {/* Delete Confirmation Modal - rendered via portal to cover full screen */}
      {deleteModal.open && ReactDOM.createPortal(
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.35)", zIndex: 9999 }}
          onClick={closeDeleteModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4"
            style={{ animation: "modalPop 0.18s cubic-bezier(.4,2,.6,1) both" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[17px] font-bold text-gray-800 mb-3">
              Xonani o'chirish
            </h3>
            <p className="text-[14px] text-gray-500 mb-7">
              Rostdan ham o'chirishni hohlaysizmi?
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={closeDeleteModal}
                className="px-5 py-2 rounded-xl text-[14px] font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Bekor qilish
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2 rounded-xl text-[14px] font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-md shadow-red-200"
              >
                Ha
              </button>
            </div>
          </div>
          <style>{`
            @keyframes modalPop {
              from { opacity: 0; transform: scale(0.93); }
              to   { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Rooms;
