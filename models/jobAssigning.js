const mongoose = require('mongoose');

const jobAssigningSchema = new mongoose.Schema({
    productionOrderNo: {type: Number, required:true},
    // machine: {type: mongoose.Schema.Types.ObjectId, required:true, ref:'machine'},
    // route: {type: mongoose.Schema.Types.ObjectId, required:true, ref:'route-stage'},
    // user: {type: mongoose.Schema.Types.ObjectId, required:true, ref:'user'},
    machine: {type:[mongoose.Schema.Types.ObjectId], required:true, ref:'machine'},
    route: {type: [mongoose.Schema.Types.ObjectId], required:true, ref:'route-stage'},
    user: {type: [mongoose.Schema.Types.ObjectId], required:true, ref:'user'},
}, {timestamps:true})
module.exports = mongoose.model('job-assigning', jobAssigningSchema)
