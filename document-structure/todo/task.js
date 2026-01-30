// Простой список дел
const taskForm = document.getElementById('tasks__form');
const taskInput = document.getElementById('task__input');
const taskList = document.getElementById('tasks__list');

// Загружаем задачи из localStorage ри загрузке страницы (повышенный уровень сложности)
function saveTasksToStorage() {
    const tasks = [];
    const taskElements = document.querySelectorAll('.task__title');

    taskElements.forEach(taskElement => {
        tasks.push(taskElement.textContent);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Новая задача
function createTaskElement(taskText) {
    const task = document.createElement('div');
    task.className = 'task';

    const title = document.createElement('div');
    title.className = 'task__title';
    title.textContent = taskText;

    const removeBtn = document.createElement('a');
    removeBtn.className = 'task__remove';
    removeBtn.href = '#';
    removeBtn.innerHTML = '&times;';


    removeBtn.addEventListener('click', (rb) => { // для каждой кнопки должен быть только один обработчик события
        rb.preventDefault();
        task.remove();
        saveTasksToStorage(); // Сохраняем после удаления
    });

    task.appendChild(title);
    task.appendChild(removeBtn);
    taskList.appendChild(task);
}

// Загружаем задачи из localStorage при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    savedTasks.forEach(taskText => {
        createTaskElement(taskText);
    });
});

// Добавление задач по нажатию клавиши Enter при наличии текста в поле ввода
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === '') {
        return;
    }

    createTaskElement(taskText);
    saveTasksToStorage();

    taskInput.value = '';
});
