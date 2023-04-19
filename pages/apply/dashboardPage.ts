import { BasePage } from './basePage'

export class DashboardPage extends BasePage {
  async goto() {
    await this.page.goto('/')
  }

  async clickApply() {
    await this.page.getByRole('link', { name: 'Apply for an Approved Premises placement' }).click()
  }
}
