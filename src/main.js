//-----------------------------------------------------variables
const urlLast = "https://api.jsonbin.io/v3/b/6012913588655a7f320e6d54/latest";
const url = "https://api.jsonbin.io/v3/b/6012913588655a7f320e6d54";
 const htmlButtons =
   '<button class="delete-btn task-btn task-properties"><span class="tag"></span></button> <button class="done-btn task-btn task-properties"><span class="tag"></span></button>';
//
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
  putJsonBin(elemTasks);
}
//
//
async function putJsonBin(data) {
  await fetch(url, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "my-todo": data }),
  });
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


  const buttonsDom = document.createElement("div");
  buttonsDom.classList.add("buttons-delete-check");
  const deleteButtonDom = document.createElement("button");
  deleteButtonDom.classList.add("delete-btn", "task-btn", "task-properties");
  const doneButtonDom = document.createElement("button");
  doneButtonDom.classList.add("done-btn", "task-btn", "task-properties");
  const deleteTag = document.createElement("span");
  deleteTag.classList.add("tag");
  const doneTag = document.createElement("span");
  doneTag.classList.add("tag");
  deleteButtonDom.appendChild(deleteTag);
  doneButtonDom.appendChild(doneTag);
buttonsDom.appendChild(deleteButtonDom)
buttonsDom.appendChild(doneButtonDom)
  
  containerDom.appendChild(todoNameDom);
  containerDom.appendChild(createdAtDom);
  containerDom.appendChild(priorityDom);
  containerDom.appendChild(buttonsDom);
  
  //fil data
  priorityDom.textContent = todo.priority;
  createdAtDom.textContent = todo.date;
  todoNameDom.textContent = todo.text;
if(deleteButtonDom){
  deleteButtonDom.onclick = () => {
    // viewTasksPage.removeChild(containerDom);
    const viewRemoveIndex = listViewTasks.indexOf(containerDom);
    const elemRemoveIndex = listViewTasks.indexOf(containerDom);
    listViewTasks.splice(viewRemoveIndex, 1);
    elemTasks.splice(elemRemoveIndex, 1);
    listTasksToPage();
    putJsonBin(elemTasks);
  }
  }
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
  // console.log(listViewTasks);
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
//
//
async function getJsonBin(insert = true) {
  let response = await fetch(urlLast, { method: "GET" });
  let JsonData = await response.json();
  let clainData = await JsonData.record["my-todo"];
  if (insert) insertJsonBin(await clainData);
}
//
//
function insertJsonBin(data) {
  elemTasks = [];
  listViewTasks = [];
  for (let task of data) {
    elemTaskToList(task);
    elemTasks.push(task);
    listTasksToPage();
  }
}
//
//
window.onload = getJsonBin();
