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

export type TaskType = {
    description: string;
    todoItemName: string;
    isDone: boolean;
    status: number;
    priority: number;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
}

const todolistId = "a4f6e28e-b1cd-4d4d-a3d8-619f0c291f79";

export const tasksApi = {
    getTasks(todolistId: string) {
        const promise = axios.get(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
            settings
        );
        return promise;
    },
    createTask(todoListId: string, title: string) {
        const promise = axios.post(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
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
