//-----------------------------------------------------variables
const inputNewTask = document.querySelector("#text-input");
const viewTasksPage = document.querySelector(".view-tasks");
const addButton = document.querySelector("#add-button");
const sortButton = document.querySelector("#sort-button");
const prioritySelector = document.querySelector("#priority-selector");
//
addButton.addEventListener("click", inputTaskToElem);
sortButton.addEventListener("click", sortTasks);
//
let listViewTasks = [];
let elemTasks = [];
//
//--------------------------------------function
//
class todo {
  constructor(text, priority, date, tags = []) {
    this.text = text;
    this.priority = priority;
    this.date = date;
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
  inputNewTask.value = "";
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
  createdAtDom.textContent = todo.date;
  todoNameDom.textContent = todo.text;
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
  console.log(listViewTasks);
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
//
//
function sortTasks(key = "priority", reverse = false) {
  console.log("sort by function");
  //determine sort by?
  let childIndex = 2;

  switch (key) {
    case "priority":
      childIndex = 2;
      break;
  }

  let isMixed = true;
  while (isMixed) {
    isMixed = false;
    for (let index = 0; index < listViewTasks.length - 1; index++) {
      let content_a = listViewTasks[index].childNodes[childIndex].textContent;
      let content_b =
        listViewTasks[index + 1].childNodes[childIndex].textContent;
      //if content is number, convert to number
      if (Number(content_a) && Number(content_b)) {
        [content_a, content_b] = [Number(content_a), Number(content_b)];
      }
      //if is mixed
      if (reverse !== content_a < content_b) {
        [listViewTasks[index], listViewTasks[index + 1]] = [
          listViewTasks[index + 1],
          listViewTasks[index],
        ];
        isMixed = true;
      }
    }
  }
  listTasksToPage();
}
//
//
function elemTasksToJson() {
  let a = JSON.stringify(elemTasks, function replacer(date, value) {
    if (date === "date") {
      return value.replace("-", "").Number();
    }
  });
   
}
