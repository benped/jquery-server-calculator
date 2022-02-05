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
    // let answer;
    // switch (mathObject.operator){
    //     case '+':
    //         answer = Number(mathObject.input1) + Number(mathObject.input2);
    //         // operator = '+';
    //         mathObject.answer = answer; 
    //         break;
    //     case '-':
    //         answer = Number(mathObject.input1) - Number(mathObject.input2); 
    //         // operator = '-';
    //         mathObject.answer = answer;
    //         break;
    //     case '/':
    //         answer = Number(mathObject.input1) / Number(mathObject.input2); 
    //         // operator = '/';
    //         mathObject.answer = answer;
    //         break;
    //     case '*':
    //         answer = Number(mathObject.input1) * Number(mathObject.input2); 
    //         // operator = '*';
    //         mathObject.answer = answer;
    //         break;
    // }
    // return mathObject; 


    // NOTE - this string parser was adapted from here: https://stackoverflow.com/a/16327230


        let chars = mathObject.input1.split(""); //Builds array with each char seperated into individual array elements
        let numbers = []; //Empty array to store integers from chars array
        let operators = [];   // Empty array to store operators from chars array
        let index = 0; 
        let operatorLast = true; //For checking if last char was an operator 
    
        numbers[index] = "";
    
        // Parses the expression
        for (let char of chars) {
            if (isNaN(parseInt(char)) && char !== "." && !operatorLast) { //Checks if char is Not a Number, is not a . and the last char was Not an operator, if all true, it must be a new operator
                operators[index] = char; 
                index++;
                numbers[index] = "";
                operatorLast = true;
            } else {
                numbers[index] += char;
                operatorLast = false;
            }
        }

        console.log(numbers);
        console.log(operators);
        
    
        // Calculate the expression
        mathObject.answer = parseFloat(numbers[0]);
        for (let i = 0; i < operators.length; i++) {
            var num = parseFloat(numbers[i + 1]);
            switch (operators[i]) {
                case "+":
                    mathObject.answer = mathObject.answer + num;
                    break;
                case "-":
                    mathObject.answer = mathObject.answer - num;
                    break;
                case "*":
                    mathObject.answer = mathObject.answer * num;
                    break;
                case "/":
                    mathObject.answer = mathObject.answer / num;
                    break;
            }
        }
        console.log(mathObject.answer);
        console.log(mathObject.input1);
        return mathObject;
    }

// start up our server
app.listen(port, function() {
    console.log('listening on port', port);
  });