const mongoose = require("mongoose");

const responseObjectSchema = {
    answer: { type: String },
    reason: { type: String },
    // serialNo: { type: String },
};

const dieCuttingSchema = new mongoose.Schema({
    qcNo: { type: String },
    shift: { type: String },
    date: { type: String },
    // serialNo: { type: Number },
    position: responseObjectSchema,
    cutting: responseObjectSchema,
    creasing: responseObjectSchema,
    cracking: responseObjectSchema,
    embossing: responseObjectSchema,
    perforation: responseObjectSchema,
    sideLay: responseObjectSchema,
    frontLay: responseObjectSchema,
    makeReady: responseObjectSchema,
    locking: responseObjectSchema,
    foiling: responseObjectSchema,
});

module.exports = mongoose.model("die-cutting", dieCuttingSchema);
