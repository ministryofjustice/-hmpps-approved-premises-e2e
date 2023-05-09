import { BasePage } from '../basePage'

export class PlacementRequestPage extends BasePage {
  async selectStaffMember() {
    await this.page.locator('select').selectOption('Approved Premises E2ETester')
  }
}
