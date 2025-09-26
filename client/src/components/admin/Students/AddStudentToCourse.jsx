import React, { useEffect, useState } from "react";
import { useStudents } from "../../../hooks/admin/useStudents";
import { useAuthProvider } from "../../../context/authContext";
import CourseStudentsTable from "./CourseStudentsTable";
import AddStudentsButton from "./AddStudentsButton"; // 👈 import new button

function AddStudentToCourse() {
  const { access } = useAuthProvider();
  const { getCourseStudents, getCourses, loading, error } = useStudents();

  const [courseStudents, setCourseStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    if (access) {
      const fetchCourses = async () => {
        const response = await getCourses(access);
        if (response) {
          setCourses(response.data);
        }
      };
      fetchCourses();
    }
  }, [access]);

  useEffect(() => {
    if (selectedCourse) {
      getCourseStudents(access, selectedCourse).then((response) => {
        if (response?.data) {
          const studentsArray = response.data.map((obj) => obj.students);
          const sorted = [...studentsArray].sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setCourseStudents(sorted);
        }
      });
    } else {
      setCourseStudents([]);
    }
  }, [selectedCourse, access]);

  return (
    <div className="p-4 text-black">
      <h2 className="text-lg font-semibold mb-2">Add Student to Course</h2>

      {loading && <p>Loading courses...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="border rounded px-3 py-2 mb-4"
        >
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      )}

      {/* Pass students down here 👇 */}
      {selectedCourse && (
        <div className="mb-4">
          <AddStudentsButton
            courseId={selectedCourse}
            existingStudents={courseStudents} // 👈 pass enrolled students
          />
        </div>
      )}

      <CourseStudentsTable
        students={courseStudents}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default AddStudentToCourse;
