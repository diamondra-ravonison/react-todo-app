import React, { useState } from "react";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";
uuidv4();

export const TodoWrapper = () => {
    // [<name of the state>, <setter function>] = useState(<initial value>)
    const [todos, setTodos] = useState([])
    const [filter, setFilter] = useState('all')

    // State is a plain javascript object used by React to represent a piece of information
    // about the components's current situtation, managed bt the component itself
    // We have to import useState hook from React

    const filterTodo = (event) => {
        setFilter(event.target.value);
    }

    const addTodo = todo => {
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        };

        const formatter = new Intl.DateTimeFormat('en-US', options);
        const formattedDate = formatter.format(new Date());
        //var dateNow = new Date();
        // Make copy of the current todos and add the todo we are passing in
        setTodos([...todos,
        {
            id: uuidv4(), task: todo,
            completed: false, isEditing: false,
            date: formattedDate, isComplete: false
        }])

        setFilter('all')
        document.getElementsByClassName('dropdown')[0].value = 'all';
    }

    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? {
            ...todo, isEditing: !todo.isEditing
        } : todo
        ))
    }

    const editTodoStatus = id => {
        setTodos(todos.map(todo => todo.id === id ? {
            ...todo, isComplete: !todo.isComplete
        } : todo
        ))
    }

    const editTask = (task, id) => {
        setTodos(todos.map(todo => todo.id === id ? {
            ...todo, task, isEditing: !todo.isEditing
        } : todo))
    }

    return (
        <div className="TodoWrapper">
            <h1>Tick & Progress !</h1>

            <TodoForm addTodo={addTodo} />

            <div className="dropdown-div">
                <select className="dropdown" name="dropdown" onChange={filterTodo}>
                    <option value="all">All</option>
                    <option value="complete">Complete</option>
                    <option value="incomplete">Incomplete</option>
                </select>
            </div>

            {todos.map((todo, index) => (
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo} key={todo.id} id={index} />
                ) : (
                    filter == 'all' ? (
                        <Todo task={todo} key={todo.id} id={todo.id}
                            deleteTodo={deleteTodo}
                            editTodo={editTodo}
                            editTodoStatus={editTodoStatus} />
                    ) :
                        filter == 'complete' ? (
                            todo.isComplete ? (
                                <Todo task={todo} key={todo.id} id={todo.id}
                                    deleteTodo={deleteTodo}
                                    editTodo={editTodo}
                                    editTodoStatus={editTodoStatus} />
                            ) :
                                ''
                        ) :
                            !todo.isComplete ? (
                                <Todo task={todo} key={todo.id} id={todo.id}
                                    deleteTodo={deleteTodo}
                                    editTodo={editTodo}
                                    editTodoStatus={editTodoStatus} />
                            ) :
                                ''
                )

            ))}

            <p class="signature" >Designed and built by Diamondra Ravonison</p>
        </div>
    )
}