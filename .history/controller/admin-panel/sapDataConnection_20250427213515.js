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
    // console.log("productionOrder", productionOrder)

    //       const SAP_ODBC_CONNECTION_STRING = process.env.SAP_CONNECTION_STRING;
    //       const connection = await odbc.connect(SAP_ODBC_CONNECTION_STRING);
    //
    //
    //       const query = `SELECT
    //     T0.[DocNum],
    //     T0.[ItemCode],
    //     T0.[ProdName],
    //     T0.[PlannedQty],
    //     T0.[U_UPS],
    //     T0.[CardCode],
    //     T3.[CardName],
    //     T0.[OriginNum],
    //     T1.[ItemCode] AS ComponentItemCode,
    //     T2.[ItemName] AS ComponentItemName,
    //     T1.[PlannedQty] AS ComponentPlannedQty,
    //     COALESCE(T5.[Quantity] - T5.[OpenQty], 0) AS [TransferredQuantity]
    // FROM OWOR T0
    // INNER JOIN WOR1 T1 ON T0.[DocEntry] = T1.[DocEntry]
    // INNER JOIN OITM T2 ON T1.[ItemCode] = T2.[ItemCode]
    // LEFT JOIN OCRD T3 ON T0.[CardCode] = T3.[CardCode]
    // LEFT JOIN OWTQ T4 ON T0.[DocNum] = T4.[U_PONumber]
    // LEFT JOIN WTQ1 T5 ON T4.[DocEntry] = T5.[DocEntry] AND T1.[ItemCode] = T5.[ItemCode]
    // WHERE T1.[ItemCode] LIKE '%SHT%'
    // AND (T5.[ItemCode] LIKE '%SHT%' OR T5.[ItemCode] IS NULL)`
    //
    //
    //       const result = await connection.query(query);
    //       await connection.close();

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
