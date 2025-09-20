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
            const result = await profServices.deleteProf(req.params);
            res.status(200).json(result);
        } catch (error) {
            next(error);
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
}

export default profController;