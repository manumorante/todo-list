import Form from "./components/Form"
import TodoList from "./components/TodoList"
import ToggleTheme from "./components/ToggleTheme"

export default function Home() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium my-6">INNOCV Solutions</h1>
        <ToggleTheme />
      </div>
      <div className="flex gap-10">
        <div className="flex-1">
          <TodoList />
        </div>

        <div className="flex-1">
          <Form />
        </div>
      </div>
    </>
  )
}
