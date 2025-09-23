import { useEffect, useState } from "react";
import { useAuthProvider } from "../../../context/authContext";
import { useProf } from "../../../hooks/admin/useProf";
import CourseTable from "./CourseTable";
import CourseForm from "./CourseForm";

const CoursesFunction = () => {
  const { getProfs, loading: profLoading, error: profError } = useProf();
  const { access } = useAuthProvider();

  const [profs, setProfs] = useState([]);
  const [selectedProf, setSelectedProf] = useState("");
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [showForm, setShowForm] = useState(false); // 👈 toggle state

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

  return (
    <div className="p-6 text-black"> {/* 👈 default all text black */}
      <h1 className="text-xl font-bold mb-4">Professor Courses</h1>

      {/* Select professor */}
      {profLoading && <p>Loading professors...</p>}
      {profError && <p className="text-red-500">{profError}</p>}

      {!profLoading && !profError && (
        <select
          value={selectedProf}
          onChange={(e) => {
            setSelectedProf(e.target.value);
            setShowForm(false); // reset form when switching prof
          }}
          className="border p-2 rounded w-full mb-4 text-black"
        >
          <option value="">-- Select a Professor --</option>
          {profs.map((prof) => (
            <option key={prof.id} value={prof.id}>
              {prof.full_name}
            </option>
          ))}
        </select>
      )}

      {/* Toggle create form */}
      {selectedProf && (
        <div className="mb-6">
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {showForm ? "Close Form" : "Create Course"}
          </button>

          {showForm && (
            <CourseForm
              profId={selectedProf}
              onCourseCreated={() => setRefreshFlag(!refreshFlag)}
            />
          )}
        </div>
      )}

      {/* Courses table */}
      {selectedProf && (
        <CourseTable profId={selectedProf} refreshFlag={refreshFlag} />
      )}
    </div>
  );
};

export default CoursesFunction;
