const Route = require('../../models/routeStage');
const {success_response, error_response} = require("../../utils/response");


exports.createRouteStage = async (req, res) => {
    try {
        const {routeCode} = req.body;

        if (!routeCode) {
            return error_response(res, 400, "Route is required");
        }

        const existingRoute = await Route.findOne({code:routeCode});

        if (existingRoute) {
            return error_response(res, 400, "This Route already exist.");
        }
        const createRoutes = await Route.create({
            code:routeCode
        });
        return success_response(res, 200, "Routes created successfully", createRoutes);
    } catch (error) {
        console.log(error);
        return error_response(res, error.message);
    }
};
exports.allRoutes = async (req, res) => {
    try {
        const all = await Route.find();

        if (all.length > 0) {
            return success_response(res, 200, "Route fetch successfully", all);
        }
        return success_response(res, 200, "Route not found!", []);
    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
}