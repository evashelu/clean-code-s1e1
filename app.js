document.addEventListener("DOMContentLoaded", function() {
    var taskInput = document.getElementById("new-task");
    var addButton = document.querySelector(".main-section__add-button");
    var incompleteTaskHolder = document.getElementById("incomplete-tasks");
    var completedTasksHolder = document.getElementById("completed-task");

    var createNewTaskElement = function(taskString) {
        var listItem = document.createElement("li");
        listItem.className = "main-section__task";
        var checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.className = "main-section__checkbox";
        var label = document.createElement("label");
        label.className = "main-section__task-label";
        label.innerText = taskString;
        var editInput = document.createElement("input");
        editInput.type = "text";
        editInput.className = "main-section__task-input";
        var editButton = document.createElement("button");
        editButton.className = "main-section__edit-button";
        editButton.innerText = "Edit";
        var deleteButton = document.createElement("button");
        deleteButton.className = "main-section__delete-button";
        var deleteButtonImg = document.createElement("img");
        deleteButtonImg.src = './remove.svg';
        deleteButtonImg.alt = "Delete";
        deleteButton.appendChild(deleteButtonImg);
        listItem.appendChild(checkBox);
        listItem.appendChild(label);
        listItem.appendChild(editInput);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        return listItem;
    }

    var addTask = function() {
        if (!taskInput.value.trim()) return;
        var listItem = createNewTaskElement(taskInput.value.trim());
        incompleteTaskHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
        taskInput.value = "";
    }

    var editTask = function() {
        var listItem = this.parentNode;
        var editInput = listItem.querySelector('input[type=text]');
        var label = listItem.querySelector(".main-section__task-label");
        var editBtn = listItem.querySelector(".main-section__edit-button");
        var containsClass = listItem.classList.contains("main-section__task--edit-mode");
        if (containsClass) {
            label.innerText = editInput.value;
            editBtn.innerText = "Edit";
        } else {
            editInput.value = label.innerText;
            editBtn.innerText = "Save";
        }
        listItem.classList.toggle("main-section__task--edit-mode");
    }

    var deleteTask = function() {
        var listItem = this.parentNode;
        var ul = listItem.parentNode;
        ul.removeChild(listItem);
    }

    var taskCompleted = function() {
        var listItem = this.parentNode;
        completedTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskIncomplete);
    }

    var taskIncomplete = function() {
        var listItem = this.parentNode;
        incompleteTaskHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
    }

    var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
        var checkBox = taskListItem.querySelector("input[type=checkbox]");
        var editButton = taskListItem.querySelector("button.main-section__edit-button");
        var deleteButton = taskListItem.querySelector("button.main-section__delete-button");
        editButton.onclick = editTask;
        deleteButton.onclick = deleteTask;
        checkBox.onchange = checkBoxEventHandler;
    }

    addButton.addEventListener("click", addTask);

    for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
        bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
    }
    for (var i = 0; i < completedTasksHolder.children.length; i++) {
        bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
    }
});