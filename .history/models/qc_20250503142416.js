const mongoose = require("mongoose");

const qcSchema = new mongoose.Schema({
  quantity: { type: Number, default: null },
  makeTime: { type: String, default: null },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "job-assigning",
  },
});
module.exports = mongoose.model("quality-control", qcSchema);
