const mongoose = require("mongoose");

const responseObjectSchema = {
  answer: { type: String },
  reason: { type: String },
};

const foodSchema = new mongoose.Schema({
  quantity: { type: Number, default: null },
  time: { type: String, default: null },
  makeTimeStatus: { type: String, default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "job-assigning" },

  qcNo: { type: String },
  shift: { type: String },
  date: { type: String },
  printingSpots: responseObjectSchema,
  ccWrongCutting: responseObjectSchema,
  embossOut: responseObjectSchema,
  laminationWrinkle: responseObjectSchema,
  bubble: responseObjectSchema,
  files: responseObjectSchema,
  colorVariation: responseObjectSchema,
  foiling: responseObjectSchema,
  okQty: { type: Number },
  totalWaste: { type: Number },
});

module.exports = mongoose.model("report-food", foodSchema);
