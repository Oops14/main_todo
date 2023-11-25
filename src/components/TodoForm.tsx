import React, { useState } from "react";

type TodoFormType = {
    addTodo: (addTodo: any) => void;
};

export const TodoForm = (props: TodoFormType) => {
    const [item, setItem] = useState("");
    // React.useEffect(() => console.log("data", item), [item]);

    return (
        <div className="todo-form">
            <input
                value={item}
                onChange={(e) => {
                    e.preventDefault();

                    setItem(e.target.value);
                }}
            />
            <button
                onClick={() => {
                    item.trim() !== '' ? props.addTodo(item) : alert('The task cannot be empty!');
                    setItem("");
                }}
            >
                +
            </button>
        </div>
    );
};
