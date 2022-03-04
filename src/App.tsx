import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskObjectType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskObjectType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    // let [filter, setFilter] = useState<FilterValuesType>("all");




    function changeStatus(todolistId:string,taskId: string, isDone: boolean) {
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }

        // setTasks([...tasks]);

        setTasks({...tasks, [todolistId]:tasks[todolistId].map(el=>el.id===taskId?{...el,isDone}: {...el})})
       }


    function changeFilter(todolistId:string, value: FilterValuesType) {
        // setFilter(value);
    setTodolists(todolists.map(el=>el.id===todolistId?{...el,filter:value}:{...el}))
    }

    function removeTask(todolistId:string, id: string) {
        setTasks({...tasks,[todolistId]:tasks[todolistId].filter(el=>el.id!==id)});
    }

    const removeTodolist = (todolistId:string) => {
        setTodolists(todolists.filter(el=>el.id!==todolistId))
        delete tasks[todolistId]
        console.log(tasks)
    }

    function addTask(todolistId:string, title: string) {

         let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks,[todolistId]:[newTask,...tasks[todolistId]]})
    }

    return (

        <div className="App">
            {
                todolists.map(el => {

                        let tasksForTodolist = tasks[el.id];

                        if (el.filter === "active") {
                            tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                        }
                        if (el.filter === "completed") {
                            tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                        }

                        return (<Todolist
                            removeTodolist={removeTodolist}
                            key={el.id}
                            todolistId={el.id}
                            title={el.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={el.filter}
                        />)
                    }
                )


            }
        </div>
    )
}

export default App;
