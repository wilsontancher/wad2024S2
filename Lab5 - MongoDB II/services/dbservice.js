const mongoose = require('mongoose');
const event = require("../models/event.js");

let db = {
    async connect() {
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/eventManagementDB');
            return "Connected to Mongo DB";
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error connecting to Mongo DB");
        }
    },
    async addEvent(name, description, startDate, startTime, endDate, endTime) {
        try {
            await event.create({
                name: name,
                description: description,
                start: {
                    date: startDate,
                    time: startTime,
                },
                end: {
                    date: endDate,
                    time: endTime
                }
            });
            // return "Event name: "+name+" has been added";
            return `Event name: ${name} has been added`;
        }
        catch(e) {
            console.log(e.message);
            throw new Error(`Event name: ${name} was not added.`);
        }
    },
    async getAllEvents() {
        try {
            let results = await event.find();
            return results;
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error retrieving events");
        }
    },
    async getEventById(id) {
        try {
            let result = await event.findById(id);
            return result;
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error retrieving event");
        }
    },
    async getEvents(conditions) {
        try {
            let results = await event.find(conditions);
            return results;
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error retrieving events");
        }
    },
    async updateEventById(id, updates) {
        try {
            let result = await event.findByIdAndUpdate(id, updates);
            if (!result) return "Unable to find record to update.";
            else return "Record is updated!";
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error updating event");
        }
    },
    async updateEvent(conditions, updates) {
        try {
            let result = await event.findOneAndUpdate(conditions, updates)
            if (!result) return "Unable to find record to update.";
            else return "Record is updated!";
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error updating event");
        }
    },
    async deleteEventById(id) {
        try {
            let result = await event.findByIdAndDelete(id);
            if (!result) return "Unable to find a record to delete.";
            else return "Record is deleted!";
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error deleting event");
        }
    },
    async deleteEvent(conditions) {
        try {
            let result = await event.findOneAndDelete(conditions);
            if (!result) return "Unable to find a record to delete.";
            else return "Record is deleted!";
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error deleting event");
        }
    }
}

module.exports = db;
