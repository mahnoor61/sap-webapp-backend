const Express = require("express");
const router = Express.Router();
const middleware = require("../../middleware/admin");

const {
  getAllAssignJobOfMachine,
  saveQuantityOrTimeForQC,
  createPrinting,
  getData,
  getQcCurrentTableData,
} = require("../../controller/admin-panel/qc");

//machine route
router.get(
  "/get/machine-data/:machineId",
  middleware,
  getAllAssignJobOfMachine
);

router.post("/add-quantity", middleware, saveQuantityOrTimeForQC);
router.post("/printing/:id", middleware, createPrinting);

router.get("/get/data/:id", middleware, getData);
router.post("/get/qc-data", middleware, getQcCurrentTableData);
router.get("/get/priting-machine", middleware, getAllPrintingMachines);

module.exports = router;
