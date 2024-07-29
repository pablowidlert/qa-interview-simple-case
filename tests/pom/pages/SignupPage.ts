import type { Locator, Page } from '@playwright/test'

import { BasePage } from './BasePage'
import { User } from '../../../src/types/User'

/**
 * Represents the sign-up page of the application.
 */
export class SignupPage extends BasePage {
  private readonly loginPath = '/signup'

  public readonly mainHeading: Locator

  public readonly subHeading: Locator

  public readonly firstNameInput: Locator

  public readonly firstNameInputError: Locator

  public readonly surnameInput: Locator

  public readonly surnameInputError: Locator

  public readonly emailInput: Locator

  public readonly emailInputError: Locator

  public readonly passwordInput: Locator

  public readonly passwordInputError: Locator

  public readonly passwordVisibiltyToggle: Locator

  public readonly userExistsMessage: Locator

  public readonly submitButton: Locator

  public readonly loginLink: Locator

  constructor(page: Page, baseURL: string) {
    super(page, baseURL)

    this.mainHeading = this.page.getByTestId('mainHeading')
    this.subHeading = this.page.getByTestId('pageSubHeading')
    this.firstNameInput = this.page.getByTestId('firstNameTextField')
    this.firstNameInputError = this.page.getByTestId('firstNameInputError')
    this.surnameInput = this.page.getByTestId('lastNameTextField')
    this.surnameInputError = this.page.getByTestId('lastNameInputError')
    this.emailInput = this.page.getByTestId('emailTextField')
    this.emailInputError = this.page.getByTestId('emailInputError')
    this.passwordInput = this.page.getByTestId('passwordInput')
    this.passwordInputError = this.page.getByTestId('passwordInputError')
    this.passwordVisibiltyToggle = this.page.getByTestId(
      'passwordVisibilityToggle',
    )
    this.userExistsMessage = this.page.getByTestId('userExistsMessage')
    this.submitButton = this.page.getByTestId('submitButton')
    this.loginLink = this.page.getByTestId('loginLink')
  }

  /**
   * Navigates to the specified path or the default "/login" path.
   *
   * @param path - The path to navigate to. If not provided, the default "/login" path will be used.
   */
  async navigate(): Promise<void> {
    await super.navigate(this.loginPath)
  }

  /**
   * Signs up a new user.
   * @param newUser - The user object containing the details of the new user.
   */
  async signupNewUser(newUser: User): Promise<void> {
    await this.signupUser(newUser)
  }

  /**
   * Signs up an existing user.
   *
   * @param existingUser - The existing user to sign up.
   */
  async signupExistingUser(existingUser: User): Promise<void> {
    await this.signupUser(existingUser)
  }

  /**
   * Signs up a user with the provided user information.
   * @param user - The user object containing the user information.
   */
  async signupUser(user: User): Promise<void> {
    await this.firstNameInput.fill(user.firstName)
    await this.surnameInput.fill(user.lastName)
    await this.emailInput.fill(user.email)
    await this.passwordInput.fill(user.password)
    await this.submitButton.click()
  }
}
