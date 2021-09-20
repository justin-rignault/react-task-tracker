import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route  } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import Swal from 'sweetalert2'

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

  useEffect(() => {
      if(!localStorage.getItem('tasks')) localStorage.setItem('tasks', JSON.stringify(tasks))
      else setTasks(JSON.parse(localStorage.getItem('tasks')))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addTask = task => {
    const id = tasks[tasks.length - 1].id + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
    localStorage.setItem('tasks', JSON.stringify([ ...tasks, newTask ]))
  }

  const deleteTask = id => {
    Swal.fire({
      icon: 'warning',
      text: 'Are you sure you want to delete this task?',
      showCloseButton: true
    }).then( e => {
      if (!e.value) return
      const newTasks = tasks.filter( task => task.id !== id)
      setTasks(newTasks)
      localStorage.setItem('tasks', JSON.stringify(newTasks))
    })
  }

  const toggleReminder = id => {
    const updatedTasks = tasks.map( task => task.id === id ? { ...task, reminder: !task.reminder } : task)
    setTasks(updatedTasks)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
  }

  return (
    <Router>
      <div className="container">
        <Header openAddForm={ () => setShowAddTask(!showAddTask) } showAddTask={showAddTask} />
        <Route path={['/', '/react-task-tracker']} exact render={props => (
          <>
            { showAddTask && <AddTask onAdd={addTask}/>}
            {tasks.length > 0 ? (
              <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
            ) : 'You have no tasks.'}
          </>
        )}></Route>
        <Route path='/about' component={About}></Route>
        <Footer/>
      </div>
    </Router>
  )
}

export default App
