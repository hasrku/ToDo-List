let todoList = JSON.parse(localStorage.getItem('List')) 
if(todoList == null){
    todoList = []
}

function store(){
    localStorage.setItem('List',JSON.stringify(todoList));
}

function renderTodoList() {
    let todoListHTML = '';

    todoList.forEach((todobj, index) => {
      const eleID = 'ID' + index;
      const text = todobj.text;
      const html = `
        <div class="list-items">
            <input class="checkkar" for="${eleID}" id="${eleID}" type="checkbox">
            <p class="todo-text">${text}</p>
            <button class="dustbin" "><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
        </div> 
      `;
      todoListHTML += html;
    });
  
    document.querySelector('.list-og')
      .innerHTML = todoListHTML;
  
    document.querySelectorAll('.dustbin')
      .forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
          todoList.splice(index, 1);
          renderTodoList();
        });
      });
      
      document.querySelectorAll('.checkkar')
      .forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => {
          todoList[index].completed = checkbox.checked;
          store();
        });
      });

      todoList.forEach((todobj, index) => {
        const eleID = 'ID' +index;
        if(todobj.completed == true){
          document.getElementById(`${eleID}`).checked = todobj.completed;
        }
      });
      
    store();
}

function addTodo() {
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;
    if(name == ''){
      return;
    }

    const toObj = {
      text: name,
      completed: false
    }
    todoList.push(toObj);
    inputElement.value = '';
  
    renderTodoList();
    store();
}

document.addEventListener("keydown", (ev) => {
    if(ev.key == "Enter"){
        addTodo();
    }
});

renderTodoList();

const arrow = document.querySelector(".arrow");
let darkmode = localStorage.getItem('darkmode')
if(darkmode === "active") {
  arrow.style.backgroundImage = "url(images/arrow-underline-white.png)";
}

const themeSwitch = document.getElementById('theme-switch')
const enableDarkmode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkmode', 'active');
  arrow.style.backgroundImage = "url(images/arrow-underline-white.png)";
}

const disableDarkmode = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkmode', null);
  arrow.style.backgroundImage = "url(images/arrow-underline.jpg)";
}

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem('darkmode')
  if (darkmode !== "active"){
    enableDarkmode();
    
  }
  else{
    disableDarkmode();
  }
})
