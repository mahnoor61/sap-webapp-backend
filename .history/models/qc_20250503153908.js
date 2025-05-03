const mongoose = require("mongoose");


 const qcSchema = new mongoose.Schema({
  quantity: Number,
  makeTime: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "job-assigning" },
  formType: { type: String, enum: ["printing", "coating", "polling", "doubling", "sheeting", "filming"] },
  formId: { type: mongoose.Schema.Types.ObjectId, refPath: "formType" },
});
});
module.exports = mongoose.model("quality-control", qcSchema);
