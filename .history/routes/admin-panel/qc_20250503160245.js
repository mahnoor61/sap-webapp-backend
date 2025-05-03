const Express = require("express");
const router = Express.Router();
const middleware = require("../../middleware/admin");

const {
  getAllAssignJobOfMachine,
  saveQuantityOrTimeForQC,
  createPrinting,
} = require("../../controller/admin-panel/qc");

//machine route
router.get(
  "/get/machine-data/:machineId",
  middleware,
  getAllAssignJobOfMachine
);

router.post("/add-quantity", middleware, saveQuantityOrTimeForQC);

module.exports = router;
