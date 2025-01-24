import React, { useState, useRef } from "react"
import { v4 as uuidv4 } from "uuid"

interface Task {
  id: string
  text: string
  completed: boolean
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const isTaskValid = (task: string) => {
    return task.trim() !== ""
  }

  const addTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isTaskValid(newTask)) return

    const updatedTasks = [...tasks, { id: uuidv4(), text: newTask, completed: false }]
    setTasks(updatedTasks)
    setNewTask("")

    // Returning focus to the input field is crucial for enhancing the user experience.
    inputRef.current?.focus()
  }

  // Prevents stale state issues in batched state updates by using a function in setTasks.
  const toggleTask = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value)
  }

  return (
    <div>
      <h2>TodoList</h2>

      <form onSubmit={addTask} className="todo">
        <input
          ref={inputRef}
          type="text"
          value={newTask}
          className="todo__text"
          onChange={handleInputChange}
          placeholder="Enter a new task..."
          // Set focus to the input field when the component is mounted
          autoFocus
        />
        <button className="todo__action" type="submit" disabled={!isTaskValid(newTask)}>
          Add Task
        </button>
      </form>

      <ul className="tasks">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task ${task.completed ? "task--completed" : ""}`}
            onClick={() => toggleTask(task.id)}
          >
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
