import React, { useState, useRef } from "react"
import { v4 as uuidv4 } from "uuid"
import cx from "clsx"

interface Task {
  id: string
  text: string
  completed: boolean
}

const exampleTasks: Task[] = [
  { id: "1", text: "Develop a New Feature", completed: true },
  { id: "2", text: "Organize a Team Meeting", completed: false },
  { id: "3", text: "Write a Blog Post", completed: false },
]

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(exampleTasks)
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
      <form onSubmit={addTask} className="flex items-center gap-3 mb-3">
        <input
          ref={inputRef}
          type="text"
          value={newTask}
          className="flex-1"
          onChange={handleInputChange}
          placeholder="Enter a new task..."
          // Set focus to the input field when the component is mounted
          autoFocus
        />
        <button className="whitespace-nowrap" type="submit" disabled={!isTaskValid(newTask)}>
          Add Task
        </button>
      </form>

      <ul className="tasks flex flex-col gap-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={cx(
              "px-4 py-3",
              "text-neutral-500 bg-white dark:bg-neutral-800",
              "rounded-lg cursor-pointer",
              {
                "line-through  dark:text-neutral-400": task.completed,
                "shadow  dark:text-neutral-300": !task.completed,
              }
            )}
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
