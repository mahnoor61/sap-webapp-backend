const Job = require("../../models/jobAssigning");
const QC = require("../../models/qc");
const Food = require("../../models/food");
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

    if (job.status === "make-ready-time") {
      return error_response(
        res,
        400,
        "You cannot enter the quantity because the job is currently in the make-ready time.!"
      );
    }

    const totalCompQty = job?.totalCompletedQuantity;

    if (quantity !== undefined) {
      // const lastQC = await QC.findOne({jobId}).sort({createdAt: -1});
      //
      // if (quantity > totalCompQty) {
      //     return error_response(
      //         res,
      //         400,
      //         "Entered quantity cannot exceed total completed quantity."
      //     );
      // }
      //
      // if (
      //     lastQC &&
      //     lastQC.quantity !== undefined &&
      //     quantity <= lastQC.quantity
      // ) {
      //     return error_response(
      //         res,
      //         400,
      //         `You must enter a quantity greater than the previous entry (${lastQC.quantity}).`
      //     );
      // }

      qcData.quantity = quantity;
      qcData.time = quantityTime;
    }

    if (makeTime !== undefined) {
      qcData.time = makeTime;
      qcData.makeTimeStatus = "make ready time";
    }

    const create = await Food.create(qcData);

    return success_response(res, 200, "QC data saved successfully", create);
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};

exports.createReportForFood = async (req, res) => {
  try {
    const {
      //   id,
      date,
      shift,
      qcNo,
      serialNo,

      printingSpots,
      ccWrongCutting,
      embossOut,
      laminationWrinkle,
      bubble,
      files,
      colorVariation,
      foiling,
      okQty,
      totalWaste,
    } = req.body;
    const { id } = req.params;
    if (
      !(
        // serialNo &&
        (
          qcNo &&
          shift &&
          date &&
          printingSpots &&
          ccWrongCutting &&
          embossOut &&
          laminationWrinkle &&
          bubble &&
          files &&
          colorVariation &&
          foiling &&
          okQty &&
          totalWaste
        )
      )
    ) {
      return error_response(res, 400, "All inputs are required!");
      }
      
      const qc = await QC.findOne({ _id: id });

    const die = await Food.create({
      qcNo,
      date,
      shift,
      serialNo,
      printingSpots,
      ccWrongCutting,
      embossOut,
      laminationWrinkle,
      bubble,
      files,
      colorVariation,
      foiling,
      okQty,
      totalWaste,
    });

    // const qc = await QC.findOne({_id: id});

    // if (!qc) {
    //     return error_response(res, 400, "Job of this user not found!");
    // }
    // qc.formType = "report-food";
    // qc.formId = die._id;
    // await qc.save();
    return success_response(res, 200, "Food save successfully", {
      die,
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

    const qc = await Food.findOne({ _id: id })
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
    const qcList = await Food.find({ jobId })
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

exports.getAllFoodMachines = async (req, res) => {
  try {
    const getAllMachines = await Machine.find();

    return success_response(
      res,
      200,
      "Food  machines fetch successfully",
      getAllMachines
    );
  } catch (error) {
    console.log("error", error);
    return error_response(res, 500, error.message);
  }
};
exports.getJobData = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return error_response(res, 400, "Job ID is required!");
    }

    let job = await Food.findOne({ jobId })
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
