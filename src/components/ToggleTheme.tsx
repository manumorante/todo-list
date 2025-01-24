import { useTheme } from "../theme"

function ToggleTheme() {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <button onClick={toggleTheme}>{theme}</button>
    </>
  )
}

export default ToggleTheme
