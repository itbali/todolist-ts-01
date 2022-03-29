import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: "REMOVE-TODO-LIST"
    id: string
}

export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    newTitle: string
}

export type ChangeTodoListAT = {
    type: "CHANGE-TODO-FILTER"
    id: string
    filter: FilterValuesType
}

export type ChangeTodoListTitleAT = {
    title: string
    id: string
    type: "CHANGE-TODOLIST-TITLE"
}



export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListAT | ChangeTodoListTitleAT

export const todolistReducer = (todoLists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODO-LIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            let newId = v1();
            return [...todoLists,
                {id: newId, title: action.newTitle, filter: "all"}
            ]
        case "CHANGE-TODO-FILTER":
            return todoLists.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(el => el.id === action.id ? {...el, title: action.title} : el)
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (id:string) : RemoveTodoListAT=>{
    return {
        type: "REMOVE-TODO-LIST",
        id: id
    }
};
export const AddTodoListAC = (newTitle:string) : AddTodoListAT=>{
    return {
        type: "ADD-TODOLIST",
        newTitle
    }
};
export const ChangeTodoListAC = (id:string, filter:FilterValuesType) : ChangeTodoListAT=>{
    return {
        type: "CHANGE-TODO-FILTER",
        filter,
        id
    }
};
export const ChangeTodoListTitleAC = (id:string, title:string) : ChangeTodoListTitleAT=>{
    return {
        type: "CHANGE-TODOLIST-TITLE",
        title,
        id
    }
};