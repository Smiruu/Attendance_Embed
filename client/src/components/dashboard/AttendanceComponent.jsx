import React, { useEffect } from "react";
import useAttendanceData from "../../hooks/useAttendanceData";
import { useAuthProvider } from "../../context/authContext";
import { Link } from "react-router-dom";

const AttendanceComponent = ({ courseId, date }) => {
  const { access } = useAuthProvider();
  const { attendance, loading, error, getAttendance } = useAttendanceData();

  // Fetch attendance whenever courseId or date changes
  useEffect(() => {
    if (courseId && date && access) {
      getAttendance(courseId, date, access);
    }
  }, [courseId, date, access]);

  console.log(attendance)
  return (
    <div className="bg-[#554640] rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4 text-white">Attendance Table</h2>

      {loading && <p className="text-gray-300">Loading attendance...</p>}
      {error && <p className="text-red-400">{error}</p>}

      <table className="w-full border border-gray-300 text-sm text-white">
        <thead className="bg-white text-[#554640] text-md">
          <tr>
            <th className="px-4 py-2 text-left w-1/2">NAME</th>
            <th className="px-4 py-2 text-left">TIME-IN</th>
            <th className="px-4 py-2 text-left">REMARKS</th>
          </tr>
        </thead>
        <tbody>
          {attendance.length > 0 ? (
            attendance.map((record) => (
              <tr key={record.id}>
                <td className="px-4 py-2">
                  <Link
                    to={`/student/${record.student.id_code}/${record.student.name}`}
                    className="text-white-300 hover:underline"
                  >
                    {record.student.name}
                  </Link>
                </td>
                <td className="px-4 py-2">{record.session.time_in || "—"}</td>
                
                <td className="px-4 py-2">{record.remark || "—"}</td>
              </tr>
            ))
          ) : (
            !loading && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-300">
                  No attendance records found
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceComponent;
