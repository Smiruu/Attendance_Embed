import profServices from "./profServices.js";

class profController {

    static async createProf(req, res, next) {
        try {
            const result = await profServices.createProf(req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
    
    static async deleteProf(req, res, next) {
        try {
            const result = await profServices.deleteProf(req.params.profId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
    
    static async getProfList(req, res, next){
        try {
            const result = await profServices.getProfList();
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    
    static async createCourse(req, res, next) {
        try {
            const result = await profServices.createCourse(req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async getProfCourses(req, res, next){
        try {
            const result = await profServices.getProfCourses(req.params.profId);
            res.status(200).json(result)
        } catch (error) {
            next(error);
        }
    }

    static async updateCourse(req, res, next) {
        try {
            const result = await profServices.updateCourse(req.params.courseId, req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async deleteCourse(req, res, next) {
        try {
            const result = await profServices.deleteCourse(req.params.courseId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default profController;