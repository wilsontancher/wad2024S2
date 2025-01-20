const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: {type: String, unique: true},
    description: String,
    start: {
        date: String,
        time: String
    },
    end: {
        date: String,
        time: String
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organizers"
    }
});

module.exports = mongoose.model('events',eventSchema);