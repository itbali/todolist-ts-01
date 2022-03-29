import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItem} from './components/AddItem';
import EditableSpan from "./components/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    updateTask: (todolistId: string, taskId: string, title: string) => void
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTodolistTitle: (todolistId: string, title: string) => void
}

export function Todolist(props: PropsType) {


    // let [title, setTitle] = useState("")
    // let [error, setError] = useState<string | null>(null)

    // const addTask = () => {
    //     let newTitle = title.trim();
    //     if (newTitle !== "") {
    //         props.addTask(newTitle, props.id);
    //         setTitle("");
    //     } else {
    //         setError("Title is required");
    //     }
    // }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }
    //
    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.charCode === 13) {
    //         addTask();
    //     }
    // }

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const addTaskHandler = (title: string) => {
        props.addTask(title, props.id)
    }

    const updateTaskHandler = (title: string, taskId: string) => {
        props.updateTask(props.id, taskId, title)
    }

    const updateTodolistTitleHandler = (title: string) => {
        props.updateTodolistTitle(props.id, title)
    }

    return <div>
        <h3>
            <EditableSpan oldTitle={props.title} callback={updateTodolistTitleHandler}/>
            {/*{props.title}*/}
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
            {/*<button onClick={removeTodolist}>x</button>*/}
        </h3>

        <AddItem callBack={addTaskHandler}/>


        {/*<div>*/}
        {/*    <input value={title}*/}
        {/*           onChange={onChangeHandler}*/}
        {/*           onKeyPress={onKeyPressHandler}*/}
        {/*           className={error ? "error" : ""}*/}
        {/*    />*/}
        {/*    <button onClick={addTask}>+</button>*/}
        {/*    {error && <div className="error-message">{error}</div>}*/}
        {/*</div>*/}
        <List>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox onChange={onChangeHandler} checked={t.isDone} size={'small'} color={'primary'}/>
                        <EditableSpan callback={(editTitle) => updateTaskHandler(editTitle, t.id)} oldTitle={t.title}/>
                        {/*<span>{t.title}</span>*/}
                        <IconButton onClick={onClickHandler} size={'small'}>
                            <Delete fontSize={'small'} color={'secondary'}/>
                        </IconButton>
                    </li>

                })
            }
        </List>
        <ButtonGroup size={'small'}
                     variant={'contained'}
        >
            <Button
                color={props.filter === 'all' ? 'primary' : 'secondary'}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                color={props.filter === 'active' ? 'primary' : 'secondary'}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                color={props.filter === 'completed' ? 'primary' : 'secondary'}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </ButtonGroup>
    </div>
}


