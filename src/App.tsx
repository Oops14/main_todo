import React, { useState } from "react";
import "./App.css";
import { TodoList } from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";

export type TodosType = {
    id: string;
    todoItemName: string;
    isDone?: boolean;
};

type TodoListType = {
    [key: string]: Array<TodosType>;
};

export type FilterType = "all" | "completed" | "active";

type AllTodoListsType = {
    id: string;
    title: string;
    filter: FilterType;
};

function App() {
    // const [todos, setTodos] = useState<Array<TodosType>>([
    //     {
    //         id: uuidv4(),
    //         todoItemName: "TEST",
    //         isDone: false,
    //     },
    //     {
    //         id: uuidv4(),
    //         todoItemName: "Second Todo",
    //         isDone: false,
    //     },
    // ]);

    // React.useEffect(() => console.log("data", todos), [todos]);

    const todoListId1 = uuidv4();
    const todoListId2 = uuidv4();


    // Define all todo lists.
    const [allTodos, setAllTodos] = useState<Array<AllTodoListsType>>([
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
    ]);

    // const [filter, setFilter] = useState<FilterType>("all");
    // React.useEffect(() => console.log("All todos", todos), [todos]);

    const [todos, setTodos] = useState<TodoListType>({
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
    });

    // React.useEffect(() => console.log(" todos", todos), [todos]);

    let filterHandler = (filterValue: FilterType, id: string) => {
        let todo = allTodos.find((item) => item.id === id);

        if (todo) {
            todo.filter = filterValue;
            setAllTodos([...allTodos]);
        }
    };

    // Add tasks from the input to the state.
    let addTodo = (addTodo: string, todoId: string) => {
        let todoListOfTasks = todos[todoId];
        let task = { id: uuidv4(), todoItemName: addTodo, isDone: false };

        todos[todoId] = [...todoListOfTasks, task];
        setTodos({ ...todos });

        // setTodos([
        //     ...todos,
        //     {
        //         id: uuidv4(),
        //         todoItemName: addTodo,
        //         isDone: false,
        //     },
        // ]);
    };

    let isChecked = (id: string, isDone: boolean, todoId: string) => {
        let task = todos[todoId].find((item) => item.id === id);

        if (task) {
            task.isDone = isDone;
            setTodos({ ...todos });
        }
    };

    let removeItem = (id: string, todoId: string) => {
        let todoListOfTasks = todos[todoId];
        todos[todoId] = todoListOfTasks.filter((item) => item.id !== id);

        setTodos({ ...todos });
    };

    let removeTodolist = (todoId: string) => {
        let removeListOfTasks = allTodos.filter((item) => item.id !== todoId);
        setAllTodos(removeListOfTasks);
        
        delete todos[todoId];
        setTodos({ ...todos });
    };

    return (
        <div className="App">
            {allTodos.map((todo) => {
                let filteredTodos = todos[todo.id];

                // Filter tasks by clicking on the "Active" button.
                if (todo.filter === "active") {
                    filteredTodos = todos[todo.id].filter(
                        (item) => item.isDone === false
                    );
                }

                // Filter tasks by clicking on the "Completed" button.
                if (todo.filter === "completed") {
                    filteredTodos = todos[todo.id].filter(
                        (item) => item.isDone === true
                    );
                }

                return (
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
                    />
                );
            })}
        </div>
    );
}

export default App;
