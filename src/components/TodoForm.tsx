import React, { useState } from "react";
import { ButtonMain } from "./buttons/ButtonMain";

type TodoFormType = {
    addTodo: (addTodo: any, todoId: string) => void;
    todoId: string;
};

export const TodoForm = (props: TodoFormType) => {
    const [item, setItem] = useState("");
    const [error, setError] = useState(true);
    // React.useEffect(() => console.log("data", item), [item]);

    const addTask = () => {
        item.trim() !== ""
            ? props.addTodo(item, props.todoId)
            : alert("The task cannot be empty!");

        setItem("");
        setError(true);
    };

    return (
        <div className="todo-form">
            <div>
                <input
                    value={item}
                    onChange={(e) => {
                        e.preventDefault();

                        // Show the "Required title" message below form.
                        e.currentTarget.value
                            ? setError(false)
                            : setError(true);

                        setItem(e.currentTarget.value);
                    }}
                />
                {/* Show the "Required title" message below form. */}
                {error && (
                    <div className="error-input-message">
                        Title is required!
                    </div>
                )}
            </div>
            <ButtonMain title={"+"} addTask={addTask} variant={"contained"}/>
        </div>
    );
};