import React, { ChangeEvent, useState } from "react";
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
    editTitleTodo: (todoTile: string, todoId: string) => void;
    editTitleTodoOfItem: (todoItemTile: string, todoItemId: string, todoListId: string) => void;
};

export const TodoList = (props: TodoListPropsType) => {
    const [editedTodo, setEditedTodo] = useState(false);
    const [title, setTitle] = useState(props.title);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.isChecked(id, newIsDoneValue, props.todoId);
    };

    const removeTodolist = () => {
        props.removeTodolist(props.todoId);
    };

    const editTodoTitle = () => {
        setEditedTodo(!editedTodo);
    };

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        let text = e.currentTarget.value;
        setTitle(text);
    };

    const activateViewMode = () => {
        props.editTitleTodo(title, props.todoId);
        setEditedTodo(!editedTodo);
    };

    return (
        <div>
            <div className="todolist-heading">
                {editedTodo ? (
                    <input
                        value={title}
                        onChange={changeTitle}
                        onBlur={activateViewMode}
                        autoFocus
                    />
                ) : (
                    <h3
                        className="todolist-title"
                        onDoubleClick={editTodoTitle}
                    >
                        {props.title}
                    </h3>
                )}
                <button className="remove-todolist" onClick={removeTodolist}>
                    X
                </button>
            </div>
            <TodoForm addTodo={props.addTodo} todoId={props.todoId} />
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
                            <EditableSpan
                                title={item.todoItemName}
                                id={item.id}
                                newTitle={props.editTitleTodoOfItem}
                                todoListId={props.todoId}
                            />
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
                <button
                    className={
                        props.activeFilter === "all"
                            ? "active-filter-button"
                            : ""
                    }
                    onClick={() => {
                        props.filterHandler("all", props.todoId);
                    }}
                >
                    All
                </button>
                <button
                    className={
                        props.activeFilter === "active"
                            ? "active-filter-button"
                            : ""
                    }
                    onClick={() => {
                        props.filterHandler("active", props.todoId);
                    }}
                >
                    Active
                </button>
                <button
                    className={
                        props.activeFilter === "completed"
                            ? "active-filter-button"
                            : ""
                    }
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

/**
 *  Edit todo list item func.
 */
type EditableSpanType = {
    title: string;
    newTitle: (todoItemTile: string, todoItemId: string, todoListId: string) => void;
    id: string;
    todoListId: string;
};

const EditableSpan = (props: EditableSpanType) => {
    const [editedTodoItem, setEditedTodoItem] = useState(false);
    const [todoItemTitle, setTodoItemTitle] = useState(props.title);

    const activateEditing = () => {
        setEditedTodoItem(!editedTodoItem);
    };

    const activateViewMode = () => {
        props.newTitle(todoItemTitle, props.id, props.todoListId);
        setEditedTodoItem(!editedTodoItem);
    };

    const editTodoItemTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoItemTitle(e.currentTarget.value);
    };

    return (
        <>
            {editedTodoItem ? (
                <input
                    value={todoItemTitle}
                    onBlur={activateViewMode}
                    type="text"
                    onChange={editTodoItemTitle}
                    autoFocus
                />
            ) : (
                <span
                    className={"todo-item-name"}
                    onDoubleClick={activateEditing}
                >
                    {props.title}
                </span>
            )}
        </>
    );
};
