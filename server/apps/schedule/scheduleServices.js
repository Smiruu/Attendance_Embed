import { supabase } from "../../config/supabase";

class scheduleServices {

    static async getCourses(){
        const {data, error} = await supabase
        .from('courses')
        .select('*')

        if(error) throw error
        return{courses: data, message:'Successfully get courses'}
    }
}

export default scheduleServices