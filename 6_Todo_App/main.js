let taskInput = document.querySelector('.task-input input');
let searchInput = document.querySelector('.search-input input');
let searchInputDiv = document.querySelector('.search-input');
let searchIcon = document.querySelector('.search-icon');
let crossIcon = document.querySelector('.cross-icon');
let todos = JSON.parse(localStorage.getItem('todos') || '[]');
let filterTodos=todos;
let taskBox = document.querySelector('.task-box');
let filters = document.querySelectorAll('.filters span');
let clearBtn = document.querySelector('.clear-btn');
let activeTab = "all";
let editIndex;
let isEdited = false;

function showTodos(filterId) {
    document.querySelectorAll('.task').forEach(task => task.remove());
    filterTodos.forEach((todo, index) => {
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
        filterTodos[todo.id].status = 'completed';
    } else {
        selectedTast.classList.remove('checked');
        filterTodos[todo.id].status = 'pending';
    }
    localStorage.setItem('todos', JSON.stringify(todos));
    showTodos(activeTab);
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
    todos.splice(findTodoIndex(index), 1);
    filterTodos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    showTodos("all");
}

function editTodo(index, task) {
    taskInput.value = task;
    isEdited = true;
    editIndex = index;
}
let activeItem=filters[1];
filters.forEach((item,index) => {
    if(index!=0){
        item.addEventListener('click', () => {
            document.querySelector('.filters span.active').classList.remove('active');
            item.classList.add('active');
            activeItem = item;
            activeTab = item.id;
            showTodos(item.id);
        })
        item.addEventListener('mouseover',(e)=>{
            let background = document.querySelector('.background');
            background.style.left = `${e.target.offsetLeft - 10}px`
            background.style.width = `${e.target.offsetWidth + 20}px`
        })
        item.addEventListener('mouseleave',()=>{
            let background = document.querySelector('.background');
            background.style.left = `${activeItem.offsetLeft - 10}px`
            background.style.width = `${activeItem.offsetWidth + 20}px` 
        })
    }
})

clearBtn.addEventListener('click',()=>{
    todos.splice(0,todos.length);
    filterTodos.splice(0,filterTodos.length);
    localStorage.setItem('todos',JSON.stringify(todos));
    showTodos("all");
})

function findTodoIndex(index){
    return todos.findIndex(element=>element.task==filterTodos[index].task);
}

taskInput.addEventListener('keyup', (e) => {
    let userValue = taskInput.value.trim();
    if (e.key == 'Enter' && userValue) {
        taskInput.value = '';
        let todo = {
            task: userValue,
            status: "pending"
        }
        if (isEdited) {
            todos[findTodoIndex(editIndex)] = todo;
            filterTodos[editIndex] = todo;
            localStorage.setItem('todos', JSON.stringify(todos));
        } else {
            isEdited = false;
            todos.push(todo);
            if(searchInput.value==""){
                filterTodos = todos.filter(todo=>todo.task.toLowerCase().indexOf(searchInput.value.trim().toLowerCase())!=-1);
            }
            localStorage.setItem('todos', JSON.stringify(todos));
        }
        showTodos(activeTab);
    }
})

searchInput.addEventListener('keyup',()=>{
    let searchValue = searchInput.value.trim();
    filterTodos = todos.filter(todo=>todo.task.toLowerCase().indexOf(searchValue.toLowerCase())!=-1);
    showTodos("all");
})

searchIcon.addEventListener('click',()=>{
    searchInput.focus();
    document.querySelector('.task-input').style.transform = "scale(0)";
    searchInputDiv.style.transform = "scale(1)";
})

crossIcon.addEventListener('click',()=>{
    searchInput.value = '';
    taskInput.focus();
    document.querySelector('.task-input').style.transform = "scale(1)";
    searchInputDiv.style.transform = "scale(0)";
    filterTodos = todos;
    showTodos("all");
})