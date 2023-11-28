import React, { ChangeEvent } from "react";
import { TodoForm } from "./TodoForm";
import { TodosType } from "../App";

type TodoListPropsType = {
    isChecked: (id: string, isDone: boolean) => void;
    removeItem: (id: any) => void;
    addTodo: (addTodo: string) => void;
    todos: Array<TodosType>;
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};
