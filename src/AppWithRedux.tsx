import React, { useEffect } from "react";
import "./App.css";
import { TodoList } from "./components/todo_list/TodoList";
import { TodoItemForm } from "./components/TodoItemForm";
import { Header } from "./components/header/Header";
import { Container, Grid, Paper } from "@mui/material";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    removeTaskTC,
    updateTaskTC,
} from "./state/tasks-reducer";
import {
    addTodolistTC,
    editTodoListAC,
    filterTodoAC,
    getTodolistsTC,
    removeTodoAC,
} from "./state/todolists-reducer";
import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "./state/store";
import { TodolistType } from "./api/todolists-api";
import { TaskType } from "./api/tasks-api";
import { addTaskTC } from "./state/tasks-reducer";

export type TodosType = {
    id: string;
    todoItemName: string;
    isDone?: boolean;
};

export type TodoListType = {
    [key: string]: Array<TaskType>;
};

export type FilterType = "all" | "completed" | "active";

export type AllTodoListsType = {
    id: string;
    title: string;
    filter: FilterType;
    addedDate?: string;
    order?: number;
};

function AppWithRedux() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTodolistsTC());
    }, []);

    const allTodos = useSelector<AppRootStateType, Array<TodolistType>>(
        (state) => state.todolists
    );
    const tasks = useSelector<AppRootStateType, TodoListType>(
        (state) => state.tasks
    );

    let filterHandler = (filterValue: FilterType, todoListId: string) => {
        const action = filterTodoAC(todoListId, filterValue);
        dispatch(action);
    };

    let addTodo = (addTodo: string, todoId: string) => {
        dispatch(addTaskTC(todoId, addTodo));
    };

    let isChecked = (id: string, isDone: boolean, todoId: string) => {
        const action = changeTaskStatusAC(id, isDone, todoId);
        dispatch(action);
    };

    let removeItem = (todoId: string, taskId: string) => {
        dispatch(removeTaskTC(todoId, taskId));
    };

    let removeTodolist = (todoId: string) => {
        const action = removeTodoAC(todoId, tasks);
        dispatch(action);
    };

    /**
     * Add new Todo list.
     */
    const addNewTodo = (todoTile: string) => {
        //        let todoListId = uuidv4();
        //        const actionForTodoLists = addTodoListAC(todoTile, todoListId);
        //        dispatch(actionForTodoLists);
        dispatch(addTodolistTC(todoTile));
    };

    /**
     * Change Title of Todo list.
     */
    const editTitleTodo = (todoTile: string, todoId: string) => {
        const action = editTodoListAC(todoTile, todoId);
        dispatch(action);
    };

    /**
     *  Change title of todo item.
     */
    const editTitleTodoOfItem = (
        todoItemTile: string,
        todoItemId: string,
        todoListId: string
    ) => {
//        const action = changeTaskTitleAC(todoItemId, todoItemTile, todoListId);
//        dispatch(action);
        dispatch(updateTaskTC(todoListId, todoItemId, todoItemTile));
    };

    return (
        <div className="App">
            <Header />

            <Container maxWidth="xl" style={{ marginBottom: "80px" }}>
                <Grid
                    container
                    style={{ padding: "20px", marginBottom: "80px" }}
                >
                    <TodoItemForm addNewTodo={addNewTodo} />
                </Grid>

                <Grid container spacing={3}>
                    {allTodos.map((todo) => {
                        let filteredTodos = tasks[todo.id];

                        // Filter tasks by clicking on the "Active" button.
                        // if (todo.filter === "active") {
                        //     filteredTodos = tasks[todo.id].filter(
                        //         (item) => item.isDone === false
                        //     );
                        // }

                        // Filter tasks by clicking on the "Completed" button.
                        // if (todo.filter === "completed") {
                        //     filteredTodos = tasks[todo.id].filter(
                        //         (item) => item.isDone === true
                        //     );
                        // }

                        return (
                            <Grid item columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Paper style={{ padding: "10px" }}>
                                    <TodoList
                                        key={todo.id}
                                        todoId={todo.id}
                                        title={todo.title}
                                        todos={filteredTodos}
                                        isChecked={isChecked}
                                        removeItem={removeItem}
                                        addTodo={addTodo}
                                        filterHandler={filterHandler}
                                        activeFilter={todo.filter}
                                        removeTodolist={removeTodolist}
                                        editTitleTodo={editTitleTodo}
                                        editTitleTodoOfItem={
                                            editTitleTodoOfItem
                                        }
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
