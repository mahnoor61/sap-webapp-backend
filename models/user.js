const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {type: String, default: null},
    userName: {type: String, default: null},
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {type: mongoose.Schema.Types.ObjectId, default: null, ref: 'role'},
    machine: {type: mongoose.Schema.Types.ObjectId, default: null, ref: 'machine'},
    token: {
        type: String,
    },
},{timestamps:true});

module.exports = mongoose.model('user', userSchema);