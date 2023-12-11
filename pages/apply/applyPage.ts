import { Page, expect } from '@playwright/test'
import { BasePage } from '../basePage'

export class ApplyPage extends BasePage {
  static async initialize(page: Page, title?: string) {
    if (title) {
      await expect(page.locator('h1')).toContainText(title)
    }
    return new ApplyPage(page)
  }

  async fillReleaseDateField(emergencyApplication = false) {
    const sixMonths = 1000 * 60 * 60 * 24 * 7 * 4 * 6

    const nextWeek = 1000 * 60 * 60 * 24 * 8

    const releaseDate = new Date(new Date().getTime() + (emergencyApplication ? nextWeek : sixMonths))
    const dateFields = {
      day: releaseDate.getDate().toString(),
      month: (releaseDate.getMonth() + 1).toString(),
      year: releaseDate.getFullYear().toString(),
    }

    await this.fillDateField(dateFields)
  }

  async fillSedField(date: { day: string; month: string; year: string }) {
    await this.page.getByRole('group', { name: 'Sentence end date (SED)' }).getByLabel('Day').fill(date.day)
    await this.page.getByRole('group', { name: 'Sentence end date (SED)' }).getByLabel('Month').fill(date.month)
    await this.page.getByRole('group', { name: 'Sentence end date (SED)' }).getByLabel('Year').fill(date.year)
  }

  async clickTab(title: string) {
    await this.page.getByRole('link', { name: title }).click()
  }

  async fillDurationField({ weeks, days }: { weeks: number; days: number }) {
    await this.page.getByLabel('Weeks', { exact: true }).first().fill(weeks.toString())
    await this.page.getByLabel('Days', { exact: true }).first().fill(days.toString())
  }
}
