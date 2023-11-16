import React, {useState} from "react";
import {v4 as uuidv4} from "uuid";
import {TodoForm} from "./TodoForm";

type TodosType = {
    id: string;
    todoItemName: string;
    isDone?: boolean;
};

export const TodoList = () => {
    const [todos, setTodos] = useState<Array<TodosType>>([]);
    React.useEffect(() => console.log("data", todos), [todos]);

    const [check, setChecked] = useState<boolean>(true);
    // React.useEffect(() => console.log("data", check), [check]);

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

    let isChecked = (id: string) => {
        setTodos(
            todos.map((item) =>
                item.id === id ? {...item, isDone: check} : item
            )
        );
        setChecked(!check);
    };

    return (
        <div>
            <h3>What to learn</h3>
            <TodoForm addTodo={addTodo}/>
            <ul className="todo-list">
                {todos.map((item) => {
                    return (
                        <li
                            key={item.id}
                            className={
                                item.isDone ? "todo-item done" : "todo-item"
                            }
                        >
                            <input
                                type="checkbox"
                                checked={item.isDone}
                                onChange={() => {
                                    isChecked(item.id);
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
