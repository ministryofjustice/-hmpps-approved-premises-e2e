import { Page } from '@playwright/test'
import { DashboardPage } from '../pages/dashboardPage'
import { AssessmentPage, ListPage, PlacementRequestPage } from '../pages/workflow'

export const assignAssessmentToMe = async (dashboard: DashboardPage, page: Page, userName: string) => {
  await dashboard.clickWorkflow()

  const workflowListPage = new ListPage(page)
  await workflowListPage.chooseFirstAssessment()

  const assessmentPage = new AssessmentPage(page)
  await assessmentPage.selectStaffMember(userName)
  await assessmentPage.clickSubmit()
}

export const assignPlacementRequestToMe = async (dashboard: DashboardPage, page: Page, userName: string) => {
  await dashboard.clickWorkflow()

  const workflowListPage = new ListPage(page)
  await workflowListPage.chooseFirstPlacementRequest()

  const placementRequestPage = new PlacementRequestPage(page)
  await placementRequestPage.selectStaffMember(userName)
  await placementRequestPage.clickSubmit()
}
