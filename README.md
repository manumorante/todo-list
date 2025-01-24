# TodoList

### En el siguiente código se pretende mostrar un componente que permite añadir tareas a una lista y marcarlas como completadas. Sin embargo, hay errores de lógica que impiden que funcione correctamente.

Necesitamos que resuelvas los problemas que pueda haber y si quieres optimizar o mejorar el código lo hagas sin problema. Te recomendas que copies el ejercicio en un IDE y despues nos proporciones el nuevo código copiando y pegando lo que hayas realizadotu solución.

```jsx
import React, { useState } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    const updatedTasks = [...tasks, { id: tasks.length, text: newTask, completed: false }];
    setTasks(updatedTasks);
    setNewTask('');
  };

  const toggleTask = (taskId: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  return (
    <div>
      <input type="text" value={newTask} onChange={handleInputChange} />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            onClick={() => toggleTask(task.id)}
          >
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
```
