import React from 'react'
import { validateEmail } from './validations'

export const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === ' ' || e.key === 'Tab') {
    e.preventDefault()
  }
}
/**
 * Error message for a required field.
 */
export const REQUIRED_FIELD_ERROR_MESSAGE = 'This field is required.'

/**
 * Handles the change event for the name input field.
 * Updates the name state and performs validation.
 *
 * @param e - The change event object.
 * @param setName - The state setter function for the name.
 * @param setNameError - The state setter function for the name error.
 */
export const handleNameChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setName: React.Dispatch<React.SetStateAction<string>>,
  setNameError: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const value = e.target.value
  setName(value)
  if (value.trim() === '') {
    setNameError(REQUIRED_FIELD_ERROR_MESSAGE)
  } else {
    setNameError(null)
  }
}

/**
 * Handles the change event for the email input field.
 *
 * @param e - The change event object.
 * @param setEmail - The state setter function for the email.
 * @param setEmailError - The state setter function for the email error.
 */
export const handleEmailChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setEmailError: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const newEmail = e.target.value.replace(/\s/g, '')
  setEmail(newEmail)
  if (newEmail.length === 0) {
    setEmailError(REQUIRED_FIELD_ERROR_MESSAGE)
  } else if (!validateEmail(newEmail)) {
    setEmailError('Please enter a valid email address.')
  } else {
    setEmailError(null)
  }
}

/**
 * Handles the change event for the password input field.
 *
 * @param e - The change event object.
 * @param setPassword - The state setter function for the password.
 * @param setPasswordError - The state setter function for the password error.
 */
export const handlePasswordChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  setPasswordError: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const newPassword = e.target.value.replace(/\s/g, '')
  setPassword(newPassword)
  if (newPassword.length === 0) {
    setPasswordError(REQUIRED_FIELD_ERROR_MESSAGE)
  } else if (newPassword.length < 9) {
    setPasswordError('Password must be at least 9 characters long.')
  } else {
    setPasswordError(null)
  }
}
