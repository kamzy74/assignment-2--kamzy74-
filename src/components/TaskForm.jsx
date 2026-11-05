import { useState } from 'react'

// Controlled form: the input's value always comes from state.
// It owns only the text being typed; App owns the task list.
function TaskForm({ onAdd }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = text.trim()
    if (trimmed === '') return // reject empty or whitespace-only input
    onAdd(trimmed)
    setText('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="Add a task"
        aria-label="New task"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button type="submit" className="add-btn">
        Add task
      </button>
    </form>
  )
}

export default TaskForm
