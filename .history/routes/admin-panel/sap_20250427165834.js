const Express = require('express');
const router = Express.Router();
const middleware = require('../../middleware/admin');

const {
    lsa

} = require('../../controller/sapApis');



//machine route
router.post("/create/role", createRoles);
router.post("/create/machine", middleware, createMachine);


module.exports = router;
