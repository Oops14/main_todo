import { AllTodoListsType, TodoListType } from "../AppWIthReducers";
import { v4 as uuidv4 } from "uuid";

type filterTodoACType = ReturnType<typeof filterTodoAC>;
type removeTodoACType = ReturnType<typeof removeTodoAC>;
type addTodoListACType = ReturnType<typeof addTodoListAC>;

type ActionsType = filterTodoACType | removeTodoACType | addTodoListACType;

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
            todoTile, todoListId
        },
    } as const;
};

export const todolistsReducer = (
    state: AllTodoListsType[],
    action: ActionsType
): AllTodoListsType[] => {
    switch (action.type) {
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
        default:
            return state;
    }
};
