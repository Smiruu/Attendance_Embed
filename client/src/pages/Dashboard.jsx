import React from "react";
import Calendar from "../components/CalendarComponent.jsx";
import AttendanceComponent from "../components/AttendanceComponent.jsx";

function Dashboard() {
  return (
    <>
      <div className="min-h-screen p-6">
        {/* Top Section: 2 columns */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Left Column */}
          <div className="text-black">Hello!</div>

          {/* Right Column */}
          <div>
            <Calendar />
          </div>
        </div>

        <AttendanceComponent />
      </div>
    </>
  );
}

export default Dashboard;
