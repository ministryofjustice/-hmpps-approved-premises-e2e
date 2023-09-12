import { expect } from '@playwright/test'
import { test } from '../test'
import { visitDashboard } from '../steps/apply'
import { ReportsPage } from '../pages/admin/reports'

test('download reports', async ({ page }) => {
  // Given I visit the dashboard
  const dashboard = await visitDashboard(page)

  // When I click the download reports link
  await dashboard.clickDownloadData()

  // Then I should see the download reports page
  const reportsPage = await ReportsPage.initialize(page, 'Reports')

  const month = '01'
  const year = '2023'

  // When I download the lost beds report
  const lostBedsDownload = await reportsPage.downloadLostBedsReports({ month, year })
  // Then the file should be downloaded with the correct suggested name
  expect(lostBedsDownload.suggestedFilename()).toMatch(`lost-beds-${year}-${month}.xlsx`)

  // When I download the applications report
  const applicationsDownload = await reportsPage.downloadApplicationsReports({ month, year })
  // Then the file should be downloaded with the correct suggested name
  expect(applicationsDownload.suggestedFilename()).toMatch(`applications-${year}-${month}.xlsx`)
})
