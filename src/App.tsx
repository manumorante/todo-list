import Form from "./components/Form"
import TodoList from "./components/TodoList"
import { useTheme } from "./theme"

function App() {
  const { toggleTheme } = useTheme()

  return (
    <>
      <button onClick={toggleTheme}>Toggle theme</button>

      <Form />
      <TodoList />
    </>
  )
}

export default App
