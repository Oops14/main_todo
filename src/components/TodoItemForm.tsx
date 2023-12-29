import React, { useState } from "react";
import { ButtonMain } from "./buttons/ButtonMain";
import { TextField } from "./TextField";

type TodoItemFormType = {
    addNewTodo: (addTodoTitle: any) => void;
    // todoId: string;
};

export const TodoItemForm = (props: TodoItemFormType) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState(true);
    // React.useEffect(() => console.log("New Todo List", value), [value]);

    const addTask = () => {
        value.trim() !== ""
            ? props.addNewTodo(value)
            : alert("The task cannot be empty!");

        setValue("");
        setError(true);
    };

    const showError = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        // Show the "Required title" message below form.
        e.currentTarget.value
            ? setError(false)
            : setError(true);

        setValue(e.currentTarget.value);
    }

    return (
        <div className="add-todo-form">
            <div>
                <TextField value={value} onChange={showError} ErrorMessage={error}/>
            </div>
            <ButtonMain title={"+"} addTask={addTask} variant={"contained"} />
        </div>
    );
};
