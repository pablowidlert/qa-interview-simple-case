import React, { useCallback, useState } from 'react'
import { TextField, Button, FormHelperTextProps } from '@mui/material'
import { validateLoginFields } from '../../utils/validations'
import {
  handleEmailChange,
  handleKeyDown,
  handlePasswordChange,
} from '../../utils/inputHandlers'
import { PasswordField } from '../../components/PasswordField'
import { loginUser } from '../../database'
import { User } from '../../App'
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
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [invalidCredentials, setInvalidCredentials] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleEmailChange(e, setEmail, setEmailError)

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => handlePasswordChange(e, setPassword, setPasswordError)

  const handleLogin = useCallback(async () => {
    if (validateLoginFields(email, password)) {
      const user = await loginUser(email, password)
      if (!user) {
        setInvalidCredentials(true)
      } else {
        setUser(user)
      }
    }
  }, [email, password, setUser])

  const labels: FormLabels = {
    email: 'Email',
    password: 'Password',
    buttonName: 'Login',
    errorMessage: 'Invalid credentials',
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
      {invalidCredentials && (
        <div data-testid="invalidCredentialsMessage" style={{ color: 'red' }}>
          {labels.errorMessage}
        </div>
      )}
      <Button
        data-testid="loginButton"
        variant="contained"
        onClick={handleLogin}
        disabled={!validateLoginFields(email, password)}
      >
        {labels.buttonName}
      </Button>
    </form>
  )
}
