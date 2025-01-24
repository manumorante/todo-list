import React, { useState } from "react"
import cx from "clsx"
import { validateUsername, validateEmail, validatePassword } from "../utils"

const RegistrationForm: React.FC = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const validateInputs = () => {
    let isValid = true
    if (!validateUsername(inputs.username)) {
      setErrors((prevErrors) => ({ ...prevErrors, username: "Username is required" }))
      isValid = false
    }
    // Email must be valid
    if (!validateEmail(inputs.email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Email is invalid" }))
      isValid = false
    }
    // Password must be at least 8 characters
    if (!validatePassword(inputs.password)) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "Password is too short" }))
      isValid = false
    }
    // Check if passwords match
    if (inputs.password !== inputs.confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "Passwords do not match" }))
      isValid = false
    }
    return isValid
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validateInputs()) {
      console.log("Registration successful!", inputs)
      // Registration logic
    }
  }

  type InputNames = "username" | "email" | "password" | "confirmPassword"

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as { name: InputNames; value: string }
    setInputs({
      ...inputs,
      [name]: value,
    })
    // Clear the error of the input field when the user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const inputCx = cx("mt-1 block w-full")
  const labelCx = cx("ml-1 text-neutral-500")
  const errorCx = cx("text-red-500 mt-1 ml-1")

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <label className="block">
        <span className={labelCx}>Username</span>
        <input
          className={inputCx}
          id="username"
          name="username"
          type="text"
          value={inputs.username}
          onChange={handleChange}
        />
        {errors.username && <span className={errorCx}>{errors.username}</span>}
      </label>

      <label className="block">
        <span className={labelCx}>Email</span>
        <input
          className={inputCx}
          id="email"
          name="email"
          type="email"
          value={inputs.email}
          onChange={handleChange}
        />
        {errors.email && <div className={errorCx}>{errors.email}</div>}
      </label>

      <label className="block">
        <span className={labelCx}>Password</span>
        <input
          className={inputCx}
          id="password"
          name="password"
          type="password"
          value={inputs.password}
          onChange={handleChange}
        />
        {errors.password && <div className={errorCx}>{errors.password}</div>}
      </label>

      <label className="block">
        <span className={labelCx}>Confirm Password</span>
        <input
          className={inputCx}
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={inputs.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <div className={errorCx}>{errors.confirmPassword}</div>}
      </label>

      <button type="submit">Register</button>
    </form>
  )
}

export default RegistrationForm
