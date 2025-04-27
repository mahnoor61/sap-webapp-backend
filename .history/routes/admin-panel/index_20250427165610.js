const express = require("express");
const router = express();

const Admin = require('./admin');
// const User = require('./user');
const Operator = require('./operator');
const Operator = require("./operator");


router.use("/admin", Admin);
router.use("/operator", Operator);
// router.use("/user", User);
module.exports = router;