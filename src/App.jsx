import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
  const [ showAddTask , setShowAddTask ] = useState(false)
  const [ tasks, setTasks ] = useState([
      {
          id: 1,
          text: "Doctor's Appointment",
          day: 'Sep 5th at 2:30pm',
          reminder: true
      },
      {
          id: 2,
          text: "School Meeting",
          day: 'Sep 6th at 12:30pm',
          reminder: true
      },
      {
          id: 3,
          text: "Grocery Shopping",
          day: 'Sep 5th at 6:30pm',
          reminder: false
      }
  ])

  const addTask = task => {
    const id = tasks[tasks.length - 1].id + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  const deleteTask = id => {
    setTasks(tasks.filter( task => task.id !== id))
  }

  const toggleReminder = id => {
    setTasks(tasks.map( task => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <div className="container">
      <Header openAddForm={ () => setShowAddTask(!showAddTask) } showAddTask={showAddTask} />
      { showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : 'You have no tasks.'}
    </div>
  )
}

export default App
