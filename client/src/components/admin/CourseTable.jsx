import { useEffect, useState } from "react";
import { useCourses } from "../../hooks/admin/useCourses";
import { useAuthProvider } from "../../context/authContext";

const CourseTable = ({ profId }) => {
  const { getProfCourses, error, loading } = useCourses();
  const { access } = useAuthProvider();

  const [courses, setCourses] = useState([]);

  // fetch courses when profId changes
  useEffect(() => {
    const fetchCourses = async () => {
      if (access && profId) {
        const data = await getProfCourses({ accessToken: access, prof_id: profId });
        if (data) setCourses(data.courses || []); // adjust API shape if needed
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Courses for Professor</h2>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p>Loading courses...</p>}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Course Name</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course.id}>
                <td className="border border-gray-300 p-2">{course.id}</td>
                <td className="border border-gray-300 p-2">{course.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center p-4 text-gray-500">
                No courses found for this professor.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
