import React, { useState } from "react";

type TodoItemFormType = {
    addNewTodo: (addTodoTitle: any) => void;
    // todoId: string;
};

export const TodoItemForm = (props: TodoItemFormType) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState(true);
    // React.useEffect(() => console.log("New Todo List", value), [value]);

    return (
        <div className="">
            <div>
                <input
                    value={value}
                    onChange={(e) => {
                        e.preventDefault();

                        // Show the "Required title" message below form.
                        e.currentTarget.value ? setError(false) : setError(true);

                        setValue(e.currentTarget.value);
                    }}
                />
                {/* Show the "Required title" message below form. */}
                {error && <div className="error-input-message">Title is required!</div>}
            </div>
            <button
                onClick={() => {
                    value.trim() !== ""
                        ? props.addNewTodo(value)
                        : alert("The task cannot be empty!");
                    setValue("");
                    setError(true);
                }}
            >
                +
            </button>
        </div>
    );
};
