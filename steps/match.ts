import { Page } from '@playwright/test'
import { visitDashboard } from './apply'
import { ConfirmPage, ConfirmationPage, DetailsPage, ListPage, ResultsPage } from '../pages/match'

export const searchForBed = async (page: Page, personName: string) => {
  const dashboard = await visitDashboard(page)
  await dashboard.clickMatch()

  const listPage = new ListPage(page)
  await listPage.clickFirstPlacementRequest(personName)

  const detailsPage = new DetailsPage(page)
  await detailsPage.clickSearch()
}

export const chooseBed = async (page: Page) => {
  const resultsPage = new ResultsPage(page)
  await resultsPage.chooseBed()
}

export const confirmBooking = async (page: Page) => {
  const confirmPage = new ConfirmPage(page)
  await confirmPage.clickConfirm()
}

export const shouldShowBookingConfirmation = async (page: Page) => {
  const confirmationPage = new ConfirmationPage(page)
  await confirmationPage.shouldShowSuccessMessage()
}
