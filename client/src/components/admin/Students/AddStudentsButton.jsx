import React, { useEffect, useState } from "react";
import { useStudents } from "../../../hooks/admin/useStudents";
import { useAuthProvider } from "../../../context/authContext";

function AddStudentsButton({ courseId, existingStudents }) {
  const { access } = useAuthProvider();
  const { getStudents, addStudentToCourse, loading, error } = useStudents();

  const [allStudents, setAllStudents] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");

  
  useEffect(() => {
    if (access) {
      const fetchStudents = async () => {
        const response = await getStudents(access);
        if (response?.students) {
            
          setAllStudents(response.students);
        }
      };
      fetchStudents();
    }
  }, [access]);

  // filter out students already in the course
  useEffect(() => {
    if (allStudents.length > 0 && existingStudents) {
      const existingIds = new Set(existingStudents.map((s) => s.id));
      const filtered = allStudents.filter((s) => !existingIds.has(s.id));
      setAvailableStudents(filtered);
    } else {
      setAvailableStudents(allStudents);
    }
  }, [allStudents, existingStudents]);

  const handleAdd = async () => {
    if (!selectedStudent) return;
    console.log(selectedStudent)
    await addStudentToCourse(selectedStudent, courseId, access);
    setSelectedStudent("");
    // re-filter after adding
    const existingIds = new Set([...existingStudents.map((s) => s.id), selectedStudent]);
    setAvailableStudents(allStudents.filter((s) => !existingIds.has(s.id)));
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">Add a student</h3>

      {loading && <p>Loading students...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && availableStudents.length > 0 ? (
        <div className="flex gap-2">
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">Select a student</option>
            {availableStudents.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      ) : (
        <p className="text-gray-500">No students available to add.</p>
      )}
    </div>
  );
}

export default AddStudentsButton;
