import { BasePage } from '../basePage'

export class ShowPage extends BasePage {
  async createPlacementRequest(): Promise<void> {
    await this.page.getByRole('link', { name: 'Request a placement' }).click()
    await this.page.getByRole('button', { name: 'Create placement request', exact: true }).click()
  }
}
