//-----------------------------------------------------variables
const inputNewTask = document.querySelector("#text-input");
const viewTasksPage = document.querySelector(".view-tasks");
const addButton = document.querySelector("#add-button");
const prioritySelector = document.querySelector("#priority-selector");
addButton.addEventListener("click", inputTaskToElem);
let listViewTasks = [];
let elemTasks = [];
//
//--------------------------------------function
//
class todo {
  constructor(taskName, priority, createdAt, tags = []) {
    this.taskName = taskName;
    this.priority = priority;
    this.createdAt = createdAt;
    this.tags = tags;
  }
}
//
//
function inputTaskToElem() {
  const taskName = inputNewTask.value;
  const priority = prioritySelector.value;
  const createdAt = dateNowSql(); //creat date in SQL format
  //
  const taskFromInput = new todo(taskName, priority, createdAt);
  elemTaskToList(taskFromInput);
  elemTasks.push(taskFromInput);
    inputNewTask.value = '';
    // prioritySelector.value = "1";
  listTasksToPage();
}
//
//
function elemTaskToList(todo) {
  //creat container to display task
  //and push to list of tasks
  const containerDom = document.createElement("div");
  containerDom.classList.add("todo-container");
  const priorityDom = document.createElement("div");
  priorityDom.classList.add("todo-priority", "task-properties");
  const createdAtDom = document.createElement("div");
  createdAtDom.classList.add("todo-created-at", "task-properties");
  const todoNameDom = document.createElement("div");
  todoNameDom.classList.add("todo-text", "task-properties");

  containerDom.appendChild(todoNameDom);
  containerDom.appendChild(createdAtDom);
  containerDom.appendChild(priorityDom);
  //fil data
  priorityDom.textContent = todo.priority;
  createdAtDom.textContent = todo.createdAt;
  todoNameDom.textContent = todo.taskName;
  //to li
  listViewTasks.push(containerDom);
}
//
//
function listTasksToPage() {
  viewTasksPage.innerHTML = "";
  for (task of listViewTasks) {
    viewTasksPage.appendChild(task);
    }
    //update counter
    const counter = document.querySelector("#counter");
    counter.textContent = listViewTasks.length;
}
//
//
function dateNowSql() {
  // return this moment in SQL format
  //
  let time = new Date();
  time = time.toISOString();
  time = time.slice(0, 19);
  time = time.replace("T", " ");
  return time;
}


