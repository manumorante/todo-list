import React, { useState } from "react"

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
    let valid = true
    if (!inputs.username) {
      setErrors((prevErrors) => ({ ...prevErrors, username: "Username is required" }))
      valid = false
    }
    if (!inputs.email.includes("@")) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Email is invalid" }))
      valid = false
    }
    // Password must be at least 8 characters
    if (inputs.password.length < 8) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "Password is too short" }))
      valid = false
    }
    // Check if passwords match
    if (inputs.password !== inputs.confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "Passwords do not match" }))
      valid = false
    }
    return valid
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

  return (
    <form onSubmit={handleSubmit}>
      <h2>Form</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          type="text"
          value={inputs.username}
          onChange={handleChange}
        />
        {errors.username && <div className="error">{errors.username}</div>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" value={inputs.email} onChange={handleChange} />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={inputs.password}
          onChange={handleChange}
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={inputs.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
      </div>

      <button type="submit">Register</button>
    </form>
  )
}

export default RegistrationForm
