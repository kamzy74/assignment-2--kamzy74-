// One task: checkbox, text, delete button.
// It owns no state; it reports clicks back up to App through callback props.
function TaskItem({ task, onToggle, onDelete }) {
  const inputId = `task-${task.id}`

  return (
    <li className={task.completed ? 'task-item completed' : 'task-item'}>
      <input
        type="checkbox"
        id={inputId}
        className="task-radio"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <label htmlFor={inputId} className="task-text">
        {task.text}
      </label>
      <button
        type="button"
        className="delete-btn"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete "${task.text}"`}
      >
        ×
      </button>
    </li>
  )
}

export default TaskItem
