let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    displayTasks();

    input.value = "";
}

function displayTasks() {
    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        const span = document.createElement("span");

        span.textContent = task.text;
        span.className = "task-text";

        if (task.completed) {
            span.classList.add("completed");
        }

        span.onclick = function() {
            tasks[index].completed =
                !tasks[index].completed;

            saveTasks();
            displayTasks();
        };

        const editButton =
            document.createElement("button");

        editButton.textContent = "Edit";
        editButton.className = "edit";

        editButton.onclick = function() {

            const newText = prompt(
                "Edit your task:",
                task.text
            );

            if (newText !== null) {

                const updatedText =
                    newText.trim();

                if (updatedText !== "") {

                    tasks[index].text =
                        updatedText;

                    saveTasks();
                    displayTasks();
                }
            }
        };

        const deleteButton =
            document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";

        deleteButton.onclick = function() {

            tasks.splice(index, 1);

            saveTasks();
            displayTasks();
        };

        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    updateCounter();
}

function updateCounter() {

    const counter =
        document.getElementById("taskCounter");

    const total = tasks.length;

    const completed =
        tasks.filter(function(task) {
            return task.completed;
        }).length;

    counter.textContent =
        `Tasks: ${total} | Completed: ${completed}`;
}

function deleteAllTasks() {

    if (tasks.length === 0) {
        return;
    }

    const confirmDelete =
        confirm("Delete all tasks?");

    if (confirmDelete) {

        tasks = [];

        saveTasks();
        displayTasks();
    }
}

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}
