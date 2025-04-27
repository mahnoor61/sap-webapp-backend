const Express = require('express');
const router = Express.Router();
const middleware = require('../../middleware/admin');

const {
    login,

} = require('../../controller/admin-panel/admin');
const {getProductionOrderNos, getOperatorPortalData, getDocNumData} = require('../../controller/admin-panel/sapDataConnection');

const {createRoles, allRoles} = require('../../controller/admin-panel/role');
const {createMachine, allMachine} = require('../../controller/admin-panel/machine');
const {createRouteStage, allRoutes} = require('../../controller/admin-panel/routeStage');
const {createJob, allJobs, updateJob, allSingleJobs, destroyJob} = require('../../controller/admin-panel/job');
// // const {createJob} =require('../../controller/admin-panel/job');

//machine route
router.post("/create/role", createRoles);
router.post("/create/machine", middleware, createMachine);


module.exports = router;
