import axios from "axios";

let settings = {
    withCredentials: true,
    headers: {
        "api-key": "e978cee6-9052-4e00-8ce2-2c6237679e1a",
    },
};

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        "api-key": "e978cee6-9052-4e00-8ce2-2c6237679e1a",
    },
});

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export type TaskType = {
    description: string;
    title: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
};

export type UpdateTaskModelType = {
    title: string;
    description: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
};

export type GetTasksResponse = {
    error: string | null;
    totalCount: number;
    items: TaskType[];
};

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    createTask(todoListId: string, title: string) {
        const promise = axios.post(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}/tasks`,
            { title: title },
            settings
        );
        return promise;
    },
    deleteTask(todoListId: string, taskId: string) {
        const promise = axios.delete(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}/tasks/${taskId}`,
            settings
        );
        return promise;
    },
    updateTask(todoListId: string, taskId: string, title: string) {
        const promise = axios.put(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}/tasks/${taskId}`,
            { title: title },
            settings
        );
        return promise;
    },
};
