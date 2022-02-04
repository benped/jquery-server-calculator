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

app.post('/calculate', function(req, res) {
    console.log('Request at /quotes was made', req.body);
    res.send('calculate recieved!');
    // res.sendStatus(500);
  });





// tart up our server
app.listen(port, function() {
    console.log('listening on port', port);
  });