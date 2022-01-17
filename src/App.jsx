/* https://www.youtube.com/watch?v=EMk6nom1aS4&t=1496s */

import React, { Fragment, useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'
import { TodoList } from './components/TodoList'
import 'bootstrap/dist/css/bootstrap.min.css';

const KEY = 'todoApp.todos';

//Función principal
export function App() {
    /* todos = variable , setTodos = función */
    const [todos, setTodos] = useState([{ id: uuidv4(), task: "Tarea 1", completed: false }])

    const todoTaskRef = useRef();

    //Cuando traemos el storedTodos la primera vez
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        //Si es la primera vez
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, [])

    //Cuando estamos almacenando
    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos))
    }, [todos])

    //Función para el checkbox ponga la tarea como completada o no.
    const toggleTodo = (id) => {
        //Copia de los todos con el operador spread (extendida) basicamente es un operador de copia
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }

    //Manejador para añadir una tarea
    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if (task === "")
            return;

        setTodos((prevTodos) => {
            return [...prevTodos, {id: uuidv4(), task, completed: false}]
        })

        todoTaskRef.current.value = null;
    }

    //Manejador para limpiar las tareas completadas
    const handleClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.completed)
        setTodos(newTodos);
    }

    //Lo que devuelve a la pantalla
    return (
        <Fragment>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
            <input ref={ todoTaskRef } type="text" placeholder="Nueva Tarea" />
            <button className='btn btn-primary' onClick={handleTodoAdd}> <i className="glyphicon glyphicon-plus" /> </button>
            <button className='btn btn-danger' onClick={handleClearAll}> <i className="glyphicon glyphicon-trash" /> </button>
            <div> Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar </div>
        </Fragment>
    );
}