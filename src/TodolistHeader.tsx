import React from 'react';
import {TaskType} from "./Todolist";

type TodolistHeaderPropsType = {
    title: string
}

const TodolistHeader = (props: TodolistHeaderPropsType) => {
    return <h3>{props.title}</h3>
};

export default TodolistHeader;