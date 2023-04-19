import { BasePage } from './basePage'

export class ListPage extends BasePage {
  async startApplication() {
    await this.page.getByRole('button', { name: 'Start now' }).click()
  }
}
