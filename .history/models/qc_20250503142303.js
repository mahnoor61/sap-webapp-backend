const mongoose = require("mongoose");

const qcSchema = new mongoose.Schema({
  makeTime: { type: String, dea},
});
module.exports = mongoose.model("quality-control", qcSchema);
