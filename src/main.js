const inputNewTask = document.querySelector("#text-input");
const viewTasksPage = document.querySelector(".view-tasks");
let listTasksView = [];
class todo {
  constructor(taskName, priority, createdAt, tags = []) {
    this.taskName = taskName;
    this.priority = priority;
    this.createdAt = createdAt;
    this.tags = tags;
  }
}

const testTask = new todo("test task", 3, 11);

function newTaskToDom(todo) {
  //creat container to display task
  //and push to list of tasks
  const containerDom = document.createElement("div");
  containerDom.classList.add("todo-container");
  const priorityDom = document.createElement("div");
  priorityDom.classList.add("todo-priority","task-properties");
  const createdAtDom = document.createElement("div");
  createdAtDom.classList.add("todo-created-at","task-properties");
  const todoNameDom = document.createElement("div");
  todoNameDom.classList.add("todo-text","task-properties");

  containerDom.appendChild(priorityDom);
  containerDom.appendChild(createdAtDom);
  containerDom.appendChild(todoNameDom);
  //fil data
  priorityDom.textContent = todo.priority;
  createdAtDom.textContent = todo.createdAt;
  todoNameDom.textContent = todo.taskName;
  //to li
  listTasksView.push(containerDom);
}

function listTasksToPage() {
  viewTasksPage.innerHTML = "";
  for (task of listTasksView) {
    viewTasksPage.appendChild(task);
  }
}
console.log(listTasksView, testTask);
newTaskToDom(testTask);
listTasksToPage();
