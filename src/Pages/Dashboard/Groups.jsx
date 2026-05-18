import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import LayersIcon from "@mui/icons-material/LayersOutlined";
import SchoolIcon from "@mui/icons-material/SchoolOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import CachedIcon from "@mui/icons-material/Cached";
import GroupIcon from "@mui/icons-material/GroupOutlined";
import GroupsIcon from "@mui/icons-material/GroupsOutlined";
import AddGroupDrawer from "./components/AddGroupDrawer";
import GroupDetails from "./components/GroupDetails";

const Groups = () => {
  const [activeTab, setActiveTab] = useState("groups");
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Hooklar HAR DOIM yuqorida bo'lishi kerak
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
      prev.map((g) =>
        g.id === id ? { ...g, isActive: !g.isActive } : g
      )
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
        teacher:
          newGroup.teachers && newGroup.teachers.length > 0
            ? newGroup.teachers.join(", ")
            : "Mohirbek",
        studentsCount: newGroup.students
          ? newGroup.students.length
          : 0,
      },
    ]);
  };

  // Return hooklardan KEYIN bo'lishi kerak
  if (selectedGroup) {
    return (
      <GroupDetails
        group={selectedGroup}
        onBack={() => setSelectedGroup(null)}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Title & Action Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] font-bold text-gray-900 leading-none tracking-tight">
          Guruhlar
        </h1>

        <button
          onClick={() => setIsAddDrawerOpen(true)}
          className="flex items-center gap-1.5 bg-[#6C5DD3] text-white px-4 py-2.5 rounded-xl font-semibold text-[13.5px] hover:bg-[#5b4eb3] transition-all shadow-md shadow-[#6c5dd3]/20 whitespace-nowrap cursor-pointer"
        >
          <AddIcon sx={{ fontSize: 18 }} />
          Guruh qo'shish
        </button>
      </div>

      {/* Tabs */}
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

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Groups */}
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
            <span className="text-gray-400 font-semibold text-[13.5px]">
              Jami guruhlar
            </span>

            <span className="text-[32px] font-bold text-gray-900 leading-none">
              {groups.length}
            </span>
          </div>
        </div>

        {/* Teachers */}
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
            <span className="text-gray-400 font-semibold text-[13.5px]">
              O'qituvchilar
            </span>

            <span className="text-[32px] font-bold text-gray-900 leading-none">
              0
            </span>
          </div>
        </div>

        {/* Students */}
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
            <span className="text-gray-400 font-semibold text-[13.5px]">
              O'quvchilar
            </span>

            <span className="text-[32px] font-bold text-gray-900 leading-none">
              0
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100/50 flex flex-col gap-6">
        <div className="w-full overflow-x-auto rounded-2xl">
          <table className="w-full text-left border-collapse min-w-full">
            <thead>
              <tr className="border-b border-gray-100 text-[13px] font-bold text-gray-500 bg-gray-50/40">
                <th className="py-4 pl-6">Status</th>
                <th className="py-4 px-4">Guruh nomi</th>
                <th className="py-4 px-4">Kurs</th>
                <th className="py-4 px-4">Davomiyligi</th>
                <th className="py-4 px-4">Dars vaqti</th>
                <th className="py-4 px-4">Xona</th>
                <th className="py-4 px-4">O'qituvchi</th>
                <th className="py-4 px-4">Talabalar</th>

                <th className="py-4 pr-6 text-center">
                  <CachedIcon
                    sx={{
                      fontSize: 18,
                      className: "text-gray-400",
                    }}
                  />
                </th>
              </tr>
            </thead>

            <tbody>
              {groups.map((group) => (
                <tr
                  key={group.id}
                  onClick={() => setSelectedGroup(group)}
                  className="border-b border-gray-100 hover:bg-[#F8FAFC] transition-colors group cursor-pointer"
                >
                  {/* Status */}
                  <td className="py-4 pl-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStatus(group.id);
                        }}
                        className={`rounded-full flex items-center p-1 transition-colors duration-300 cursor-pointer ${
                          group.isActive
                            ? "bg-[#6C5DD3]"
                            : "bg-gray-200"
                        }`}
                        style={{
                          width: "44px",
                          height: "24px",
                        }}
                      >
                        <div
                          className="w-4 h-4 bg-white rounded-full shadow transition-transform duration-300"
                          style={{
                            transform: group.isActive
                              ? "translateX(20px)"
                              : "translateX(0px)",
                          }}
                        />
                      </button>

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

                  {/* Name */}
                  <td className="py-4 px-4 font-bold text-[#6C5DD3] hover:text-[#5b4eb3] hover:underline text-[14.5px] whitespace-nowrap transition-all">
                    {group.name}
                  </td>

                  {/* Course */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="bg-[#F8F6FF] text-[#A78BFA] px-3 py-1 rounded-xl text-[12px] font-semibold border border-purple-50/40">
                      {group.course}
                    </span>
                  </td>

                  {/* Duration */}
                  <td className="py-4 px-4 text-gray-500 font-semibold text-[13.5px] whitespace-nowrap">
                    {group.duration}
                  </td>

                  {/* Time */}
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

                  {/* Room */}
                  <td className="py-4 px-4 text-gray-500 font-semibold text-[13.5px] whitespace-nowrap">
                    {group.room}
                  </td>

                  {/* Teacher */}
                  <td className="py-4 px-4 text-gray-800 font-semibold text-[13.5px] whitespace-nowrap">
                    {group.teacher}
                  </td>

                  {/* Students */}
                  <td className="py-4 px-4 text-gray-800 font-bold text-[14px] whitespace-nowrap">
                    {group.studentsCount}
                  </td>

                  {/* Menu */}
                  <td className="py-4 pr-6 text-center whitespace-nowrap">
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 text-gray-300 hover:text-gray-500 transition-colors cursor-pointer"
                    >
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