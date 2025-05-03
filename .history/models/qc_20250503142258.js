const mongoose = require("mongoose");

const qcSchema = new mongoose.Schema({
  makeTime: { type: String, required: true },
});
module.exports = mongoose.model("quality-control", qcSchema);
