import { BasePage } from './basePage'

export class DashboardPage extends BasePage {
  async goto() {
    await this.page.goto('/')
  }

  async clickApply() {
    await this.page.getByRole('link', { name: 'Apply for an Approved Premises placement' }).click()
  }

  async clickWorkflow() {
    await this.page.getByRole('link', { name: 'Manage case allocations' }).click()
  }

  async clickAssess() {
    await this.page.getByRole('link', { name: 'Assess Approved Premises applications' }).click()
  }

  async clickMatch() {
    await this.page.getByRole('link', { name: 'Match people to Approved Premises placements' }).click()
  }

  async clickManage() {
    await this.page.getByRole('link', { name: 'Manage an Approved Premises' }).click()
  }
}
