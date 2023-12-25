import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'

export const Todo = ({ task, deleteTodo, editTodo, editTodoStatus }) => {
    
    return (
        <div className="Todo">
            <div className="check-text-div">
                <div className="checkbox-div" onClick={() => editTodoStatus(task.id)}>
                    {task.isComplete ? <FontAwesomeIcon icon={faSquareCheck} /> :
                        <FontAwesomeIcon icon={faSquare} />}
                </div>
                <div className="todo-div">
                    <p className={`${task.isComplete ? 'completed task' : 'task'}`}
                        onClick={() => editTodoStatus(task.id)}>
                        {task.task}
                    </p>
                    <p className="date">
                        {task.date}
                    </p>
                </div>
            </div>
            <div className="icon-div">
                <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task.id)} />
                <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
            </div>

        </div>
    )
}

