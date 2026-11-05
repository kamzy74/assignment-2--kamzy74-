import checkIcon from '../assets/check_icon.png'

// Shows "total / completed" for ALL tasks, whatever filter is active.
function TaskCounter({ total, completed }) {
  return (
    <p className="task-counter">
      <img src={checkIcon} alt="Completed tasks" className="check-icon" />
      {total} / {completed}
    </p>
  )
}

export default TaskCounter
