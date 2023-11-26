import React, { ChangeEvent, useState } from "react";
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
            <TodoList todos={todos} isChecked={isChecked} removeItem={removeItem} addTodo={addTodo} />
        </div>
    );
}

export default App;
