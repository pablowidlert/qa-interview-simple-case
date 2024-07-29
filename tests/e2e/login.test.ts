import { expect } from '@playwright/test'
import { test } from '../fixtures/BaseTest'

import { REQUIRED_FIELD_ERROR_MESSAGE } from '../../src/utils/inputHandlers'
import existingUsers from '../../test-data/existing.users.json'

test.describe('login form tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate()
  })

  test('logging in works with existing account', async ({
    homePage,
    loginPage,
  }) => {
    // Arrange
    const existingUser = existingUsers[0]
    // Act
    await loginPage.validLogin(existingUser)
    // Assert - Soft assertions will check all of these and report all failures
    await expect.soft(homePage.subHeading).toContainText('Test1')
    await expect.soft(homePage.mainHeading).toBeVisible()
    await expect.soft(homePage.subHeading).toBeVisible()
    await expect.soft(homePage.logOutButton).toBeVisible()
    await expect.soft(homePage.pageDescriptionHeader).toBeVisible()
    await expect.soft(homePage.pageDescriptionText1).toBeVisible()
    await expect.soft(homePage.pageDescriptionText2).toBeVisible()
    await expect.soft(homePage.pageDescriptionText3).toBeVisible()
  })

  test('logging in fails with invalid password', async ({ loginPage }) => {
    // Arrange
    const existingUser = existingUsers[0]
    // Act
    await loginPage.invalidLogin(existingUser)
    // Assert
    await expect(loginPage.invalidCredentialsMessage).toBeVisible()
  })

  test('validating login form', async ({ loginPage }) => {
    // Check email format error
    await loginPage.emailInput.fill('d')
    await expect(loginPage.emailInputError).toContainText(
      'Please enter a valid email address.',
    )
    // Check required field error - email
    await loginPage.emailInput.clear()
    await expect(loginPage.emailInputError).toContainText(
      REQUIRED_FIELD_ERROR_MESSAGE,
    )
    // Check password length error
    await loginPage.passwordInput.fill('1')
    await expect(loginPage.passwordInputError).toContainText(
      'Password must be at least 9 characters long.',
    )
    // Check required field error - password
    await loginPage.passwordInput.clear()
    await expect(loginPage.passwordInputError).toContainText(
      REQUIRED_FIELD_ERROR_MESSAGE,
    )
  })
})
