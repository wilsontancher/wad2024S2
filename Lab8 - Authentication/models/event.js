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
    }
});

module.exports = mongoose.model('events',eventSchema);