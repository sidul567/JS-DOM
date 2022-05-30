let addBox = document.querySelector('.add-box');
let popUpBox = document.querySelector('.popup-box');
let closePopUpBox = document.querySelector('header i');
let addBtn = document.querySelector('form button');
let popUpTitle = document.querySelector('header p');
let months = ["January", "February", "March", "April", "May", "June", "July",
"August", "September", "October", "November", "December"];
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let isUpdate = false;
let updateIndex;

addBox.addEventListener('click', () => {
    document.querySelector('form input').focus();
    popUpBox.classList.add('show');
    popUpTitle.innerHTML = 'Add a New Note';
    addBtn.innerHTML = 'Add Note';
})

closePopUpBox.addEventListener('click', () => {
    isUpdate = false;
    popUpBox.classList.remove('show');
    document.querySelector('form input').value = '';
    document.querySelector('form textarea').value = '';
})

function showNotes() {
    document.querySelectorAll('.note').forEach(note=>note.remove());
    notes.forEach((note,index)=> {
        let li = `
        <li class="note">
            <div class="details">
                <p>${note.title}</p>
                <span>${note.desc}</span>
            </div>
            <div class="bottom-content">
                <span>${note.date}</span>
                <div class="settings">
                    <i class="uil uil-ellipsis-h" onclick="showMenu(this)"></i>
                    <ul class="menu">
                        <li onclick="editNote('${note.title}','${note.desc}',${index})"><i class="uil uil-edit"></i>Edit</li>
                        <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                    </ul>
                </div>
            </div>
        </li>`;
        addBox.insertAdjacentHTML('afterend',li);
    })
}
showNotes();

function showMenu(element){
    element.parentElement.classList.add('show');
    document.addEventListener('click',(e)=>{
        if(e.target != element || e.target.tagName != 'I'){
            element.parentElement.classList.remove('show');
        }
    })
}

function deleteNote(index){
    let sure = confirm("Are you sure want to delete this note?");
    if(!sure) return;
    notes.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notes));
    showNotes();
}

function editNote(title,desc,index){
    console.log(index);
    isUpdate = true;
    updateIndex = index;
    addBox.click();
    document.querySelector('form input').value = title;
    document.querySelector('form textarea').value = desc;
    popUpTitle.innerHTML = 'Update a Note';
    addBtn.innerHTML = 'Update Note';
}

addBtn.addEventListener('click', e => {
    e.preventDefault();
    let title = document.querySelector('form input').value;
    let desc = document.querySelector('form textarea').value;

    if (title || desc) {
        let date = new Date();
        let month = date.getMonth();
        let day = date.getDate();
        let year = date.getFullYear();
        let noteInfo = {
            title,
            desc,
            date: `${months[month]} ${day < 10 ? '0' + day : day}, ${year}`
        }
        if(isUpdate){
            isUpdate = false;
            notes[updateIndex] = noteInfo;
        }else{
            notes.push(noteInfo);
        } 
        localStorage.setItem('notes', JSON.stringify(notes));
        closePopUpBox.click();
        showNotes();
    }
})