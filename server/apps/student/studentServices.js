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
        const {error} = await supabase
        .from('course_students')
        .insert([{
            course_id: courseData.course_id,
            student_id: courseData.student_id,
        }])

        if (error) throw error;
        return {message: 'Student added to course successfully'};
    }
    
}

export default studentServices;