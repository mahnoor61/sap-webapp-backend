const Route = require('../../models/routeStage');
const {success_response, error_response} = require("../../utils/response");


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