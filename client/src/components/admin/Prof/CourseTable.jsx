import { useEffect, useState } from "react";
import { useCourses } from "../../../hooks/admin/useCourses";
import { useAuthProvider } from "../../../context/authContext";

const CourseTable = ({ profId }) => {
  const { getProfCourses, error, loading } = useCourses();
  const { access } = useAuthProvider();

  const [courses, setCourses] = useState([]);
  const [refresh, setRefresh] = useState(false); // 👈 refresh state

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
      setRefresh(false); // 👈 reset refresh flag
    };
    fetchCourses();
  }, [access, profId, refresh]); // 👈 refresh as dependency

  const formatDays = (days) => {
    if (!days) return "—";
    if (Array.isArray(days)) {
      return days.map((d) => dayMap[d] || d).join(", ");
    }
    return dayMap[days] || days;
  };

  const formatTime = (time) => {
    if (!time) return "—";
    const [hourStr, minuteStr] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr.padStart(2, "0");
    const period = hour >= 12 ? "PM" : "AM";

    if (hour === 0) {
      hour = 12;
    } else if (hour > 12) {
      hour -= 12;
    }

    return `${hour}:${minute} ${period}`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Courses for Professor</h2>
        <button
          onClick={() => setRefresh(true)} // 👈 trigger refresh
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading && <p>Loading courses...</p>}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Course Name</th>
            <th className="border border-gray-300 p-2">Section</th>
            <th className="border border-gray-300 p-2">Room</th>
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
                    <td className="border border-gray-300 p-2">{course.section}</td>
                    <td className="border border-gray-300 p-2">{schedule.room}</td>
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
                    colSpan="5"
                    className="border border-gray-300 p-2 text-center text-gray-500"
                  >
                    No schedules
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4 text-gray-500">
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
