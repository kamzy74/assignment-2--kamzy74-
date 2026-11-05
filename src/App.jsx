import { useState } from 'react'
import './App.css'
import menuIcon from './assets/menu_icon.png'
import searchIcon from './assets/search_icon.png'
import inboxIcon from './assets/inbox_icon.png'
import calendarIcon from './assets/calendar_icon.png'
import upcomingIcon from './assets/upcoming_icon.png'
import TaskCounter from './components/TaskCounter.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'

const INITIAL_TASKS = [
  { id: 1, text: 'Call Mom', completed: false },
  { id: 2, text: 'Buy the new issue of Scientific American', completed: false },
  { id: 3, text: 'Return the textbook to Josie', completed: false },
  { id: 4, text: 'Buy the new album by Rake', completed: false },
  { id: 5, text: 'Buy a gift card for Dad', completed: false },
]

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

function App() {
  // All task data lives here and flows down through props.
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [filter, setFilter] = useState('all')
  const [nextId, setNextId] = useState(INITIAL_TASKS.length + 1)

  // Every update builds a new array / object instead of mutating the old one.
  function handleAdd(text) {
    setTasks((prev) => [...prev, { id: nextId, text, completed: false }])
    setNextId((id) => id + 1)
  }

  function handleToggle(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  function handleDelete(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const completedCount = tasks.filter((task) => task.completed).length
  const activeCount = tasks.length - completedCount

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <>
      <header className="main-header">
        <h1>Task Manager</h1>
        <button className="menu-btn" type="button">
          <img src={menuIcon} alt="Menu" className="menu-icon" />
        </button>
        <label className="search-box">
          <img src={searchIcon} alt="Search" className="search-icon" />
          <input
            type="text"
            id="quick-find"
            name="quick-find"
            className="search-input"
            placeholder="Quick find"
          />
        </label>
        <TaskCounter total={tasks.length} completed={completedCount} />
      </header>

      <nav className="sidebar">
        <ul className="nav-list">
          <li>
            <a href="#" className="nav-link active">
              <img src={inboxIcon} alt="" className="nav-icon" />
              Inbox
              <span className="nav-count">{activeCount}</span>
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              <img src={calendarIcon} alt="" className="nav-icon" />
              Today
              <span className="nav-count">5</span>
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              <img src={upcomingIcon} alt="" className="nav-icon" />
              Upcoming
            </a>
          </li>
        </ul>
      </nav>

      <main className="main-content">
        <section className="task-section">
          <h1 className="section-title">Inbox</h1>

          <div className="filters">
            {FILTERS.map((option, index) => (
              <span key={option.value} className="filter-group">
                {index > 0 && <span className="separator">|</span>}
                <button
                  type="button"
                  className={
                    filter === option.value ? 'filter-btn active' : 'filter-btn'
                  }
                  onClick={() => setFilter(option.value)}
                >
                  {option.label}
                </button>
              </span>
            ))}
          </div>

          <TaskForm onAdd={handleAdd} />

          <TaskList
            tasks={visibleTasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </>
  )
}

export default App
