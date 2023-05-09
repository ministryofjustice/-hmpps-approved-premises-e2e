import { Page } from '@playwright/test'
import { DashboardPage } from '../pages/dashboardPage'
import { AssessmentPage, ListPage } from '../pages/workflow'

export const assignAssessmentToMe = async (dashboard: DashboardPage, page: Page) => {
  await dashboard.clickWorkflow()

  const workflowListPage = new ListPage(page)
  await workflowListPage.chooseFirstAssessment()

  const assessmentPage = new AssessmentPage(page)
  await assessmentPage.selectStaffMember()
  await assessmentPage.clickSubmit()
}
