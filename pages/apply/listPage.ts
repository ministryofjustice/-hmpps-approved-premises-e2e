import { expect } from '@playwright/test'
import { BasePage } from '../basePage'

export class ListPage extends BasePage {
  async startApplication() {
    await this.page.getByRole('button', { name: 'Start now' }).click()
  }

  async clickSubmitted(): Promise<void> {
    await this.page.getByRole('tab', { name: 'Submitted' }).click()
  }

  async clickApplicationWithId(applicationId: string): Promise<void> {
    await this.page
      .getByRole('rowheader')
      .filter({ has: this.page.locator(`[data-cy-id="${applicationId}"]`) })
      .first()
      .getByRole('link')
      .click()
  }

  async shouldShowWithdrawalConfirmationMessage() {
    await expect(this.page.getByRole('alert', { name: 'Success' })).toContainText('Success')
    await expect(this.page.getByRole('heading', { name: 'Application withdrawn' })).toContainText(
      'Application withdrawn',
    )
  }
}
