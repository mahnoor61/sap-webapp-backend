const Express = require("express");
const router = Express.Router();
const middleware = require("../../middleware/admin");

const {
    getAllAssignJobOfMachine,
    saveQuantityOrTimeForQC,
    createPasting,
    getData,
    getQcCurrentTableData,
    getAllDieMachines,
    getJobData,
} = require("../../controller/admin-panel/pasting");

//machine route
router.get(
    "/get/machine-data/pasting/:machineId",
    middleware,
    getAllAssignJobOfMachine
);

router.post("/add-quantity/pasting", middleware, saveQuantityOrTimeForQC);
router.post("/pasting/:id", middleware, createPasting);

router.get("/get/data/pasting/:id", middleware, getData);
router.post("/get/qc-data/pasting", middleware, getQcCurrentTableData);
router.post("/get/job-data", middleware, getJobData);
router.get("/get/pasting-machine", middleware, getAllDieMachines);

module.exports = router;
