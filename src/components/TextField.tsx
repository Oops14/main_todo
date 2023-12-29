import React from "react";

type TextFieldType = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    ErrorMessage?: boolean;
    onBlur?: () => void;
    newTitle?: (
        todoItemTile: string,
        todoItemId: string,
        todoListId: string
    ) => void;
};

export const TextField = (props: TextFieldType) => {
    return (
        <>
            <input value={props.value} onChange={props.onChange} onBlur={props.onBlur} autoFocus/>

            {/* Show the "Required title" message below form. */}
            {props.ErrorMessage && (
                <div className="error-input-message">Title is required!</div>
            )}
        </>
    );
};
