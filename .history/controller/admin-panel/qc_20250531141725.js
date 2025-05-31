const Job = require("../../models/jobAssigning");
const QC = require("../../models/qc");
const Printing = require("../../models/printing");
const Machine = require("../../models/machine");
const Production = require("../../models/productionOrder");
const Route = require("../../models/routeStage");
const Users = require("../../models/user");

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
    const { quantity, makeTime, quantityTime, jobId } = req.body;

    if (!jobId) {
      return error_response(res, 400, "jobId is  required!");
    }

    const qcData = {
      jobId,
    };

    const job = await Job.findOne({ _id: jobId });

    if (quantity !== undefined) {
      
      qcData.quantity = quantity;
      qcData.time = quantityTime;

      // qcData.time = new Date().toISOString();
    }

    // if (makeTime !== undefined) {
    //   qcData.time = makeTime;
    //   qcData.makeTimeStatus = "make ready time";
    // }

    // const create = await QC.create(qcData);

    return success_response(res, 200, "QC data saved successfully", job);
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
      qcNo,
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
          qcNo &&
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
      qcNo,
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
    const userId = qc.jobId.user;

    const getMachine = await Machine.findOne({ _id: machine });
    const jobData = await Production.findOne({ _id: productionDataId });
    const userData = await Users.findOne({ _id: userId });

    qc.machine = getMachine;
    qc.jobData = jobData;
    qc.userData = userData;
    return success_response(res, 200, "Quantity save successfully", qc);
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};
exports.getQcCurrentTableData = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return error_response(res, 400, "jOB id is required!");
    }

    // Get QC records with job, user, and form populated
    const qcList = await QC.find({ jobId })
      .populate("jobId")
      .populate("formId")
      .lean();

    if (!qcList) {
      return error_response(res, 400, "QC data not found!");
    }

    // Get Production Order and Machine Data for each record
    const enhancedQcList = await Promise.all(
      qcList.map(async (qc) => {
        const prodId = qc.jobId?.productionOrderDataId;
        const machineId = qc.jobId?.machine;

        const [productionData, machineData] = await Promise.all([
          prodId ? Production.findById(prodId).lean() : null,
          machineId ? Machine.findById(machineId).lean() : null,
        ]);

        return {
          ...qc,
          productionOrderData: productionData || null,
          machineData: machineData || null,
        };
      })
    );

    return success_response(
      res,
      200,
      "All data for qc current table  fetched successfully",
      enhancedQcList
    );
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};

exports.getAllPrintingMachines = async (req, res) => {
  try {
    const route = await Route.findOne({ code: "04 Printing" });
    if (!route) {
      return error_response(res, 400, "Printing route not found in db!");
    }

    const getAllMachines = await Machine.find({ route: route._id });

    return success_response(
      res,
      200,
      "All printing machines fetch successfully",
      getAllMachines
    );
  } catch (error) {
    console.log("error");
    return error_response(res, 500, error.message);
  }
};
exports.getJobData = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return error_response(res, 400, "Job ID is required!");
    }

    let job = await QC.findOne({ jobId })
      .populate("jobId")
      .populate("userId")
      .lean();

    let jobData = null;
    let machine = null;
    let userData = null;

    if (job) {
      // QC record found — extract data from populated jobId
      const prodId = job.jobId?.productionOrderDataId;
      const machineId = job.jobId?.machine;
      const userId = job.jobId?.user;

      if (prodId) {
        jobData = await Production.findById(prodId).lean();
        machine = await Machine.findById(machineId).lean();
        userData = await Users.findById(userId).lean();
      }
    } else {
      // QC record not found — use Job directly
      const fallbackJob = await Job.findOne({ _id: jobId })
        .populate("user")
        .populate("productionOrderDataId")
        .lean();

      if (!fallbackJob) {
        return error_response(res, 404, "Job not found in QC or Job table!");
      }

      // Construct response like QC structure
      job = {
        _id: null, // Since QC record nahi hai
        jobId: fallbackJob,
        userId: fallbackJob.user,
        // Add other fields if needed
      };

      jobData = fallbackJob.productionOrderDataId;
      machine = await Machine.findById(fallbackJob.machine).lean();
      userData = fallbackJob.user;
    }

    return success_response(res, 200, "Job data fetched successfully", {
      ...job,
      jobData,
      machine,
      userData,
    });
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};

// exports.getJobData = async (req, res) => {
//   try {
//     const { jobId } = req.body;

//     if (!jobId) {
//       return error_response(res, 400, "Job ID is required!");
//     }

//     // Get single QC record and populate jobId field
//     let job = await QC.findOne({ jobId })
//       .populate("jobId")
//       .populate("userId")
//       .lean();

//     if (!job) {
//       job = await Job.findOne({ _id: jobId })
//         .populate("user")
//         .populate("productionOrderDataId")
//         .lean();
//       // return error_response(res, 404, "Job data not found!");
//     }

//     console.log("job", job);

//     const prodId = job.jobId?.productionOrderDataId;
//     const machineId = job.jobId?.machine;
//     const userId = job.jobId?.user;

//     // Fetch ProductionOrderData if prodId exists
//     let jobData = null;
//     let machine = null;
//     let userData = null;

//     if (prodId) {
//       jobData = await Production.findById(prodId).lean();
//       machine = await Machine.findById(machineId).lean();
//       userData = await Users.findById(userId).lean();
//     }

//     // Include productionOrderData in the response
//     return success_response(res, 200, "Job data fetched successfully", {
//       ...job,
//       jobData,
//       machine,
//       userData,
//     });
//   } catch (error) {
//     console.error(error);
//     return error_response(res, 500, error.message);
//   }
// };
