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
}

export default profController;