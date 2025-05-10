const mongoose = require("mongoose");

const printingSchema = new mongoose.Schema({
  serialNo
  text: { type: String },
  colorVariation: { type: String },
  doubling: { type: String },
  dust: { type: String },
  setOff: { type: String },
  scumming: { type: String },
  sideLay: { type: String },
  frontLay: { type: String },
  registration: { type: String },
  dmsFromPlate: { type: String },
});

module.exports = mongoose.model("printing", printingSchema);
