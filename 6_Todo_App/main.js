let taskInput = document.querySelector('.task-input input');
let todos = JSON.parse(localStorage.getItem('todos') || '[]');
let taskBox = document.querySelector('.task-box');
let filters = document.querySelectorAll('.filters span');
let clearBtn = document.querySelector('.clear-btn');
let editIndex;
let isEdited = false;

function showTodos(filterId) {
    document.querySelectorAll('.task').forEach(task => task.remove());
    todos.forEach((todo, index) => {
        let isComleted = todo.status == 'completed' ? 'checked' : '';
        let li = '';
        if (filterId == todo.status || filterId == 'all') {
            li = `<li class="task">
                <label for="${index}">
                    <input type="checkbox" id="${index}" onclick="updateStatus(this)" ${isComleted}>
                    <p class=${isComleted}>${todo.task}</p>
                </label>
                <div class="settings">
                    <i class="uil uil-ellipsis-h" onclick="showMenu(this)"></i>
                    <ul class="task-menu">
                        <li onclick="editTodo(${index},'${todo.task}')"><i class="uil uil-pen"></i>Edit</li>
                        <li onclick="deleteTodo(${index})"><i class="uil uil-trash"></i>Delete</li>
                    </ul>
                </div>
            </li>`;
        }
        taskBox.insertAdjacentHTML('beforeend', li);
    })
    if(!taskBox.hasChildNodes() || taskBox.lastElementChild.tagName=='SPAN'){
        taskBox.innerHTML = "<span>You don't have any task here!</span>";
    }else if(document.querySelector('.task-box span')){
        document.querySelector('.task-box span').remove();
    }
}
showTodos("all");

function updateStatus(todo) {
    let selectedTast = todo.parentElement.lastElementChild;
    if (todo.checked) {
        selectedTast.classList.add('checked');
        todos[todo.id].status = 'completed';
    } else {
        selectedTast.classList.remove('checked');
        todos[todo.id].status = 'pending';
    }
    localStorage.setItem('todos', JSON.stringify(todos));
}

function showMenu(menu) {
    let taskMenu = menu.parentElement.lastElementChild;

    taskMenu.classList.add('show');
    document.addEventListener('click', (e) => {
        if (e.target != menu) {
            taskMenu.classList.remove('show');
        }
    })
}

function deleteTodo(index) {
    todos.splice(index, 1);
    console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
    showTodos();
}

function editTodo(index, task) {
    console.log(task);
    taskInput.value = task;
    isEdited = true;
    editIndex = index;
}

filters.forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.filters span.active').classList.remove('active');
        item.classList.add('active');
        showTodos(item.id);
    })
})

clearBtn.addEventListener('click',()=>{
    todos.splice(0,todos.length);
    localStorage.setItem('todos',JSON.stringify(todos));
    showTodos("all");
})

taskInput.addEventListener('keyup', (e) => {
    let userValue = taskInput.value.trim();
    if (e.key == 'Enter' && userValue) {
        taskInput.value = '';
        let todo = {
            task: userValue,
            status: "pending"
        }
        if (isEdited) {
            todos[editIndex] = todo;
            localStorage.setItem('todos', JSON.stringify(todos));
        } else {
            isEdited = false;
            todos.push(todo);
            localStorage.setItem('todos', JSON.stringify(todos));
        }
        showTodos("all");
    }
})