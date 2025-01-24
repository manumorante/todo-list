import Form from "./components/Form"
import TodoList from "./components/TodoList"
import ToggleTheme from "./components/ToggleTheme"

export default function Home() {
  return (
    <>
      <header>
        <ToggleTheme />
      </header>
      <Form />
      <TodoList />
    </>
  )
}
