const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

addBtn.addEventListener('click', addTask);
taskList.addEventListener('click', taskAction);

// Display tasks on page load
displayTasks();

function addTask() {
  const task = taskInput.value.trim();
  if (task) {
    const taskItem = {
      id: Date.now(),
      name: task,
      completed: false,
      timestamp: new Date().toLocaleString()
    };

    tasks.push(taskItem);
    saveTasksToLocalStorage();
    displayTask(taskItem);
    taskInput.value = '';
    updateTaskCount();
  }
}

function displayTasks() {
  tasks.forEach(displayTask);
  updateTaskCount();
}

function displayTask(taskItem) {
  const li = document.createElement('li');
  li.setAttribute('data-id', taskItem.id);
  li.innerText = taskItem.name;
  if (taskItem.completed) {
    li.classList.add('completed');
  }

  const span = document.createElement('span');
  span.innerText = taskItem.timestamp;
  li.appendChild(span);

  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';
  deleteBtn.classList.add('delete-btn');
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
}

function taskAction(event) {
  const element = event.target;
  const li = element.closest('li');
  const taskId = li.getAttribute('data-id');

  if (element.classList.contains('delete-btn')) {
    deleteTask(taskId);
  } else if (element.tagName === 'LI') {
    toggleTaskCompletion(taskId);
  }
}

function toggleTaskCompletion(taskId) {
  tasks.forEach((taskItem) => {
    if (taskItem.id === Number(taskId)) {
      taskItem.completed = !taskItem.completed;
      li = taskList.querySelector(`li[data-id="${taskId}"]`);
      li.classList.toggle('completed');
      saveTasksToLocalStorage();
      updateTaskCount();
    }
  });
}

function deleteTask(taskId) {
  tasks = tasks.filter((taskItem) => taskItem.id !== Number(taskId));
  li = taskList.querySelector(`li[data-id="${taskId}"]`);
  taskList.removeChild(li);
  saveTasksToLocalStorage();
  updateTaskCount();
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskCount() {
  taskCount.innerText = tasks.length;
}