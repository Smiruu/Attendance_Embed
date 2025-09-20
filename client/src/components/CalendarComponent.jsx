// src/components/Calendar.jsx
import React from "react";
import useCalendarHook from "../hooks/useCalendarHook.jsx";

const Calendar = () => {
  const {
    today,
    currentMonth,
    currentYear,
    monthNames,
    daysOfWeek,
    firstDayOfMonth,
    daysInMonth,
  } = useCalendarHook();

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">
          {monthNames[currentMonth]} {currentYear}
        </h2>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 text-center font-medium text-gray-600">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-2">{day}</div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 text-center text-gray-800">
        {Array(firstDayOfMonth).fill(null).map((_, i) => (
          <div key={`empty-${i}`} className="py-2"></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const isToday =
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

          return (
            <div
              key={day}
              className={`py-2 rounded-full cursor-pointer hover:bg-indigo-100 ${
                isToday ? "bg-indigo-500 text-white font-bold" : ""
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
