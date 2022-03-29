import React, {useState, KeyboardEvent,FocusEvent, MouseEvent, ChangeEvent} from 'react';
import {Box, TextField} from "@material-ui/core";

type EditableSpanProps = {
    oldTitle: string
    callback:(title:string)=>void
}

const EditableSpan = (props: EditableSpanProps) => {
    const [edit, setEdit] = useState(false)
    const [editTitle,setEditTitle] = useState(props.oldTitle)

    const doubleClickHandler = () => {
        props.callback(editTitle)
        setEdit(!edit)
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        setEditTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            doubleClickHandler()
        }
    }

    return (
        edit
            ? <TextField onChange={onChangeHandler} autoFocus onBlur={doubleClickHandler} onKeyPress={onKeyPressHandler} type="text" value={editTitle}/>
            : <span onDoubleClick={doubleClickHandler}>{props.oldTitle}</span>
    );
};

export default EditableSpan;