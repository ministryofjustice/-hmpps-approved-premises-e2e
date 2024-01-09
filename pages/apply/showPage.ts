import { expect } from '@playwright/test'
import { BasePage } from '../basePage'

export class ShowPage extends BasePage {
  async createPlacementRequest(): Promise<void> {
    await this.clickPlacementRequestsTab()
    await this.page.getByRole('button', { name: 'Create placement request', exact: true }).click()
  }

  async clickPlacementRequestsTab(): Promise<void> {
    await this.page.getByLabel('Secondary navigation region').getByRole('link', { name: 'Match' }).click()
  }

  async withdrawPlacementApplication(): Promise<void> {
    await this.clickPlacementRequestsTab()
    await this.page.getByRole('link', { name: 'Withdraw' }).click()
    const confirmPage = new BasePage(this.page)
    await confirmPage.clickContinue()

    expect(this.page.getByRole('heading', { name: 'Placement application withdrawn' })).toBeTruthy()
  }
}
