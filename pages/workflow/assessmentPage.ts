import { BasePage } from '../basePage'

export class AssessmentPage extends BasePage {
  async selectStaffMember() {
    await this.page.locator('select').selectOption('Approved Premises E2ETester')
  }
}
