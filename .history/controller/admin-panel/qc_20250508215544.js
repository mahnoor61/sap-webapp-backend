const Job = require("../../models/jobAssigning");
const QC = require("../../models/qc");
const Printing = require("../../models/printing");
const Machine = require("../../models/machine");
const Production = require("../../models/productionOrder");

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
// exports.saveQuantityOrTimeForQC = async (req, res) => {
//   try {
//     const { quantity, makeTime, userId, jobId, time } = req.body;

//     if (!(jobId && userId)) {
//       return error_response(res, 400, "All inputs are required!");
//     }

//     const create = await QC.create({
//       makeTime,
//       quantity,
//       userId,
//       jobId,
//     });

//     return success_response(res, 200, "Quantity save successfully", create);
//   } catch (error) {
//     console.error(error);
//     return error_response(res, 500, error.message);
//   }
// };

exports.saveQuantityOrTimeForQC = async (req, res) => {
  try {
    const { quantity, makeTime, userId, jobId } = req.body;

    if (!(jobId && userId)) {
      return error_response(res, 400, "User ID and Job ID are required!");
    }

    const qcData = {
      userId,
      jobId,
    };

    if (quantity !== undefined) {
      qcData.quantity = quantity;
      qcData.quantityTime = new Date().toISOString();
    }

    if (makeTime !== undefined) {
      qcData.makeTime = makeTime;
      qcData.makeTimeStatus = "make ready time";
    }

    const create = await QC.create(qcData);

    return success_response(res, 200, "QC data saved successfully", create);
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};

exports.createPrinting = async (req, res) => {
  try {
    const {
      //   id,
      date,
      shift,
      serialNo,
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
    const { id } = req.params;

    // console.log("id", id);
    if (
      !(
        // serialNo &&
        (
          shift &&
          date &&
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
      )
    ) {
      return error_response(res, 400, "All inputs are required!");
    }

    const printing = await Printing.create({
      date,
      shift,
      serialNo,
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

    const qc = await QC.findOne({ _id: id });

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
exports.getData = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return error_response(res, 400, "All inputs are required!");
    }

    const qc = await QC.findOne({ _id: id })
      .populate("jobId")
      .populate("userId")
      .lean();

    const machine = qc.jobId.machine;
    const productionDataId = qc.jobId.productionOrderDataId;
    const getMachine = await Machine.findOne({ _id: machine });
    const jobData = await Production.findOne({ _id: productionDataId });
    qc.machine = getMachine;
    qc.jobData = jobData;
    return success_response(res, 200, "Quantity save successfully", qc);
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};
exports.getQcCurrentTableData = async (req, res) => {
  try {
    const { jobId, userId } = req.body;

    if (!(jobId && userId)) {
      return error_response(res, 400, "All inputs are required!");
    }

    const qc = await QC.findOne({jobId, userId})
      .populate("jobId")
      .populate("userId")
      .lean();

    const machine = qc.jobId.machine;
    const productionDataId = qc.jobId.productionOrderDataId;
    const getMachine = await Machine.findOne({ _id: machine });
    const jobData = await Production.findOne({ _id: productionDataId });
    qc.machine = getMachine;
    qc.jobData = jobData;
    return success_response(res, 200, "Quantity save successfully", qc);
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};
