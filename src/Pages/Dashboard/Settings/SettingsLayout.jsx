import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const SettingsLayout = () => {
  const location = useLocation();
  const isSettingsRoot = location.pathname === "/dashboard/settings";
  const tabs = [
    { name: "Kurslar", path: "courses" },
    { name: "Xonalar", path: "rooms" },
    { name: "Xodimlar", path: "employees" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {!isSettingsRoot && (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Boshqarish</h1>
          <nav className="flex items-center gap-6 border-b border-gray-100 overflow-x-auto pb-1 no-scrollbar">
            {tabs.map((tab) => (
              <NavLink
                key={tab.name}
                to={tab.path}
                className={({ isActive }) =>
                  `text-[15px] font-medium whitespace-nowrap pb-3 transition-all relative ${
                    isActive
                      ? "text-[#6C5DD3] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#6C5DD3]"
                      : "text-gray-400 hover:text-gray-600"
                  }`
                }
              >
                {tab.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsLayout;
