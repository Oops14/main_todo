import axios from "axios";
import {FilterType} from "../AppWithRedux";

export type TodolistType = {
    id: string;
    addedDate: string;
    order: number;
    title: string;
};

type FieldErrorType = {
    error: string;
    field: string;
};

type ResponseType<D = {}> = {
    resultCode: number;
    messages: Array<string>;
    fieldsErrors: Array<string>;
    data: D;
};

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "e978cee6-9052-4e00-8ce2-2c6237679e1a",
    },
});

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType>(`todo-lists/${todolistId}`, {
            title: title,
        });
        return promise;
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType>(
            `todo-lists/${todolistId}`
        );
        return promise;
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>>(
            "todo-lists",
            {
                title: title,
            }
        );
        return promise;
    },
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>("todo-lists");
        return promise;
    },
};
