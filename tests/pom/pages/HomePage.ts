import type { Locator, Page } from '@playwright/test'

import { BasePage } from './BasePage'

/**
 * Represents the home page of the application.
 */
export class HomePage extends BasePage {
  public readonly mainHeading: Locator

  public readonly subHeading: Locator

  public readonly logOutButton: Locator

  public readonly pageDescriptionHeader: Locator

  public readonly pageDescriptionText1: Locator

  public readonly pageDescriptionText2: Locator

  public readonly pageDescriptionText3: Locator

  constructor(page: Page, baseURL: string) {
    super(page, baseURL)

    this.mainHeading = this.page.getByTestId('mainHeading')
    this.subHeading = this.page.getByTestId('pageSubHeading')
    this.logOutButton = this.page.getByTestId('logOutButton')
    this.pageDescriptionHeader = this.page.getByTestId('pageDescriptionHeader')
    this.pageDescriptionText1 = this.page.getByTestId('pageDescriptionText0')
    this.pageDescriptionText2 = this.page.getByTestId('pageDescriptionText1')
    this.pageDescriptionText3 = this.page.getByTestId('pageDescriptionText2')
  }
}
