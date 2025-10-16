import {supabase} from '../../config/supabase.js';

class studentServices{
    static async createStudent(studentData) {
    
            const {error} = await supabase
            .from('students')
            .insert([{
                name: studentData.name,
                id_code: studentData.id_code,
            }])
            if (error) throw error;
            return {message: 'Student created successfully'};
        }

    static async getStudents(){
        
        const {data, error} = await supabase
        .from('students')
        .select('*');
        if (error) throw error;
        return {students:data, message: 'Students fetched successfully'};
    }

    static async deleteStudent(studentId) {
    
        const {error} = await supabase
        .from('students')
        .delete()
        .eq('id', studentId);
        
        if(error) throw error;
        return {message: 'Student deleted successfully'};
    }


    static async addStudentsToCourse(courseData){
        //check data if array, if not wraps data into an array
        const students = Array.isArray(courseData.payload.student_id)? courseData.payload.student_id :
        [courseData.payload.student_id];
        console.log(courseData)
        const insertData = students.map(studentId => ({
            course_id: courseData.payload.course_id,
            student_id: studentId
        }))
        console.log(courseData)
        const {error} = await supabase
        .from('course_students')
        .insert(insertData)

        if (error) throw error;
        return {message: 'Student added to course successfully'};
    }
    
    static async getCourses() {
        const {data, error} = await supabase
        .from("courses")
        .select("id, name")

        if (error) throw error;

        return {data, message: "Success getting courses"}
    }

    static async getCourseStudents(course_id){

        const {data, error} = await supabase
        .from('course_students')
        .select('students(*)')
        .eq('course_id', course_id)

        if (error) throw error
        return {data, message:"Success students"}
    }

    static async getStudentRemarks(course){
         const { data: student, error: studentError } = await supabase
    .from("students")
    .select("id")
    .eq("id_code", studentIdCode)
    .single();

  if (studentError || !student) {
    throw new Error("Student not found");
  }

  // Step 2: fetch attendance counts grouped by course + remark
  let query = supabase
    .from("attendance")
    .select("course_id, remark, count:count()")
    .eq("student_id", student.id)
    .group("course_id, remark");

  if (courseIds && courseIds.length > 0) {
    query = query.in("course_id", courseIds);
  }

  const { data, error } = await query;
  if (error) throw error;

  // Step 3: reshape into per-course buckets
  const remarks = {};
  data.forEach(row => {
    if (!remarks[row.course_id]) {
      remarks[row.course_id] = {
        onTime: 0,
        late: 0,
        absent: 0,
        noSchedule: 0
      };
    }
    if (row.remark === "on-time") remarks[row.course_id].onTime = row.count;
    if (row.remark === "late") remarks[row.course_id].late = row.count;
    if (row.remark === "absent") remarks[row.course_id].absent = row.count;
    if (row.remark === "no-schedule") remarks[row.course_id].noSchedule = row.count;
  });

  return {
    studentIdCode,
    studentId: student.id,
    remarks
  };
    }
}

export default studentServices;