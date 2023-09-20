import { Page, expect } from '@playwright/test'
import { BasePage } from '../basePage'

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

  async assertCheckboxesAreSelected(labels: Array<string>) {
    labels.forEach(async label => {
      expect(await this.page.getByLabel(label).isChecked()).toBeTruthy()
    })
  }

  async assertCheckboxesAreUnselected(labels: Array<string>) {
    labels.forEach(async label => {
      expect(await this.page.getByLabel(label).isChecked()).toBeFalsy()
    })
  }
}
