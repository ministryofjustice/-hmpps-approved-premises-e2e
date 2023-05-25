import { BasePage } from '../basePage'

export class ListPage extends BasePage {
  async chooseFirstAssessment() {
    await this.page
      .getByRole('row')
      .filter({ has: this.page.getByText('Assessment') })
      .first()
      .getByRole('link')
      .click()
  }

  async chooseFirstPlacementRequest() {
    await this.page
      .getByRole('row')
      .filter({ has: this.page.getByText('Placement request') })
      .first()
      .getByRole('link')
      .click()
  }
}