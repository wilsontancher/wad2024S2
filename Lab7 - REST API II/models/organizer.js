const mongoose = require('mongoose');

const organizerSchema = mongoose.Schema({
    name: String,
    username: {type:String,unique:true},
    password: String,
    company: String
})

module.exports = mongoose.model('organizers',organizerSchema);