import { test as baseTest } from '@playwright/test'
import { HomePage } from '../pom/pages/HomePage'
import { LoginPage } from '../pom/pages/LoginPage'

export const test = baseTest.extend<{
  homePage: HomePage
  loginPage: LoginPage
}>({
  homePage: async ({ page, baseURL }, use) => {
    if (!baseURL) return
    await use(new HomePage(page, baseURL))
  },
  loginPage: async ({ page, baseURL }, use) => {
    if (!baseURL) return
    await use(new LoginPage(page, baseURL))
  },
})
