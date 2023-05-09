import { Page, expect } from '@playwright/test'
import { BasePage } from '../basePage'

export class AssessPage extends BasePage {
  static async initialize(page: Page, title?: string) {
    if (title) {
      await expect(page.locator('h1')).toContainText(title)
    }
    return new AssessPage(page)
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

  async checkRequirement(requirement: string, status: string) {
    await this.page.getByLabel(`${requirement} ${status}`, { exact: true }).check()
  }

  async checkCheckBoxes(labels: Array<string>) {
    const promises = [] as Array<Promise<void>>

    for (let i = 0; i < labels.length; i += 1) {
      promises.push(this.page.getByLabel(labels[i]).dispatchEvent('click'))
    }

    await Promise.all(promises)
  }
}
