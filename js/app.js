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

 /**
  * Section: Window Onload
  * Containing functions that are called when the page has loaded.
  * */

// Task #1 - Can put this inline but felt that, thinking forward, if there were more than one thing
// it would go in this 'anonymous(?)' function to save writing window.onload multiple times.

window.onload = function () {
    renderTodos(todos, 'todosList'); 
};

 /**
  * Section: Global Variables
  * Variables that can be accessed globally
  * */

var addTodoButton = document.getElementById('addTodoButton'),
    todosList = document.getElementById('todosList'),
    todos = [
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
        completed: false,
    },
];

/**
 * Section: Utility Functions
 * Functions that may be useful in multiple instances and are not solely related to the to do app functionality
 * */

function generateNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Section: Event Listeners
 * Keeping all event listeners together, making it easy to see what interactivity is attached to the page at a glance
 * */

todosList.addEventListener('click', selectTask);
addTodoButton.addEventListener('click', function () {
    var todoContent = document.getElementById('inputText').value;

    createTodo(todoContent);
});

/**
 * Section: Rendering Methods
 * Some description...
 * */

function renderTodos(data, target) {
    var html = "";

    for (var i = 0; i < data.length; i++) {
        html += '<li><input id="checkBox" type="checkbox"';
        if (data[i].completed == true) {
            html += ' checked';
        }
        html += '><label>' + data[i].content + '</label><button class="small editTodo">Edit</button><button class="small remove deleteTodo">Delete</button></li>';
    }

    document.getElementById(target).innerHTML = html;
    document.querySelector('#inputText').value = "";
}

/**
 * Section: Business Logic
 * The specific functionality that is directly related to maintaining the To do app
 * */

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

function selectTask(e) {
    var target = e.target;
    var children = e.target.parentNode.childNodes;
    var myValue = "";

    for (var i=0; i < children.length; i++) {
        if (children[i].tagName == "LABEL") {
            myValue =  children[i].innerText;
            break;
        }
    }

    for (var i=0; i < todos.length; i++) {
        if (todos[i].content === myValue) {
            if (target.tagName === 'BUTTON') { 
                if (target.classList.contains('deleteTodo')) {
                    todos.splice([i], 1); // Delete Object
                }
                document.getElementById('edit').style.display = "block";
            } else {
                todos[i].completed = !(todos[i].completed); // Toggle 'completed'
            };
        }
    };

    renderTodos(todos, 'todosList');
}