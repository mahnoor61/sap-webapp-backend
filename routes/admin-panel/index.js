const express = require("express");
const router = express();

const Admin = require("./admin");
// const User = require('./user');
const Operator = require("./operator");
const Sap = require("./sap");
const QC = require("./printing");
const Die = require("./dieCutting");
const Laminating = require("./laminating");
const Pasting = require("./pasting");
const Food = require("./food");

router.use("/admin", Admin);
router.use("/operator", Operator);
router.use("/sap", Sap);
router.use("/qc", QC);
router.use("/qc", Die);
router.use("/qc", Laminating);
router.use("/qc", Pasting);
router.use("/qc", Food);

// router.use("/user", User);
module.exports = router;
