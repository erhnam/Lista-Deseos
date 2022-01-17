import React from 'react'

//Tareas
export function TodoItem({ todo, toggleTodo }) {
    const { id, task, completed } = todo;

    //Función para hacer click en la tarea
    const handleTodoClick = () => {
        toggleTodo(id);
    }

    return (
        <li>
            <input type="checkbox" checked={completed} onChange={handleTodoClick} /> {task}
        </li>
    );
}
