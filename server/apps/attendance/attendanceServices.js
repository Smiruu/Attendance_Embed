import { supabase } from "../../config/supabase";

class attendanceServices {

static async getAttendanceOfSubject(courseId, date) {
  const { data, error } = await supabase
    .from("attendance")
    .select(`
      id,
      remark,
      created_at,
      student:students (
        name
        email
      ),
      session:sessions!inner (
        time_in
      )
    `)
    .eq("course_id", courseId)       // match the course
    .eq("session.date", date);       // match the date in sessions

  if (error) {
    console.error("Error fetching attendance:", error.message);
    return null;
  }

  return data;
}
;


}

export default attendanceServices