const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');
const Job = require('./models/Job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const PORT = 3000;
app.listen(PORT, function() {
    console.log("Port:", PORT);
});

//Body Parser
app.use(bodyParser.urlencoded({extended: false}));

//Handle Bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//DB Connection
db 
    .authenticate()
    .then(() => {
        console.log("Connected to the database!")
    })
    .catch(err => {
        console.log("An error occurred connecting to the database!")
    });

// Route
app.get('/', (req, res) => {
    let search = req.query.job;
    let query = '%'+search+'%'

    if(!search){
        Job.findAll({order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            res.render('index', {
                jobs
            });
        })
        .catch(err => console.log(err));
    } else {
        Job.findAll({
            where: {title: {[Op.like]: query}},
            order: [
                ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            res.render('index', {
                jobs, search
            });
        })
        .catch(err => console.log(err));
    }
});

//Job Routes
app.use('/jobs', require('./routes/jobs'));