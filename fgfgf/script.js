const todoForm = document.querySelector('#todo-form');
const todoInput = todoForm.querySelector('input[type=text]');
const todoContainer = document.querySelector('#todo-container');
window.addEventListener('load', function () {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(function (todoText) {
        todoContainer.appendChild(createTodoItem(todoText));
    });
});
function saveTodos() {
    const todos = Array.from(todoContainer.querySelectorAll('.todo label')).map(
        function (label) {
            return label.innerHTML;
        },
    );
    localStorage.setItem('todos', JSON.stringify(todos));
}
todoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const todoText = todoInput.value;
    if (!todoText) {
        alert('Please enter a task.');
        return;
    }
    const todoItem = createTodoItem(todoText);
    todoContainer.appendChild(todoItem);
    todoInput.value = '';
    saveTodos();
});
todoContainer.addEventListener('change', function (event) {
    if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
        const label = event.target.nextElementSibling;
        label.style.textDecoration = event.target.checked ? 'line-through' : 'none';
        saveTodos();
    }
});
function createTodoItem(text) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function () {
        label.style.textDecoration = this.checked ? 'line-through' : 'none';
    });
    todoDiv.appendChild(checkbox);

    const label = document.createElement('label');
    label.innerHTML = text;
    todoDiv.appendChild(label);

    return todoDiv;
}