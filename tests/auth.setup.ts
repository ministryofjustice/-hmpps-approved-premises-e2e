import { expect } from '@playwright/test'
import { test as setup } from '../test'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({ page, user }) => {
  await page.goto('/')
  await page.getByLabel('Username').fill(user.username)
  await page.getByLabel('Password').fill(user.password)
  await page.getByRole('button', { name: 'Sign in' }).click()

  expect(await page.title()).toBe('Approved Premises')
  await page.context().storageState({ path: authFile })
})
