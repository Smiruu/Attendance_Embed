import React, { useEffect, useState } from "react";

import { useStudents } from "../../../hooks/admin/useStudents";
import { useAuthProvider } from "../../../context/authContext";
function AddStudentToCourse() {
  const { access } = useAuthProvider();
const { getCourses, loading, error } = useStudents();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

    console.log(selectedCourse)
useEffect(() => {
  if (access) {
    const fetchCourses = async () => {
      const response = await getCourses(access);
      if (response) {
        setCourses(response.data); // response is already res.data from your getCourses

      }
    };
    fetchCourses();
  }
}, [access]);


  return (
    <div className="p-4 text-black">
      <h2 className="text-lg font-semibold mb-2">Add Student to Course</h2>

      {loading && <p>Loading courses...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default AddStudentToCourse;
