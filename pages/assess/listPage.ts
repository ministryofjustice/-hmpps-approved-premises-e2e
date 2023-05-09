import { BasePage } from '../basePage'

export class ListPage extends BasePage {
  async clickFirstAssessment() {
    await this.page.getByRole('link', { name: 'Ben Davies' }).first().click()
  }
}
