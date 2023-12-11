import { Page, expect } from '@playwright/test'
import { BasePage } from '../basePage'

export const qualifactions = ['PIPE', 'Emergency APs', 'Limited access offenders', 'ESAP']

export type Qualifaction = (typeof qualifactions)[number]

export const roles = [
  'Administrator',
  'Assessor',
  'Manage an Approved Premises',
  'Matcher',
  'Workflow manager',
  'Stop assessment allocations',
  'Stop match allocations',
  'Stop placement request allocations',
  ...qualifactions,
] as const

export type Role = (typeof roles)[number]

export class EditUser extends BasePage {
  static async initialize(page: Page) {
    await expect(page.locator('h1')).toContainText('Manage permissions')

    return new EditUser(page)
  }

  async clickSave(): Promise<void> {
    await this.page.getByRole('button', { name: 'Save' }).click()
  }

  async clickRemoveAccess(): Promise<void> {
    await this.page.getByRole('button', { name: 'Remove access' }).click()
  }

  async shouldShowUserUpdatedBanner() {
    await expect(this.page.locator('h3')).toContainText('User updated')
  }

  async shouldShowUserName(username: string) {
    await expect(this.page.locator('h1')).toContainText('Manage permissions')
    await expect(this.page.getByRole('definition')).toHaveCount(5)
    this.page.getByRole('definition', { name: username })
  }

  async assertCheckboxesAreSelected(labels: ReadonlyArray<Role>) {
    labels.forEach(async label => {
      expect(await this.page.getByLabel(label).isChecked()).toBeTruthy()
    })
  }

  async assertCheckboxesAreUnselected(labels: ReadonlyArray<Role>) {
    labels.forEach(async label => {
      expect(await this.page.getByLabel(label).isChecked()).toBeFalsy()
    })
  }
}
