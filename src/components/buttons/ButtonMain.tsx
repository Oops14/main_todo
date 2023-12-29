import Button from "@mui/material/Button";

type ButtonType = {
    title: string;
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
