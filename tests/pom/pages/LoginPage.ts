import type { Locator, Page } from '@playwright/test'

import { BasePage } from './BasePage'
import { User } from '../../../src/types/User'

/**
 * Represents the login page of the application.
 */
export class LoginPage extends BasePage {
  private readonly loginPath = '/login'

  public readonly mainHeading: Locator

  public readonly subHeading: Locator

  public readonly emailInput: Locator

  public readonly emailInputError: Locator

  public readonly passwordInput: Locator

  public readonly passwordInputError: Locator

  public readonly passwordVisibiltyToggle: Locator

  public readonly invalidCredentialsMessage: Locator

  public readonly logInButton: Locator

  public readonly signUpLink: Locator

  constructor(page: Page, baseURL: string) {
    super(page, baseURL)

    this.mainHeading = this.page.getByTestId('mainHeading')
    this.subHeading = this.page.getByTestId('pageSubHeading')
    this.emailInput = this.page.getByTestId('emailTextField')
    this.emailInputError = this.page.getByTestId('emailInputError')
    this.passwordInput = this.page.getByTestId('passwordInput')
    this.passwordInputError = this.page.getByTestId('passwordInputError')
    this.passwordVisibiltyToggle = this.page.getByTestId(
      'passwordVisibilityToggle',
    )
    this.invalidCredentialsMessage = this.page.getByTestId(
      'invalidCredentialsMessage',
    )
    this.logInButton = this.page.getByTestId('loginButton')
    this.signUpLink = this.page.getByTestId('signUpLink')
  }

  /**
   * Navigates to the specified path or the default "/login" path.
   *
   * @param path - The path to navigate to. If not provided, the default "/login" path will be used.
   */
  async navigate() {
    await super.navigate(this.loginPath)
  }

  /**
   * Performs a valid login using the specified user.
   * @param {User} user - The user object containing login credentials.
   */
  async validLogin(user: User): Promise<void> {
    await this.login(user)
  }

  /**
   * Performs an invalid login using the specified user credentials.
   * @param user - The user credentials to use for the login.
   */
  async invalidLogin(user: User): Promise<void> {
    await this.login(user, false)
  }

  /**
   * Logs in the user with the provided credentials.
   *
   * @param existingUser - The user object containing the email and password.
   * @param isValid - A boolean indicating whether the password is valid. Defaults to true.
   */
  async login(existingUser: User, isValid = true): Promise<void> {
    const password = isValid ? existingUser.password : 'invalid-password'
    await this.emailInput.fill(existingUser.email)
    await this.passwordInput.fill(password)
    await this.logInButton.click()
  }
}
