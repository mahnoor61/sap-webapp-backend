const express = require("express");
const router = express();

const Admin = require("./admin");
// const User = require('./user');
const Operator = require("./operator");
const Sap = require("./sap");
const Q

router.use("/admin", Admin);
router.use("/operator", Operator);
router.use("/sap", Sap);
// router.use("/user", User);
module.exports = router;
