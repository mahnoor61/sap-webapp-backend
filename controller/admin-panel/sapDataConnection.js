const odbc = require('odbc');
const ProductionOrder = require('../../models/productionOrder');

const {success_response, error_response} = require("../../utils/response");

exports.getProductionOrderNos = async (req, res) => {
    try {
        const productionOrder = await ProductionOrder.find();

        let docNumArray = productionOrder.map(data => {
            return {
                docNum: data.docNum
            };
        });

        //     const SAP_ODBC_CONNECTION_STRING = process.env.SAP_CONNECTION_STRING;
        //
        //     const connection = await odbc.connect(SAP_ODBC_CONNECTION_STRING);
        //
        //     const query = `
        //    SELECT T0.[DocNum] FROM OWOR T0  INNER JOIN WOR1 T1 ON T0.[DocEntry] = T1.[DocEntry] WHERE T1.[ItemCode] LIKE '%SHT%' and  T0.[Status] = 'R'
        // `;
        //
        //     const result = await connection.query(query);
        //     await connection.close();
        return success_response(res, 200, "Productin Order fetch Successfully", docNumArray);
    } catch (error) {
        console.log("odbc connection error", error)
        return error_response(res, 500, error.message);
    }
};
exports.getOperatorPortalData = async (req, res) => {
    try {

        const productionOrder = await ProductionOrder.find().sort({createdAt: -1});

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

        return success_response(res, 200, "Production Orders fetched successfully", productionOrder);
    } catch (error) {
        console.log("error in operator portal ODBC API", error);
        return error_response(res, 500, error.message);
    }
};

exports.getDocNumData = async (req, res) => {
    try {
        const {docNum} = req.params;

        const getData = await ProductionOrder.findOne({docNum: docNum});

        if (!getData) {
            return error_response(res, 400, "Production Order detail not exist");
        }


//         const SAP_ODBC_CONNECTION_STRING = process.env.SAP_CONNECTION_STRING;
//         const connection = await odbc.connect(SAP_ODBC_CONNECTION_STRING);
//         const query = `
//   SELECT
//       T0.[DocNum],
//       T0.[ItemCode],
//       T0.[ProdName],
//       T0.[PlannedQty],
//       T0.[U_UPS],
//       T0.[CardCode],
//       T3.[CardName],
//       T0.[OriginNum],
//       T1.[ItemCode] AS ComponentItemCode,
//       T2.[ItemName] AS ComponentItemName,
//       T1.[PlannedQty] AS ComponentPlannedQty,
//       COALESCE(T5.[Quantity] - T5.[OpenQty], 0) AS [TransferredQuantity]
//   FROM OWOR T0
//   INNER JOIN WOR1 T1 ON T0.[DocEntry] = T1.[DocEntry]
//   INNER JOIN OITM T2 ON T1.[ItemCode] = T2.[ItemCode]
//   LEFT JOIN OCRD T3 ON T0.[CardCode] = T3.[CardCode]
//   LEFT JOIN OWTQ T4 ON T0.[DocNum] = T4.[U_PONumber]
//   LEFT JOIN WTQ1 T5 ON T4.[DocEntry] = T5.[DocEntry] AND T1.[ItemCode] = T5.[ItemCode]
//   WHERE T1.[ItemCode] LIKE '%SHT%'
//   AND (T5.[ItemCode] LIKE '%SHT%' OR T5.[ItemCode] IS NULL)
//   AND T0.[DocNum] = ?;
// `;
//
//         // Extracting docNum from request parameters or query
//         const docNum = req.params.docNum || req.query.docNum;
//
//         if (!docNum) {
//             return error_response(res, 400, "Missing required parameter: docNum");
//         }
//
//         // Pass the parameter value to the query
//         const result = await connection.query(query, [docNum]);
//         await connection.close();

        return success_response(res, 200, "Operator portal data fetched successfully", getData);
    } catch (error) {
        console.log("error in operator portal ODBC API", error);
        return error_response(res, 500, error.message);
    }
};