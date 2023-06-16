import { BasePage } from '../basePage'

export class AssessmentPage extends BasePage {
  async selectStaffMember(userName: string) {
    await this.page.locator('select').selectOption(userName)
  }
}
