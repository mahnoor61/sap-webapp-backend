const mongoose = require("mongoose");

const qcSchema = new mongoose.Schema({
  quantity: { type: Number, default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true , reference:},
  makeTime: { type: String, default: null },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "job-assigning",
  },
  printing: { type: mongoose.Schema.Types.Mixed },
});
module.exports = mongoose.model("quality-control", qcSchema);
