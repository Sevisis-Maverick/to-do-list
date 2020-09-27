$(document).ready(setup);

//Begin setup!
function setup() {
    console.log('Your client and JQuery v3.5.1 have both been linked correctly!');

    linkButtons();
    getTasks();
};

function linkButtons() {
    $('body').on('click', '#submitTask', submitTask);
    $('body').on('click', '#completeButton', completeTask);
    $('body').on('click', '#deleteButton', deleteTask);

};



//Get all tasks from todolist_database, and update your DOM with the table recieved
function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/gettasks',
    }).then(function (result) {
        console.log(result);
        $('#taskTableBody').empty();
        for (let task of result) {
            console.log(task);
        $('#taskTableBody').append(`
        <tr>
            <td>${task.task}</td>
            <td>${task.description}</td>
            <td>${task.completion}</td>
            <td><button id='completeButton'>Complete</button><button id='deleteButton'>Delete</button></td>
        </tr>
        `)
        }
    });
};



//Send task from inputs to todolist_database on submit
function submitTask() {
    console.log('Submitting newTask...')
    let newTask = {
        name: $('#taskName').val(),
        description: $('#taskDescription').val(),
    };
    console.log(`Task - ${newTask.name}: ${newTask.description}`);
    $.ajax({
        type: 'POST',
        url: '/posttask',
        data: newTask,
    }).then(function (response) {
        console.log(`${newTask.name} was succesfully sent to your server!`);
        getTasks();
    }).catch(function (error) {
        console.log('Error in POST', error);
    });
};



//Change status to "completed" once the button is pressed, and send information to server/database
function completeTask() {
    console.log(`Completing task with ID of: ${task.id}`);
}



//Delete task from the table once the button has been pressed, and send information to the server/database
function deleteTask() {
    console.log(`Deleting task with ID: ${task.id}`);
}