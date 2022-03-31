import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";
import {TasksStateType} from "../App"
import {AddTodoListAT, RemoveTodoListAT} from "./todolist-reducer";

export type addTaskAT = {
    type: "ADD-TASK"
    taskTitle: string
    todolistId: string
}

export type RemoveTaskAT = {
    type: "REMOVE-TASK"
    taskId: string
    todolistId: string
}

export type changeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    todolistId: string
    isDone: boolean
}
export type changeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    title: string
    todolistId: string
    taskID: string
}


export type ActionType = RemoveTaskAT | addTaskAT | changeTaskStatusAT | changeTaskTitleAT | AddTodoListAT | RemoveTodoListAT

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.taskTitle, isDone: false},
                    ...state[action.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    isDone: action.isDone
                } : el)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskID ? {
                    ...el,
                    title: action.title
                } : el)
            }
        case "ADD-TODOLIST":
            return{
                ...state,
                [action.todoListId]:[]
            }
        case "REMOVE-TODO-LIST":
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAT => {
    return {
        type: "REMOVE-TASK", taskId, todolistId
    }
};
export const addTaskAC = (taskTitle: string, todolistId: string): addTaskAT => {
    return {
        type: "ADD-TASK", taskTitle, todolistId,
    }
};
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusAT => {
    return {
        type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId,
    }
};
export const changeTaskTitleAC = (title: string, todolistId: string, taskID: string): changeTaskTitleAT => {
    return {
        type: "CHANGE-TASK-TITLE", title, todolistId, taskID
    }
};