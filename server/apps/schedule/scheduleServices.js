import { supabase } from "../../config/supabase";

class scheduleServices {

    static async getCourses(){
        const {data, error} = await supabase
        .from('courses')
        .select('*')

        if(error) throw error
        return{courses: data, message:'Successfully get courses'}
    }

    static async createSchedule(scheduleData){
        const {error} = await supabase
        .from('schedules')
        .insert([{
            course_id: scheduleData.course_id,
            time_start: scheduleData.time_start,
            time_end: scheduleData.time_end,
            day: scheduleData.day
        }])

        if(error) throw error
        return{message:'Successfully created schedule'}
    }
}

export default scheduleServices