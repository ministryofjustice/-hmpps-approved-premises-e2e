import { Page, expect } from '@playwright/test'
import { ApplicationType } from '@approved-premises/e2e'
import { BasePage } from '../basePage'

export class ApplyPage extends BasePage {
  static async initialize(page: Page, title?: string) {
    if (title) {
      await expect(page.locator('h1').first()).toContainText(title)
    }
    return new ApplyPage(page)
  }

  async fillReleaseDateField(applicationType: ApplicationType) {
    const sevenMonths = 1000 * 60 * 60 * 24 * 7 * 4 * 7

    const nextWeek = 1000 * 60 * 60 * 24 * 8

    const releaseDate = new Date(new Date().getTime() + (applicationType === 'emergency' ? nextWeek : sevenMonths))
    const dateFields = {
      day: releaseDate.getDate().toString(),
      month: (releaseDate.getMonth() + 1).toString(),
      year: releaseDate.getFullYear().toString(),
    }

    await this.fillDateField(dateFields)
  }

  async fillNamedDateField({ day, month, year }: { day: string; month: string; year: string }, fieldLabel: string) {
    await this.page.locator(`#${fieldLabel}-day`).fill(day)
    await this.page.locator(`#${fieldLabel}-month`).fill(month)
    await this.page.locator(`#${fieldLabel}-year`).fill(year)
  }

  async clickTab(title: string) {
    await this.page.getByRole('link', { name: title }).click()
  }

  async fillDurationField({ weeks, days }: { weeks: number; days: number }) {
    await this.page.getByLabel('Weeks', { exact: true }).first().fill(weeks.toString())
    await this.page.getByLabel('Days', { exact: true }).first().fill(days.toString())
  }
}
