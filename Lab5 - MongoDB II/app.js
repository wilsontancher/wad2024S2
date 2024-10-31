const db = require("./services/dbservice.js");

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let questions = "Choose an option:\n"+
"1. Connect to MongoDB\n"+
"2. Add event 1\n"+
"3. Add event 2\n"+
"4. Get all events\n"+
"5. Get event by id\n"+
"6. Get event by name\n"+
"7. Update event by id\n"+
"8. Update event's fields\n"+
"9. Delete event by id\n"+
"10. Delete event by name\n"+
"11. Exit\n"+
"==========================\n";

let handleOption = function(option){
    switch(+option) {
        case 1:
            connect();
            break;
        case 2:
            addEvent1();
            break;
        case 3:
            addEvent2();
            break;
        case 4:
            getAllEvents();
            break;
        case 5:
            getEventById();
            break;
        case 6:
            getEventsByName();
            break;
        case 7:
            updateEventById();
            break;
        case 8:
            updateEventWithFields();
            break;
        case 9:
            deleteEventById();
            break;
        case 10:
            deleteEventByName();
            break;
        case 11: 
            rl.close();
            break;
    }
    setTimeout(()=>{rl.question(questions,handleOption);},1500);
}
rl.question(questions, handleOption);


rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});

function connect(){
    db.connect()
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error.message);
    });
}

function addEvent1() {
    db.addEvent("Event 1", "This is Event 1", "03/03/2023", "10:00", "04/03/2023", "10:00")
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error.message);
    });
}

function addEvent2() {
    db.addEvent("Event 2", "This is Event 2", "05/05/2023", "09:00", "05/05/2023", "19:00")
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error.message);
    });
}

function getAllEvents() {
    db.getAllEvents()
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error.message);
    });
}

function getEventById() {
    db.getEventById("63be17c363da53e5f8badac1")
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error.message);
    });
}

function getEventsByName() {
    db.getEvents({ name: "Event 1" })
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error.message);
    });
}


function updateEventById() {
    db.updateEventById("638b3e2d93f1935364d48062", { name: "Event 1a" })
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error.message);
    });
}

function updateEventWithFields() { 
    // demonstrate that the second parameter (the JSON to update), can consist multiple key:values to update
    db.updateEvent({ name: "Event 2" },{ name: "Event 2a", description: "This is Event 2a" })
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error.message);
    });
}

function deleteEventById() {
    db.deleteEventById("63da28dec12369b1221b9df5")
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error.message);
    });
}

function deleteEventByName() {
    db.deleteEvent({name: "Event 2a"})
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error.message);
    });
}
