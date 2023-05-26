import { addMonths, getDate, getMonth, getYear } from 'date-fns'
import { Page, expect } from '@playwright/test'
import { BasePage } from '../basePage'

export class ExtendPlacementPage extends BasePage {
  static async initialize(page: Page, title?: string) {
    if (title) {
      await expect(page.locator('h1')).toContainText(title)
    }
    return new ExtendPlacementPage(page)
  }

  async enterNewDepartureDate() {
    await this.page
      .getByRole('group', { name: 'What is the new departure date?' })
      .getByLabel('Day')
      .fill(getDate(new Date()).toString())
    await this.page
      .getByRole('group', { name: 'What is the new departure date?' })
      .getByLabel('Month')
      .fill(getMonth(addMonths(new Date(), 2)).toString())
    await this.page
      .getByRole('group', { name: 'What is the new departure date?' })
      .getByLabel('Year')
      .fill(getYear(new Date()).toString())
  }

  async completeForm() {
    await this.enterNewDepartureDate()
  }
}
