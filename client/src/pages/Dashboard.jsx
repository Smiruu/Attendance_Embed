import React, { useState } from "react";
import Calendar from "../components/dashboard/CalendarComponent.jsx";
import AttendanceComponent from "../components/dashboard/AttendanceComponent.jsx";
import CoursesComponent from "../components/dashboard/CoursesComponent.jsx";

import { useAuthProvider } from "../context/authContext.jsx";

function Dashboard() {
  const { logout } = useAuthProvider();

  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // 👈 store date here
  console.log("id", selectedCourseId, "date", selectedDate);
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
          <div className="max-h-[350px] overflow-y-auto pr-2 scrollable">
            <CoursesComponent onSelectCourse={setSelectedCourseId} />
          </div>

          {/* Right Column */}
          <div className="mt-6 max-h-[200px]">
            <Calendar onSelectDate={setSelectedDate} /> {/* 👈 pass handler */}
          </div>
        </div>

        <p className="text-2xl font-extrabold mb-4 text-[#4B3A34]">
          ATTENDANCE
        </p>
        {/* Pass both courseId + date */}
        <AttendanceComponent courseId={selectedCourseId} date={selectedDate} />
      </div>
    </>
  );
}

export default Dashboard;
