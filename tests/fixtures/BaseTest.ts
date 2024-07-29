import { test as baseTest } from '@playwright/test'
import { HomePage } from '../pom/pages/HomePage'
import { LoginPage } from '../pom/pages/LoginPage'
import { SignupPage } from '../pom/pages/SignupPage'

export const test = baseTest.extend<{
  homePage: HomePage
  loginPage: LoginPage
  signupPage: SignupPage
}>({
  homePage: async ({ page, baseURL }, use) => {
    if (!baseURL) return
    await use(new HomePage(page, baseURL))
  },
  loginPage: async ({ page, baseURL }, use) => {
    if (!baseURL) return
    await use(new LoginPage(page, baseURL))
  },
  signupPage: async ({ page, baseURL }, use) => {
    if (!baseURL) return
    await use(new SignupPage(page, baseURL))
  },
})
