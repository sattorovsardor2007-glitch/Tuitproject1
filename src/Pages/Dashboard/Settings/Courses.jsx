import React, { useState } from "react";
import AddCourseDrawer from "./components/AddCourseDrawer";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";

const Courses = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Backend",
      description: "Yaxshi",
      duration: "120 min",
      period: "6 oy",
      price: "2400000",
    },
  ]);

  const handleAddCourse = (newCourse) => {
    setCourses((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...newCourse,
      },
    ]);
  };

  const handleDeleteCourse = (id) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-800">Kurslar</h2>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <RefreshIcon fontSize="small" />
            </button>
          </div>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 bg-[#6C5DD3] text-white px-5 py-2.5 rounded-xl font-semibold text-[14px] hover:bg-[#5b4eb3] transition-all shadow-lg shadow-[#6c5dd3]/20"
          >
            <AddIcon fontSize="small" />
            Kurslar qo'shish
          </button>
        </div>

        {/* Courses Grid */}
        <div className="flex flex-wrap gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-[#EEF4FC] rounded-3xl p-6 border border-blue-100/40 relative flex flex-col justify-between min-h-[160px] w-full sm:w-[350px] hover:shadow-lg hover:shadow-blue-100/20 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[16px] font-bold text-gray-800 capitalize">
                      {course.name}
                    </h3>
                    <p className="text-[13px] text-gray-400 font-medium">
                      {course.description || "Tavsif mavjud emas"}
                    </p>
                  </div>

                  {/* Actions (Edit / Delete) */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-white/50"
                    >
                      <DeleteOutlineOutlinedIcon sx={{ fontSize: 20 }} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-[#6C5DD3] transition-colors rounded-lg hover:bg-white/50">
                      <EditOutlinedIcon sx={{ fontSize: 20 }} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Badges/Pills */}
              <div className="flex items-center gap-2 mt-6 flex-nowrap whitespace-nowrap">
                <span className="bg-white px-3.5 py-1.5 rounded-lg text-[12px] font-semibold text-gray-700 shadow-sm border border-gray-100/50">
                  {course.duration}
                </span>
                <span className="bg-white px-3.5 py-1.5 rounded-lg text-[12px] font-semibold text-gray-700 shadow-sm border border-gray-100/50">
                  {course.period}
                </span>
                <span className="bg-white px-3.5 py-1.5 rounded-lg text-[12px] font-semibold text-gray-700 shadow-sm border border-gray-100/50">
                  {course.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddCourseDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleAddCourse}
      />
    </div>
  );
};

export default Courses;
