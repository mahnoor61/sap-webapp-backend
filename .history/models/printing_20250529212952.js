
const mongoose = require("mongoose");

const responseObjectSchema = {
  answer: { type: String },
  reason: { type: String },
  // serialNo: { type: String },
};

const printingSchema = new mongoose.Schema({
  qcNo: { type: String },
  shift: { type: String },
  date: { type: String },
  // serialNo: { type: Number },
  text: responseObjectSchema,
  colorVariation: responseObjectSchema,
  doubling: responseObjectSchema,
  dust: responseObjectSchema,
  setOff: responseObjectSchema,
  scumming: responseObjectSchema,
  sideLay: responseObjectSchema,
  frontLay: responseObjectSchema,
  registration: responseObjectSchema,
  dmsFromPlate: responseObjectSchema,
});

module.exports = mongoose.model("printing", printingSchema);
