// require express
// gives us a function
const express = require('express');
const bodyParser = require('body-parser');

// create an instance of express by calling the function returned above
// gives us an object
const app = express();

// Getting the body parser to clear up terminal responses
app.use(bodyParser.urlencoded({ extended: true }));

const port = 5000;

// Puts the HTML and public folder up to see in broser
app.use(express.static('server/public'));

let mathExpressions = [];

app.post('/calculate', function(req, res) {
    console.log('Request at /calculate was made', req.body);
    res.send('calculate recieved!');
    mathExpressions.push(calculator(req.body.dataTest));
    // res.sendStatus(500);
  });

app.get('/answers', function(req, res){
    console.log('Get at /answers was made', req.body);
    res.send(mathExpressions);
});

// TODO let it take in an object and do math on it
function calculator(mathObject){
    let answer;
    let operator;
    switch (mathObject.operator){
        case 'add':
            answer = Number(mathObject.input1) + Number(mathObject.input2);
            operator = '+';
            break;
        case 'sub':
            answer = Number(mathObject.input1) - Number(mathObject.input2); 
            operator = '-';
            break;
        case 'div':
            answer = Number(mathObject.input1) / Number(mathObject.input2); 
            operator = '/';
            break;
        case 'mul':
        answer = Number(mathObject.input1) * Number(mathObject.input2); 
        operator = '*';
        break;
    }
    return `${mathObject.input1} ${operator} ${mathObject.input2} = ${answer}`;
}

// start up our server
app.listen(port, function() {
    console.log('listening on port', port);
  });