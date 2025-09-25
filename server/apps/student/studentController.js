import studentServices from "./studentServices.js";
class studentController {

    static async createStudent(req, res, next) {
        try {
            const result = await studentServices.createStudent(req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async getStudents(req, res, next) {
        try {
            const result = await studentServices.getStudents();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async deleteStudent(req, res, next) {
        try {
            console.log(req.params.studentId)
            const result = await studentServices.deleteStudent(req.params.studentId);
            res.status(200).json(result);
        } catch (error) {
            
            next(error);
        }
    }

    static async addStudentsToCourse(req, res, next) {
        try {
            const result = await studentServices.addStudentsToCourse(req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
    

    static async getCourses(req, res, next) {
        try {
            const result = await studentServices.getCourses();
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

export default studentController;