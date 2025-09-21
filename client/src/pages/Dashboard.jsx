import React from "react";
import Calendar from "../components/dashboard/CalendarComponent.jsx";
import AttendanceComponent from "../components/dashboard/AttendanceComponent.jsx";
import ClassesComponent from "../components/dashboard/ClassesComponent.jsx";  

function Dashboard() {
  return (
    <>
      <div className="min-h-screen p-6">
        {/* Top Section: 2 columns */}
        <div className="bg-[#554640] text-white text-4xl font-bold p-4 mb-3 rounded-lg">
          DASHBOARD
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Left Column */}
          <ClassesComponent/>

          {/* Right Column */}
          <div className="mt-6">
            <Calendar />
          </div>
        </div>
        <p className="text-2xl font-extrabold mb-4 text-[#4B3A34]">ATTENDANCE</p>
        <AttendanceComponent />
      </div>
    </>
  );
}

export default Dashboard;
