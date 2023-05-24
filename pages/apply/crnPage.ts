import { BasePage } from '../basePage'

export class CRNPage extends BasePage {
  async enterCrn() {
    await this.page.getByLabel("Enter the person's CRN").fill('X371199')
  }

  async clickSearch() {
    await this.page.getByRole('button', { name: 'Search' }).click()
  }
}
