import { useParams, Link } from "react-router-dom";

const StudentInfo = () => {
  const { id,name } = useParams();

  // For now, mock student data
  const student = { id, name };

  // Mock subjects data
  const subjects = [
    { id: 1, name: "Mathematics", absences: 2, lates: 1 },
    { id: 2, name: "Science", absences: 0, lates: 3 },
    { id: 3, name: "English", absences: 1, lates: 0 },
    { id: 4, name: "History", absences: 3, lates: 2 },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <Link to="/" className="text-[#554640] mb-4 inline-block">← Back</Link>
      <div className="bg-[#554640] text-white text-3xl font-bold p-4 rounded-lg mb-6">
        STUDENT INFO
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2 text-gray-900">{student.name}</h1>
        <p className="text-gray-700">ID Code: {id}</p>
        <p className="text-gray-700">Section: CPE - 401</p>
      </div>

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
