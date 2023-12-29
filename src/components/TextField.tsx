import React from "react";

type TextFieldType = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    ErrorMessage?: boolean;
};

export const TextField = (props: TextFieldType) => {
    return (
        <>
            <input value={props.value} onChange={props.onChange} />

            {/* Show the "Required title" message below form. */}
            {props.ErrorMessage && (
                <div className="error-input-message">Title is required!</div>
            )}
        </>
    );
};
