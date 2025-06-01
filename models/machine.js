const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema({
  code: { type: String, required: true },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "route-stage",
  },
},{timestamps:true});
module.exports = mongoose.model("machine", machineSchema);
