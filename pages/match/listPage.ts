import { BasePage } from '../basePage'

export class ListPage extends BasePage {
  async clickFirstPlacementRequest() {
    await this.page.getByRole('link', { name: 'Ben Davies' }).first().click()
  }
}
