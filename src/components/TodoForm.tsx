import React, { useState } from "react";

type TodoFormType = {
    addTodo: (addTodo: any) => void;
};

export const TodoForm = (props: TodoFormType) => {
    const [item, setItem] = useState("");
    const [error, setError] = useState(true);
    // React.useEffect(() => console.log("data", item), [item]);

    return (
        <div className="todo-form">
            <div>
                <input
                    value={item}
                    onChange={(e) => {
                        e.preventDefault();

                        // Show the "Required title" message below form.
                        e.currentTarget.value ? setError(false) : setError(true);

                        setItem(e.currentTarget.value);
                    }}
                />
                {/* Show the "Required title" message below form. */}
                {error && <div className="error-input-message">Title is required!</div>}
            </div>
            <button
                onClick={() => {
                    item.trim() !== ""
                        ? props.addTodo(item)
                        : alert("The task cannot be empty!");
                    setItem("");
                    setError(true);
                }}
            >
                +
            </button>
        </div>
    );
};
