const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, function() {
    console.log("Port: 3000");
});

app.get('/', (req, res) => {
    res.send("Working!");
});