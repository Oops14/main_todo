import React, { useReducer } from "react";
import "./App.css";
import { TodoList } from "./components/todo_list/TodoList";
import { v4 as uuidv4 } from "uuid";
import { TodoItemForm } from "./components/TodoItemForm";
import { Header } from "./components/header/Header";
import { Container, Grid, Paper } from "@mui/material";
import {
    ActionsType,
    addTaskAC,
    addTodoListTasksAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
} from "./state/tasks-reducer";
import {
    ActionsTodolistsType,
    addTodoListAC,
    editTodoListAC,
    filterTodoAC,
    removeTodoAC,
    todolistsReducer,
} from "./state/todolists-reducer";
import { Reducer } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";

export type TodosType = {
    id: string;
    todoItemName: string;
    isDone?: boolean;
};

export type TodoListType = {
    [key: string]: Array<TodosType>;
};

export type FilterType = "all" | "completed" | "active";

export type AllTodoListsType = {
    id: string;
    title: string;
    filter: FilterType;
};

// const todoListId1 = uuidv4();
// const todoListId2 = uuidv4();
// let initialStateTodoLists: AllTodoListsType[] = [
//     {
//         id: todoListId1,
//         title: "What to learn",
//         filter: "all",
//     },
//     {
//         id: todoListId2,
//         title: "What to learn 2",
//         filter: "all",
//     },
// ];

// let initialStateTasks = {
//     [todoListId1]: [
//         {
//             id: uuidv4(),
//             todoItemName: "TEST",
//             isDone: false,
//         },
//         {
//             id: uuidv4(),
//             todoItemName: "Second Todo",
//             isDone: false,
//         },
//     ],
//     [todoListId2]: [
//         {
//             id: uuidv4(),
//             todoItemName: "TEST",
//             isDone: false,
//         },
//         {
//             id: uuidv4(),
//             todoItemName: "Second Todo",
//             isDone: false,
//         },
//         {
//             id: uuidv4(),
//             todoItemName: "Second Todo",
//             isDone: false,
//         },
//     ],
// };

function AppWithRedux() {

    const allTodos = useSelector<AppRootStateType, Array<AllTodoListsType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TodoListType>(state => state.tasks);
    const dispatch = useDispatch();

    let filterHandler = (filterValue: FilterType, todoListId: string) => {
        const action = filterTodoAC(todoListId, filterValue);
        dispatch(action);
    };

    let addTodo = (addTodo: string, todoId: string) => {
        const action = addTaskAC(addTodo, todoId);
        dispatch(action);
    };

    let isChecked = (id: string, isDone: boolean, todoId: string) => {
        const action = changeTaskStatusAC(id, isDone, todoId);
        dispatch(action);
    };

    let removeItem = (id: string, todoId: string) => {
        const action = removeTaskAC(id, todoId);
        dispatch(action);
    };

    let removeTodolist = (todoId: string) => {
        const action = removeTodoAC(todoId, tasks);
        dispatch(action);
    };

    /**
     * Add new Todo list.
     */
    const addNewTodo = (todoTile: string) => {
        let todoListId = uuidv4();

        const actionForTodoLists = addTodoListAC(todoTile, todoListId);
        dispatch(actionForTodoLists);
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
        const action = changeTaskTitleAC(todoItemId, todoItemTile, todoListId);
        dispatch(action);
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
                        if (todo.filter === "active") {
                            filteredTodos = tasks[todo.id].filter(
                                (item) => item.isDone === false
                            );
                        }

                        // Filter tasks by clicking on the "Completed" button.
                        if (todo.filter === "completed") {
                            filteredTodos = tasks[todo.id].filter(
                                (item) => item.isDone === true
                            );
                        }

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
