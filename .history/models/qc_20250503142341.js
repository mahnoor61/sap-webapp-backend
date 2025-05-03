const mongoose = require("mongoose");

const qcSchema = new mongoose.Schema({
  quantity: { type: Number, default: null },
    makeTime: { type: String, default: null },
  jobId:
});
module.exports = mongoose.model("quality-control", qcSchema);
