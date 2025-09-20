// src/hooks/useCalendarHook.jsx
import { useMemo } from "react";

const useCalendarHook = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  // useMemo so it's not recalculated on every re-render
  return useMemo(
    () => ({
      today,
      currentMonth,
      currentYear,
      monthNames,
      daysOfWeek,
      firstDayOfMonth,
      daysInMonth,
    }),
    [today, currentMonth, currentYear, firstDayOfMonth, daysInMonth]
  );
};

export default useCalendarHook;
