import React, { useState } from "react";
import { ButtonMain } from "./buttons/ButtonMain";
import { TextField } from "./TextField";

type TodoItemFormType = {
    addNewTodo: (addTodoTitle: any) => void;
    // todoId: string;
};

export const TodoItemForm = (props: TodoItemFormType) => {
    const [taskTitle, setTaskTitle] = useState("");
    const [error, setError] = useState(true);
    // React.useEffect(() => console.log("New Todo List", value), [value]);

    const addTask = () => {
        taskTitle.trim() !== ""
            ? props.addNewTodo(taskTitle)
            : alert("The task cannot be empty!");

        setTaskTitle("");
        setError(true);
    };

    const showError = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        // Show the "Required title" message below form.
        e.currentTarget.value ? setError(false) : setError(true);

        setTaskTitle(e.currentTarget.value);
    };

    return (
        <div className="add-todo-form">
            <div>
                <TextField
                    value={taskTitle}
                    onChange={showError}
                    ErrorMessage={error}
                />
            </div>
            <ButtonMain title={"+"} addTask={addTask} variant={"contained"} />
        </div>
    );
};
