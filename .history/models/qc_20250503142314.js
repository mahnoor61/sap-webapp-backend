const mongoose = require("mongoose");

const qcSchema = new mongoose.Schema({
  makeTime: { type: String, default: null },
  makeTime: { type: String, default: null },
});
module.exports = mongoose.model("quality-control", qcSchema);
