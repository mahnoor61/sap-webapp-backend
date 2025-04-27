const Job = require("../../models/jobAssigning");
const { success_response, error_response } = require("../../utils/response");
const User = require("../../models/user");
const ProdDetail = require("../../models/productionOrder");

exports.createJob = async (req, res) => {
  try {
    const { productionOrderNo, ComponentItemCode, assignments } = req.body;

    if (!(productionOrderNo && assignments && ComponentItemCode)) {
      return error_response(res, 400, "All inputs are required");
    }

    const existingJob = await Job.findOne({
      productionOrderNo,
      ComponentItemCode,
    });

    if (existingJob) {
      return error_response(res, 400, "This job already exists for this user.");
    }

    const prodDetail = await ProdDetail.findOne({ docNum: productionOrderNo });
    // // Create new job
    const data = assignments.map((assign, index) => {
      return Job.create({
        productionOrderNo,
        productionOrderDataId: prodDetail._id,
        user: assign.user,
        machine: assign.machine,
        route: assign.route,
        routeNo: index + 1,
      });
    });
    const createdJobs = await Promise.all(data);

    // Fetch job again with populated data
    const populatedJobs = await Job.find({
      _id: { $in: createdJobs.map((job) => job._id) },
    })
      .populate("machine", "code")
      .populate("route", "code")
      .populate("user", "userName");

    return success_response(
      res,
      200,
      "Job Assigned Successfully",
      populatedJobs
    );
  } catch (error) {
    console.log(error);
    return error_response(res, 500, error.message);
  }
};

exports.allJobs = async (req, res) => {
  try {
    const all = await Job.find()
      .sort({ createdAt: -1 })
      .populate("machine", "code")
      .populate("route", "code")
      .populate("user", "userName");

    //
    // const allDocs = await ProdDetail.find({}, { docNum: 1, _id: 0 });
    // const existingDocNums = allDocs.map(doc => doc.docNum);
    // const docNumCondition = existingDocNums.length > 0 ? `AND T0.[DocNum] NOT IN (${existingDocNums.join(', ')})` : '';
    // console.log("docNumCondition", docNumCondition)

    if (all.length > 0) {
      return success_response(res, 200, "Jobs fetch successfully", all);
    }
    return success_response(res, 200, "Jobs not found!", []);
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};
exports.updateJob = async (req, res) => {
  try {
    const { productionOrderNo, user, route, machine } = req.body;
    const { id } = req.params;

    const existingJob = await Job.findOne({ _id: id });

    if (!existingJob) {
      return error_response(res, 400, "This job does not exist.");
    }

    if (productionOrderNo) {
      existingJob.productionOrderNo = productionOrderNo;
    }
    if (user) {
      existingJob.user = user;
    }
    if (route) {
      existingJob.route = route;
    }
    if (machine) {
      existingJob.machine = machine;
    }
    await existingJob.save();
    return success_response(res, 200, "Job updated successfully", existingJob);
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};

exports.allSingleJobs = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findOne({ _id: id })
      .populate("machine", "code")
      .populate("route", "code")
      .populate("user", "userName");

    if (!job) {
      return error_response(res, 400, "This job not exist.");
    }

    return success_response(res, 200, "Jobs found successfully", job);
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};
exports.destroyJob = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteJob = await Job.findById({ _id: id });

    if (!deleteJob) {
      return error_response(res, 400, "Job not found!");
    }
    await deleteJob.deleteOne();
    return success_response(res, 200, "Job deleted successfully");
  } catch (error) {
    console.log(error);
    return error_response(res, 500, error.message);
  }
};
