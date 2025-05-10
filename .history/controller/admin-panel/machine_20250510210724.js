const Machine = require("../../models/machine");
const { success_response, error_response } = require("../../utils/response");
const Role = require("../../models/role");

exports.createMachine = async (req, res) => {
  try {
    const { machine, routeId } = req.body;

    if (!(machine && routeId)) {
      return error_response(res, 400, "All inputs are required");
    }

    // const existingMachine = await Machine.findOne({ code: machine , route: });

    if (existingMachine) {
      return error_response(res, 400, "This machine already exist.");
    }
    const createMachine = await Machine.create({
      code: machine,
      route,
    });
    return success_response(
      res,
      200,
      "Machine created successfully",
      createMachine
    );
  } catch (error) {
    console.log(error);
    return error_response(res, error.message);
  }
};
exports.allMachine = async (req, res) => {
  try {
    const allMachine = await Machine.find();

    if (allMachine.length > 0) {
      return success_response(
        res,
        200,
        "Machine fetch successfully",
        allMachine
      );
    }
    return success_response(res, 200, "Machine not found!", []);
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};
