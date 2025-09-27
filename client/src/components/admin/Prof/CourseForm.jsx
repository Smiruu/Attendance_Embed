import { useState, useEffect } from "react";
import { useAuthProvider } from "../../../context/authContext";
import { useCourses } from "../../../hooks/admin/useCourses";

const CourseForm = ({ profId, onCourseCreated, editData, onEdit }) => {
  const { createCourse, updateCourse, loading } = useCourses();
  const { access } = useAuthProvider();

  const [courseName, setCourseName] = useState("");
  const [section, setSection] = useState("");
  const [timeStart, setTimeStart] = useState({ hour: "", minute: "", period: "AM" });
  const [timeEnd, setTimeEnd] = useState({ hour: "", minute: "", period: "AM" });
  const [days, setDays] = useState([]);
  const [room, setRoom] = useState("");

  const isEditing = !!editData;

  // Helper function to convert 24-hour time to 12-hour format
  const convertTo12Hour = (time24) => {
    if (!time24) return { hour: "", minute: "", period: "AM" };
    
    const [hourStr, minuteStr] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr;
    let period = "AM";

    if (hour === 0) {
      hour = 12;
    } else if (hour === 12) {
      period = "PM";
    } else if (hour > 12) {
      hour -= 12;
      period = "PM";
    }

    return {
      hour: String(hour).padStart(2, "0"),
      minute: minute,
      period: period,
    };
  };

  // Populate form when editing
  useEffect(() => {
    if (editData) {
      setCourseName(editData.name || "");
      setSection(editData.section || "");
      setRoom(editData.schedules?.[0]?.room || "");
      setDays(editData.schedules?.[0]?.day || []);
      
      if (editData.schedules?.[0]?.time_start) {
        setTimeStart(convertTo12Hour(editData.schedules[0].time_start));
      }
      if (editData.schedules?.[0]?.time_end) {
        setTimeEnd(convertTo12Hour(editData.schedules[0].time_end));
      }
    }
  }, [editData]);

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

  const handleSubmit = async () => {
    const startTime = formatTime(timeStart);
    const endTime = formatTime(timeEnd);

    if (isEditing) {
      await updateCourse({
        accessToken: access,
        course_id: editData.id,
        name: courseName,
        section: section,
        time_start: startTime,
        time_end: endTime,
        day: days,
        room: room,
      });
      if (onEdit) onEdit(); // Close edit mode
    } else {
      await createCourse({
        accessToken: access,
        prof_id: profId,
        name: courseName,
        section: section,
        time_start: startTime,
        time_end: endTime,
        day: days,
        room: room,
      });
    }

    // reset form
    resetForm();

    if (onCourseCreated) {
      onCourseCreated(); // notify parent to refresh
    }
  };

  const resetForm = () => {
    setCourseName("");
    setSection("");
    setTimeStart({ hour: "", minute: "", period: "AM" });
    setTimeEnd({ hour: "", minute: "", period: "AM" });
    setDays([]);
    setRoom("");
  };

  const handleCancel = () => {
    if (isEditing && onEdit) {
      onEdit(); // Close edit mode
    }
    resetForm();
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
      <h3 className="text-lg font-semibold">
        {isEditing ? "Edit Course" : "Create New Course"}
      </h3>

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

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid || loading}
          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? (isEditing ? "Updating..." : "Creating...") : (isEditing ? "Update Course" : "Create Course")}
        </button>
        
        {isEditing && (
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseForm;