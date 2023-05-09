import { Page, expect } from '@playwright/test'
import { BasePage } from '../basePage'

export class ApplyPage extends BasePage {
  static async initialize(page: Page, title?: string) {
    if (title) {
      await expect(page.locator('h1')).toContainText(title)
    }
    return new ApplyPage(page)
  }

  async fillReleaseDateField() {
    const sixMonths = 1000 * 60 * 60 * 24 * 7 * 4 * 6
    const releaseDate = new Date(new Date().getTime() + sixMonths)

    await this.fillDateField({
      day: releaseDate.getDate().toString(),
      month: (releaseDate.getMonth() + 1).toString(),
      year: releaseDate.getFullYear().toString(),
    })
  }

  async clickTab(title: string) {
    await this.page.getByRole('link', { name: title }).click()
  }
}
