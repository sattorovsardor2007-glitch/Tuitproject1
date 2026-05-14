import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
import App from "./App";
import Loginpage from "./Pages/Loginpage/Loginpage";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./Pages/Dashboard/DashboardHome";

// Placeholder component for other dashboard pages
const Placeholder = ({ title }) => (
  <div className="flex items-center justify-center h-full min-h-[400px]">
    <h2 className="text-2xl font-bold text-gray-400">{title} sahifasi hozircha bo'sh</h2>
  </div>
);

const SettingsPlaceholder = () => {
  const location = useLocation();
  const path = location.pathname.split("/").pop() || "Boshqarish";
  return (
    <div className="flex items-center justify-center h-full min-h-[400px]">
      <h2 className="text-2xl font-bold text-gray-400 capitalize">{path} sozlamalari sahifasi hozircha bo'sh</h2>
    </div>
  );
};

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" replace />,
      },
      {
        path: "/login",
        element: <Loginpage />,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          {
            path: "teachers",
            element: <Placeholder title="O'qituvchilar" />,
          },
          {
            path: "classes",
            element: <Placeholder title="Guruhlar" />,
          },
          {
            path: "students",
            element: <Placeholder title="Talabalar" />,
          },
          {
            path: "gifts",
            element: <Placeholder title="Sovg'alar" />,
          },
          {
            path: "finance",
            element: <Placeholder title="Moliya" />,
          },
          {
            path: "settings/*",
            element: <SettingsPlaceholder />,
          },
        ],
      },
    ],
  },
]);

export default Router;
