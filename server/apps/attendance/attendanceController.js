import attendanceServices from "./attendanceServices.js";
class attendanceController {
    static async  getAttendanceOfSubject(req, res, next){
        try {
            const { courseId, date } = req.params;
            const result = await attendanceServices.getAttendanceOfSubject(courseId, date);
            console.log(result)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}

export default attendanceController;