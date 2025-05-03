const mongoose = require("mongoose");

const qcSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
module.exports = mongoose.model("quality-control", roleSchema);
