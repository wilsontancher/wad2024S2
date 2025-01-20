const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type:String,unique:true},
    password: String,
    role: String,
    token: String
})

module.exports = mongoose.model('users',userSchema);