import { VisibilityOff, Visibility } from '@mui/icons-material'
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material'
import React, { useState } from 'react'

interface PasswordFieldProps {
  id: string
  password: string | undefined
  setPassword: React.Dispatch<React.SetStateAction<string>>
  label: string
  error: boolean
  helperText: string | null
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  fullWidth: boolean
  required: boolean
  variant: 'filled'
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  id,
  password,
  setPassword,
  label,
  error,
  helperText,
  onChange,
  onKeyDown,
  fullWidth,
  required,
  variant,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <FormControl
      fullWidth={fullWidth}
      required={required}
      variant={variant}
      error={error}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        inputProps={{ 'data-testid': 'passwordInput' }}
        id={id}
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value.replace(/\s/g, ''))
          onChange(e)
        }}
        onKeyDown={onKeyDown}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              data-testid="togglePasswordVisibility"
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {error && (
        <FormHelperText data-testid="passwordInputError">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}
