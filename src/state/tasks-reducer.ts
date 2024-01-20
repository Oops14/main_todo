import { TodoListType } from "../App";
import { v4 as uuidv4 } from "uuid";

export type removeTaskActionType = ReturnType<typeof removeTaskAC>;
export type addTaskActionType = ReturnType<typeof addTaskAC>;
export type changeStatusActionType = ReturnType<typeof changeTaskStatusAC>;
export type changeTitleActionType = ReturnType<typeof changeTaskTitleAC>;

type ActionsType =
    | removeTaskActionType
    | addTaskActionType
    | changeStatusActionType
    | changeTitleActionType;

export const removeTaskAC = (id: string, todoListId: string) => {
    return {
        type: "REMOVE_TASK",
        payload: {
            id,
            todoListId,
        },
    } as const;
};

export const addTaskAC = (title: string, todoListId: string) => {
    return {
        type: "ADD_TASK",
        payload: {
            title,
            todoListId,
        },
    } as const;
};

export const changeTaskStatusAC = (
    id: string,
    status: boolean,
    todoListId: string
) => {
    return {
        type: "CHANGE_STATUS",
        payload: {
            id,
            status,
            todoListId,
        },
    } as const;
};

export const changeTaskTitleAC = (
    id: string,
    title: string,
    todoListId: string
) => {
    return {
        type: "CHANGE_TITLE",
        payload: {
            id,
            title,
            todoListId,
        },
    } as const;
};

export const tasksReducer = (
    state: TodoListType,
    action: ActionsType
): TodoListType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            let todoListOfTasks = state[action.payload.todoListId];
            state[action.payload.todoListId] = todoListOfTasks.filter(
                (item) => item.id !== action.payload.id
            );
            return { ...state };
        }
        case "ADD_TASK": {
            let todoListOfTasks = state[action.payload.todoListId];
            let task = {
                id: uuidv4(),
                todoItemName: action.payload.title,
                isDone: false,
            };

            state[action.payload.todoListId] = [task, ...todoListOfTasks];
            return { ...state };
        }
        case "CHANGE_STATUS": {
            let task = state[action.payload.todoListId].find(
                (item) => item.id === action.payload.id
            );

            if (task) {
                task.isDone = action.payload.status;
                return { ...state };
            }
            return { ...state };
        }
        case "CHANGE_TITLE": {
            let todoListItem = state[action.payload.todoListId].map((item) =>
                item.id === action.payload.id
                    ? { ...item, todoItemName: action.payload.title }
                    : item
            );
            return { ...state, [action.payload.todoListId]: todoListItem };
        }
    }

    return state;
};
