import { useTheme } from "../theme"

function ToggleTheme() {
  const { toggleTheme } = useTheme()

  return (
    <>
      <button onClick={toggleTheme}>Toggle theme</button>
    </>
  )
}

export default ToggleTheme
