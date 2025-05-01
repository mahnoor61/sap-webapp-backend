const odbc = require("odbc");
const ProductionOrder = require("../models/productionOrder");

// exports.fetchAndSyncSAPOrders = async () => {
//     try {
//         const SAP_ODBC_CONNECTION_STRING = process.env.SAP_CONNECTION_STRING;
//         const connection = await odbc.connect(SAP_ODBC_CONNECTION_STRING);
//
//         const query = `SELECT TOP 100
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
// FROM OWOR T0
// INNER JOIN WOR1 T1 ON T0.[DocEntry] = T1.[DocEntry]
// INNER JOIN OITM T2 ON T1.[ItemCode] = T2.[ItemCode]
// LEFT JOIN OCRD T3 ON T0.[CardCode] = T3.[CardCode]
// LEFT JOIN OWTQ T4 ON T0.[DocNum] = T4.[U_PONumber]
// LEFT JOIN WTQ1 T5 ON T4.[DocEntry] = T5.[DocEntry] AND T1.[ItemCode] = T5.[ItemCode]
// WHERE T1.[ItemCode] LIKE '%SHT%'
//   AND (T5.[ItemCode] LIKE '%SHT%' OR T5.[ItemCode] IS NULL)
// ORDER BY T0.[DocEntry] DESC`
//
//
//         const result = await connection.query(query);
//         await connection.close();
//
//         const sapOrders = result;
//
//         for (const order of sapOrders) {
//             const exists = await ProductionOrder.findOne({docNum: order.DocNum});
//
//             if (!exists) {
//                 await ProductionOrder.create({
//                     docNum: order.DocNum,
//                     itemCode: order.ItemCode,
//                     prodName: order.ProdName,
//                     plannedQty: order.PlannedQty,
//                     ComponentItemCode: order.ComponentItemCode,
//                     ComponentItemName: order.ComponentItemName,
//                     ComponentPlannedQty: order.ComponentPlannedQty,
//                     cardCode: order.CardCode,
//                     cardName: order.CardName,
//                     OriginNum: order.OriginNum,
//                     TransferredQuantity: order.TransferredQuantity,
//                     U_UPS: order.U_UPS,
//                 });
//
//                 // console.log(`✅ Created DocNum: ${order.DocNum}`);
//             }
//             console.log(`✅ Created DocNum: ${order.DocNum}`);
//         }
//         // console.log("sapOrders", sapOrders.length)
//
//         // console.log("🚀 SAP Orders synced successfully");
//     } catch (error) {
//         console.error("❌ Error in cron", error.message);
//     }
// };
// exports.fetchAndSyncSAPOrders = async () => {
//     try {
//         const SAP_ODBC_CONNECTION_STRING = process.env.SAP_CONNECTION_STRING;
//         console.log("SAP_ODBC_CONNECTION_STRING", SAP_ODBC_CONNECTION_STRING)
//         const connection = await odbc.connect(SAP_ODBC_CONNECTION_STRING);
//         console.log("connection", connection)
//
//         const query = `SELECT TOP 100
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
// FROM OWOR T0
// INNER JOIN WOR1 T1 ON T0.[DocEntry] = T1.[DocEntry]
// INNER JOIN OITM T2 ON T1.[ItemCode] = T2.[ItemCode]
// LEFT JOIN OCRD T3 ON T0.[CardCode] = T3.[CardCode]
// LEFT JOIN OWTQ T4 ON T0.[DocNum] = T4.[U_PONumber]
// LEFT JOIN WTQ1 T5 ON T4.[DocEntry] = T5.[DocEntry] AND T1.[ItemCode] = T5.[ItemCode]
// WHERE T1.[ItemCode] LIKE '%SHT%'
//   AND (T5.[ItemCode] LIKE '%SHT%' OR T5.[ItemCode] IS NULL)
// ORDER BY T0.[DocEntry] DESC`
//
//
//         const result = await connection.query(query);
//         await connection.close();
//
//         const sapOrders = result;
//         console.log("sapOrders", sapOrders)
//         for (const order of sapOrders) {
//
//             const exists = await ProductionOrder.findOne({docNum: order.DocNum});
//
//             if (!exists) {
//                 await ProductionOrder.create({
//                     docNum: order.DocNum,
//                     itemCode: order.ItemCode,
//                     prodName: order.ProdName,
//                     plannedQty: order.PlannedQty,
//                     ComponentItemCode: order.ComponentItemCode,
//                     ComponentItemName: order.ComponentItemName,
//                     ComponentPlannedQty: order.ComponentPlannedQty,
//                     cardCode: order.CardCode,
//                     cardName: order.CardName,
//                     OriginNum: order.OriginNum,
//                     TransferredQuantity: order.TransferredQuantity,
//                     U_UPS: order.U_UPS,
//                 });
//
//                 console.log(`✅ Created DocNum: ${order.DocNum}`);
//             }
//             // console.log(`✅ Created DocNum: ${order.DocNum}`);
//         }
//         console.log("sapOrders", sapOrders.length)
//
//         console.log("🚀 SAP Orders synced successfully");
//     } catch (error) {
//         console.error("❌ Error in cron", error.message);
//     }
// };
//

