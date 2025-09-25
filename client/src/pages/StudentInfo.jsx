import { useParams, Link } from "react-router-dom";
import useAttendanceData from "../hooks/useAttendanceData";

const StudentInfo = () => {
  const { id } = useParams();
  const { attendance } = useAttendanceData();

  const student = attendance.find((s) => s.id === parseInt(id));

  // Mock subjects data for now
  const subjects = [
    { id: 1, name: "Mathematics", absences: 2, lates: 1 },
    { id: 2, name: "Science", absences: 0, lates: 3 },
    { id: 3, name: "English", absences: 1, lates: 0 },
    { id: 4, name: "History", absences: 3, lates: 2 },
  ];

  if (!student) {
    return (
      <div className="p-6">
        <p className="text-red-600">Student not found.</p>
        <Link to="/" className="text-blue-600 underline">← Back</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Back button */}
      <Link to="/" className="text-[#554640] mb-4 inline-block">← Back</Link>

      {/* Header */}
      <div className="bg-[#554640] text-white text-3xl font-bold p-4 rounded-lg mb-6">
        STUDENT INFO
      </div>

      {/* Student Basic Info */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2 text-gray-900">{student.name}</h1>
        <p className="text-gray-700">Section: CPE - 401</p>
      </div>

      {/* Subjects Table */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Subjects Overview</h2>
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-[#554640] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Subject</th>
              <th className="px-4 py-2 text-left">Absences</th>
              <th className="px-4 py-2 text-left">Lates</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subj) => (
              <tr key={subj.id} className="border-b">
                <td className="px-4 py-2 text-gray-800">{subj.name}</td>
                <td className="px-4 py-2 text-gray-800">{subj.absences}</td>
                <td className="px-4 py-2 text-gray-800">{subj.lates}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentInfo;
