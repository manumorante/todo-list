import { createContext, useContext, useState, useEffect, PropsWithChildren } from "react"

enum Themes {
  light = "light",
  dark = "dark",
}

interface ThemeContextProps {
  // Using enum instead of string for theme
  theme: Themes
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

// Check if window is defined to prevent SSR issues
const isClient = () => typeof window !== "undefined"

const getLocalStorageTheme = (): Themes => {
  if (!isClient()) return Themes.light
  const storedTheme = localStorage.getItem("theme")
  return storedTheme === Themes.light || storedTheme === Themes.dark ? storedTheme : Themes.light
}

const setLocalStorageTheme = (theme: Themes) => {
  if (!isClient()) return
  localStorage.setItem("theme", theme)
}

const ThemeProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [theme, setTheme] = useState<Themes>(() => {
    const storedTheme = getLocalStorageTheme()
    return storedTheme === Themes.light || storedTheme === Themes.dark ? storedTheme : Themes.light
  })

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === Themes.light ? Themes.dark : Themes.light))
  }

  const setBodyThemeClass = (theme: Themes) => {
    if (!isClient()) return
    document.body.classList.remove(Themes.light, Themes.dark)
    document.body.classList.add(theme)
  }

  useEffect(() => {
    setLocalStorageTheme(theme)
    setBodyThemeClass(theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
