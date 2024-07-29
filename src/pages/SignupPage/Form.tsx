import React, { useCallback, useState } from 'react'
import { TextField, Button, FormHelperTextProps } from '@mui/material'
import { validateSignupFields } from '../../utils/validations'
import {
  handleEmailChange,
  handleKeyDown,
  handleNameChange,
  handlePasswordChange,
} from '../../utils/inputHandlers'
import { PasswordField } from '../../components/PasswordField'
import { User } from '../../App'
import { createUser } from '../../database'
import { FormLabels } from '../../types/FormLabels'

const styleProps = {
  fullWidth: true,
  required: true,
  variant: 'filled',
} as const

interface FormProps {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const Form: React.FC<FormProps> = ({ setUser }) => {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState(false)
  const [firstNameError, setFirstNameError] = useState<string | null>(null)
  const [lastNameError, setLastNameError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleEmailChange(e, setEmail, setEmailError)

  const handleFirstNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleNameChange(e, setFirstName, setFirstNameError)

  const handleLastNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleNameChange(e, setLastName, setLastNameError)

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => handlePasswordChange(e, setPassword, setPasswordError)

  const handleSubmit = useCallback(async () => {
    if (validateSignupFields(firstName, lastName, email, password)) {
      const newUser = await createUser({ firstName, lastName, email, password })
      if (!newUser) {
        console.log('User already exists')
        setErrorMessage(true)
      } else {
        console.log('User created')
        setUser({ firstName, lastName, email, password })
      }
    }
  }, [firstName, lastName, email, password, setUser])

  const labels: FormLabels = {
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    password: 'Password',
    buttonName: 'Submit',
    errorMessage: 'User already exists',
  }

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <TextField
        inputProps={{ 'data-testid': 'firstNameTextField' }}
        id="firstName"
        label={labels.firstName}
        value={firstName}
        onChange={handleFirstNameInputChange}
        onKeyDown={handleKeyDown}
        error={!!firstNameError}
        helperText={firstNameError}
        FormHelperTextProps={
          {
            'data-testid': 'firstNameInputError',
          } as FormHelperTextProps
        }
        {...styleProps}
      />
      <TextField
        inputProps={{ 'data-testid': 'lastNameTextField' }}
        id="lastName"
        label={labels.lastName}
        value={lastName}
        onChange={handleLastNameInputChange}
        onKeyDown={handleKeyDown}
        error={!!lastNameError}
        helperText={lastNameError}
        FormHelperTextProps={
          {
            'data-testid': 'lastNameInputError',
          } as FormHelperTextProps
        }
        {...styleProps}
      />
      <TextField
        inputProps={{ 'data-testid': 'emailTextField' }}
        id="email"
        label={labels.email}
        type="email"
        value={email}
        onChange={handleEmailInputChange}
        onKeyDown={handleKeyDown}
        error={!!emailError}
        helperText={emailError}
        FormHelperTextProps={
          {
            'data-testid': 'emailInputError',
          } as FormHelperTextProps
        }
        {...styleProps}
      />
      <PasswordField
        id="password"
        password={password}
        setPassword={setPassword}
        label={labels.password}
        onChange={handlePasswordInputChange}
        onKeyDown={handleKeyDown}
        error={!!passwordError}
        helperText={passwordError}
        {...styleProps}
      />
      {errorMessage && (
        <div data-testid="userExistsMessage" style={{ color: 'red' }}>
          {labels.errorMessage}
        </div>
      )}
      <Button
        data-testid="submitButton"
        variant="contained"
        onClick={handleSubmit}
        disabled={!validateSignupFields(firstName, lastName, email, password)}
      >
        {labels.buttonName}
      </Button>
    </form>
  )
}
