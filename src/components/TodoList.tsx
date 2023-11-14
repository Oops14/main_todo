import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoForm } from "./TodoForm";

type TodosType = {
    id: string;
    todoItemName: string;
    isDone?: boolean;
};

export const TodoList = () => {
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

    return (
        <div>
            <h3>What to learn</h3>
            <TodoForm addTodo={addTodo} />
            <ul className="todo-list">
                {todos.map((item) => {
                    return (
                        <li key={item.id}>
                            <input
                                type="checkbox"
                                onClick={() => {
                                    item.isDone
                                        ? (item.isDone = false)
                                        : (item.isDone = true);
                                }}
                            />
                            <span>{item.todoItemName}</span>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};
