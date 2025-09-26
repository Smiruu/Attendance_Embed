// src/hooks/useCalendarHook.jsx
import { useMemo, useState } from "react";

const useCalendarHook = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(year, month);

  // Format yyyy-mm-dd
  const formatDate = (y, m, d) => {
    const mm = String(m + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    return `${y}-${mm}-${dd}`;
  };

  const handleDateClick = (day, onSelectDate) => {
    const formatted = formatDate(year, month, day);
    setSelectedDate(formatted);
    if (onSelectDate) onSelectDate(formatted);
  };

  const goToPreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  return useMemo(
    () => ({
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
    }),
    [today, year, month, firstDayOfMonth, daysInMonth, selectedDate]
  );
};

export default useCalendarHook;
