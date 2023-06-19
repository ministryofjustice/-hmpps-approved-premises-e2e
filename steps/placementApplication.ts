import { Page } from '@playwright/test'
import { ApplyPage, DashboardPage, ListPage } from '../pages/apply'
import { ListPage as WorkflowListPage } from '../pages/workflow'
import { ListPage as MatchListPage } from '../pages/match'
import { PlacementConfirmPage } from '../pages/apply/placementConfirmPage'
import { ShowPage } from '../pages/apply/showPage'
import { visitDashboard } from './apply'
import { PlacementApplicationPage } from '../pages/workflow/placementApplicationPage'

export const assignPlacementApplicationToMe = async (
  dashboard: DashboardPage,
  page: Page,
  userName: string,
  id: string,
) => {
  await dashboard.clickWorkflow()

  const workflowListPage = new WorkflowListPage(page)
  await workflowListPage.choosePlacementApplicationWithId(id)

  const placementRequestPage = new PlacementApplicationPage(page)
  await placementRequestPage.selectStaffMember(userName)
  await placementRequestPage.clickSubmit()
}

export const startPlacementApplication = async ({ page }, applicationId: string) => {
  // When I visit the Dashboard
  const dashboard = await visitDashboard(page)

  await dashboard.clickApply()

  const listPage = new ListPage(page)
  await listPage.clickSubmitted()
  await listPage.clickApplicationWithId(applicationId)

  const showPage = new ShowPage(page)
  await showPage.createPlacementRequest()
}

export const createPlacementApplication = async ({ page }) => {
  const reasonForPlacementPage = new ApplyPage(page)
  await reasonForPlacementPage.checkRadioInGroup(
    'Why are you requesting a placement?',
    'Release on Temporary Licence (ROTL)',
  )
  await reasonForPlacementPage.clickSubmit()

  const previousPlacementPage = new ApplyPage(page)
  await previousPlacementPage.checkRadioInGroup(
    'Has this person previously had a placement at an Approved Premises for ROTL?',
    'No',
  )
  await previousPlacementPage.clickSubmit()

  const sameApPage = new ApplyPage(page)
  await sameApPage.checkRadioInGroup('Do you want this person to stay in the same Approved Premises (AP)?', 'No')
  await sameApPage.clickSubmit()

  const datePage = new ApplyPage(page)
  await datePage.fillReleaseDateField()
  await datePage.fillField('Weeks', '12')
  await datePage.fillField('Days', '0')
  await datePage.clickSubmit()

  const updatesToPlacementPage = new ApplyPage(page)
  await updatesToPlacementPage.checkRadioInGroup(
    'Have there been any significant events since the application was assessed?',
    'No',
  )
  await updatesToPlacementPage.checkRadioInGroup(
    "Has the person's circumstances changed which affect the planned AP placement?",
    'No',
  )
  await updatesToPlacementPage.checkRadioInGroup(
    "Has the person's risk factors changed since the application was assessed?",
    'No',
  )
  await updatesToPlacementPage.checkRadioInGroup(
    "Has the person's access or healthcare needs changed since the application was assessed?",
    'No',
  )
  await updatesToPlacementPage.checkRadioInGroup(
    "Has the person's location factors changed since the application was assessed?",
    'No',
  )
  await updatesToPlacementPage.clickSubmit()

  const checkYourAnswersPage = new ApplyPage(page)
  await checkYourAnswersPage.checkCheckBoxes([
    'I confirm the information provided is complete, accurate and up to date.',
  ])
  await checkYourAnswersPage.clickSubmit()

  const placementConfirmPage = new PlacementConfirmPage(page)
  await placementConfirmPage.shouldShowSuccessMessage()
}

export const startAndCreatePlacementApplication = async ({ page }, applicationId: string) => {
  await startPlacementApplication({ page }, applicationId)
  await createPlacementApplication({ page })
}

export const reviewAndApprovePlacementApplication = async ({ page, user }, applicationId: string) => {
  const dashboard = await visitDashboard(page)
  await assignPlacementApplicationToMe(dashboard, page, user.name, applicationId)

  await visitDashboard(page)
  await dashboard.clickMatch()

  const listPage = new MatchListPage(page)
  await listPage.clickPlacementApplications()
  await listPage.clickPlacementApplicationWithId(applicationId)

  // TODO: Review and approve application
}
