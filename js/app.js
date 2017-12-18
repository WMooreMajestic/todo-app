/**

# Task 1
Change your code so that you don't rely on `taskNo` global variable

# Task 2
Implement `localStorage` so that you can persist todos after you reload 
the page

# Task 3
Add due date:
    * Update `todos` array so that each object contains `dueDate`
    * When editing or adding new task you want to display a date input  
      and store the selected when you save the changes
    * Display due date next to each task

 */

window.onload = function () {
    renderTodos(todos, 'todosList'); 
};

 /**
  * Section: Global Variables
  * Variables that can be accessed globally
  * */

var addTodoButton = document.getElementById('addTodoButton'),
    editTodoButton = document.getElementById('edit-save'),
    editCancel = document.getElementById('edit-cancel'),
    editReview = document.getElementById('edit-review'),
    edit = document.getElementById('edit'),
    todosList = document.getElementById('todosList'),
    taskNo = "",
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

function checked() {
    var isChecked= document.getElementById('edit-completed').checked;
    if(isChecked){
      return true;
    } else {
      return false;
    }
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
editTodoButton.addEventListener('click', function () {
    var todoEditContent = document.getElementById('edit-review').value;
    var completed = checked();

    editTodo(todoEditContent, completed);
});
editCancel.addEventListener('click', closeEdit);

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
    addToArray(todos, createTodoObject(content, generateId()));
    renderTodos(todos, 'todosList');
}

function createTodoObject(content, id, completed) {
    return {
        id: id,
        content: content,
        completed: !!completed
    };
}

function addToArray(array, objectContent) {
    array.push(objectContent);
}

// Recognise when an <li> is clicked on and work out the index number of the entry
function selectTask(e) {
    var target = e.target;
    var children = e.target.parentNode.childNodes;

    for (var i=0; i < todos.length; i++) {
        if (todos[i].content === getLabel(children)) {
            taskNo =  i;
        }
    };

    taskClick(target, taskNo);
}

function getLabel(children) {
    for (var i=0; i < children.length; i++) {
        if (children[i].tagName == "LABEL") {
            return children[i].innerText;
            break;
        }
    }
}

function taskClick(target, i) {
    if (target.tagName === 'BUTTON') {
        taskButtons(target);
    } else {
        completed(todos[taskNo]);
    }

    renderTodos(todos, 'todosList');  
}

function completed(task) {
    task.completed = !(task.completed);
}

function editTodo(newContent, completed) {
    todos[taskNo].content = newContent;
    todos[taskNo].completed = completed;
    closeEdit();
    renderTodos(todos, 'todosList');
}

// Could this be done with a Switch?
function taskButtons(target) {
    if (target.classList.contains('deleteTodo')) {
        todos.splice([taskNo], 1);
    } else if (target.classList.contains('editTodo')) {
        editReview.value = todos[taskNo].content;
        if (todos[taskNo].completed != checked()) {
            document.getElementById('edit-completed').checked = todos[taskNo].completed;
        }
        edit.classList.add('showEdit');
    }
}

function closeEdit() {
    editReview.value = "";
    edit.classList.remove('showEdit');
}