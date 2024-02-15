const express = require('express');
const app = express();
const db = require('./db/connection');
const bodyParser = require('body-parser');

const PORT = 3000;
app.listen(PORT, function() {
    console.log("Port:", PORT);
});

//Body Parser
app.use(bodyParser.urlencoded({extended: false}));

//DB Connection
db 
    .authenticate()
    .then(() => {
        console.log("Connected to the database!")
    })
    .catch(err => {
        console.log("An error occurred connecting to the database!")
    });

//Job Routes
app.use('/jobs', require('./routes/jobs'));