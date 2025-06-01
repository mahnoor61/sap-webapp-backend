const Express = require("express");
const router = Express.Router();
const middleware = require("../../middleware/admin");

const {
    getAllAssignJobOfMachine,
    saveQuantityOrTimeForQC,
    createReportForFood,
    getData,
    getQcCurrentTableData,
    getAllFoodMachines,
    getJobData,
} = require("../../controller/admin-panel/food");

//machine route
router.get(
    "/get/machine-data/food/:machineId",
    middleware,
    getAllAssignJobOfMachine
);

router.post("/add-quantity/food", middleware, saveQuantityOrTimeForQC);
router.post("/food/:id", middleware, createReportForFood);

router.get("/get/data/food/:id", middleware, getData);
router.post("/get/qc-data/food", middleware, getQcCurrentTableData);
router.post("/get/job-data", middleware, getJobData);
router.get("/get/food-machine", middleware, getAllFoodMachines);

module.exports = router;
