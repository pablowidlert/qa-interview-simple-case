export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const validateEmail = (email: string): boolean => {
  return emailRegex.test(email)
}

export const validateLoginFields = (
  email?: string,
  password?: string,
): boolean => {
  if (!email || !password) return false
  if (!emailRegex.test(email)) return false
  if (password.length < 9 && !/\s/.test(password)) return false
  return true
}

export const validateSignupFields = (
  firstName?: string,
  lastName?: string,
  email?: string,
  password?: string,
): boolean => {
  if (!firstName || !lastName || !email || !password) return false
  if (!emailRegex.test(email)) return false
  if (password.length < 9 && !/\s/.test(password)) return false
  return true
}
