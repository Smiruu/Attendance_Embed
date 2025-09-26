// src/components/Calendar.jsx
import React from "react";
import useCalendarHook from "../../hooks/useCalendarHook.jsx";

const Calendar = ({ onSelectDate }) => {
  const {
    today,
    year,
    month,
    monthNames,
    daysOfWeek,
    firstDayOfMonth,
    daysInMonth,
    selectedDate,
    formatDate,
    handleDateClick,
    goToPreviousMonth,
    goToNextMonth,
  } = useCalendarHook();

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden min-h-[325px]">
      {/* Header with navigation */}
      <div className="flex justify-between items-center bg-[#70625c] p-4 rounded-t-xl text-white">
        <button
          onClick={goToPreviousMonth}
          className="px-2 py-1 rounded hover:bg-[#554640]"
        >
          ◀
        </button>
        <h2 className="text-lg font-bold">
          {monthNames[month]} {year}
        </h2>
        <button
          onClick={goToNextMonth}
          className="px-2 py-1 rounded hover:bg-[#554640]"
        >
          ▶
        </button>
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
            month === today.getMonth() &&
            year === today.getFullYear();

          const isSelected =
            selectedDate === formatDate(year, month, day);

          return (
            <div
              key={day}
              onClick={() => handleDateClick(day, onSelectDate)}
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
