const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    code: {type: String, required: true},
},{timestamps:true})
module.exports = mongoose.model('route-stage', routeSchema)
