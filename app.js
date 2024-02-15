const express = require('express');
const app = express();
const db = require('./db/connection');

const PORT = 3000;
app.listen(PORT, function() {
    console.log("Port:", PORT);
});

//DB Connection
db 
    .authenticate()
    .then(() => {
        console.log("Connected to the database!")
    })
    .catch(err => {
        console.log("An error occurred connecting to the database!")
    });

//Routes
app.get('/', (req, res) => {
    res.send("Working!");
});