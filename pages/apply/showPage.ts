import { expect } from '@playwright/test'
import { BasePage } from '../basePage'

export class ShowPage extends BasePage {
  async createPlacementRequest(): Promise<void> {
    await this.clickPlacementRequestsTab()
    await this.page.getByRole('button', { name: 'Create placement request', exact: true }).click()
  }

  async clickPlacementRequestsTab(): Promise<void> {
    await this.page.getByLabel('Secondary navigation region').getByRole('link', { name: 'Placement requests' }).click()
  }

  async withdrawPlacementApplication(): Promise<void> {
    await this.clickPlacementRequestsTab()
    await this.page.getByRole('link', { name: 'Withdraw' }).click()

    const typePage = new BasePage(this.page)
    await typePage.checkRadio('Placement request')
    await typePage.clickContinue()

    const placementRequestsPage = new BasePage(this.page)
    await placementRequestsPage.page.getByRole('radio').first().click()
    await placementRequestsPage.clickContinue()

    const reasonPage = new BasePage(this.page)
    await reasonPage.page.getByRole('radio').first().click()
    await reasonPage.clickContinue()

    expect(this.page.getByRole('heading', { name: 'Placement application withdrawn' })).toBeTruthy()
  }
}
