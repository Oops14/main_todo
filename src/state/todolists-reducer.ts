import { AllTodoListsType, TodoListType } from "../AppWithRedux";
import {Dispatch} from "redux";
import {todolistAPI, TodolistType} from "../api/todolists-api";

type filterTodoACType = ReturnType<typeof filterTodoAC>;
type removeTodoACType = ReturnType<typeof removeTodoAC>;
type addTodoListACType = ReturnType<typeof addTodoListAC>;
type editTodoListACType = ReturnType<typeof editTodoListAC>;
export type getTodolistsACType = ReturnType<typeof getTodolistsAC>;

export type ActionsTodolistsType = filterTodoACType | removeTodoACType | addTodoListACType | editTodoListACType | getTodolistsACType;

export const filterTodoAC = (todoListId: string, filterValue: string) => {
    return {
        type: "FILTER_TODOLIST",
        payload: {
            todoListId,
            filterValue,
        },
    } as const;
};

export const removeTodoAC = (todoListId: string, tasks: TodoListType) => {
    return {
        type: "REMOVE_TODOLIST",
        payload: {
            todoListId,
            tasks,
        },
    } as const;
};

export const addTodoListAC = (todoTile: string, todoListId: string) => {
    return {
        type: "ADD_TODOLIST",
        payload: {
            todoTile,
            todoListId,
        },
    } as const;
};

export const editTodoListAC = (todoTile: string, todoId: string) => {
    return {
        type: "EDIT_TODOLIST",
        payload: {
            todoTile,
            todoId,
        },
    } as const;
};

let initialStateTodoLists: AllTodoListsType[] = [];

export const getTodolistsAC = (todolists: TodolistType[]) => {
    return {
        type: "GET_TODOLISTS",
        payload: {
            todolists
        },
    } as const;
};

export  const getTodolistsTC = (dispatch: Dispatch) => {
    todolistAPI.getTodolists().then((res) => {
        dispatch(getTodolistsAC(res.data))
    })
}

export const todolistsReducer = (
    state = initialStateTodoLists,
    action: ActionsTodolistsType
): AllTodoListsType[] => {
    switch (action.type) {
        case "GET_TODOLISTS": {
            return action.payload.todolists.map((item) => ({...item, filter: 'all'}));
        }
        case "FILTER_TODOLIST": {
            let filtered = state.map((item: any) =>
                item.id === action.payload.todoListId
                    ? { ...item, filter: action.payload.filterValue }
                    : item
            );
            return filtered;
        }
        case "REMOVE_TODOLIST": {
            let removeListOfTasks = state.filter(
                (item) => item.id !== action.payload.todoListId
            );
            delete action.payload.tasks[action.payload.todoListId];
            return removeListOfTasks;
        }
        case "ADD_TODOLIST": {
            let newTodoList: AllTodoListsType = {
                id: action.payload.todoListId,
                title: action.payload.todoTile,
                filter: "all",
            };

            return [...state, newTodoList];
        }
        case "EDIT_TODOLIST": {
            let newTodoList = state.map((item) =>
                item.id === action.payload.todoId ? { ...item, title: action.payload.todoTile } : item
            );
            return newTodoList;
        }
        default: {
            return state;
        }
    }
};
