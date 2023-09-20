import { test } from '../test'
import {
  createApplication,
  enterAndConfirmCrn,
  startAnApplication,
  visitDashboard,
  withdrawAnApplication,
} from '../steps/apply'
import { assessApplication, requestAndAddAdditionalInformation } from '../steps/assess'
// import { matchAndBookApplication } from '../steps/match'

// import { reviewAndApprovePlacementApplication, startAndCreatePlacementApplication } from '../steps/placementApplication'
import { startAndCreatePlacementApplication } from '../steps/placementApplication'

import { ListPage } from '../pages/apply'

test('Apply, assess, match and book an application for an Approved Premises with a release date', async ({
  page,
  user,
  person,
  indexOffenceRequired,
  oasysSections,
}) => {
  const id = await createApplication({ page, person, indexOffenceRequired, oasysSections }, true, false, true)
  await assessApplication({ page, user, person }, id, false)
  // Skip match until it's back
  // await matchAndBookApplication({ page, user, person }, id)
})

test('Apply, assess, match and book an emergency application for an Approved Premises', async ({
  page,
  user,
  person,
  indexOffenceRequired,
  oasysSections,
}) => {
  const id = await createApplication({ page, person, indexOffenceRequired, oasysSections }, true, true)
  await assessApplication({ page, user, person }, id, true)
  // Skip match until it's back
  // await matchAndBookApplication({ page, user, person }, id)
})

test('Apply, assess, match and book an application for an Approved Premises without a release date', async ({
  page,
  user,
  person,
  indexOffenceRequired,
  oasysSections,
}) => {
  const id = await createApplication({ page, person, indexOffenceRequired, oasysSections }, false, false)
  await assessApplication({ page, user, person }, id, false)
  await startAndCreatePlacementApplication({ page }, id)
  // Skip match until it's back
  // await reviewAndApprovePlacementApplication({ page, user }, id)
  // TODO: Match and book once approval is done
})

test('Withdraw an application', async ({ page, person, indexOffenceRequired }) => {
  const dashboard = await visitDashboard(page)

  await startAnApplication(dashboard, page)
  await enterAndConfirmCrn(page, person.crn, indexOffenceRequired)

  await visitDashboard(page)
  await dashboard.clickApply()

  await withdrawAnApplication(page)

  const listPage = new ListPage(page)
  await listPage.shouldShowWithdrawalConfirmationMessage()
})

test('Request further information on an Application, adds it and proceeds with the assessment', async ({
  page,
  user,
  person,
  indexOffenceRequired,
  oasysSections,
}) => {
  const id = await createApplication({ page, person, indexOffenceRequired, oasysSections }, true, false)
  await requestAndAddAdditionalInformation({ page, user, person }, id)
})
