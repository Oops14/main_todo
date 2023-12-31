import React, { ChangeEvent } from "react";
import { TodoForm } from "./TodoForm";
import { FilterType, TodosType } from "../App";

type TodoListPropsType = {
    isChecked: (id: string, isDone: boolean) => void;
    removeItem: (id: any) => void;
    addTodo: (addTodo: string) => void;
    todos: Array<TodosType>;
    filterHandler: (filterValue: FilterType) => void;
};

export const TodoList = (props: TodoListPropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.isChecked(id, newIsDoneValue);
    };

    return (
        <div>
            <h3>What to learn</h3>
            <TodoForm addTodo={props.addTodo} />
            <ul className="todo-list">
                {props.todos.map((item) => {
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
                                    props.removeItem(item.id);
                                }}
                            >
                                x
                            </button>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button
                    onClick={() => {
                        props.filterHandler("all");
                    }}
                >
                    All
                </button>
                <button
                    onClick={() => {
                        props.filterHandler("active");
                    }}
                >
                    Active
                </button>
                <button
                    onClick={() => {
                        props.filterHandler("completed");
                    }}
                >
                    Completed
                </button>
            </div>
        </div>
    );
};
