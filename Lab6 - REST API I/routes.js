const express = require('express');
const router = express.Router();
const db = require("./services/dbservice.js");

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

router.post('/api/events', function (req, res) {
    let data = req.body;
    db.addEvent(data.name, data.description, data.startDate, data.startTime, data.endDate, data.endTime)
    .then(function(response){
        res.status(200).json({"message":response});
    })
    .catch(function(error){
        res.status(500).json({"message":error.message});
    });
})

// demonstrate the res.send ability here to send response data to the client
router.get('/api/events',function(req,res) {
    db.getAllEvents()
    .then(function(response){
        res.status(200).json(response);
    })
    .catch(function(error){
        res.status(500).json({"message":error.message});
    });
})

router.get('/api/events/:id',function(req,res) {
    let id = req.params.id;
    db.getEventById(id)
    .then(function(response){
        res.status(200).json(response);
    })
    .catch(function(error){
        res.status(500).json({"message":error.message});
    });
})

router.get('/api/events/name/:value',function(req,res) {
    let value = req.params.value;
    db.getEvents({ name: value })
    .then(function(response){
        res.status(200).json(response);
    })
    .catch(function(error){
        res.status(500).json({"message":error.message});
    });
})

router.put('/api/events/:id',function(req,res) {
    let id = req.params.id;
    let data = req.body;
    db.updateEventById(id,{name:data.name})
    .then(function(response){
        res.status(200).json({"message":response});
    })
    .catch(function(error){
        res.status(500).json({"message":error.message});
    });
})
router.put('/api/events/name/:value',function(req,res) {
    let value = req.params.value;
    let data = req.body;
    db.updateEvent({ name: value },{name:data.name,description:data.description})
    .then(function(response){
        res.status(200).json({"message":response});
    })
    .catch(function(error){
        res.status(500).json({"message":error.message});
    });
})


router.delete('/api/events/:id',function(req,res){
    let id = req.params.id;
    db.deleteEventById(id)
    .then(function(response){
        res.status(200).json({"message":response});
    })
    .catch(function(error){
        res.status(500).json({"message":error.message});
    });
})

router.delete('/api/events/name/:value',function(req,res){
    let value = req.params.value;
    db.deleteEvent({name:value})
    .then(function(response){
        res.status(200).json({"message":response});
    })
    .catch(function(error){
        res.status(500).json({"message":error.message});
    });
})
module.exports = router;