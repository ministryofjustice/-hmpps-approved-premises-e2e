import { Page, expect } from '@playwright/test'
import { BasePage } from '../basePage'

export class PlacementPage extends BasePage {
  static async initialize(page: Page, title?: string) {
    if (title) {
      await expect(page.locator('h1')).toContainText(title)
    }
    return new PlacementPage(page)
  }

  async clickActions() {
    await this.page.getByRole('button', { name: 'Actions' }).click()
  }

  async clickMarkNotArrived() {
    await this.clickActions()
    await this.page.getByRole('menuitem', { name: 'Mark as not arrived' }).click()
  }

  async clickMovePersonToANewBed() {
    await this.clickActions()
    await this.page.getByRole('menuitem', { name: 'Move person to a new bed' }).click()
  }

  async clickMarkArrived() {
    await this.clickActions()
    await this.page.getByRole('menuitem', { name: 'Mark as arrived' }).click()
  }

  async clickMarkCancelled() {
    await this.clickActions()
    await this.page.getByRole('menuitem', { name: 'Cancel placement' }).click()
  }

  async clickExtend() {
    await this.clickActions()
    await this.page.getByRole('menuitem', { name: 'Extend placement' }).click()
  }

  async showsNonArrivalLoggedMessage() {
    await this.page.waitForSelector('text=Non-arrival logged')
  }

  async showsArrivalLoggedMessage() {
    await this.page.waitForSelector('text=Arrival logged')
  }

  async showsCancellationLoggedMessage() {
    await this.page.waitForSelector('text=Booking cancelled')
  }

  async showsExtensionLoggedMessage() {
    await this.page.waitForSelector('text=Extension logged')
  }

  async showsBedMoveLoggedMessage() {
    await this.page.waitForSelector('text=Bed move logged')
  }
}
