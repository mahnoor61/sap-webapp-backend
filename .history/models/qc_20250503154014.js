const mongoose = require("mongoose");

const qcSchema = new mongoose.Schema({
  quantity: { type: Number, default: null },
  makeTime: { type: String, default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "job-assigning" },
  formType: {
    type: String,
    enum: ["printing", "coating", "polling", "doubling", "sheeting", "filming"],
    default: null,
  },
  formId: { type: mongoose.Schema.Types.ObjectId, refPath: "formType" },
});

module.exports = mongoose.model("quality-control", qcSchema);
