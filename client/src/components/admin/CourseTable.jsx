import { useEffect, useState } from "react";
import { useCourses } from "../../hooks/admin/useCourses";
import { useAuthProvider } from "../../context/authContext";

const CourseTable = ({ profId }) => {
  const { getProfCourses, error, loading } = useCourses();
  const { access } = useAuthProvider();

  const [courses, setCourses] = useState([]);

  // mapping short day → full day
  const dayMap = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
  };

  useEffect(() => {
    const fetchCourses = async () => {
      if (access && profId) {
        const data = await getProfCourses({ accessToken: access, prof_id: profId });
        if (data) setCourses(data.courses || []);
      }
    };
    fetchCourses();
  }, [access, profId]);

  const formatDays = (days) => {
    if (!days) return "—";
    if (Array.isArray(days)) {
      return days.map((d) => dayMap[d] || d).join(", ");
    }
    return dayMap[days] || days; // fallback for old single-day data
  };

  // ⏰ Convert HH:mm:ss → hh:mm AM/PM
  const formatTime = (time) => {
    if (!time) return "—";
    const [hourStr, minuteStr] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr.padStart(2, "0");
    const period = hour >= 12 ? "PM" : "AM";

    if (hour === 0) {
      hour = 12; // midnight → 12 AM
    } else if (hour > 12) {
      hour -= 12; // 13 → 1 PM
    }

    return `${hour}:${minute} ${period}`;
  };

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
            <th className="border border-gray-300 p-2">Days</th>
            <th className="border border-gray-300 p-2">Time Start</th>
            <th className="border border-gray-300 p-2">Time End</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course) =>
              course.schedules && course.schedules.length > 0 ? (
                course.schedules.map((schedule) => (
                  <tr key={`${course.id}-${schedule.id}`}>
                    <td className="border border-gray-300 p-2">{course.id}</td>
                    <td className="border border-gray-300 p-2">{course.name}</td>
                    <td className="border border-gray-300 p-2">
                      {formatDays(schedule.day)}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {formatTime(schedule.time_start)}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {formatTime(schedule.time_end)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr key={course.id}>
                  <td className="border border-gray-300 p-2">{course.id}</td>
                  <td className="border border-gray-300 p-2">{course.name}</td>
                  <td
                    colSpan="3"
                    className="border border-gray-300 p-2 text-center text-gray-500"
                  >
                    No schedules
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
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
