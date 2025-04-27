const Express = require('express');
const router = Express.Router();
const middleware = require('../../middleware/admin');

const {
    login,

} = require('../../controller/admin-panel/admin');

// // const {createJob} =require('../../controller/admin-panel/job');

//machine route
router.post("/create/role", createRoles);
router.post("/create/machine", middleware, createMachine);


module.exports = router;
