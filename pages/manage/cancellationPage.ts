import { getDate, getMonth, getYear } from 'date-fns'
import { Page, expect } from '@playwright/test'
import { BasePage } from '../basePage'

export class CancellationPage extends BasePage {
  static async initialize(page: Page, title?: string) {
    if (title) {
      await expect(page.locator('h1')).toContainText(title)
    }
    return new CancellationPage(page)
  }

  async enterCancellationDate() {
    await this.page
      .getByRole('group', { name: 'What date was this placement cancelled?' })
      .getByLabel('Day')
      .fill(getDate(new Date()).toString())
    await this.page
      .getByRole('group', { name: 'What date was this placement cancelled?' })
      .getByLabel('Month')
      .fill((getMonth(new Date()) + 1).toString())
    await this.page
      .getByRole('group', { name: 'What date was this placement cancelled?' })
      .getByLabel('Year')
      .fill(getYear(new Date()).toString())
  }

  async fillInNotes() {
    await this.page.getByLabel('Additional notes').fill('Test cancellation')
  }

  async completeForm() {
    await this.enterCancellationDate()
    await this.fillInNotes()
  }
}
