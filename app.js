const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const completedTasks = document.getElementById('completed-tasks');

// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', function() {
  loadTasks();
});

addTaskButton.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const taskItem = document.createElement('li');
    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.addEventListener('change', toggleTaskCompletion);
    const taskLabel = document.createElement('label');
    taskLabel.textContent = taskText;
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.addEventListener('click', deleteTask);
    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskLabel);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
    
    // Save tasks to local storage
    saveTasks();
    
    taskInput.value = '';
  }
}

function toggleTaskCompletion() {
  const taskItem = this.parentNode;
  taskItem.classList.toggle('completed');
  
  // Move completed task to completed tasks textarea
  if (taskItem.classList.contains('completed')) {
    completedTasks.value += `- ${taskItem.querySelector('label').textContent}\n`;
  } else {
    // Remove completed task from completed tasks textarea
    const completedTaskText = `- ${taskItem.querySelector('label').textContent}\n`;
    completedTasks.value = completedTasks.value.replace(completedTaskText, '');
  }
  
  saveTasks();
}

function deleteTask() {
  const taskItem = this.parentNode;
  taskItem.remove();
  
  // Remove deleted task from completed tasks textarea
  const completedTaskText = `- ${taskItem.querySelector('label').textContent}\n`;
  completedTasks.value = completedTasks.value.replace(completedTaskText, '');
  
  saveTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', taskList.innerHTML);
}

function loadTasks() {
  const tasks = localStorage.getItem('tasks');
  if (tasks) {
    taskList.innerHTML = tasks;
    
    // Reattach event listeners to checkboxes and delete buttons
    const checkboxes = taskList.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', toggleTaskCompletion);
    });
    
    const deleteButtons = taskList.querySelectorAll('button');
    deleteButtons.forEach(function(button) {
      button.addEventListener('click', deleteTask);
    });
  }
}
