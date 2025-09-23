import { useState } from "react";
import { useStudents } from "../../../hooks/admin/useStudents";
import { useAuthProvider } from "../../../context/authContext";

const CreateStudent = () => {
  const { createStudent, loading, error } = useStudents();
  const { access } = useAuthProvider();

  const [formData, setFormData] = useState({
    name: "",
    id_code: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createStudent(formData.name, formData.id_code, access);
    setFormData({ name: "", id_code: "" });
  };

  return (
    <div className="p-4 border rounded w-full max-w-md text-black">
      <h2 className="text-lg font-bold mb-4">Create Student</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded text-black"
        />
        <input
          type="text"
          name="id_code"
          placeholder="Student ID Code"
          value={formData.id_code}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded text-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Student"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default CreateStudent;
