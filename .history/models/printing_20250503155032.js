const mongoose = require("mongoose");

const printingSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
module.exports = mongoose.model("printing", printingSchema);
