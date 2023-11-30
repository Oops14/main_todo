import React, { useState } from "react";
import "./App.css";
import { TodoList } from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";

export type TodosType = {
    id: string;
    todoItemName: string;
    isDone?: boolean;
};

export type FilterType = "all" | "completed" | "active";

function App() {
    const [todos, setTodos] = useState<Array<TodosType>>([]);
    React.useEffect(() => console.log("data", todos), [todos]);

    const [filter, setFilter] = useState<FilterType>("all");
    // React.useEffect(() => console.log("data", filter), [filter]);

    let filterHandler = (filterValue: FilterType) => {
        setFilter(filterValue);
    };

    let filteredTodos = todos;

    // Filter tasks by clicking on the "Active" button.
    if (filter === "active") {
        filteredTodos = todos.filter(item => item.isDone === false);
    }

    // Filter tasks by clicking on the "Completed" button.
    if (filter === "completed") {
        filteredTodos = todos.filter(item => item.isDone === true);
    }

    // Add tasks from the input to the state.
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
        let removeTodoItem = todos.filter(item => item.id !== id);
        setTodos(removeTodoItem);
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
