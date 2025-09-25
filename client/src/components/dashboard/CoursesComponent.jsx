import { useEffect, useState } from "react";
import { useCourses } from "../../hooks/admin/useCourses";
import { useAuthProvider } from "../../context/authContext";

const CoursesComponent = () => {
  const { getProfCourses, error, loading } = useCourses();
  const { access, user } = useAuthProvider();

  const [courses, setCourses] = useState([]);
  const profId = user?.id;

  // ✅ format time (HH:MM)
  const formatTime = (time) => {
    if (!time) return "—";
    return time.slice(0, 5); // "07:00:00" → "07:00"
  };

  useEffect(() => {
    const fetchCourses = async () => {
      if (!access || !profId) return;

      const data = await getProfCourses({
        accessToken: access,
        prof_id: profId,
      });

      if (data) {
        console.log(data);
        setCourses(data.courses || []);
      }
    };

    fetchCourses();
  }, [access, profId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-extrabold mb-4 text-[#4B3A34]">
        ONGOING COURSES
      </h2>

      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-gray-500">Loading courses...</p>}

      {courses.length > 0 ? (
        courses.map((course) =>
          course.schedules && course.schedules.length > 0 ? (
            course.schedules.map((schedule) => (
              <div
                key={`${course.id}-${schedule.id}`}
                className="bg-[#4B3A34] text-white p-4 rounded-lg mb-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">{course.name}</span>
                  <span className="font-bold">{course.section}</span>
                  <span className="font-bold">{schedule.room}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="italic text-sm">
                    {formatTime(schedule.time_start)} - {formatTime(schedule.time_end)} ({schedule.day})
                  </span>
                  <span className="text-sm font-semibold">
                    STATUS: {course.status ?? "UPCOMING"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div
              key={course.id}
              className="bg-[#4B3A34] text-white p-4 rounded-lg mb-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">{course.name}</span>
                <span className="font-bold">{course.section}</span>
                <span className="italic text-sm">No schedules</span>
              </div>
            </div>
          )
        )
      ) : (
        <p className="text-gray-500">No courses found.</p>
      )}
    </div>
  );
};

export default CoursesComponent;
