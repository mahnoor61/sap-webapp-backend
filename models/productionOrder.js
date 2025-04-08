const mongoose = require('mongoose');

const ProductionOrderSchema = new mongoose.Schema({
    docNum: {type: Number, required: true, unique: true},
    itemCode: String,
    prodName: String,
    plannedQty: Number,
    ComponentItemCode: String,
    ComponentItemName: String,
    ComponentPlannedQty: Number,
    cardCode: String,
    cardName: String,
    OriginNum: Number,
    TransferredQuantity: Number,
    U_UPS: String,
    status: {
        type: String,
        enum: ['pending', 'make-time','running', 'paused', 'completed'],
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

    currentPallateNo: {type: Number, default: 0},
    issueForMachine: {type: Number, default: 0},
    completedQuantity: {type: Number, default: 0},
    wastedQuantity: {type: Number, default: 0},

    totalIssueForMachie: {type: Number, default: 0},
    totalCompletedQuantity: {type: Number, default: 0},
    totalWastedQuantity: {type: Number, default: 0}

}, {timestamps: true});

module.exports = mongoose.model('Production-Order', ProductionOrderSchema);
