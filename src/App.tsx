import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = 'all'|'active'|'completed'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML & CSS", isDone: false},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: true},
    ])

    const [filter, setFilter] = useState<FilterValuesType>( 'active')

    function removeTask (id: number) {
        const filteredTasks = tasks.filter( t=> t.id !== id)
        setTasks(filteredTasks)
    }
    
    const changeFilter = (filter: FilterValuesType) => {
      setFilter(filter)
    }

    const getFilterTasksForRender = () => {
      switch (filter) {
          case "completed":
              return tasks.filter(t => t.isDone===true)
          case "active":
              return tasks.filter(t => t.isDone===false)
          default:
              return tasks
      }

    }
    
    const FilterTasksForRender = getFilterTasksForRender()
    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={FilterTasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
