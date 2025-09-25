import React, { useEffect } from "react";
import Calendar from "../components/dashboard/CalendarComponent.jsx";
import AttendanceComponent from "../components/dashboard/AttendanceComponent.jsx";
import CoursesComponent from "../components/dashboard/CoursesComponent.jsx";
import { useAuthProvider } from "../context/authContext";

import { useAuthProvider } from "../context/authContext.jsx";
function Dashboard() {
  const { logout } = useAuthProvider();

  return (
    <>
      <div className="min-h-screen p-6">
        {/* Top Section: 2 columns */}
        <div className="bg-[#554640] text-white text-4xl font-bold p-4 mb-3 rounded-lg grid grid-cols-2">
          DASHBOARD
          <div>
            <button
              onClick={logout}
              className="bg-[#4B3A34] hover:bg-[red] text-sm mr-2 p-3 rounded-lg float-right"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Left Column */}

          <CoursesComponent />

          {/* Right Column */}
          <div className="mt-6">
            <Calendar />
          </div>
        </div>
        <p className="text-2xl font-extrabold mb-4 text-[#4B3A34]">
          ATTENDANCE
        </p>
        <AttendanceComponent />
      </div>
    </>
  );
}

export default Dashboard;
