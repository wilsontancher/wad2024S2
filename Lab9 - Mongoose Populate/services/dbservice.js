const mongoose = require('mongoose');
const event = require("../models/event.js");
const organizer = require("../models/organizer.js");

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
    async addEvent(name, description, startDate, startTime, endDate, endTime, organizerId) {
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
                },
                organizer: organizerId
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
            // let results = await event.find();
            // let results = await event.find().populate('organizer');
            let results = await event.find().populate('organizer', ['name','company']);
            return results;
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error retrieving events");
        }
    },
    async getEventById(id) {
        try {
            let result = await event.findById(id).populate('organizer', ['name','company']);
            return result;
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error retrieving event");
        }
    },
    async getEvents(conditions) {
        try {
            let results = await event.find(conditions).populate('organizer', ['name','company']);
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
    },
    async addOrganizer(name, username, password, company) {
        try {
            await organizer.create({
                name: name,
                username: username,
                password: password,
                company: company
            })
            return `${username} has been added to the system`;
        }
        catch(e) {
            console.log(e.message);
            throw new Error(`Unable to add ${username} to the system.`);
        }
    },
    async getAllOrganizers() {
        try {
            let results = await organizer.find().select("name company");
            return results;
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error retrieving organizers");
        }
    },
    async getOrganizerById(id) {
        try {
            let result = await organizer.findById(id).select("name company");
            return result;
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error retrieving organizer's information.");
        }
    },
    async searchOrganizers(username) {
        try {
            let results = await organizer.find({ username: new RegExp(username,'i') }).select("name company");
            return results;
        }
        catch(e) {
            console.log(e.message);
            throw new Error(`Unable to retrieve records for ${username}`);
        }
    },
    async getOrganizersByCompany(company) {
        try {
            let results = await organizer.find({ company: company }).select("name company");
            return results;
        }
        catch(e) {
            console.log(e.message);
            throw new Error(`Unable to retrieve records for ${company}`);
        }
    },
    async getOrganizer(username,password) {
        try {
            let result = await organizer.findOne({username: username, password: password});
            return result;
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error retrieving login credentials");
        }
    },
    async updateToken(id,token) {
        try {
            await organizer.findByIdAndUpdate(id,{token:token});
            return;
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error at the server. Please try again later.");
        }
    },
    async checkToken(token) {
        try {
            let result = await organizer.findOne({token:token});
            return result;
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error at the server. Please try again later.");
        }
    },
    async removeToken(id) {
        try {
            await organizer.findByIdAndUpdate(id, {$unset: {token: 1}});
            return;
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error at the server. Please try again later.");
        }
    }
}

module.exports = db;
