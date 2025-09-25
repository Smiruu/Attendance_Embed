import React from "react";
import useAttendanceData from "../../hooks/useAttendanceData";
import { Link } from "react-router-dom";

const AttendanceComponent = () => {
  const { attendance, addAttendance } = useAttendanceData();

  return (
    <div className="bg-[#554640] rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4 text-white">Attendance Table</h2>

      <table className="w-full border border-gray-300 text-sm text-white">
        <thead className="bg-white text-[#554640] text-md">
          <tr>
            <th className="px-4 py-2 text-left w-1/2">NAME</th>
            <th className="px-4 py-2 text-left">TIME-IN</th>
            <th className="px-4 py-2 text-left">TIME-OUT</th>
            <th className="px-4 py-2 text-left">REMARKS</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record) => (
            <tr key={record.id}>
              <td className="px-4 py-2">
                <Link
                  to={`/student/${record.id}`}
                  className="text-white-300 hover:underline"
                >
                  {record.name}
                </Link>
              </td>
              <td className="px-4 py-2">{record.timeIn}</td>
              <td className="px-4 py-2">{record.timeOut}</td>
              <td className="px-4 py-2">{record.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceComponent;
