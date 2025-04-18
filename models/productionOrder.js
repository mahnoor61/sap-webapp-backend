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
}, {timestamps: true});

module.exports = mongoose.model('Production-Order', ProductionOrderSchema);
