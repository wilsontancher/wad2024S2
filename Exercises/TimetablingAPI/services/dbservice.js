const mongoose = require('mongoose');
//module is a keyword in node.js, cannot use module as variable name
const mod = require('../models/module.js'); 
const timetable = require('../models/timetable.js');
const tutor = require('../models/tutor.js');
const user = require('../models/user.js');


let db = {
    async connect() {
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/timetablingDB');
            return "Connected to Mongo DB";
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error connecting to Mongo DB");
        }
    },
    async getUser(username,password) {
        try {
            let result = await user.findOne({username: username, password: password});
            return result;
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error retrieving login credentials");
        }
    },
    async updateToken(id,token) {
        try {
            await user.findByIdAndUpdate(id,{token:token});
            return;
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error at the server. Please try again later.");
        }
    },
    async checkToken(token) {
        try {
            let result = await user.findOne({token:token});
            return result;
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error at the server. Please try again later.");
        }
    },
    async removeToken(id) {
        try {
            await user.findByIdAndUpdate(id, {$unset: {token: 1}});
            return;
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error at the server. Please try again later.");
        }
    },
    async addTimetable(day, start, end, moduleId, tutorId) {
        try {
            await timetable.create({
                day:day,
                start: start,
                end: end,
                module: moduleId,
                tutor: tutorId
            })
            return "Timetable has been created.";
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Unable to create new timetable.");
        }
    },
    async getAllTimetables() {
        try {
            let results = await timetable.find().populate('module').populate('tutor');
            return results;
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Unable to retrieve timetables.");
        }
    },
    async getTimetableOfTutor(tutor) {
        try {
            let results = await timetable.find({tutor:tutor}).populate('module',['code']).select('day start end module');
            return results;
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Unable to retrieve timetable.");
        }
    },
    async updateTimetable(id,day, start, end, moduleId, tutorId) {
        try {
            let result = await timetable.findByIdAndUpdate(id,{
                day:day,
                start: start,
                end: end,
                module: moduleId,
                tutor: tutorId
            });
            if (!result) return "Unable to find record to update.";
            else return "Record is updated!";
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error updating timetable");
        }
    }
}

module.exports = db;