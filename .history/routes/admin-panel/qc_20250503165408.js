const Express = require("express");
const router = Express.Router();
const middleware = require("../../middleware/admin");

const {
  getAllAssignJobOfMachine,
    saveQuantityForQC,
  saveTimeForQC
  createPrinting,
} = require("../../controller/admin-panel/qc");

//machine route
router.get(
  "/get/machine-data/:machineId",
  middleware,
  getAllAssignJobOfMachine
);

router.post("/add-quantity", middleware, saveQuantityForQC);
router.post("/printing", middleware, createPrinting);

module.exports = router;
