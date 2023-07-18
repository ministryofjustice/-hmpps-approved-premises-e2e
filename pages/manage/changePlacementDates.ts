import { addMonths, getDate, getMonth, getYear } from 'date-fns'
import { Page, expect } from '@playwright/test'
import { BasePage } from '../basePage'

export class ChangePlacementDatesPage extends BasePage {
  static async initialize(page: Page, title?: string) {
    if (title) {
      await expect(page.locator('h1')).toContainText(title)
    }
    return new ChangePlacementDatesPage(page)
  }

  async selectAndEnterNewArrivalDate() {
    await this.page.getByLabel('Arrival date').check()
    await this.page
      .getByRole('group', { name: 'What is the new arrival date?' })
      .getByLabel('Day')
      .fill(getDate(new Date()).toString())
    await this.page
      .getByRole('group', { name: 'What is the new arrival date?' })
      .getByLabel('Month')
      .fill(getMonth(addMonths(new Date(), 2)).toString())
    await this.page
      .getByRole('group', { name: 'What is the new arrival date?' })
      .getByLabel('Year')
      .fill(getYear(new Date()).toString())
  }

  async selectAndEnterNewDepartureDate() {
    await this.page.getByLabel('Departure date').check()
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
    await this.selectAndEnterNewDepartureDate()
    await this.selectAndEnterNewArrivalDate()
  }
}
