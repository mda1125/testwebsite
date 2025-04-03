document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            return; // Don't add empty tasks
        }

        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', toggleTaskCompletion);

        const span = document.createElement('span');
        span.textContent = taskText;

        li.appendChild(checkbox);
        li.appendChild(span);
        taskList.appendChild(li);

        taskInput.value = ''; // Clear the input field
        taskInput.focus(); // Keep focus on input
    }

    // Function to toggle task completion and apply/remove 'completed' class
    function toggleTaskCompletion(event) {
        const checkbox = event.target;
        const li = checkbox.closest('li'); // Find the parent li element
        if (checkbox.checked) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
    }

    // Event listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});