const mongoose = require("mongoose");

const qcSchema = new mongoose.Schema({
  quantity: { type: Number, default: 0 },
  makeTime: { type: String, default: null },
});
module.exports = mongoose.model("quality-control", qcSchema);
