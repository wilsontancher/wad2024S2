const mongoose = require('mongoose');

const tutorSchema = mongoose.Schema({
    name: {type:String,unique:true},
    office: String
})

module.exports = mongoose.model('tutors',tutorSchema);