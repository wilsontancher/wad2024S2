const express = require('express');
const app = express();
const port = 3000;
const calculator = require("./calculator.js");
const routes = require('./routes.js');

app.use('/',routes);

/*
app.get('/', function (req, res) {
    res.send("Hello World");
});

app.get('/users', function (req, res) {
    res.send(
        {
            name: 'Thomas',
            age: 20,
            hobby: 'Badminton'
        }
    );
});

app.get('/hello', function (req, res) {
    res.sendFile(__dirname + "/views/hello.html");
});

app.get('/calculator/add/2/3', function (req, res) {
    res.send({
        result: calculator.add(2, 3)
    });
});

app.get('/calculator/:operation/:num1/:num2', function (req, res) {
    let operation = req.params.operation;
    let num1 = parseInt(req.params.num1);
    let num2 = parseInt(req.params.num2);
    let output = 0;
    if (operation == "add") {
        output = calculator.add(num1, num2);
    } else if (operation == "subtract") {
        output = calculator.subtract(num1, num2);
    } else if (operation == "multiply") {
        output = calculator.multiply(num1, num2);
    } else if (operation == "divide") {
        output = calculator.divide(num1, num2);
    }

    res.send({
        operation: operation,
        number1: num1,
        number2: num2,
        result: output
    });
});*/

app.listen(port, function () {
    console.log('Server started on port ' + port);
});
