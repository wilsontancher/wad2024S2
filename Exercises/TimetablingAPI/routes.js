const express = require('express');
const router = express.Router();
const db = require("./services/dbservice.js");
const crypto = require('crypto');

db.connect()
.then(function(response){
    console.log(response);
})
.catch(function(error){
    console.log(error.message);
});

router.use(express.urlencoded({
    extended: true
}));

function authenticationCheck(req,res,next) {
    let token = req.query.token;
    if(!token) {
        res.status(401).json({"message":"No tokens are provided."});
    } else {
        db.checkToken(token)
        .then(function(response){
            if(response) {
                res.locals.userId = response._id;
                res.locals.isAdmin = response.role=="admin";
                next();
            } else {
                res.status(401).json({"message":"Invalid token provided."});
            }
        })
        .catch(function(error){
            res.status(500).json({"message":error.message});
        });
    }
}

router.post('/api/timetables',authenticationCheck);
router.put('/api/timetables/:id',authenticationCheck);
router.get('/api/user/logout',authenticationCheck);

router.post('/api/timetables',function(req,res){
    let data = req.body;

    if(!res.locals.isAdmin) {
        res.status(403).json({"message": "You are not allowed to perform this action."});
    } 
    else {
        db.addTimetable(data.day,data.start,data.end,data.module,data.tutor)
        .then(function(response){
            res.status(200).json({"message":response});
        })
        .catch(function(error){
            res.status(500).json({"message":error.message});
        })
    }
})

router.get('/api/timetables',function(req,res){
    db.getAllTimetables()
    .then(function(response){
        res.status(200).json(response);
    })
    .catch(function(error){
        res.status(500).json({"message":error.message});
    })
})

router.get('/api/timetables/tutor/:tutor', function(req,res){
    let tutor = req.params.tutor;
    db.getTimetableOfTutor(tutor)
    .then(function(response){
        res.status(200).json(response);
    })
    .catch(function(error){
        res.status(500).json({"message":error.message});
    })
})

router.put('/api/timetables/:id',function(req,res) {
    let id= req.params.id;
    let data = req.body;

    if(!res.locals.isAdmin) {
        res.status(403).json({"message": "You are not allowed to perform this action."});
    }  
    else {
        db.updateTimetable(id,data.day,data.start,data.end,data.module,data.tutor)
        .then(function(response){
            res.status(200).json({"message":response});
        })
        .catch(function(error){
            res.status(500).json({"message":error.message});
        })
    }
})

router.post('/api/user/login',function(req,res){
    let data = req.body;
    db.getUser(data.username,data.password)
    .then(function(response){
        if(!response) {
            res.status(401).json({"message":"Login unsuccessful. Please try again later."});
        } 
        else {
            let strToHash = response.username + Date.now();
            let token = crypto.createHash('md5').update(strToHash).digest('hex');
            db.updateToken(response._id,token)
            .then(function(response){
                res.status(200).json({'message':'Login successful','token':token});
            })
            .catch(function(error){
                res.status(500).json({"message":error.message});
            })
        }   
    })
    .catch(function(error){
        res.status(500).json({"message":error.message});
    })
})

router.get('/api/user/logout',function(req,res){
    let id = res.locals.userId;
    db.removeToken(id)
    .then(function(response){
        res.status(200).json({'message':'Logout successful'});
    })
    .catch(function(error){
        res.status(500).json({"message":error.message});
    })
})
module.exports = router;