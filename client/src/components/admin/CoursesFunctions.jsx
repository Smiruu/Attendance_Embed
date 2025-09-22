import { useEffect, useState } from "react";
import { useAuthProvider } from "../../context/authContext";
import { useProf } from "../../hooks/admin/useProf";
import { useCourses } from "../../hooks/admin/useCourses";
import CourseTable from "./CourseTable"; // 👈 import table

const CoursesFunction = () => {
  const { getProfs, loading: profLoading, error: profError } = useProf();
  const { createCourse, loading: courseLoading } = useCourses();
  const { access } = useAuthProvider();

  const [profs, setProfs] = useState([]);
  const [selectedProf, setSelectedProf] = useState("");
  const [courseName, setCourseName] = useState("");

  // fetch professors on mount
  useEffect(() => {
    const fetchProfs = async () => {
      if (access) {
        const data = await getProfs(access);
        if (data) setProfs(data.prof);
      }
    };
    fetchProfs();
  }, [access]);

  const handleCreateCourse = async () => {
    if (!selectedProf || !courseName) return;
    await createCourse({ accessToken: access, prof_id: selectedProf, name: courseName });
    setCourseName(""); // clear input
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Professor Courses</h1>

      {/* Select professor */}
      {profLoading && <p>Loading professors...</p>}
      {profError && <p className="text-red-500">{profError}</p>}

      {!profLoading && !profError && (
        <select
          value={selectedProf}
          onChange={(e) => setSelectedProf(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        >
          <option value="">-- Select a Professor --</option>
          {profs.map((prof) => (
            <option key={prof.id} value={prof.id}>
              {prof.full_name}
            </option>
          ))}
        </select>
      )}

      {/* Create course form */}
      {selectedProf && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter course name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="border p-2 rounded mr-2"
          />
          <button
            onClick={handleCreateCourse}
            disabled={courseLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {courseLoading ? "Creating..." : "Create Course"}
          </button>
        </div>
      )}

      {/* Courses table */}
      {selectedProf && <CourseTable profId={selectedProf} />}
    </div>
  );
};

export default CoursesFunction;
