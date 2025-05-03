const mongoose = require("mongoose");

const printingSchema = new mongoose.Schema({
  text: { type: String, required: true },
});
module.exports = mongoose.model("printing", printingSchema);
