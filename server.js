//Get the Express library into the project!
const express = require('express');
//Get the pg library into the project!
const pg = require('pg');
//Activate express upon startup!
const app = express();
//Target a port on the internet!
const PORT = process.env.PORT || 5000;
//Add a body parser, which allows to do important stuff!
const bodyParser = require('body-parser');
// Use bodyParser.urlencoded throughout the app with this:
app.use(bodyParser.urlencoded({ extended: true }));
//Target your index directory, and use it!
app.use(express.static('index'));

//Well, I tried
/*
//Route to taskrouter.js!
const taskRouter = require('./routers/taskrouter.js');
app.use('/tasks', taskRouter);
*/

//Create the pool of connections that makes SQL commands!
const Pool = pg.Pool;
const pool = new Pool({
    database: 'todolist_database', //Name of target database - 'process.env.todolist_database' USE THIS FOR HEROKU
    host: 'localhost', //Location of target database
    port: 5432, //Default localhost for postgres
    max: 10, //How many connections (queries) that can be handled at once
    idleTimeoutMillis: 30000 //Times out at 30 seconds
});



//GET /gettasks - Obtains all tasks from the todolist_database
app.get('/gettasks', (req, res) => {
    console.log('Retrieving tasks from todo_database...');
    let queryText = (`SELECT * FROM "todolist";`)
    pool.query(queryText).then(result => {
        res.send(result.rows);
    })
        .catch(error => {
            console.log('Error obtaining todolist', error);
            res.sendStatus(418);
        });
});



//What a task object from the client looks like
/*
    let newTask = {
        name: 'TASKNAME',
        description: 'TASK DESCRIPTION',
    };
*/

//POST /posttask - Take object data from the client and adds it into the todolist_database
app.post('/posttask', (req, res) => {
    console.log(req.body);
    let { name: taskName, description: taskDescription } = req.body;
    console.log(`Adding a new task to database - ${taskName}: ${taskDescription}`);
    let queryText = `INSERT INTO "todolist" ("task", "description")
    VALUES ($1, $2);`;
    pool.query(queryText, [taskName, taskDescription])
        .then(result => {
            res.send('Succesfully sent task!').status(201);
        })
        .catch(error => {
            console.log('Error sending task to database', error)
            res.sendStatus(418);
        });
});



//DELETE /deletetask - Delete a task from the database once a button is clicked on the client
app.delete('/deletetask/:id', (req, res) => {
    console.log('Deleting task...');
    console.log(req.params);
    let id = req.params.id;
    console.log(`Delete task with ID of ${id}`);
    let queryText = `DELETE FROM "todolist" WHERE id=$1;`;
    pool.query(queryText, [id]).then(function (result) {
        res.send('Succesfully deleted task');
    }).catch(function (err) {
        console.log('Error deleting task', queryText);
        res.sendStatus(418);
    });
});



    //PUT /updatetask - 
    app.put('/updatetask/:id', (req, res) => {
        let id = req.params.id;
        let { completion } = req.body
        console.log(`Updating task ${id}, ${completion}`);
        let queryText = `UPDATE "todolist" SET completion='Complete' WHERE id=$1;`;
        pool.query(queryText, [id]).then(function (result) {
            res.send('Succesfully updated todolist');
        }).catch(function (result) {
            console.log('Error updating todolist', err);
            res.sendStatus(418);
        });
    });



    //Start server!
    app.listen(PORT, () => {
        console.log('Listening to port: ', PORT)
    });