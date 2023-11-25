import React, {ChangeEvent, useState} from "react";
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
        let task = todos.find(item => item.id === id);

        if (task) {
            task.isDone = isDone;
            setTodos([...todos]);
        }
    };

    let removeItem = (id: any) => {
        setTodos(todos.filter((item) => item.id !== id ? {...item} : ""));
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        let newIsDoneValue = e.currentTarget.checked;
        isChecked(id, newIsDoneValue);
    }

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
                                onChange={(e) => {
                                    onChangeHandler(e, item.id);
                                }}
                            />
                            <span className={'todo-item-name'}>{item.todoItemName} </span>
                            <button onClick={() => {
                                removeItem(item.id);
                            }}>x
                            </button>
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
