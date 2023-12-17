import React, { useState } from "react";

export const EditTodoForm = ({ editTodo, task }) => {
    const [value, setValue] = useState(task.task)

    const handleSubmit = e => {
        // Prevent from reloading the page
        e.preventDefault();

        editTodo(value, task.id);

        setValue("")
    }
    return (
        <form className="TodoForm" onSubmit={handleSubmit}>
            <input type="text" className="todo-input edit"
                value={value}
                placeholder="Update task"
                onChange={(e) => setValue(e.target.value)}></input>
            <button type="submit" className="todo-btn edit-btn">
                Update task
            </button>
        </form>
    )
}