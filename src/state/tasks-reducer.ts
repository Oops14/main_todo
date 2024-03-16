import {TodoListType} from "../AppWithRedux";
import {getTodolistsACType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TaskType, tasksApi, UpdateTaskModelType, TaskStatuses, UpdateDomainTaskModelType} from "../api/tasks-api";
import {AppRootStateType} from "./store";

export type removeTaskActionType = ReturnType<typeof removeTaskAC>;
export type addTaskActionType = ReturnType<typeof addTaskAC>;
export type changeStatusActionType = ReturnType<typeof changeTaskStatusAC>;
export type changeTitleActionType = ReturnType<typeof changeTaskTitleAC>;
export type addTodoListTasksACType = ReturnType<typeof addTodoListTasksAC>;
export type getTasksACType = ReturnType<typeof getTasksAC>;

export type ActionsType =
    | removeTaskActionType
    | addTaskActionType
    | changeStatusActionType
    | changeTitleActionType
    | addTodoListTasksACType
    | getTodolistsACType
    | getTasksACType;

export const removeTaskAC = (id: string, todoListId: string) => {
    return {
        type: "REMOVE_TASK",
        payload: {
            id,
            todoListId,
        },
    } as const;
};

export const addTaskAC = (todoListId: string, task: TaskType) => {
    return {
        type: "ADD_TASK",
        payload: {
            task,
            todoListId,
        },
    } as const;
};

export const changeTaskStatusAC = (
    id: string,
    status: TaskStatuses,
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

export const getTasksAC = (tasks: TaskType[], todolistId: string) => {
    return {
        type: "GET_TASKS",
        payload: {
            tasks,
            todolistId,
        },
    } as const;
};

export const addTodoListTasksAC = (todoTile: string, todoListId: string) => {
    return {
        type: "ADD_TODOLIST",
        payload: {
            todoTile,
            todoListId,
        },
    } as const;
};

let initialStateTasks: TodoListType = {};

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId).then((res) => {
        dispatch(getTasksAC(res.data.items, todolistId));
    });
};

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    tasksApi.createTask(todolistId, title).then((res) => {
        dispatch(addTaskAC(todolistId, res.data.data.item));
    });
};

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksApi.deleteTask(todolistId, taskId).then((res) => {
        dispatch(removeTaskAC(taskId, todolistId));
    })
}

export const updateTaskTC = (todoListId: string, newValue: UpdateDomainTaskModelType, taskId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    let tasks = getState().tasks;
    let task = tasks[todoListId].find(task => task.id === taskId);

    if (task) {
        let model: UpdateTaskModelType = {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
            ...newValue
        }

        tasksApi.updateTask(todoListId, taskId, model).then((res) => {
            if (newValue.title !== undefined) {
                dispatch(changeTaskTitleAC(taskId, model.title, todoListId));
            } else if (newValue.status !== undefined) {
                dispatch(changeTaskStatusAC(taskId, model.status, todoListId));
            }
        });
    }

}

export const tasksReducer = (
    state = initialStateTasks,
    action: ActionsType
): TodoListType => {
    switch (action.type) {
        case "GET_TASKS": {
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks.map(
                    (item: any) => item
                ),
            };
        }
        case "REMOVE_TASK": {
            let todoListOfTasks = state[action.payload.todoListId];
            state[action.payload.todoListId] = todoListOfTasks.filter(
                (item) => item.id !== action.payload.id
            );
            return {...state};
        }
        case "ADD_TASK": {
            let todoListOfTasks = state[action.payload.todoListId];

            let task: TaskType = {
                ...action.payload.task,
                title: action.payload.task.title,
            };

            return {
                ...state,
                [action.payload.todoListId]: [task, ...todoListOfTasks],
            };
        }
        case "CHANGE_STATUS": {
            let task = state[action.payload.todoListId].find(
                (item) => item.id === action.payload.id
            );

            if (task) {
                task.status = action.payload.status;
                return {...state};
            }

            return state;

            // let todolistTasks = state[action.payload.todoListId];
            // let newTasksArray = todolistTasks.map(t => t.id === action.payload.id ? {
            //     ...t,
            //     status: action.payload.status
            // } : t);
            //
            // state[action.payload.todoListId] = newTasksArray;
            // return ({...state});
        }
        case "CHANGE_TITLE": {
            let todoListItem = state[action.payload.todoListId].map((item) =>
                item.id === action.payload.id
                    ? {...item, title: action.payload.title}
                    : item
            );

            return {...state, [action.payload.todoListId]: todoListItem};
        }
        default: {
            return state;
        }
    }
};
