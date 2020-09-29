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

            let taskClass = "incomplete";
            if(task.completion === "Complete") {taskClass = "complete"};
            
            $('#taskTableBody').append(`
        <tr class="${taskClass}">
            <td>${task.task}</td>
            <td>${task.description}</td>
            <td>${task.completion}</td>
            <td><button id='completeButton' data-taskid='${task.id}'>Complete</button><button id='deleteButton' data-taskid='${task.id}'>Delete</button></td>
        </tr>
        `)
        
        $('.complete').css("background-color", "black");
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



//Update the DOM when the task has been completed, and update the database
function completeTask(event) {
    console.log('Completing task...');
    console.log($(event.target).data());
    const taskID = $(event.target).data('taskid');
    console.log(taskID);
    $.ajax({
        method: 'PUT',
        url: `/updatetask/${$(event.target).data('taskid')}`
    }).then((response) => {
        getTasks();
    });
};



//Delete a task, and update the database
function deleteTask(event) {
    console.log(`Deleting task with ID...`);
    console.log($(event.target).data());
    const taskID = $(event.target).data('taskid');
    console.log(taskID);
    $.ajax({
        method: 'DELETE',
        url: `/deletetask/${taskID}`,
    }).then((response) => {
        getTasks();
    });
};


