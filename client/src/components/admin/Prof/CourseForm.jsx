import { use, useState } from "react";
import { useAuthProvider } from "../../../context/authContext";
import { useCourses } from "../../../hooks/admin/useCourses";

const CourseForm = ({ profId, onCourseCreated }) => {
  const { createCourse, loading } = useCourses();
  const { access } = useAuthProvider();

  const [courseName, setCourseName] = useState("");
  const [section, setSection] = useState("")
  const [timeStart, setTimeStart] = useState({ hour: "", minute: "", period: "AM" });
  const [timeEnd, setTimeEnd] = useState({ hour: "", minute: "", period: "AM" });
  const [days, setDays] = useState([]); // ⬅️ array of days
  const [room, setRoom] = useState("")

  const handleDayChange = (day) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // Convert to 24-hour HH:mm:ss
  const formatTime = ({ hour, minute, period }) => {
    if (!hour || !minute) return null;
    let h = parseInt(hour, 10);

    if (period === "PM" && h < 12) {
      h += 12;
    } else if (period === "AM" && h === 12) {
      h = 0;
    }

    return `${String(h).padStart(2, "0")}:${minute}:00`;
  };

  const handleCreateCourse = async () => {
    const startTime = formatTime(timeStart);
    const endTime = formatTime(timeEnd);

    await createCourse({
      accessToken: access,
      prof_id: profId,
      name: courseName,
      section: section,
      time_start: startTime,
      time_end: endTime,
      day: days, // ⬅️ array of days
      room: room,
    });

    // reset form
    setCourseName("");
    setTimeStart({ hour: "", minute: "", period: "AM" });
    setTimeEnd({ hour: "", minute: "", period: "AM" });
    setDays([]);

    if (onCourseCreated) {
      onCourseCreated(); // notify parent to refresh
    }
  };

  // Generate 12-hour format
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const minutes = Array.from({ length: 60 / 5 }, (_, i) =>
    String(i * 5).padStart(2, "0")
  );

  const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Validation check
  const isFormValid =
    profId &&
    courseName.trim() !== "" &&
    timeStart.hour &&
    timeStart.minute &&
    timeEnd.hour &&
    timeEnd.minute &&
    days.length > 0;

  return (
    <div className="mb-6 space-y-4 border p-4 rounded bg-gray-50">
      {/* Course Name */}
      <input
        type="text"
        placeholder="Enter course name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Enter section"
        value={section}
        onChange={(e) => setSection(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <input
        type="text"
        placeholder="Enter room"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        className="border p-2 rounded w-full"
      />

      {/* Time Start */}
      <div>
        <p className="font-medium mb-1">Start Time</p>
        <div className="flex gap-2">
          <select
            value={timeStart.hour}
            onChange={(e) => setTimeStart((prev) => ({ ...prev, hour: e.target.value }))}
            className="border p-2 rounded w-1/3"
          >
            <option value="">-- Hour --</option>
            {hours.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>

          <select
            value={timeStart.minute}
            onChange={(e) => setTimeStart((prev) => ({ ...prev, minute: e.target.value }))}
            className="border p-2 rounded w-1/3"
          >
            <option value="">-- Minute --</option>
            {minutes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <select
            value={timeStart.period}
            onChange={(e) => setTimeStart((prev) => ({ ...prev, period: e.target.value }))}
            className="border p-2 rounded w-1/3"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>

      {/* Time End */}
      <div>
        <p className="font-medium mb-1">End Time</p>
        <div className="flex gap-2">
          <select
            value={timeEnd.hour}
            onChange={(e) => setTimeEnd((prev) => ({ ...prev, hour: e.target.value }))}
            className="border p-2 rounded w-1/3"
          >
            <option value="">-- Hour --</option>
            {hours.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>

          <select
            value={timeEnd.minute}
            onChange={(e) => setTimeEnd((prev) => ({ ...prev, minute: e.target.value }))}
            className="border p-2 rounded w-1/3"
          >
            <option value="">-- Minute --</option>
            {minutes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <select
            value={timeEnd.period}
            onChange={(e) => setTimeEnd((prev) => ({ ...prev, period: e.target.value }))}
            className="border p-2 rounded w-1/3"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>

      {/* Days (checkboxes) */}
      <div className="space-y-2">
        <p className="font-medium">Select Days:</p>
        <div className="flex flex-wrap gap-3">
          {allDays.map((d) => (
            <label key={d} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={d}
                checked={days.includes(d)}
                onChange={() => handleDayChange(d)}
              />
              {d}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleCreateCourse}
        disabled={!isFormValid || loading}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Course"}
      </button>
    </div>
  );
};

export default CourseForm;
