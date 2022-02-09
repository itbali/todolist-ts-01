import React from 'react';
import {TaskType} from "./Todolist";

type PropsTaskType = {
    tasks: Array<TaskType>
    removeTask: (id:number)=>void
}

export const Tasks = (props: PropsTaskType) => {
    return (
        <ul>
            {
                props.tasks.map( t =>
                    <li>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={ ()=> { props.removeTask(t.id) } }>x</button>
                    </li>
                )
            }
        </ul>
    );
};
