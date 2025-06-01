const Express = require("express");
const router = Express.Router();
const middleware = require("../../middleware/admin");

const {
    getAllAssignJobOfMachine,
    saveQuantityOrTimeForQC,
    createDieCutting,
    getData,
    getQcCurrentTableData,
    getAllDieMachines,
    getJobData,
} = require("../../controller/admin-panel/dieCutting");

//machine route
router.get(
    "/get/machine-data/:machineId",
    middleware,
    getAllAssignJobOfMachine
);

router.post("/add-quantity/die", middleware, saveQuantityOrTimeForQC);
router.post("/die-cutting/:id", middleware, createDieCutting);

router.get("/get/data/die/:id", middleware, getData);
router.post("/get/qc-data/die", middleware, getQcCurrentTableData);
router.post("/get/job-data", middleware, getJobData);
router.get("/get/die-cutting-machine", middleware, getAllDieMachines);

module.exports = router;
