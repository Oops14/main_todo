import Button from "@mui/material/Button";
import { ReactElement } from "react";

type ButtonType = {
    title: ReactElement | string;
    addTask?: () => void;
    variant?: any;
};

export const ButtonMain = (props: ButtonType) => {
    return (
        <Button variant={props.variant} size="small" onClick={props.addTask} >
            {props.title}
        </Button>
    );
};
