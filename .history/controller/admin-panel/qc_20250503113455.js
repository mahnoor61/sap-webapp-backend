const Job = require("../../models/jobAssigning");
const { success_response, error_response } = require("../../utils/response");

exports.getAllAssignJobOfMachine = async (req, res) => {
  try {
    const { machineId } = req.params;

    console.log("machineId", machineId);

    const all = await Job.find({ machine: machineId });

    if (all.length > 0) {
      return success_response(res, 200, "All jobs of ", all);
    }

    return success_response(res, 200, "Route not found!", []);
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};