exports.fetchAndSyncSAPOrders = async () => {
  try {
    const SAP_ODBC_CONNECTION_STRING = process.env.SAP_CONNECTION_STRING;
    const connection = await odbc.connect(SAP_ODBC_CONNECTION_STRING);
//     const query = `SELECT TOP 100
//             T0.[DocEntry] AS BaseEntry,
// T0.[DocNum],
//             T0.[ItemCode],
//             T0.[ProdName],
//             T0.[PlannedQty],
//             T0.[U_UPS],
//             T0.[CardCode],
//             T3.[CardName],
//             T0.[OriginNum],
//             T1.[ItemCode] AS ComponentItemCode,
//             T2.[ItemName] AS ComponentItemName,
//             T1.[PlannedQty] AS ComponentPlannedQty,
//             COALESCE(T5.[Quantity] - T5.[OpenQty], 0) AS [TransferredQuantity]
//         FROM OWOR T0
//         INNER JOIN WOR1 T1 ON T0.[DocEntry] = T1.[DocEntry]
//         INNER JOIN OITM T2 ON T1.[ItemCode] = T2.[ItemCode]
//         LEFT JOIN OCRD T3 ON T0.[CardCode] = T3.[CardCode]
//         LEFT JOIN OWTQ T4 ON T0.[DocNum] = T4.[U_PONumber]
//         LEFT JOIN WTQ1 T5 ON T4.[DocEntry] = T5.[DocEntry] AND T1.[ItemCode] = T5.[ItemCode]
//         WHERE T1.[ItemCode] LIKE '%SHT%'
//         AND (T5.[ItemCode] LIKE '%SHT%' OR T5.[ItemCode] IS NULL)
//         ORDER BY T0.[DocEntry] DESC`;




    const result = await connection.query(query);
    await connection.close();

    const sapOrders = result;

    for (const order of sapOrders) {
      const filter = {
        docNum: order.DocNum,
        ComponentItemCode: order.ComponentItemCode,
      };

      const update = {
        itemCode: order.ItemCode,
        prodName: order.ProdName,
        plannedQty: order.PlannedQty,
        ComponentItemName: order.ComponentItemName,
        ComponentPlannedQty: order.ComponentPlannedQty,
        cardCode: order.CardCode,
        cardName: order.CardName,
        OriginNum: order.OriginNum,
        TransferredQuantity: order.TransferredQuantity,
        U_UPS: order.U_UPS,
      };

      const options = {
        upsert: true, // create if not found
        new: true, // return the updated document
        setDefaultsOnInsert: true,
      };

      await ProductionOrder.findOneAndUpdate(filter, update, options);

      console.log(
        `✔️ Synced DocNum: ${order.DocNum}, Sheet: ${order.ComponentItemCode}`
      );
    }

    console.log(
      `🚀 SAP Orders synced successfully. Total: ${sapOrders.length}`
    );
  } catch (error) {
    console.error("❌ Error in cron:", error.message);
  }
};
