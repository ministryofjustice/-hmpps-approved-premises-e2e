import { Page, expect } from '@playwright/test'
import { BasePage } from './basePage'

export class ApplyPage extends BasePage {
  static async initialize(page: Page, title?: string) {
    if (title) {
      await expect(page.locator('h1')).toContainText(title)
    }
    return new ApplyPage(page)
  }

  async fillField(label: string, value: string) {
    await this.page.getByLabel(label).fill(value)
  }

  async clickSave() {
    await this.page.getByRole('button', { name: 'Save and continue' }).click()
  }

  async checkRadio(label: string) {
    await this.page.getByLabel(label, { exact: true }).check()
  }

  async checkRadioInGroup(group: string, label: string) {
    await this.page
      .getByRole('group', {
        name: group,
      })
      .getByLabel(label, { exact: true })
      .check()
  }

  async checkCheckBoxes(labels: Array<string>) {
    const promises = [] as Array<Promise<void>>

    for (let i = 0; i < labels.length; i += 1) {
      promises.push(this.page.getByLabel(labels[i]).dispatchEvent('click'))
    }

    await Promise.all(promises)
  }

  async fillDateField({ year, month, day }: { year: string; month: string; day: string }) {
    await this.page.getByLabel('Day').fill(day)
    await this.page.getByLabel('Month').fill(month)
    await this.page.getByLabel('Year').fill(year)
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
