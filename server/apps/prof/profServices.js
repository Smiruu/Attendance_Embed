import {supabase} from '../../config/supabase.js';

class profServices {
    static async createProf(profData) {
        try{
        const {data: authData,error: authError} = await supabase.auth.signUp({
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
    } catch (error){
        throw error;
    }
    }
}

export default profServices;