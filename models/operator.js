// const mongoose = require('mongoose');
//
// const operatorSchema = new mongoose.Schema({
//     // jobAssigningId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'job-assigning'},
//     producionOrderId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Production-Order'},
//     makeTime: {type: String, default: "00:00:00"},
//     startProductionTime: {type: String, default: "00:00:00"},
//     pauseProductionTime: {type: String, default: "00:00:00"},
//     pauseReason: {type: String},
//     stopProductionTime: {type: String, default: "00:00:00"},
//     stopReason: {type: String},
//     downTime: {type: String, default: "00:00:00"},
//     downTimeReason: {type: String},
//     recievedByOperator:{type:Number, default:0},
//     remainingQuantity:{type:Number, default:0},
// })
// module.exports = mongoose.model('operator', operatorSchema)
