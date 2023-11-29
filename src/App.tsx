import React, { useState } from "react";
import "./App.css";
import { TodoList } from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";

export type TodosType = {
    id: string;
    todoItemName: string;
    isDone?: boolean;
};

function App() {
    const [todos, setTodos] = useState<Array<TodosType>>([]);
    React.useEffect(() => console.log("data", todos), [todos]);

    const [filter, setFilter] = useState<"all" | "completed" | "active">("all");
    // React.useEffect(() => console.log("data", filter), [filter]);

    let filterHandler = (filterValue: "all" | "completed" | "active") => {
        setFilter(filterValue);
    };

    let filteredTodos = todos;

    if (filter === "active") {
        filteredTodos = todos.filter(item => item.isDone === false);
    }

    if (filter === "completed") {
        filteredTodos = todos.filter(item => item.isDone === true);
    }

    let addTodo = (addTodo: string) => {
        setTodos([
            ...todos,
            {
                id: uuidv4(),
                todoItemName: addTodo,
                isDone: false,
            },
        ]);
    };

    let isChecked = (id: string, isDone: boolean) => {
        let task = todos.find((item) => item.id === id);

        if (task) {
            task.isDone = isDone;
            setTodos([...todos]);
        }
    };

    let removeItem = (id: any) => {
        setTodos(todos.filter((item) => (item.id !== id ? { ...item } : "")));
    };

    return (
        <div className="App">
            <TodoList
                todos={filteredTodos}
                isChecked={isChecked}
                removeItem={removeItem}
                addTodo={addTodo}
                filterHandler={filterHandler}
            />
        </div>
    );
}

export default App;
