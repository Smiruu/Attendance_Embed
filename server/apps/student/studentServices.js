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

}

export default studentServices;