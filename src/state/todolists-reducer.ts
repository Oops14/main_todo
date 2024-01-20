import { AllTodoListsType, TodoListType } from "../AppWIthReducers";

type filterTodoACType = ReturnType<typeof filterTodoAC>;
type removeTodoACType = ReturnType<typeof removeTodoAC>;

type ActionsType = filterTodoACType | removeTodoACType;

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
            // setTodos({ ...todos });
            return removeListOfTasks;
        }
        default:
            return state;
    }
};
