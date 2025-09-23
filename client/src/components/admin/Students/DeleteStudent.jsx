import { useState } from "react";
import { useStudents } from "../../../hooks/admin/useStudents";
import { useAuthProvider } from "../../../context/authContext";

const DeleteStudent = () => {
  const { deleteStudent, loading, error } = useStudents();
  const { access } = useAuthProvider();

  const [studentId, setStudentId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await deleteStudent(studentId, access);
    setStudentId("");
  };

  return (
    <div className="p-4 border rounded w-full max-w-md text-black">
      <h2 className="text-lg font-bold mb-4">Delete Student</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded text-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-500 text-black px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
        >
          {loading ? "Deleting..." : "Delete Student"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default DeleteStudent;
