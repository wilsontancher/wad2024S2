const mongoose = require('mongoose');

const timetableSchema = mongoose.Schema({
    day: String,
    start: String,
    end: String,
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'modules'
    },
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tutors'
    }
})

module.exports = mongoose.model('timetables',timetableSchema);