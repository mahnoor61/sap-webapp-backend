const odbc = require("odbc");
const ProductionOrder = require("../../models/productionOrder");
const Job = require("../../models/jobAssigning");
const { success_response, error_response } = require("../../utils/response");

exports.getProductionOrderNos = async (req, res) => {
  try {
    const assignedJobs = await Job.find({}, "productionOrderNo");
    const assignedDocNums = assignedJobs.map((job) => job.productionOrderNo);

    const productionOrders = await ProductionOrder.find({
      docNum: { $nin: assignedDocNums },
    });

    // Step 3: Map to simplified response
    const docNumArray = productionOrders.map((data) => ({
      docNum: data.docNum,
      ComponentItemCode: data.ComponentItemCode,
    }));

    return success_response(
      res,
      200,
      "Production Order fetch Successfully",
      docNumArray
    );
  } catch (error) {
    console.log("odbc connection error", error);
    return error_response(res, 500, error.message);
  }
};
exports.getOperatorPortalData = async (req, res) => {
  try {
    const productionOrder = await Job.find()
      .populate("productionOrderDataId")
      .sort({ createdAt: -1 })
      .populate("machine", "code")
          .populate("route", "code");
  

    return success_response(
      res,
      200,
      "Production Orders fetched successfully",
      productionOrder
    );
  } catch (error) {
    console.log("error in operator portal ODBC API", error);
    return error_response(res, 500, error.message);
  }
};

exports.getDocNumData = async (req, res) => {
  try {
    const { id } = req.params;

    const getData = await Job.findOne({ _id: id })
      .populate("productionOrderDataId")
      .populate("user", "userName")
      .populate("machine", "code")
      .populate("route", "code");

    if (!getData) {
      return error_response(res, 400, "Production Order detail not exist");
    }

    return success_response(
      res,
      200,
      "Operator portal data fetched successfully",
      getData
    );
  } catch (error) {
    console.log("error in operator portal ODBC API", error);
    return error_response(res, 500, error.message);
  }
};
