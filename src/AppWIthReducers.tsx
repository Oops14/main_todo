import React, { useReducer } from "react";
import "./App.css";
import { TodoList } from "./components/todo_list/TodoList";
import { v4 as uuidv4 } from "uuid";
import { TodoItemForm } from "./components/TodoItemForm";
import { Header } from "./components/header/Header";
import { Container, Grid, Paper } from "@mui/material";
import {
    addTaskAC,
    addTodoListTasksAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
} from "./state/tasks-reducer";
import { addTodoListAC, filterTodoAC, removeTodoAC, todolistsReducer } from "./state/todolists-reducer";

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

function AppWithReducers() {
    const todoListId1 = uuidv4();
    const todoListId2 = uuidv4();

    let initialStateTodoLists: AllTodoListsType[] = [
        {
            id: todoListId1,
            title: "What to learn",
            filter: "all",
        },
        {
            id: todoListId2,
            title: "What to learn 2",
            filter: "all",
        },
    ];
    // Define all todo lists.
    const [allTodos, dispatchToTodolists] = useReducer(todolistsReducer, initialStateTodoLists);

    let initialStateTasks = {
        [todoListId1]: [
            {
                id: uuidv4(),
                todoItemName: "TEST",
                isDone: false,
            },
            {
                id: uuidv4(),
                todoItemName: "Second Todo",
                isDone: false,
            },
        ],
        [todoListId2]: [
            {
                id: uuidv4(),
                todoItemName: "TEST",
                isDone: false,
            },
            {
                id: uuidv4(),
                todoItemName: "Second Todo",
                isDone: false,
            },
            {
                id: uuidv4(),
                todoItemName: "Second Todo",
                isDone: false,
            },
        ],
    };
    const [state, dispatchToTasks] = useReducer(
        tasksReducer,
        initialStateTasks
    );

    let filterHandler = (filterValue: FilterType, todoListId: string) => {
        const action = filterTodoAC(todoListId, filterValue);
        dispatchToTodolists(action);
    };

    let addTodo = (addTodo: string, todoId: string) => {
        const action = addTaskAC(addTodo, todoId);
        dispatchToTasks(action);
    };

    let isChecked = (id: string, isDone: boolean, todoId: string) => {
        const action = changeTaskStatusAC(id, isDone, todoId);
        dispatchToTasks(action);
    };

    let removeItem = (id: string, todoId: string) => {
        const action = removeTaskAC(id, todoId);
        dispatchToTasks(action);
    };

    let removeTodolist = (todoId: string) => {
        const action = removeTodoAC(todoId, state);
        dispatchToTodolists(action);
    };

    /**
     * Add new Todo list.
     */
    const addNewTodo = (todoTile: string) => {
        let todoListId = uuidv4();

        const actionForTodoLists = addTodoListAC(todoTile, todoListId);
        const actionForTasks = addTodoListTasksAC(todoTile, todoListId);
        dispatchToTasks(actionForTasks);
        dispatchToTodolists(actionForTodoLists);
    };

    /**
     * Change Title of Todo list.
     */
    const editTitleTodo = (todoTile: string, todoId: string) => {
        // let newTodoList = allTodos.map((item) =>
        //     item.id === todoId ? { ...item, title: todoTile } : item
        // );
        // setAllTodos(newTodoList);
    };

    /**
     *  Change title of todo item.
     */
    const editTitleTodoOfItem = (
        todoItemTile: string,
        todoItemId: string,
        todoListId: string
    ) => {
        // let todoListItem = todos[todoListId].map((item) =>
        //     item.id === todoItemId
        //         ? { ...item, todoItemName: todoItemTile }
        //         : item
        // );
        // setTodos({ ...todos, [todoListId]: todoListItem });
        const action = changeTaskTitleAC(todoItemId ,todoItemTile, todoListId);
        dispatchToTasks(action);
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
                        let filteredTodos = state[todo.id];

                        // Filter tasks by clicking on the "Active" button.
                        if (todo.filter === "active") {
                            filteredTodos = state[todo.id].filter(
                                (item) => item.isDone === false
                            );
                        }

                        // Filter tasks by clicking on the "Completed" button.
                        if (todo.filter === "completed") {
                            filteredTodos = state[todo.id].filter(
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

export default AppWithReducers;
