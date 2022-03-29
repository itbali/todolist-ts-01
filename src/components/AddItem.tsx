import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";

type PropTypes = {
    callBack: (title: string) => void
}

export const AddItem = (props: PropTypes) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.callBack(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    return (
        <div>
            <TextField
                label="Title"
                variant="outlined"
                value={title}
                size={'small'}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                // className={error ? "error" : ""}
                error={!!error}
                helperText={!!error&& 'Enter some text'}
            />
            <IconButton onClick={addTask} size={'small'}>
                <AddCircleOutline color={'primary'}/>
            </IconButton>
            {/*<button onClick={addTask}>+</button>*/}
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    );
};
