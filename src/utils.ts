// Simple, but this function can accommodate more product validations like a username blacklist etc.
export const validateUsername = (username: string) => !!username

// Regex for email validation
export const validateEmail = (email: string) => {
  const emailRegex = RegExp(
    // eslint-disable-next-line no-useless-escape
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  )

  return emailRegex.test(email)
}

// Again, this is a simple, but flexible function that can be expanded to include complex requirements
export const validatePassword = (password: string) => {
  return password.length < 8
}
