import { useState } from "react";

const useAttendanceData = () => {
  const [attendance, setAttendance] = useState([
    {
      id: 1,
      name: "John Doe",
      timeIn: "8:30 AM",
      timeOut: "5:00 PM",
      remarks: "Present",
    },
    {
      id: 2,
      name: "Jane Smith",
      timeIn: "—",
      timeOut: "—",
      remarks: "Absent",
    },
  ]);

  // Add a new record
  const addAttendance = (newRecord) => {
    setAttendance((prev) => [
      ...prev,
      { id: prev.length + 1, ...newRecord },
    ]);
  };

  return { attendance, addAttendance };
};

export default useAttendanceData;
