import { Page } from '@playwright/test'

export class BasePage {
  constructor(public readonly page: Page) {}

  async clickSave() {
    await this.page.getByRole('button', { name: 'Save and continue' }).click()
  }

  async clickSubmit() {
    await this.page.getByRole('button', { name: 'Submit' }).click()
  }

  async clickContinue() {
    await this.page.getByRole('button', { name: 'Continue' }).click()
  }

  async fillField(label: string, value: string) {
    await this.page.getByLabel(label).fill(value)
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
}
