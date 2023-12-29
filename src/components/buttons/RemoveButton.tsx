import IconButton from "@mui/material/IconButton";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

type RemoveButtonType = {
    onClick: () => void;
}

export const RemoveButton = (props: RemoveButtonType) => {
    return (
        <IconButton
            aria-label="delete"
            onClick={props.onClick}
            color="primary"
        >
            <DeleteIcon fontSize="small"/>
        </IconButton>
    );
};
