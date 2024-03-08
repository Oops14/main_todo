import React, { ChangeEvent, useState } from "react";
import { TodoForm } from "../TodoForm";
import { RemoveButton } from "../buttons/RemoveButton";
import { ButtonMain } from "../buttons/ButtonMain";
import { TextField } from "../TextField";
import { Checkbox, Container } from "@mui/material";
import {FilterType, TodosType} from "../../AppWithRedux";

type TodoListPropsType = {
    title: string;
    todoId: string;
    todos: Array<TodosType>;
    activeFilter?: FilterType;
    isChecked: (id: string, isDone: boolean, todoId: string) => void;
    removeItem: (id: string, todoId: string) => void;
    addTodo: (addTodo: string, todoId: string) => void;
    filterHandler: (filterValue: FilterType, id: string) => void;
    removeTodolist: (todoId: string) => void;
    editTitleTodo: (todoTile: string, todoId: string) => void;
    editTitleTodoOfItem: (
        todoItemTile: string,
        todoItemId: string,
        todoListId: string
    ) => void;
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

    // Filter Buttons actions.
    const showAllTasks = () => {
        props.filterHandler("all", props.todoId);
    };

    const showActiveTasks = () => {
        props.filterHandler("active", props.todoId);
    };

    const showCompletedTasks = () => {
        props.filterHandler("completed", props.todoId);
    };

    return (
        <Container maxWidth="xl">
            <div className="todo-list">
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
                    <RemoveButton onClick={removeTodolist} />
                </div>
                <TodoForm addTodo={props.addTodo} todoId={props.todoId} />
                <ul className="todo-list">
                    {props.todos.map((item) => {
                        const removeTodoTask = () => {
                            props.removeItem(item.id, props.todoId);
                        };

                        return (
                            <li
                                key={item.id}
                                className={
                                    item.isDone ? "todo-item done" : "todo-item"
                                }
                            >
                                <Checkbox
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
                                <RemoveButton onClick={removeTodoTask} />
                            </li>
                        );
                    })}
                </ul>
                <div>
                    <ButtonMain
                        title={"All"}
                        variant={
                            props.activeFilter === "all" ? "contained" : "text"
                        }
                        addTask={showAllTasks}
                    />
                    <ButtonMain
                        title={"Active"}
                        variant={
                            props.activeFilter === "active"
                                ? "contained"
                                : "text"
                        }
                        addTask={showActiveTasks}
                    />
                    <ButtonMain
                        title={"Completed"}
                        variant={
                            props.activeFilter === "completed"
                                ? "contained"
                                : "text"
                        }
                        addTask={showCompletedTasks}
                    />
                </div>
            </div>
        </Container>
    );
};

/**
 *  Edit todo list item func.
 */
type EditableSpanType = {
    title: string;
    newTitle: (
        todoItemTile: string,
        todoItemId: string,
        todoListId: string
    ) => void;
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
                <TextField
                    value={todoItemTitle}
                    onBlur={activateViewMode}
                    onChange={editTodoItemTitle}
                    newTitle={props.newTitle}
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
