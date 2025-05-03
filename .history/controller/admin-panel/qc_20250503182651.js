const Job = require("../../models/jobAssigning");
const QC = require("../../models/qc");
const Printing = require("../../models/printing");

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

    if (!(jobId && userId)) {
      return error_response(res, 400, "All inputs are required!");
    }

    const create = await QC.create({
      makeTime,
      quantity,
      userId,
      jobId,
    });

    return success_response(res, 200, "Quantity save successfully", create);
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};

exports.createPrinting = async (req, res) => {
  try {
    const {
      id,
      dmsFromPlate,
      text,
      dust,
      sideLay,
      frontLay,
      registration,
      scumming,
      setOff,
      doubling,
      colorVariation,
    } = req.body;

    if (
      !(
        userId &&
        jobId &&
        registration &&
        scumming &&
        setOff &&
        dust &&
        doubling &&
        colorVariation &&
        text &&
        dmsFromPlate &&
        frontLay &&
        sideLay
      )
    ) {
      return error_response(res, 400, "All inputs are required!");
    }

    const printing = await Printing.create({
      registration,
      scumming,
      setOff,
      dust,
      doubling,
      colorVariation,
      text,
      dmsFromPlate,
      frontLay,
      sideLay,
    });

    const qc = await QC.findOne({ _id:id });

    if (!qc) {
      return error_response(res, 400, "Job of this user not found!");
    }
    qc.formType = "printing";
    qc.formId = printing._id;
    await qc.save();
    return success_response(res, 200, "Printing save successfully", {
      printing,
      qc,
    });
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};
