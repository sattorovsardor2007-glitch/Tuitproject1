import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import LayersIcon from "@mui/icons-material/LayersOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlined";
import SchoolIcon from "@mui/icons-material/SchoolOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import CachedIcon from "@mui/icons-material/Cached";
import GroupIcon from "@mui/icons-material/GroupOutlined";
import GroupsIcon from "@mui/icons-material/GroupsOutlined";
import AddGroupDrawer from "./components/AddGroupDrawer";

const Groups = () => {
  const [activeTab, setActiveTab] = useState("groups");
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  
  // Interactive mock data for groups
  const [groups, setGroups] = useState([
    {
      id: 1,
      isActive: true,
      name: "N26",
      course: "Backend",
      duration: "6 oy",
      time: "09:30",
      days: "Du, Se, Chor, Pay, Ju",
      room: "Autodesk",
      teacher: "Mohirbek",
      studentsCount: 1,
    },
    {
      id: 2,
      isActive: true,
      name: "n105",
      course: "Backend",
      duration: "6 oy",
      time: "16:00",
      days: "Se, Pay, Shan",
      room: "Autodesk",
      teacher: "Mohirbek",
      studentsCount: 4,
    },
  ]);

  // Toggle group status
  const handleToggleStatus = (id) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isActive: !g.isActive } : g))
    );
  };

  const handleSaveGroup = (newGroup) => {
    setGroups((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        isActive: true,
        name: newGroup.name,
        course: newGroup.course,
        duration: "6 oy",
        time: newGroup.time,
        days: newGroup.days,
        room: newGroup.room,
        teacher: newGroup.teachers && newGroup.teachers.length > 0 ? newGroup.teachers.join(", ") : "Mohirbek",
        studentsCount: newGroup.students ? newGroup.students.length : 0,
      },
    ]);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Title & Action Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] font-bold text-gray-900 leading-none tracking-tight">Guruhlar</h1>
        <button
          onClick={() => setIsAddDrawerOpen(true)}
          className="flex items-center gap-1.5 bg-[#6C5DD3] text-white px-4 py-2.5 rounded-xl font-semibold text-[13.5px] hover:bg-[#5b4eb3] transition-all shadow-md shadow-[#6c5dd3]/20 whitespace-nowrap cursor-pointer"
        >
          <AddIcon sx={{ fontSize: 18 }} />
          Guruh qo'shish
        </button>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab("groups")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13.5px] font-bold transition-all cursor-pointer ${
            activeTab === "groups"
              ? "bg-[#F3F4F6] text-gray-800"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <LayersIcon sx={{ fontSize: 18 }} />
          Guruhlar
        </button>
        <button
          onClick={() => setActiveTab("archive")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13.5px] font-bold transition-all cursor-pointer ${
            activeTab === "archive"
              ? "bg-[#F3F4F6] text-gray-800"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <FolderOutlinedIcon sx={{ fontSize: 18 }} />
          Arxiv
        </button>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Jami guruhlar */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100/55 flex flex-col gap-4 relative">
          <div className="flex items-center justify-between">
            <div className="text-gray-400">
              <GroupIcon sx={{ fontSize: 24 }} />
            </div>
            <button className="text-gray-300 hover:text-gray-500 cursor-pointer">
              <MoreVertIcon sx={{ fontSize: 20 }} />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-400 font-semibold text-[13.5px]">Jami guruhlar</span>
            <span className="text-[32px] font-bold text-gray-900 leading-none">2</span>
          </div>
        </div>

        {/* Card 2: O'qituvchilar */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100/55 flex flex-col gap-4 relative">
          <div className="flex items-center justify-between">
            <div className="text-gray-400">
              <GroupsIcon sx={{ fontSize: 24 }} />
            </div>
            <button className="text-gray-300 hover:text-gray-500 cursor-pointer">
              <MoreVertIcon sx={{ fontSize: 20 }} />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-400 font-semibold text-[13.5px]">O'qituvchilar</span>
            <span className="text-[32px] font-bold text-gray-900 leading-none">0</span>
          </div>
        </div>

        {/* Card 3: O'quvchilar */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100/55 flex flex-col gap-4 relative">
          <div className="flex items-center justify-between">
            <div className="text-gray-400">
              <SchoolIcon sx={{ fontSize: 24 }} />
            </div>
            <button className="text-gray-300 hover:text-gray-500 cursor-pointer">
              <MoreVertIcon sx={{ fontSize: 20 }} />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-400 font-semibold text-[13.5px]">O'quvchilar</span>
            <div className="flex items-center justify-between">
              <span className="text-[32px] font-bold text-gray-900 leading-none">0</span>
              {/* Stacked Initial Avatars */}
              <div className="flex items-center mt-0.5">
                <span 
                  className="w-6 h-6 rounded-full bg-[#EA580C] text-white flex items-center justify-center font-bold text-[10px] border border-white"
                  style={{ position: "relative", zIndex: 3 }}
                >
                  I
                </span>
                <span 
                  className="w-6 h-6 rounded-full bg-[#1E293B] text-white flex items-center justify-center font-bold text-[10px] border border-white"
                  style={{ position: "relative", marginLeft: "-8px", zIndex: 2 }}
                >
                  M
                </span>
                <span 
                  className="w-6 h-6 rounded-full bg-[#EC4899] text-white flex items-center justify-center font-bold text-[10px] border border-white"
                  style={{ position: "relative", marginLeft: "-8px", zIndex: 1 }}
                >
                  S
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100/50 flex flex-col gap-6">
        <div className="w-full overflow-x-auto rounded-2xl">
          <table className="w-full text-left border-collapse min-w-full">
            <thead>
              <tr className="border-b border-gray-100 text-[13px] font-bold text-gray-500 bg-gray-50/40">
                <th className="py-4 pl-6 w-[12%] whitespace-nowrap">Status</th>
                <th className="py-4 px-4 w-[16%] whitespace-nowrap">Guruh nomi</th>
                <th className="py-4 px-4 w-[12%] whitespace-nowrap">Kurs</th>
                <th className="py-4 px-4 w-[14%] whitespace-nowrap">Davomiyligi</th>
                <th className="py-4 px-4 w-[18%] whitespace-nowrap">Dars vaqti</th>
                <th className="py-4 px-4 w-[12%] whitespace-nowrap">Xona</th>
                <th className="py-4 px-4 w-[16%] whitespace-nowrap">O'qituvchi</th>
                <th className="py-4 px-4 w-[10%] whitespace-nowrap">Talabalar</th>
                <th className="py-4 pr-6 w-12 text-center whitespace-nowrap">
                  <CachedIcon sx={{ fontSize: 18, className: "text-gray-400" }} />
                </th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <tr
                  key={group.id}
                  className="border-b border-gray-100 hover:bg-gray-50/30 transition-colors group"
                >
                  {/* Status Toggle Switch and capsule */}
                  <td className="py-4 pl-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {/* Toggle Switch */}
                      <button
                        onClick={() => handleToggleStatus(group.id)}
                        className={`rounded-full flex items-center p-1 transition-colors duration-300 focus:outline-none cursor-pointer flex-shrink-0 ${
                          group.isActive ? "bg-[#6C5DD3]" : "bg-gray-200"
                        }`}
                        style={{ width: "44px", minWidth: "44px", height: "24px" }}
                      >
                        <div
                          className="w-4 h-4 bg-white rounded-full shadow transition-transform duration-300"
                          style={{ transform: group.isActive ? "translateX(20px)" : "translateX(0px)" }}
                        />
                      </button>
                      {/* FAOL Badge */}
                      {group.isActive ? (
                        <span className="bg-[#E6F4EA] text-[#137333] px-2.5 py-0.5 rounded-lg text-[11px] font-bold">
                          FAOL
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-400 px-2.5 py-0.5 rounded-lg text-[11px] font-bold">
                          FAOL EMAS
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Guruh Nomi */}
                  <td className="py-4 px-4 font-bold text-gray-800 text-[14.5px] whitespace-nowrap">
                    {group.name}
                  </td>

                  {/* Kurs Capsule */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="bg-[#F8F6FF] text-[#A78BFA] px-3 py-1 rounded-xl text-[12px] font-semibold border border-purple-50/40">
                      {group.course}
                    </span>
                  </td>

                  {/* Davomiyligi */}
                  <td className="py-4 px-4 text-gray-500 font-semibold text-[13.5px] whitespace-nowrap">
                    {group.duration}
                  </td>

                  {/* Dars Vaqti & Week Days */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 text-[14px]">
                        {group.time}
                      </span>
                      <span className="text-[11px] font-medium text-gray-400 mt-0.5">
                        {group.days}
                      </span>
                    </div>
                  </td>

                  {/* Xona */}
                  <td className="py-4 px-4 text-gray-500 font-semibold text-[13.5px] whitespace-nowrap">
                    {group.room}
                  </td>

                  {/* O'qituvchi */}
                  <td className="py-4 px-4 text-gray-800 font-semibold text-[13.5px] whitespace-nowrap">
                    {group.teacher}
                  </td>

                  {/* Talabalar count */}
                  <td className="py-4 px-4 text-gray-800 font-bold text-[14px] whitespace-nowrap">
                    {group.studentsCount}
                  </td>

                  {/* Vertical Three Dot Menu */}
                  <td className="py-4 pr-6 text-center whitespace-nowrap">
                    <button className="p-1.5 text-gray-300 hover:text-gray-500 transition-colors cursor-pointer">
                      <MoreVertIcon sx={{ fontSize: 18 }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddGroupDrawer
        isOpen={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
        onSave={handleSaveGroup}
      />
    </div>
  );
};

export default Groups;
