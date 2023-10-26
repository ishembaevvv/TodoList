let main = document.createElement('main');
main.className = 'container';

document.body.prepend(main);

let projectName = document.createElement('h1');
projectName.innerHTML = "Let's do it";
main.append(projectName);

let listBlock = document.createElement('div');
listBlock.className = 'mainBlock';
main.append(listBlock);

let firsDiv = document.createElement('div');
listBlock.append(firsDiv);

let texIn = document.createElement('input');
texIn.className = 'texIn';
texIn.setAttribute('placeholder', "Gonna do...");
firsDiv.append(texIn);

let setDate = document.createElement('input');
setDate.setAttribute('type', "date");
firsDiv.append(setDate);

let addBtn = document.createElement('button');
addBtn.innerHTML = "ADD";
addBtn.id = 'AddBtn';
firsDiv.append(addBtn);

let list = document.createElement('ul');
listBlock.append(list);

let todosArray = localStorage.getItem('todos') == null ?
    [] :
    [...JSON.parse(localStorage.getItem('todos'))];

const addTodo = () => {
    let newTast = texIn.value;
    let date = setDate.value;

    if (newTast != '') {
        todosArray.push({
            text: newTast,
            cheched: false,
            date,
    });

    localStorage.setItem('todos', JSON.stringify(todosArray));

        texIn.value = "";
        date.value = "";
        renderTodoItem();
    };
};

const lineThrough = (e) => {
    let todosTemporary = [...todosArray];
    let index = parseInt(e.target.parentNode.id);
    let objectElement = todosTemporary[index].cheched;

    todosTemporary[index].cheched = !objectElement;

    localStorage.setItem('todos', JSON.stringify(todosTemporary));

    let isDone = e.target.parentNode.classList.contains('text-line');
    isDone ?
    e.target.parentNode.classList.remove('text-line') :
    e.target.parentNode.classList.add('text-line');
    
};

const deleteLine = (e) => {
    let index = e.target.parentNode.id;
    todosArray.splice(index, 1);

    localStorage.setItem('todos', JSON.stringify(todosArray));
    renderTodoItem();
};

addBtn.addEventListener('click', addTodo);

document.addEventListener('keyup', function(e) {
    let key = e.keyCode;
    if (key === 13) {
        addTodo();
    };
});

const renderTodoItem = () => {
    list.innerHTML = "";
    todosArray.map((todo, id) => {
        let li = document.createElement('li');
        li.className = todo.cheched ? 'taskItem text-line' :'taskItem ';
        li.id = id;

        let doneBtn = document.createElement('img');
        doneBtn.src = './image/done.png';
        doneBtn.className = 'Btn';
        doneBtn.addEventListener('click', lineThrough);
        let deleteBtn = document.createElement('img');
        deleteBtn.src = './image/delete.png';
        deleteBtn.className = 'Btn';
        deleteBtn.addEventListener('click', deleteLine);
        
        let label = document.createElement('label');
        label.append(todo.text + " | " + todo.date);
        li.append(label);
        li.append(doneBtn); 
        li.append(deleteBtn);
        list.append(li);
    });
};

renderTodoItem();