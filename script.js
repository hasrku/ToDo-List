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
            <button class="dustbin" "><img fill="red" src="images/delete.svg" alt=""></button>
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
          // console.log(todobj.completed);
          document.getElementById(`${eleID}`).checked = todobj.completed;
        }
      });
      
    store();
    // console.log(todoList);
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
    
    // console.log(todoList);
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