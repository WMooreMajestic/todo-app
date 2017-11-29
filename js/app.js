/**

# Task 1
Render `todos` object on page load

# Task 2
Organise your code:
* All global variables should be declared at the top of the
file (`todos`, `addTodoButton` and any other global variables 
you may create later on)
* Looking at your code it seems like you can split it into
different sections:
  * Global variables - all variables declared globally e.g. 
    DOM references
  * Utility functions - things not necessarily related to 
    your todo app e.g. `generateNumber()`
  * Event listeners - keep all event listeners in one place
  * Rendering methods - anything related to rendering can be
    grouped together
  * Business logic - this is basically everything related to
    your todo app e.g. adding, removing, updating objects
    in the `todo` array
 Use comments to create those sections e.g.
 
 /**
  * Section: Busines Logic
  * Some description...
  * /

# Task 3
Add all event listeners so that you can add, mark as done
and delete todos - make sure your `todos` array represents
what's on the page at all times

# Task 4
* Add 'edit task' button next to each todo item
* I've added a div to your HTML which contains UI for the 
edit review functionality
* When you click 'edit task', show the edit panel and update
the textarea with the todo content and make the checkbox 
checked if the todo has `completed` flag set to true
* When you change content and/or `completed` state and press
'Save' button, hide the edit panel and update the todo item
with the new details (update page and `todos` array)
*/

var todos = [
    {
        id: '8320-3823-8526-1026',
        content: 'Wash the dishes',
        completed: false,
    },
    {
        id: '6065-6185-8898-817',
        content: 'Sell your old phone on ebay',
        completed: false,
    },
    {
        id: '6065-6185-8898-814',
        content: 'Book a table at Ask Italian',
        completed: true,
    },
];

function generateNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateId() {
    var array = [];

    for (var i = 0; i < 4; i++) {
        array.push(generateNumber(100, 9999));
    }

    return array.join('-');
}

function createTodo(content) {
    addToArray(todos, createTodoObject(content));
    renderTodos(todos, 'todosList');
}

function createTodoObject(content, completed) {
    return {
        id: generateId(),
        content: content,
        completed: !!completed
    };
}

function addToArray(array, objectContent) {
    array.push(objectContent);
}

function renderTodos(data, target) {
    var html = "";

    for (var i = 0; i < data.length; i++) {
        html += '<li>' + data[i].content + '</li>';
        console.log(data[i].id);
    }

    document.getElementById(target).innerHTML = html;
    document.querySelector('#inputText').value = "";
}

var addTodoButton = document.getElementById('addTodoButton');

addTodoButton.addEventListener('click', function () {
    var todoContent = document.getElementById('inputText').value;

    createTodo(todoContent);
});