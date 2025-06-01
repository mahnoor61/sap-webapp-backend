const Express = require("express");
const router = Express.Router();
const middleware = require("../../middleware/admin");

const {
    getAllAssignJobOfMachine,
    saveQuantityOrTimeForQC,
    createLaminating,
    getData,
    getQcCurrentTableData,
    getAllDieMachines,
    getJobData,
} = require("../../controller/admin-panel/laminating");

//machine route
router.get(
    "/get/machine-data/laminating/:machineId",
    middleware,
    getAllAssignJobOfMachine
);

router.post("/add-quantity/laminating", middleware, saveQuantityOrTimeForQC);
router.post("/laminating/:id", middleware, createLaminating);

router.get("/get/data/laminating/:id", middleware, getData);
router.post("/get/qc-data/laminating", middleware, getQcCurrentTableData);
router.post("/get/job-data", middleware, getJobData);
router.get("/get/laminating-machine", middleware, getAllDieMachines);

module.exports = router;
