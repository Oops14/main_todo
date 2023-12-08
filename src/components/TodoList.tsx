import React, { ChangeEvent } from "react";
import { TodoForm } from "./TodoForm";
import { FilterType, TodosType } from "../App";

type TodoListPropsType = {
    isChecked: (id: string, isDone: boolean, todoId: string) => void;
    removeItem: (id: string, todoId: string) => void;
    addTodo: (addTodo: string, todoId: string) => void;
    todos: Array<TodosType>;
    filterHandler: (filterValue: FilterType, id: string) => void;
    title: string;
    todoId: string;
    activeFilter: FilterType;
    removeTodolist: (todoId: string) => void;
};

export const TodoList = (props: TodoListPropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.isChecked(id, newIsDoneValue, props.todoId);
    };

    const removeTodolist = () => {
        props.removeTodolist(props.todoId);
    }


    return (
        <div>
            <div className="todolist-heading">
                <h3 className="todolist-title">{props.title}</h3>
                <button className="remove-todolist" onClick={removeTodolist}>X</button>
            </div>
            <TodoForm addTodo={props.addTodo} todoId={props.todoId} />
            <ul className="todo-list">

                {props.todos.map((item: TodosType) => {
                    return (
                        <li
                            key={item.id}
                            className={
                                item.isDone ? "todo-item done" : "todo-item"
                            }
                        >
                            <input
                                type="checkbox"
                                checked={item.isDone}
                                onChange={(e) => {
                                    onChangeHandler(e, item.id);
                                }}
                            />
                            <span className={"todo-item-name"}>
                                {item.todoItemName}{" "}
                            </span>
                            <button
                                onClick={() => {
                                    props.removeItem(item.id, props.todoId);
                                }}
                            >
                                x
                            </button>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button className={props.activeFilter === 'all' ? "active-filter-button" : ""}
                    onClick={() => {
                        props.filterHandler("all", props.todoId);
                    }}
                >
                    All
                </button>
                <button className={props.activeFilter === 'active' ? "active-filter-button" : ""}
                    onClick={() => {
                        props.filterHandler("active", props.todoId);
                    }}
                >
                    Active
                </button>
                <button className={props.activeFilter === 'completed' ? "active-filter-button" : ""}
                    onClick={() => {
                        props.filterHandler("completed", props.todoId);
                    }}
                >
                    Completed
                </button>
            </div>
        </div>
    );
};
