// Hayden Chapman Web Design 2020
//
// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// event listeners
//check if save content loaded
document.addEventListener('DOMContentLoaded', getTodos);

//add 
todoButton.addEventListener("click", addTodo);

//check and delete
todoList.addEventListener('click', deleteCheck);

//filter
filterOption.addEventListener('click', filterTodo);


// functions
// add todo tasks
function addTodo(event){

    //prevent form from submitting
    event.preventDefault();

    //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Save list to local storage
    saveLocalTodos(todoInput.value);

    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);
    
    //clear initial input value
    todoInput.value = "";
};

//complete/delete event button check
//delete check
function deleteCheck(event){
    const item = event.target;
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //check mark complete
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
};

//filter function
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
        }
    });
};

//local save function
function saveLocalTodos(todo){
    {
        //check if local file already saved
        let todos;
        if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
};

//array of todos
function getTodos()
{
        //check if local file already saved
        if(localStorage.getItem('todos') === null){
            todos = [];
        }else{
                todos = JSON.parse(localStorage.getItem('todos'));
                todos.forEach(function(todo){
                //todo div
                const todoDiv = document.createElement("div");
                todoDiv.classList.add("todo");
    
                //create LI
                const newTodo = document.createElement('li');
                newTodo.innerText = todo;
                newTodo.classList.add('todo-item');
                todoDiv.appendChild(newTodo);
    
                //check mark button
                const completedButton = document.createElement('button');
                completedButton.innerHTML = '<i class="fas fa-check"></i>'
                completedButton.classList.add("complete-btn");
                todoDiv.appendChild(completedButton);
    
                //trash button
                const trashButton = document.createElement('button');
                trashButton.innerHTML = '<i class="fas fa-trash"></i>';
                trashButton.classList.add("trash-btn");
                todoDiv.appendChild(trashButton);
    
                //append to list
                todoList.appendChild(todoDiv)
                });
            }
}

//use array to select/remove deleted items from storage
function removeLocalTodos(todo){
    {
        //check if local file already saved
        let todos;
        if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    const todoIndex = (todo.children[0].innerText);
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}