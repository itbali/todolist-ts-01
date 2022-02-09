import React from "react";
import TodolistHeader from "./TodolistHeader";
import {Tasks} from "./Task";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

export type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: number) => void;
    changeFilter: (filter: FilterValuesType) => void
}

export function Todolist(props: PropsType) {
    return (
        <div>
            <TodolistHeader title={props.title}/>
            <div>
                <input/>
                <button>+</button>
            </div>
            <Tasks tasks={props.tasks} removeTask={props.removeTask}/>
            <div>
                <button onClick={()=>props.changeFilter('all')}>All</button>
                <button onClick={()=>props.changeFilter('active')}>Active</button>
                <button onClick={()=>props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}