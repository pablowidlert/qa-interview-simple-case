import { test } from '../fixtures/BaseTest'
import { expect } from 'playwright/test'

import { User } from '../../src/types/User'
import { REQUIRED_FIELD_ERROR_MESSAGE } from '../../src/utils/inputHandlers'
import existingUsers from '../../test-data/existing.users.json'
import { generateUserData } from '../../test-data/testData'

test.describe('signup form tests', () => {
  test.beforeEach(async ({ signupPage }) => {
    await signupPage.navigate()
  })

  test('signing up works with new account', async ({ signupPage }) => {
    // Arrange
    const newUser = generateUserData()
    // Act
    await signupPage.signupUser(newUser)
    // Assert
    await expect(signupPage.subHeading).toContainText(newUser.firstName)
  })

  test('signing up fails with existing account', async ({ signupPage }) => {
    // Arrange
    const existingUser: User = existingUsers[0]
    // Act
    await signupPage.signupUser(existingUser)
    // Assert
    await expect(signupPage.userExistsMessage).toBeVisible()
  })

  test('validating signup form', async ({ signupPage }) => {
    // Check required field error - first name
    await signupPage.firstNameInput.fill('a')
    await signupPage.firstNameInput.clear()
    await expect(signupPage.firstNameInputError).toContainText(
      REQUIRED_FIELD_ERROR_MESSAGE,
    )
    // Check required field error - last name
    await signupPage.surnameInput.fill('a')
    await signupPage.surnameInput.clear()
    await expect(signupPage.surnameInputError).toContainText(
      REQUIRED_FIELD_ERROR_MESSAGE,
    )
    // Check email format error
    await signupPage.emailInput.fill('d')
    await expect(signupPage.emailInputError).toContainText(
      'Please enter a valid email address.',
    )
    // Check required field error - email
    await signupPage.emailInput.clear()
    await expect(signupPage.emailInputError).toContainText(
      REQUIRED_FIELD_ERROR_MESSAGE,
    )
    // Check password length error
    await signupPage.passwordInput.fill('1')
    await expect(signupPage.passwordInputError).toContainText(
      'Password must be at least 9 characters long.',
    )
    // Check required field error - password
    await signupPage.passwordInput.clear()
    await expect(signupPage.passwordInputError).toContainText(
      REQUIRED_FIELD_ERROR_MESSAGE,
    )
    // Check submit button is disabled
    await expect(signupPage.submitButton).toBeDisabled()
  })
})
