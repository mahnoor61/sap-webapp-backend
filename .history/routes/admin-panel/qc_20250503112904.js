const Express = require("express");
const router = Express.Router();
const middleware = require("../../middleware/admin");

const { sapLoginApi } = require("../../controller/admin-panel/");

//machine route
router.get("/get/machine-data", sapLoginApi);

module.exports = router;
