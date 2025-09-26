import React from "react";

function CourseStudentsTable({ students, loading, error }) {
  if (loading) return <p className="mt-4">Loading students...</p>;
  if (error) return <p className="mt-4 text-red-500">{error}</p>;

  return (
    <div className="mt-4">
      <h3 className="text-md font-semibold mb-2">Students in this course</h3>

      {!students || students.length === 0 ? (
        <p>No students enrolled in this course.</p>
      ) : (
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Student ID</th>
              <th className="border px-4 py-2">Name</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{student.id_code}</td>
                <td className="border px-4 py-2">{student.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CourseStudentsTable;
