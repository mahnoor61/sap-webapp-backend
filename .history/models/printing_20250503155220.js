const mongoose = require("mongoose");

const printingSchema = new mongoose.Schema({
  text: { type: String },
  colorVariation: { type: String },
  doubling: { type: String },
  dust: { type: String },
  setOff: { type: String },
  scumming: { type: String },
  text: { type: String },
  text: { type: String },
  text: { type: String },
  text: { type: String },
  text: { type: String },
});
module.exports = mongoose.model("printing", printingSchema);
