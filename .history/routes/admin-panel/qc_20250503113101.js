const Express = require("express");
const router = Express.Router();
const middleware = require("../../middleware/admin");

const { getAllAssignJobOfMachine } = require("../../controller/admin-panel/qc");

//machine route
router.get("/get/machine-data/:m", getAllAssignJobOfMachine);

module.exports = router;
