"use strict";
window.onload = () => {
  //-----------------------------------------------------variables
  const urlLast = "https://api.jsonbin.io/v3/b/6012913588655a7f320e6d54/latest";
  const url = "https://api.jsonbin.io/v3/b/6012913588655a7f320e6d54";
  //
  const inputNewTask = document.querySelector("#text-input");
  const viewTasksPage = document.querySelector(".view-tasks");
  const addButton = document.querySelector("#add-button");
  const sortButton = document.querySelector("#sort-button");
  const prioritySelector = document.querySelector("#priority-selector");
  const containerTags = document.querySelector("#container-tags");
  containerTags.addEventListener("click", addTags);
  const pageTitle = document.querySelector("title");
  //
  //
  addButton.addEventListener("click", inputTaskToElem);
  sortButton.addEventListener("click", sortTasks);
  document.addEventListener("keydown", inputByCtrlEnter);
  //
  //
  let listViewTasks = []; //Contains all DOM element 
  let elemTasks = []; //Contains all task as object 
  let tagsArray = []; //Contains all tags that add on this task
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
  //  from input to elem list
  function inputTaskToElem() {
    const taskName = inputNewTask.value;
    const priority = prioritySelector.value;
    const createdAt = dateNowSql(); //creat date in SQL format
    //
    const taskFromInput = new todo(taskName, priority, createdAt, tagsArray);
    creatDomElement(taskFromInput);
    elemTasks.push(taskFromInput);
    inputNewTask.value = "";
    prioritySelector.value = 1;
    listTasksToPage();
    putJsonBin(elemTasks);
    removeTagChoice();
    // clear the tags
    function removeTagChoice() {
      const domTagList = containerTags.childNodes;
      for (let tag of domTagList) {
        if (tag.nodeName === "BUTTON" && tag.classList.contains("tag-choice")) {
          tag.classList.remove("tag-choice");
        }
      }
      tagsArray = [];
    }
  }
  //
  //creat Dom element to display task
  function creatDomElement(todo) {
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
    buttonsDom.appendChild(deleteButtonDom);
    buttonsDom.appendChild(doneButtonDom);

    const tagsContainer = document.createElement("div");
    const tagsText = document.createElement("a");
    tagsText.classList.add("tags-text-display");
    tagsContainer.classList.add("tag-container");
    tagsContainer.appendChild(tagsText);

    containerDom.appendChild(todoNameDom);
    containerDom.appendChild(createdAtDom);
    containerDom.appendChild(priorityDom);
    containerDom.appendChild(buttonsDom);
    containerDom.appendChild(tagsContainer);

    //fil data
    priorityDom.textContent = todo.priority;
    createdAtDom.textContent = todo.date;
    todoNameDom.textContent = todo.text;

    if (todo.tags) {
      if (todo.tags.includes("done")) {
        todoNameDom.classList.add("task-done");
      }
      let text = "";
      for (let tag of todo.tags) {
        text += `${tag} `;
      }
      tagsText.textContent = text;
    }

    if (deleteButtonDom) {
      deleteButtonDom.onclick = () => {
        const elemRemoveIndex = elemTasks.indexOf(todo);
        elemTasks.splice(elemRemoveIndex, 1);
        resetFromElemTasks();
        putJsonBin(elemTasks);
      };
    }

    if (doneButtonDom) {
      doneButtonDom.onclick = () => {
        const elemIndex = elemTasks.indexOf(todo);
        const tagsOfElem = elemTasks[elemIndex].tags;
        toggleOnList(tagsOfElem, "done");
        resetFromElemTasks();
        putJsonBin(elemTasks);
      };
    }
    listViewTasks.push(containerDom);
  }
  //
  //after we make changes on elemTasks, apply the changes on display
  function resetFromElemTasks() {
    listViewTasks = [];
    for (let task of elemTasks) {
      creatDomElement(task);
    }
    listTasksToPage();

    // putJsonBin(elemTasks); // this line make trouble wite test
  }
  //
  //put elem tasks on JSONbin
  async function putJsonBin(data) {
    await fetch(url, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "my-todo": data }),
    });
  }
  //
  //display the list of Dpm elements
  function listTasksToPage() {
    viewTasksPage.innerHTML = "";
    for (let task of listViewTasks) {
      viewTasksPage.appendChild(task);
    }
    //update counter
    const counter = document.querySelector("#counter");
    counter.textContent = listViewTasks.length;
    pageTitle.textContent = `📋 ${listViewTasks.length} tasks`;
    // console.log(listViewTasks);
  }
  //
  //return time in sql format
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
  //sort tasks
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
      for (let index = 0; index < elemTasks.length - 1; index++) {
        let content_a = elemTasks[index].priority;
        let content_b = elemTasks[index + 1].priority;
        //if content is number, convert to number
        if (Number(content_a) && Number(content_b)) {
          [content_a, content_b] = [Number(content_a), Number(content_b)];
        }
        //if is mixed
        if (reverse !== content_a < content_b) {
          [elemTasks[index], elemTasks[index + 1]] = [
            elemTasks[index + 1],
            elemTasks[index],
          ];
          isMixed = true;
        }
      }
    }
    resetFromElemTasks();
  }
  //
  //
  async function getJsonBin(insert = true) {
    let response = await fetch(urlLast, { method: "GET" });
    let JsonData = await response.json();
    let clainData = await JsonData.record["my-todo"];
    if (insert) {
      elemTasks = [];
      listViewTasks = [];
      for (let task of clainData) {
        creatDomElement(task);
        elemTasks.push(task);
        listTasksToPage();
      }
    } else {
      console.log(clainData, JsonData);
    }
  }
  //
  //
  function toggleOnList(list, value) {
    const index = list.indexOf(value);

    if (index === -1) {
      list.push(value);
    } else {
      list.splice(index, 1);
    }
  }
  //
  //function for event to add tag
  function addTags(event) {
    if (event.target.nodeName === "BUTTON") {
      const idTag = event.target.id;
      event.target.classList.toggle("tag-choice");
      toggleOnList(tagsArray, idTag);
    }
  }
  //
  //
  function inputByCtrlEnter(event) {
    if (event.ctrlKey && event.keyCode === 13) {
      inputTaskToElem();
    }
  }
  //
  //
  getJsonBin();
};
