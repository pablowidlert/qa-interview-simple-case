import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

/**
 * Represents a base page for the application.
 */
export class BasePage {
  protected readonly page: Page
  protected baseURL: string

  /**
   * Creates an instance of BasePage.
   * @param page - The page object representing the browser page.
   * @param baseURL - The base URL of the application.
   */
  constructor(page: Page, baseURL: string) {
    this.page = page
    this.baseURL = baseURL
  }

  /**
   * Navigates to the specified path.
   * @param path - The path to navigate to.
   */
  async navigate(path: string) {
    await this.page.goto(path)

    // Verify the navigation has been successful if a path is provided
    if (path) {
      await expect(this.page, `URL did not contain '${path}'`).toHaveURL(
        `${path}`,
      )
    }
  }
}
