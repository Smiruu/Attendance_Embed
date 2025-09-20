import React from "react";

const AttendanceComponent = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4">Attendance Table</h2>
      <table className="w-full border border-gray-300 text-sm text-gray-700">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Date</th>
            <th className="border px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">John Doe</td>
            <td className="border px-4 py-2">Sept 20, 2025</td>
            <td className="border px-4 py-2">Present</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Jane Smith</td>
            <td className="border px-4 py-2">Sept 20, 2025</td>
            <td className="border px-4 py-2">Absent</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceComponent;
