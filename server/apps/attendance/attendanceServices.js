import { supabase } from "../../config/supabase.js";

class attendanceServices {

static async getAttendanceOfSubject(courseId, date) {
  const { data, error } = await supabase
    .from("attendance")
    .select(`
      id,
      remark,
      created_at,
      student:students (
        id_code,
        name
      ),
      session:sessions!inner (
        time_in
      )
    `)
    .eq("course_id", courseId)       // match the course
    .eq("session.date", date);       // match the date in sessions

  if(error) throw error
  return data;
}
;


}

export default attendanceServices