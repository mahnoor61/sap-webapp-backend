const mongoose = require("mongoose");

const responseObjectSchema = {
    answer: { type: String },
    reason: { type: String },
    // serialNo: { type: String },
};

const pastingSchema = new mongoose.Schema({
    qcNo: { type: String },
    shift: { type: String },
    date: { type: String },
    // serialNo: { type: Number },
    folding: responseObjectSchema,
    gluing: responseObjectSchema,
    formation: responseObjectSchema,
    taping: responseObjectSchema,
    labeling: responseObjectSchema,
    quantity: responseObjectSchema,
    mctnPacking: responseObjectSchema,
    stacking: responseObjectSchema,
    dDabi: responseObjectSchema,
    stuckIn: responseObjectSchema,
    lock: responseObjectSchema
});

module.exports = mongoose.model("pasting", pastingSchema);
