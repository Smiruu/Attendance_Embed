// src/components/Calendar.jsx
import React, { useState } from "react";
import useCalendarHook from "../../hooks/useCalendarHook.jsx";

const Calendar = ({ onSelectDate }) => {
  const {
    today,
    currentMonth,
    currentYear,
    monthNames,
    daysOfWeek,
    firstDayOfMonth,
    daysInMonth,
  } = useCalendarHook();

  const [selectedDate, setSelectedDate] = useState(null);

  // ✅ Format to yyyy-mm-dd
  const formatDate = (year, month, day) => {
    const mm = String(month + 1).padStart(2, "0"); // month is 0-based
    const dd = String(day).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  };

  const handleDateClick = (day) => {
    const formatted = formatDate(currentYear, currentMonth, day);
    setSelectedDate(formatted);
    console.log(formatted)
    if (onSelectDate) {
      onSelectDate(formatted); // pass to parent
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden min-h-[325px]">
      {/* Header */}
      <div className="text-center bg-[#70625c] p-4 rounded-t-xl">
        <h2 className="text-lg font-bold text-white">
          {monthNames[currentMonth]} {currentYear}
        </h2>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 text-center font-medium text-gray-600">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 text-center text-gray-800">
        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, i) => (
            <div key={`empty-${i}`} className="py-2"></div>
          ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const isToday =
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

          const isSelected = selectedDate === formatDate(currentYear, currentMonth, day);

          return (
            <div
              key={day}
              onClick={() => handleDateClick(day)} // 👈 clickable
              className={`py-2 rounded-full cursor-pointer transition 
                hover:bg-[#70625c] hover:text-white
                ${isToday ? "bg-[#554640] text-white font-bold" : ""}
                ${isSelected ? "ring-2 ring-yellow-400 font-bold" : ""}`}
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
