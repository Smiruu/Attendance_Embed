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

    static async listSchedulesOfProf(scheduleData){
        const {data, error} = await supabase
        .from('schedules')
        .select(`
            id, day, time_start, time_end,
            courses!inner (
            name
            )
            `)
        .eq('courses.prof_id', scheduleData.prof_id)
        .order('day', { ascending: true})
        .order('time_start', {ascending: true});

        if(error) throw error
        return {schedule: data, message:"Successfully fetch sched"}
    }
}

export default scheduleServices