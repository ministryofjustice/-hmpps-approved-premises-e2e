import { BasePage } from '../basePage'

export class ListPage extends BasePage {
  async clickFirstPlacementRequest(personName: string) {
    await this.page.getByRole('link', { name: personName }).first().click()
  }
}
