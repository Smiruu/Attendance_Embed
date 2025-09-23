import { supabase } from "../../config/supabase.js";

class profServices {
  static async createProf(profData) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: profData.email,
      password: profData.password,
      email_verified: true,
    });

    if (authError) throw authError;
    const id = authData.user.id;
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: id,
        full_name: profData.full_name,
        role: "professor",
        id_code: profData.id_code,
      },
    ]);

    if (profileError) throw profileError;

    return { message: "Professor created successfully" };
  }

  static async deleteProf(profId) {
    const { error: deleteError } = await supabase.auth.admin.deleteUser(profId);
    if (deleteError) throw deleteError;

    return { message: "Professor deleted successfully" };
  }

  static async getProfList() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "professor");

    if (error) throw error;

    return { prof: data };
  }

  static async createCourse(courseData) {
    const { data: courseRows, error: CourseError } = await supabase
      .from("courses")
      .insert([
        {
          prof_id: courseData.prof_id,
          name: courseData.name,
        },
      ])
      .select();

    if (CourseError) throw CourseError;

    const course = courseRows?.[0]; // get first row safely
    console.log("course:", course);

    const { error: ScheduleError } = await supabase.from("schedules").insert([
      {
        course_id: course.id,
        time_start: courseData.time_start,
        time_end: courseData.time_end,
        day: courseData.day,
        room:courseData.room,
      },
    ]);
    console.log("error", ScheduleError)
    if (ScheduleError) throw ScheduleError;
    return { message: "Course created successfully" };
  }

 static async getProfCourses(profId) {
  const { data, error } = await supabase
    .from("courses")
    .select(`
      id,
      name,
      schedules (
        id,
        time_start,
        time_end,
        day,
        room
      )
    `)
    .eq("prof_id", profId);

  if (error) throw error;

  return { courses: data, message: "Successfully got the courses with schedules" };
}

}

export default profServices;
