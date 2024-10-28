import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
    const dispatch = useDispatch();
    const { todo } = useSelector((state: any) => state.todosReducer);

    return (
        <li className="list-group-item" style={{ marginRight: '65%' }}>
            <button className="btn btn-success me-2 float-end" 
            onClick={() => dispatch(addTodo(todo))}
                id="wd-add-todo-click"> Add </button>

            <button className="btn btn-warning me-2 float-end" 
            onClick={() => dispatch(updateTodo(todo))}
                id="wd-update-todo-click"> Update </button>
            <input className="form-control" style={{ width: '50%' }} 
                value={todo.title}
                onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
            />
        </li>
    );
}
