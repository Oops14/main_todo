import React, { useState } from "react";
import { ButtonMain } from "./buttons/ButtonMain";
import { TextField } from "./TextField";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

type TodoFormType = {
    addTodo: (addTodo: any, todoId: string) => void;
    todoId: string;
};

export const TodoForm = (props: TodoFormType) => {
    const [todoTitle, settodoTitle] = useState("");
    const [error, setError] = useState(true);
    // React.useEffect(() => console.log("data", todoTitle), [todoTitle]);

    const addTask = () => {
        todoTitle.trim() !== ""
            ? props.addTodo(todoTitle, props.todoId)
            : (() => {
                  alert("The task cannot be empty!");
                  setError(true);
              })();

        settodoTitle("");
    };

    const showError = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        // Show the "Required title" message below form.
        e.currentTarget.value ? setError(false) : setError(true);

        settodoTitle(e.currentTarget.value);
    };

    const showErrorWhenEmpty = () => {
        setError(false);
    };

    return (
        <div className="todo-form">
            <div>
                <TextField
                    value={todoTitle}
                    onBlur={showErrorWhenEmpty}
                    onChange={showError}
                    ErrorMessage={error}
                />
            </div>
            <ButtonMain
                title={<PlaylistAddIcon />}
                addTask={addTask}
                variant={"contained"}
            />
        </div>
    );
};
