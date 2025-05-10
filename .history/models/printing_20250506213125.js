// const mongoose = require("mongoose");

// const printingSchema = new mongoose.Schema({
//   serialNo: { type: Number },
//   text: { type: String },
//   colorVariation: { type: String },
//   doubling: { type: String },
//   dust: { type: String },
//   setOff: { type: String },
//   scumming: { type: String },
//   sideLay: { type: String },
//   frontLay: { type: String },
//   registration: { type: String },
//   dmsFromPlate: { type: String },
// });

// module.exports = mongoose.model("printing", printingSchema);
const mongoose = require("mongoose");

const responseObjectSchema = {
  answer: { type: String },
  reason: { type: String },
  serialNo: { type: String },
};

const printingSchema = new mongoose.Schema({
  shift: { type: String },
  date:{type:String}
  serialNo: { type: Number },
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
