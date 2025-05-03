const Job = require("../../models/jobAssigning");
const QC = require("../../models/qc");

const { success_response, error_response } = require("../../utils/response");

exports.getAllAssignJobOfMachine = async (req, res) => {
  try {
    const { machineId } = req.params;

    const all = await Job.find({ machine: machineId }).populate(
      "productionOrderDataId"
    );

    if (all.length > 0) {
      return success_response(
        res,
        200,
        "All jobs of given machine fetch successfully",
        all
      );
    }

    return success_response(res, 200, "Jobs of given machine not found!", []);
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};
exports.saveQuantityOrTimeForQC = async (req, res) => {
  try {
    const { quantity, makeTime, userId, jobId } = req.body;

    if (quantity) {
      return success_response(res, 200, "Quantity save successfully");
    }
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};
