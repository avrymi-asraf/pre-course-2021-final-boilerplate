#  Pre Course Project - Todo List 📋
## workflow
- pass all testes
- connect to jsonbin.io
- design css(fonts, location, )
- delete and edit tasks
- mark finish tasks






## Guidelines

- The Todo list should have two sections: _Control_ section and _View_ section V
- The _Control_ section is where the user adds his todo task and priority, and should have three elements:
  - [\<input\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) with id `text-input`.V
  - [\<select\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) with id `priority-selector` (options will be: 1-5).V
  - [\<button\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) with id `add-button`.V
- The _View_ section is where we display the list of added todo tasks and data. The list should start empty and each added todo should be inserted to the end of the list.V
- After the user clicks on the 'add' button, the todo input field should be "reset"V
- Every todo item should have a "container" div with class `todo-container` that will contain 3 sub-elements:

  - An element with a class `todo-text` with the text of the todo taskV
  - An element with a class `todo-created-at` that will hold the creation time of the task in a [SQL format](https://www.w3schools.com/sql/sql_dates.asp#:~:text=SQL%20Date%20Data%20Types&text=DATE%20%2D%20format%20YYYY%2DMM%2D,YEAR%20%2D%20format%20YYYY%20or%20YY)V
  - An element for showing the numeric priority value of the task, with a class `todo-priority`V

  Good way 👍🏿:

  ```
    <div class="todo-container">
      <div class="todo-priority">
        1
      </div>
      <div class="todo-created-at">
        2020-06-18 11:51:12
      </div>
      <div class="todo-text">
        the todo text
      </div>
    </div>
  ```

  Bad way 👎🏿:

  ```
    <div class="todo-container">
      <div class="todo-priority">
        1
      </div>
      <div class="todo-created-at">
        2020-06-18 11:51:12
      </div>
      <div class="todo-text">
        <span>the todo text</span>
      </div>
    </div>
  ```

- Add a counter element to reflect the **current** number of todos stored in the app. This element should have an id of `counter`.

- Add a button with id `sort-button`. Clicking this element should resort the todo list by their todos priority (DESC)

  ![alt text](./readme-files/todo.gif)

- **Make your todo-list persistent!**

  Save your todo-list as JSON (see `todo-list-example.json`) and store it in a persistent way, you have to options:

  1. Use the `localStorage` browser api to save / load the todo-list JSON **with the 'my-todo' key**. This option will make it persist between _page reloads_.

  2. Use the [jsonbin.io](https://jsonbin.io/) service api (using async/await fetch GET & PUT requests) to save / load your todo-list JSON. This option will make it persist across _devices and browsers_.

**Note** You can add extra properties to the todo objects in the JSON that you want to be persistent.

## Bonus

- jsonbin.io - see explanation above
- Freestyle - add any feature you desire. Some ideas:
  - [drag n' drop functionality](https://htmldom.dev/drag-and-drop-element-in-a-list)
  - Delete + Edit a todo
  - Undo action
  - Search and highlight results
  - Loading spinner for network request
  - Mark/Unmark todo as done
  - Something awesome we didn't think of...
- For added value, you can add jest/puppeteer test to test any bonus feature you implemented


