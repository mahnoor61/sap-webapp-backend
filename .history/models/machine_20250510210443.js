const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema({
  code: { type: String, required: true },
  route: { type: mongoose.Schema.Types.O, required: true },
});
module.exports = mongoose.model("machine", machineSchema);
