const Express = require('express');
const router = Express.Router();
const middleware = require('../../middleware/admin');

const {
    sapLoginApi

} = require('../../controller/sapApis');



//machine route
router.post("/login", createRoles);



module.exports = router;
