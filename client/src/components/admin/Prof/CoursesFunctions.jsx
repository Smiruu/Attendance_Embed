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
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null); // Add this

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

  // Add these functions
  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleCloseEdit = () => {
    setEditingCourse(null);
    setShowForm(false);
  };

  const handleCourseCreated = () => {
    setRefreshFlag(!refreshFlag);
    setShowForm(false);
    setEditingCourse(null);
  };

  return (
    <div className="p-6 text-black">
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
            setEditingCourse(null); // Add this
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
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Create Course
            </button>
          ) : (
            <CourseForm
              profId={selectedProf}
              editData={editingCourse} // Add this
              onCourseCreated={handleCourseCreated} // Update this
              onEdit={handleCloseEdit} // Add this
            />
          )}
        </div>
      )}

      {/* Courses table */}
      {selectedProf && (
        <CourseTable 
          profId={selectedProf} 
          refreshFlag={refreshFlag}
          onEditCourse={handleEditCourse} // Add this
        />
      )}
    </div>
  );
};

export default CoursesFunction;