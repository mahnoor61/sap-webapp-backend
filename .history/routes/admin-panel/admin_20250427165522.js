const Express = require('express');
const router = Express.Router();
const middleware = require('../../middleware/admin');

const {
    login,
    register,
    auth,
    allUsers, destroy,
    verifyToken,
    changePassword, readUser,
    changeEmail, updateUser
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

router.get("/get/machines", middleware, allMachine);
router.get("/get/roles", middleware, allRoles);
//route stage
router.post("/create/route", middleware, createRouteStage);
router.get("/get/routes", middleware, allRoutes);

router.post('/login', login);
router.get('/all/users', middleware, allUsers);
router.post('/register', register);
router.post('/update/user/:id', middleware, updateUser);
router.get('/get/user/:id', middleware, readUser);

router.post('/changeEmail', middleware, changeEmail);
router.get('/auth', middleware, auth);
router.post('/changePassword', middleware, changePassword);
router.delete('/destroy/:id', middleware, destroy);

//job routes:
router.post('/assign/job', middleware, createJob);
router.get('/get/jobs', middleware, allJobs);
router.post('/update/job/:id', middleware, updateJob);

// router.post('/verifyToken', verifyToken);

//sap connection route:
router.get('/odbc/production/orders',middleware,  getProductionOrderNos);
router.get('/odbc/production/order/:id',middleware,  allSingleJobs);
router.delete('/destroy/job/:id', middleware, destroyJob);
// get operator portal data of sap route:
router.get('/odbc/operator/data',middleware,  getOperatorPortalData);

router.get('/odbc/operator/doc-data/:id',middleware,  getDocNumData);



module.exports = router;
