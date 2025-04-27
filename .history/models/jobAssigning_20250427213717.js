const mongoose = require('mongoose');

const jobAssigningSchema = new mongoose.Schema({
    productionOrderNo: {type: Number, required: true},
    machine: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'machine'},
    route: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'route-stage'},
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user'},
    productionOrderDataId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Production-Order'},
   
    routeNo: { type: Number },
    status: {
        type: String,
        enum: ['pending', 'make-time', 'running', 'paused', 'downtime', 'completed'],
        default: 'pending'
    },
    makeTime: {type: String, default: "00:00:00"},
    startProductionTime: {type: String, default: "00:00:00"},
    pauseProductionTime: {type: String, default: "00:00:00"},
    pauseReason: {type: String, default: null},
    stopProductionTime: {type: String, default: "00:00:00"},
    stopReason: {type: String, default: null},
    downTime: {type: String, default: "00:00:00"},
    downTimeReason: {type: String, default: null},
    recievedByOperator: {type: Number, default: 0},
    remainingQuantity: {type: Number, default: 0},

    recieveByPreviousRoute: {type: Number, default: 0},

    currentPallateNo: {type: Number, default: 1},
    issueForMachine: {type: Number, default: 0},
    completedQuantity: {type: Number, default: 0},
    wastedQuantity: {type: Number, default: 0},

    totalIssueForMachie: {type: Number, default: 0},
    totalCompletedQuantity: {type: Number, default: 0},
    totalWastedQuantity: {type: Number, default: 0}

}, {timestamps: true})
module.exports = mongoose.model('job-assigning', jobAssigningSchema)
