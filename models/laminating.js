const mongoose = require("mongoose");

const responseObjectSchema = {
    answer: { type: String },
    reason: { type: String },
    // serialNo: { type: String },
};

const laminatingSchema = new mongoose.Schema({
    qcNo: { type: String },
    shift: { type: String },
    date: { type: String },
    // serialNo: { type: Number },
    filmSize: responseObjectSchema,
    gloss: responseObjectSchema,
    glueLayer: responseObjectSchema,
    wrinkle: responseObjectSchema,
    bubble: responseObjectSchema,
    reelSideLay: responseObjectSchema,
    reelFrontLay: responseObjectSchema,
    micron: responseObjectSchema,
    extraLayer: responseObjectSchema,
    pileFormation: responseObjectSchema,
    countingInPkts: responseObjectSchema
});

module.exports = mongoose.model("laminating", laminatingSchema);
