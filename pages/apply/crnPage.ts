import { BasePage } from '../basePage'

export class CRNPage extends BasePage {
  async enterCrn() {
    await this.page.getByLabel("Enter the person's CRN").fill('X371199')
  }
}
