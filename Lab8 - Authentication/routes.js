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
    //check if query token is in the url
    let token = req.query.token;
    if(!token) {
        res.status(401).json({"message":"No tokens are provided."});
    } else {
        db.checkToken(token)
        .then(function(response){
            //Matched token in the db, proceed with the request
            if(response) {
                //response = organizer who is logged in.
                // store the organizer's id in local memory to be used in the route handler
                res.locals.organizerId = response._id;
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

/** Register middleware to routes */
router.post('/api/events',authenticationCheck);
router.put('/api/events/*',authenticationCheck);
router.delete('/api/events/*',authenticationCheck);
router.get('/api/organizer/logout',authenticationCheck);

router.post('/api/events', function (req, res) {
    let data = req.body;
    db.addEvent(data.name,  data.description,  data.startDate,  data.startTime,  data.endDate,  data.endTime)
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
    db.updateEvent({ name: value },{name: data.name,description: data.description})
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

router.post('/api/organizers',function(req,res) {
    let data = req.body;
    db.addOrganizer(data.name,data.username,data.password,data.company)
    .then(function(response){
        res.status(200).json({"message":response});
    })
    .catch(function(error){
        res.status(500).json({"message":error.message});
    });
})

router.get('/api/organizers',function(req,res) {
    db.getAllOrganizers()
    .then(function(response){
        res.status(200).json(response);
    })
    .catch(function(error){
        res.status(500).json({"message":error.message});
    });
})

router.get('/api/organizers/:id',function(req,res){
    let id = req.params.id;
    db.getOrganizerById(id)
    .then(function(response){
        res.status(200).json(response);
    })
    .catch(function(error){
        res.status(500).json({"message":error.message});
    });
})

router.post('/api/organizers/search',function(req,res){
    let data = req.body;
    db.searchOrganizers(data.username)
    .then(function(response){
        res.status(200).json(response);
    })
    .catch(function(error){
        res.status(500).json({"message":error.message});
    });
})

router.get('/api/organizers/company/:company',function(req,res){
    let company = req.params.company;
    db.getOrganizersByCompany(company)
    .then(function(response){
        res.status(200).json(response);
    })
    .catch(function(error){
        res.status(500).json({"message":error.message});
    });
})

router.post('/api/organizer/login',function(req,res){
    let data = req.body;
    db.getOrganizer(data.username,data.password)
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

router.get('/api/organizer/logout',function(req,res){
    //retrieve the id that was stored earlier in the middleware.
    let id = res.locals.organizerId;
    db.removeToken(id)
    .then(function(response){
        res.status(200).json({'message':'Logout successful'});
    })
    .catch(function(error){
        res.status(500).json({"message":error.message});
    })
})

module.exports = router;