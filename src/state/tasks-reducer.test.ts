import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./tasks-reducer";
import { TodoListType } from "../App";

test("correct task should be deleted from correct array", () => {
    const startState: TodoListType = {
        todolistId1: [
            { id: "1", todoItemName: "CSS", isDone: false },
            { id: "2", todoItemName: "JS", isDone: true },
            { id: "3", todoItemName: "React", isDone: false },
        ],
        todolistId2: [
            { id: "1", todoItemName: "bread", isDone: false },
            { id: "2", todoItemName: "milk", isDone: true },
            { id: "3", todoItemName: "tea", isDone: false },
        ],
    };

    const action = removeTaskAC("2", "todolistId2");
    const endState = tasksReducer(startState, action);

    expect(endState).toEqual({
        todolistId1: [
            { id: "1", todoItemName: "CSS", isDone: false },
            { id: "2", todoItemName: "JS", isDone: true },
            { id: "3", todoItemName: "React", isDone: false },
        ],
        todolistId2: [
            { id: "1", todoItemName: "bread", isDone: false },
            { id: "3", todoItemName: "tea", isDone: false },
        ],
    });
});

test("the task should be added to the correct todolist", () => {
    const startState: TodoListType = {
        todolistId1: [
            { id: "1", todoItemName: "CSS", isDone: false },
            { id: "2", todoItemName: "JS", isDone: true },
            { id: "3", todoItemName: "React", isDone: false },
        ],
        todolistId2: [
            { id: "1", todoItemName: "bread", isDone: false },
            { id: "3", todoItemName: "tea", isDone: false },
        ],
    };

    const action = addTaskAC("juce", "todolistId2");
    const endState = tasksReducer(startState, action);

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].todoItemName).toBe("juce");
    expect(endState["todolistId2"][0].isDone).toBe(false);
});

test("status of specified task should be changed", () => {
    const startState: TodoListType = {
        todolistId1: [
            { id: "1", todoItemName: "CSS", isDone: false },
            { id: "2", todoItemName: "JS", isDone: true },
            { id: "3", todoItemName: "React", isDone: false },
        ],
        todolistId2: [
            { id: "1", todoItemName: "bread", isDone: false },
            { id: "2", todoItemName: "milk", isDone: true },
            { id: "3", todoItemName: "tea", isDone: false },
        ],
    };

    const action = changeTaskStatusAC("2", false, "todolistId2");

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId2"][1].isDone).toBe(false);
    expect(endState["todolistId2"][1].id).toBeDefined();
});

test("change task title", () => {
    const startState: TodoListType = {
        todolistId1: [
            { id: "1", todoItemName: "CSS", isDone: false },
            { id: "2", todoItemName: "JS", isDone: true },
            { id: "3", todoItemName: "React", isDone: false },
        ],
        todolistId2: [
            { id: "1", todoItemName: "bread", isDone: false },
            { id: "2", todoItemName: "milk", isDone: true },
            { id: "3", todoItemName: "tea", isDone: false },
        ],
    };

    const action = changeTaskTitleAC("2", "new Title", "todolistId2");

    const endState = tasksReducer(startState, action);
    expect(endState["todolistId2"][1].todoItemName).toBe("new Title");
});
