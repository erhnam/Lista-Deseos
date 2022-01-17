import React from 'react'
import { TodoItem } from './TodoItem'

//Lista de tareas
export function TodoList({ todos, toggleTodo }) {
    return (
        <ul className="list-group">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
            ))}
        </ul>
    )
}
