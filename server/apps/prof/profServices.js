import {supabase} from '../../config/supabase.js';

class profServices {
    static async createProf(profData) {
       
        const {data: authData,error: authError} = await supabase.admin.auth.signUp({
            email: profData.email,
            password: profData.password,
            email_verified: true
        });

        if (authError) throw authError;
        const id = authData.user.id;
        const {error: profileError} = await supabase
        .from('profiles')
        .insert([{
            id: id,
            full_name:profData.full_name,
            role: 'professor',
            hex_code: profData.hex_code,
        }])

        if (profileError) throw profileError;

        return {message: 'Professor created successfully'};
   
    }

    static async deleteProf(profData) {
        
            const {error: deleteError} = await supabase.admin.auth.deleteUser(profData.id);
            if (deleteError) throw deleteError;

            return {message: 'Professor deleted successfully'};
        
    }

    static async createCourse(courseData) {
        const {error} = await supabase
        .from('course')
        .insert([{
            prof_id: courseData.prof_id,
            course_name: courseData.course_name,
        }])

        if (error) throw error;
        return {message: 'Course created successfully'};
    }
    
}

export default profServices;