import React, { useState } from "react";
import "./App.css";
import { TodoList } from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";

export type TodosType = {
    id: string;
    todoItemName: string;
    isDone?: boolean;
};

// type TodoListType = {
//     number : Array<TodosType>;
// }

export type FilterType = "all" | "completed" | "active";

type AllTodosType = {
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

    // Define all todo lists.
    const [allTodos, setAllTodos]: any = useState<Array<AllTodosType>>([
        {
            id: uuidv4(),
            title: "What to learn",
            filter: "all",
        },
        {
            id: uuidv4(),
            title: "What to learn 2",
            filter: "all",
        },
    ]);

    // const [filter, setFilter] = useState<FilterType>("all");
    // React.useEffect(() => console.log("All todos", allTodos), [allTodos]);

    const [todos, setTodos] = useState<any>({
        [allTodos[0].id]: [
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
        [allTodos[1].id]: [
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

    let filterHandler = (filterValue: FilterType, id: string) => {
        let todo = allTodos.find((item: any) => item.id === id);

        if (todo) {
            todo.filter = filterValue;
            setAllTodos([...allTodos]);
        }
    };

    // Add tasks from the input to the state.
    let addTodo = (addTodo: string, todoId: string) => {
        setTodos([
            ...todos[todoId],
            {
                id: uuidv4(),
                todoItemName: addTodo,
                isDone: false,
            },
        ]);
    };

    let isChecked = (id: string, isDone: boolean, todoId: string) => {
        let task = todos[todoId].find((item: any) => item.id === id);

        console.log(task);

        if (task) {
            task.isDone = isDone;
            setTodos({...todos});
        }
    };

    let removeItem = (id: string, todoId: string) => {
        let todoListOfTasks = todos[todoId];
        todos[todoId] = todoListOfTasks.filter((item: any) => item.id !== id);

        setTodos({ ...todos });
    };

    return (
        <div className="App">
            {allTodos.map((todo: any) => {
                let filteredTodos = todos[todo.id];

                // Filter tasks by clicking on the "Active" button.
                if (todo.filter === "active") {
                    filteredTodos = todos[todo.id].filter(
                        (item: any) => item.isDone === false
                    );
                }

                // Filter tasks by clicking on the "Completed" button.
                if (todo.filter === "completed") {
                    filteredTodos = todos[todo.id].filter(
                        (item: any) => item.isDone === true
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
                    />
                );
            })}
        </div>
    );
}

export default App;
