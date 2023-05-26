import { Page, expect } from '@playwright/test'
import { BasePage } from '../basePage'

export class PlacementPage extends BasePage {
  static async initialize(page: Page, title?: string) {
    if (title) {
      await expect(page.locator('h1')).toContainText(title)
    }
    return new PlacementPage(page)
  }

  async clickActions() {
    await this.page.getByRole('button', { name: 'Actions' }).click()
  }

  async clickMarkCancelled() {
    await this.clickActions()
    await this.page.getByRole('menuitem', { name: 'Cancel placement' }).click()
  }

  async showsCancellationLoggedMessage() {
    await this.page.waitForSelector('text=Cancellation logged')
  }
}
