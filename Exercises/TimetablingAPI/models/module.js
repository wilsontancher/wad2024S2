const mongoose = require('mongoose');

const moduleSchema = mongoose.Schema({
    code: {type:String,unique:true},
    name: String
})

module.exports = mongoose.model('modules',moduleSchema);