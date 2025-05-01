const User = require("../../models/user");
const Job = require("../../models/jobAssigning");
const axios = require("axios");
const { error_response, success_response } = require("../../utils/response");

exports.getOperatorProdcutionData = async (req, res) => {
  try {
    const { userName } = req.params;

    if (!userName) {
      return error_response(res, 400, "Username is required!");
    }

    const user = await User.findOne({ userName }).populate("role", "name");

    if (!user) {
      return error_response(res, 400, "User not found!");
    }

    let job;
    if (user.role.name === "operator") {
      job = await Job.find({
        user: user._id,
        status: { $ne: "completed" },
      })
        .populate("productionOrderDataId")
        .populate("machine", "code")
        .populate("route", "code")
        .populate("user", "userName");
    }
    return success_response(
      res,
      200,
      `Production order nos os this user ${userName} fetch successfully`,
      job
    );
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};

exports.updatemakeTime = async (req, res) => {
  try {
    const { id, makeTime } = req.body;

    if (!(id && makeTime)) {
      return error_response(res, 400, "All inputs are required!");
    }

    const update = await Job.findOne({ _id: id });

    if (!update) {
      return error_response(res, 400, "Production order not find!");
    }

    update.makeTime = makeTime;
    update.status = "running";
    await update.save();
    return success_response(res, 200, `Data updated successfully`, update);
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};
exports.updatestartProductionTime = async (req, res) => {
  //when pause button is click start production time stroe and we stoe pause reason and change status in it
  try {
    const { id, startProductionTime, pauseReason } = req.body;

    if (!(id && startProductionTime && pauseReason)) {
      return error_response(res, 400, "All inputs are required!");
    }

    const update = await Job.findOne({ _id: id });

    if (!update) {
      return error_response(res, 400, "Production order not find!");
    }

    update.startProductionTime = startProductionTime;
    update.pauseReason = pauseReason;
    update.status = "paused";
    await update.save();
    return success_response(res, 200, `Data updated successfully`, update);
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};
exports.updatePauseProductionTime = async (req, res) => {
  //when resume button is click  pause prodction time store and get strt production time from db
  try {
    const { id, pauseProductionTime } = req.body;

    if (!(id && pauseProductionTime)) {
      return error_response(res, 400, "All inputs are required!");
    }

    const update = await Job.findOne({ _id: id });

    if (!update) {
      return error_response(res, 400, "Production order not find!");
    }

    update.pauseProductionTime = pauseProductionTime;
    update.status = "running";
    await update.save();
    return success_response(res, 200, `Data updated successfully`, update);
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};
exports.updateStopProductionTime = async (req, res) => {
  //when stop button is click  image is store in db
  try {
    const { id, startProductionTime } = req.body;

    if (!(id && startProductionTime)) {
      return error_response(res, 400, "All inputs are required!");
    }

    const update = await Job.findOne({ _id: id });

    if (!update) {
      return error_response(res, 400, "Production order not find!");
    }

    update.startProductionTime = startProductionTime;
    update.status = "completed";

    if (req.file) {
      update.stopReason = req.file.path.substring(7);
    }

    await update.save();
    return success_response(res, 200, `Data updated successfully`, update);
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};
exports.updateDownTime = async (req, res) => {
  //when resume button is click  pause prodction time store and get strt production time from db
  try {
    const { id, startProductionTime, downTimeReason } = req.body;

    if (!(id && startProductionTime && downTimeReason)) {
      return error_response(res, 400, "All inputs are required!");
    }

    const update = await Job.findOne({ _id: id });

    if (!update) {
      return error_response(res, 400, "Production order not find!");
    }

    update.startProductionTime = startProductionTime;
    update.downTimeReason = downTimeReason;
    update.status = "downtime";
    await update.save();
    return success_response(res, 200, `Down time updated successfully`, update);
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};
exports.saveDownTime = async (req, res) => {
  //when resume button is click  pause prodction time store and get strt production time from db
  try {
    const { id, downTime } = req.body;

    if (!(id && downTime)) {
      return error_response(res, 400, "All inputs are required!");
    }

    const update = await Job.findOne({ _id: id });

    if (!update) {
      return error_response(res, 400, "Production order not find!");
    }

    update.downTime = downTime;
    update.status = "running";
    await update.save();
    return success_response(res, 200, `Down time saves successfully`, update);
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};
exports.getProductionTime = async (req, res) => {
  //when stop button is click  image is store in db
  try {
    const { id } = req.params;

    const update = await Job.findOne({ _id: id });

    if (!update) {
      return error_response(res, 400, "Production order not find!");
    }
    const prodTime = update.startProductionTime;
    return success_response(
      res,
      200,
      `Production time fetch  successfully`,
      prodTime
    );
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};
exports.updateStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    if (!(id && status)) {
      return error_response(res, 400, "All inputs are required!");
    }

    const job = await Job.findOne({ _id: id });
    if (!job) {
      return error_response(res, 400, "Job  not find!");
    }
    job.status = status;
    await job.save();

    return success_response(res, 200, `Status updated successfully`, job);
  } catch (error) {
    console.log(error);
    return error_response(res, 500, error.message);
  }
};
exports.getLastRouteOfProductionOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findOne({ _id: id });

    if (!job) {
      return error_response(res, 400, "Job  not find!");
    }

    const currentRoute = job.routeNo;

    const allJobs = await Job.find({
      productionOrderNo: job.productionOrderNo,
    });

    const routes = allJobs.map((r) => r.routeNo);

    const lastRouteNo = Math.max(...routes);

    const lastRoute = currentRoute === lastRouteNo;

    return success_response(
      res,
      200,
      `Get Last route confirmation  successfully`,
      {
        productionOrderNo: job.productionOrderNo,
        currentRoute,
        lastRoute: lastRouteNo,
        isCurrentRouteIsLastRoute: lastRoute,
      }
    );
  } catch (error) {
    console.log(error);
    return error_response(res, 500, error.message);
  }
};

//     try {
//         let {
//             recievedByOperator
//         } = req.body;
//
//         const {id} = req.params;
//
//         if (!(recievedByOperator)) {
//             return error_response(res, 400, 'All inputs are required!');
//         }
//
//         recievedByOperator = Math.abs(recievedByOperator);
//
//         const update = await Job.findOne({_id: id}).populate('productionOrderDataId');
//
//         const currentRoute = update.routeNo;
//         const allJobs = await Job.find({productionOrderNo: update.productionOrderNo});
//
//         const routes = allJobs.map(r => r.routeNo);
//         const firstRoute = Math.min(...routes);
//         const isFirstRoute = currentRoute === firstRoute;
//
//         if (isFirstRoute) {
//             const transferredQty = update.productionOrderDataId.TransferredQuantity;
//             const totalReceiving = update.recievedByOperator + recievedByOperator;
//
//             if (totalReceiving > transferredQty) {
//                 return error_response(
//                     res,
//                     400,
//                     'The quantity received by the operator cannot exceed the transferred quantity!'
//                 );
//             }
//         }
//
//         // Allow update regardless of route, or return error if not first
//         update.recievedByOperator += recievedByOperator;
//         await update.save();
//         return success_response(res, 200, 'Received by operator updated successfully', update);
//
//     } catch (error) {
//         console.error(error);
//         return error_response(res, 500, error.message);
//     }
// };
exports.updateRecievedByOperator = async (req, res) => {
  try {
    let { recievedByOperator } = req.body;
    const { id } = req.params;

    if (!recievedByOperator) {
      return error_response(res, 400, "All inputs are required!");
    }

    recievedByOperator = Math.abs(recievedByOperator);

    const update = await Job.findOne({ _id: id }).populate(
      "productionOrderDataId"
    );

    if (!update) {
      return error_response(res, 404, "Job not found!");
    }

    const currentRoute = Number(update.routeNo);

    const allJobs = await Job.find({
      productionOrderNo: update.productionOrderNo,
      ComponentItemCode: update.ComponentItemCode,
    });

    const routes = allJobs.map((r) => Number(r.routeNo));
    const firstRoute = Math.min(...routes);
    const isFirstRoute = currentRoute === firstRoute;

    if (isFirstRoute) {
      const transferredQty =
        update.productionOrderDataId?.TransferredQuantity || 0;

      const totalReceiving = update.recievedByOperator + recievedByOperator;

      if (totalReceiving > transferredQty) {
        return error_response(
          res,
          400,
          "The quantity received by operator cannot exceed by transferred quantity!"
        );
      }
    } else {
      // Find previous route (max routeNo < currentRoute)
      const previousRoutes = allJobs
        .filter((j) => j.routeNo < currentRoute)
        .sort((a, b) => Number(b.routeNo) - Number(a.routeNo)); // sort descending

      const previousJob = previousRoutes[0];
      const completedQty = previousJob.totalCompletedQuantity;
      const totalReceiving = update.recievedByOperator + recievedByOperator;

      if (totalReceiving > completedQty) {
        return error_response(
          res,
          400,
          "The quantity received by operator cannot exceed by previous route completed quantity!"
        );
      }
    }

    update.recievedByOperator += recievedByOperator;
    await update.save();

    return success_response(
      res,
      200,
      "Received by operator updated successfully",
      update
    );
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};

exports.addIssueForMachine = async (req, res) => {
  try {
    let { issueForMachine, id } = req.body;

    if (!(issueForMachine && id)) {
      return error_response(res, 400, "All inputs are required!");
    }

    issueForMachine = Math.abs(issueForMachine);

    const currentJob = await Job.findOne({
      _id: id,
    })
      .populate("productionOrderDataId")
      .populate("user", "userName")
      .populate("route", "code")
      .populate("machine", "code");

    if (!currentJob) {
      return error_response(res, 404, "Job not found");
    }

    const issue = currentJob.issueForMachine;
    const completedQty = currentJob.completedQuantity;
    const wastedQty = currentJob.wastedQuantity;

    console.log("issue", issue);
    console.log("completedQty", completedQty);
    console.log("wastedQty", wastedQty);

    if (issue > completedQty + wastedQty) {
      return error_response(
        res,
        400,
        "The previous pallet is not yet complete.Please complete or discard the remaining quantity first!"
      );
    }
    //
    // currentJob.currentPallateNo += 1;
    currentJob.issueForMachine = issueForMachine;
    // currentJob.completedQuantity = 0;
    // currentJob.wastedQuantity = 0;
    currentJob.totalIssueForMachie += issueForMachine;
    //
    await currentJob.save();

    return success_response(
      res,
      200,
      "Issue for machine added successfully",
      currentJob
    );
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};
exports.updateIssueForMachine = async (req, res) => {
  try {
    let { id } = req.body;

    if (!id) {
      return error_response(res, 400, "Id is  required!");
    }

    const currentJob = await Job.findOne({
      _id: id,
    })
      .populate("productionOrderDataId")
      .populate("user", "userName")
      .populate("route", "code")
      .populate("machine", "code");

    if (!currentJob) {
      return error_response(res, 404, "Job not found");
    }

    const issue = currentJob.issueForMachine;
    const completedQty = currentJob.completedQuantity;
    const wastedQty = currentJob.wastedQuantity;

    if (issue > completedQty + wastedQty) {
      return error_response(
        res,
        400,
        "The previous pallet is not yet complete.Please complete or discard the remaining quantity first!"
      );
    }

    currentJob.currentPallateNo += 1;
    // currentJob.issueForMachine = issueForMachine;
    currentJob.completedQuantity = 0;
    currentJob.issueForMachine = 0;
    currentJob.wastedQuantity = 0;
    // currentJob.totalIssueForMachie += issueForMachine;
    //
    await currentJob.save();

    return success_response(
      res,
      200,
      "Pallet for issue for machine is updated successfully",
      currentJob
    );
  } catch (error) {
    console.error(error);
    return error_response(res, 500, error.message);
  }
};

exports.addCompletedQuantity = async (req, res) => {
  try {
    let { completedQuantity, id } = req.body;

    if (!(completedQuantity && id)) {
      return error_response(res, 400, "All inputs are required!");
    }

    const currentJob = await Job.findOne({
      _id: id,
    })
      .populate("productionOrderDataId")
      .populate("user", "userName")
      .populate("route", "code")
      .populate("machine", "code");

    if (!currentJob) {
      return error_response(res, 404, "Job not found");
    }
    completedQuantity = Math.abs(completedQuantity);

    const totalCompleted = currentJob.completedQuantity + completedQuantity;
    const totalUsed = totalCompleted + currentJob.wastedQuantity;
    const issue = currentJob.issueForMachine;

    if (totalUsed > issue) {
      return error_response(
        res,
        404,
        "Completed + Wasted quantity cannot exceed issue for machine!"
      );
    }

    currentJob.completedQuantity = totalCompleted;
    currentJob.totalCompletedQuantity += completedQuantity;
    await currentJob.save();

    return success_response(
      res,
      200,
      "Completed Quantity added successfully",
      currentJob
    );
  } catch (error) {
    console.log(error);
    return error_response(res, 500, error.message);
  }
};
exports.addWastedQuantity = async (req, res) => {
  try {
    let { wastedQuantity, id } = req.body;

    if (!(wastedQuantity && id)) {
      return error_response(res, 400, "All inputs are required!");
    }

    const currentJob = await Job.findOne({
      _id: id,
    })
      .populate("productionOrderDataId")
      .populate("user", "userName")
      .populate("route", "code")
      .populate("machine", "code");

    if (!currentJob) {
      return error_response(res, 404, "Job not found");
    }

    wastedQuantity = Math.abs(wastedQuantity);

    const totalWasted = currentJob.wastedQuantity + wastedQuantity;
    const totalUsed = totalWasted + currentJob.completedQuantity;
    const issue = currentJob.issueForMachine;

    if (totalUsed > issue) {
      return error_response(
        res,
        404,
        "Completed + Wasted quantity cannot exceed issue for machine!"
      );
    }

    currentJob.wastedQuantity = totalWasted;
    currentJob.totalWastedQuantity += wastedQuantity;
    await currentJob.save();

    return success_response(
      res,
      200,
      "Wasted Quantity added successfully",
      currentJob
    );
  } catch (error) {
    console.log(error);
    return error_response(res, 500, error.message);
  }
};

exports.remainingQty = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return error_response(res, 400, "Id is  required!");
    }

    const job = await Job.findOne({ _id: id });

    if (!job) {
      return error_response(res, 400, "This job not exist");
    }

    const remaningQty = Math.abs(
      job.recievedByOperator - job.totalIssueForMachie
    );
    job.remainingQuantity = remaningQty;
    await job.save();
    return success_response(
      res,
      200,
      "Remaining quantity get successfully",
      job
    );
  } catch (error) {
    console.log(error);
    return error_response(res, 500, error.message);
  }
};

exports.getCompletedQtyOfPreviousRoute = async (req, res) => {
  try {
    const { productionOrder, routeNo, id, ComponentItemCode } = req.body;

    if (!(productionOrder && routeNo && id && ComponentItemCode)) {
      return error_response(res, 400, "All inputs are required!");
    }
    const previousRoute = routeNo - 1;

    const jobOfPreviousRoute = await Job.findOne({
      productionOrderNo: productionOrder,
      ComponentItemCode,
      routeNo: previousRoute,
    });

    if (!jobOfPreviousRoute) {
      return error_response(res, 400, "Previous Route Not Found!");
    }

    const totalCompleteQtyOfPreviousRoute =
      jobOfPreviousRoute.totalCompletedQuantity;

    return success_response(
      res,
      200,
      " Total completed quantity of previous route fetch successfully",
      totalCompleteQtyOfPreviousRoute
    );
  } catch (error) {
    console.log(error);
    return error_response(res, 500, error.message);
  }
};

exports.getFirstRouteForIssueToPostDataIntoSap = async (req, res) => {
  try {
    const { BaseEntry, BaseLine, Quantity, id } = req.body;

    if (!(BaseEntry && BaseLine && Quantity && id)) {
      return error_response(res, 400, "All input are required!");
    }

    const prodDetail = await Job.findOne({ _id: id });

    const currentRoute = prodDetail.routeNo;
    const prodOrderNo = prodDetail.productionOrderNo;
    const componentItemCode = prodDetail.ComponentItemCode;

    const allRoutes = await Job.find({
      productionOrderNo: prodOrderNo,
      ComponentItemCode: componentItemCode,
    });

    let array = [];

    allRoutes.map((data) => {
      array.push(data.routeNo);
    });

    const firstRouteNo = Math.min(...array);
    const isFirstRoute = currentRoute === firstRouteNo;

    if (!isFirstRoute) {
      return error_response(res, 400, "Current route is not first route!");
    }

    const BaseType = process.env.BASE_TYPE;

    const sapIssueData = {
      BaseType,
      BaseEntry,
      BaseLine,
      Quantity,
    };

    const issueUrl = process.env.SAP_ISSUE_URL;
    console.log("sapIssueData", sapIssueData);

    console.log("issueUrl", issueUrl);
    const sapResponse = await axios.post(issueUrl, sapIssueData, {
      headers: {
        "Content-Type": "application/json",
        "B1S-WCFCompatible": "true",
      },
    });

    return success_response(
      res,
      200,
      "Issue for machine data posted into sap successfully",
      sapResponse
    );
  } catch (error) {
    console.log(error);
    return error_response(res, 500, error.message);
  }
};
