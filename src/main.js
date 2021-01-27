const inputNowTask = document.querySelector('#text-input')


class todo{
    constructor(taskName, priority, createAt, tags = []) {
        this.taskName = taskName;
        this.priority = priority;
        this.createAt = createAt;
        this.tags = tags;
    }
}

const testTask = new todo('test task', 3, 11)

function nowTaskHtmlElement(todo) {
    const containerDom = document.createElement('div');
    containerDom.classList.add('todo-container');
    const priorityDom = document.createElement('div');
    priorityDom.classList.add('todo-priority');
    const createdAtDom = document.createElement('div');
    createdAtDom.classList.add('todo-created-at');
    const todoNameDom = document.createElement('div');
    todoNameDom.classList.add("todo-created-at");

    containerDom.appendChild(priorityDom)
    containerDom.appendChild(createdAtDom)
    containerDom.appendChild(todoNameDom)
    return containerDom;
}


console.log(nowTaskHtmlElement(testTask).innerHTML);