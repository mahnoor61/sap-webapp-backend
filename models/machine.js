const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
    code: {type: String, required:true},
    // route: {type: String, required: null},
})
module.exports = mongoose.model('machine', machineSchema)
