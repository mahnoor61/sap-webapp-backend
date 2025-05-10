const Express = require("express");
const router = Express.Router();
const middleware = require("../../middleware/admin");

const {
  getAllAssignJobOfMachine,
  saveQuantityOrTimeForQC,
  createPrinting,
  getData,
} = require("../../controller/admin-panel/qc");

//machine route
router.get(
  "/get/machine-data/:machineId",
  middleware,
  getAllAssignJobOfMachine
);

router.post("/add-quantity", middleware, saveQuantityOrTimeForQC);
router.post("/printing/:id", middleware, createPrinting);

router.get("/get/data", middleware, getAllAssignJobOfMachine);

module.exports = router;
